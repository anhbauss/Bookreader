"""CLI entry point for offline Markdown-folder ingestion."""

from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.cli._app import app
from bookgraph.ingestion import IngestionError, ingest_markdown_folder


@app.command("ingest-folder")
def ingest_folder(
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
        typer.Option("--doc-id", help="Document id used below sources/parsed/."),
    ] = "",
) -> None:
    """Stage local Markdown assets offline before parsing with ``--parser markdown``."""

    if not doc_id:
        raise typer.BadParameter("--doc-id is required")
    try:
        result = ingest_markdown_folder(input_folder, output or Path.cwd(), doc_id)
    except IngestionError as exc:
        raise typer.BadParameter(str(exc)) from exc

    typer.echo(f"doc_id: {result.doc_id}")
    typer.echo(f"source_markdown: {result.source_markdown}")
    typer.echo(f"source_parts: {result.source_parts}")
    typer.echo(f"images_staged: {len(result.staged_images)}")
    typer.echo(f"references_rewritten: {result.rewritten_references}")
    for warning in result.warnings:
        typer.secho(f"warning: {warning}", fg=typer.colors.YELLOW, err=True)
