"""One deterministic orchestration command for folder ingestion through a reading plan."""

from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.cli._app import app
from bookgraph.cli._shared import _validate_id
from bookgraph.defaults import default_parser_registry
from bookgraph.documents import read_document, write_document
from bookgraph.index import IndexUnavailableError, default_index_backend
from bookgraph.ingestion import IngestionError, ingest_markdown_folder
from bookgraph.reading_plans import create_reading_plan, plan_lock, write_reading_plan
from bookgraph.sections import read_sections, write_sections
from bookgraph.segmenters.heading import HeadingSegmenter
from bookgraph.workspace import WorkspacePaths


@app.command("ingest-pipeline")
def ingest_pipeline(
    input_folder: Annotated[
        Path, typer.Argument(help="Folder containing one Markdown source or ordered Markdown part folders.")
    ],
    output: Annotated[
        Path | None,
        typer.Option(
            "--output", "-o", help="BookGraph workspace root (default: current directory)."
        ),
    ] = None,
    doc_id: Annotated[
        str,
        typer.Option("--doc-id", help="Document id used for all BookGraph artifacts."),
    ] = "",
    target_level: Annotated[
        int,
        typer.Option("--target-level", help="Markdown heading level that starts a section."),
    ] = 2,
    daily_sections: Annotated[
        int,
        typer.Option("--daily-sections", help="Sections per reading-plan batch."),
    ] = 1,
    plan_id: Annotated[
        str | None,
        typer.Option("--plan-id", help="Reading plan id; defaults to doc id."),
    ] = None,
    overwrite_plan: Annotated[
        bool,
        typer.Option("--overwrite-plan", help="Replace an existing reading plan and its progress."),
    ] = False,
) -> None:
    """Run offline ingest → markdown parse → segment → index → reading-plan."""

    if not doc_id:
        raise typer.BadParameter("--doc-id is required")
    if target_level < 1:
        raise typer.BadParameter("--target-level must be at least 1")
    if daily_sections < 1:
        raise typer.BadParameter("--daily-sections must be at least 1")

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    resolved_plan_id = _validate_id(plan_id or resolved_doc_id, "plan_id")

    workspace = WorkspacePaths((output or Path.cwd()).expanduser().resolve())
    _ensure_workspace(workspace)

    try:
        ingested = ingest_markdown_folder(input_folder, workspace.root, resolved_doc_id)
    except IngestionError as exc:
        raise typer.BadParameter(str(exc)) from exc
    for warning in ingested.warnings:
        typer.secho(f"warning: {warning}", fg=typer.colors.YELLOW, err=True)
    typer.echo(f"ingested_source: {ingested.source_markdown}")
    typer.echo(f"source_parts: {ingested.source_parts}")
    typer.echo(f"images_staged: {len(ingested.staged_images)}")
    typer.echo(f"references_rewritten: {ingested.rewritten_references}")

    parser = default_parser_registry().get("markdown")
    parsed_dir = workspace.sources_parsed / resolved_doc_id
    document = parser.parse(ingested.source_markdown, parsed_dir)
    if document.doc_id != resolved_doc_id:
        document = document.model_copy(update={"doc_id": resolved_doc_id})
    document_path = write_document(document, parsed_dir)
    typer.echo("parser: markdown")
    typer.echo(f"document: {document_path}")

    segmenter = HeadingSegmenter(target_level=target_level)
    sections = segmenter.segment(read_document(document_path))
    section_output = write_sections(sections, workspace.sources_sections / resolved_doc_id)
    typer.echo("segmenter: heading")
    typer.echo(f"sections: {len(sections)}")
    typer.echo(f"manifest: {section_output.manifest}")

    try:
        backend = default_index_backend()
        indexed = backend.build_document(workspace, resolved_doc_id, document.title, sections)
    except (IndexUnavailableError, ValueError) as exc:
        raise typer.BadParameter(str(exc)) from exc
    typer.echo(f"index_backend: {backend.name}")
    typer.echo(f"indexed_sections: {indexed}")
    typer.echo(f"index: {backend.location(workspace)}")

    # Read the persisted manifest so plan input is exactly what later reader/API consumers load.
    persisted_sections = read_sections(section_output.manifest)
    try:
        plan = create_reading_plan(
            persisted_sections,
            plan_id=resolved_plan_id,
            doc_id=resolved_doc_id,
            daily_sections=daily_sections,
        )
    except ValueError as exc:
        raise typer.BadParameter(str(exc)) from exc
    plan_path = workspace.reading_plans_root / f"{resolved_plan_id}.json"
    with plan_lock(plan_path):
        if plan_path.exists() and not overwrite_plan:
            raise typer.BadParameter(
                f"reading plan '{resolved_plan_id}' already exists; "
                "pass --overwrite-plan to replace it"
            )
        write_reading_plan(plan, plan_path)
    typer.echo(f"plan_id: {plan.plan_id}")
    typer.echo(f"reading_plan: {plan_path}")
    typer.echo("pipeline: completed")


def _ensure_workspace(workspace: WorkspacePaths) -> None:
    """Create the standard workspace directories without overwriting configuration."""

    workspace.root.mkdir(parents=True, exist_ok=True)
    for directory in workspace.directories():
        directory.mkdir(parents=True, exist_ok=True)
