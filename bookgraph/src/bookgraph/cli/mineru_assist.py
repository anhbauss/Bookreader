"""Human-assisted MinerU Web workspace preparation commands."""

from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.cli._app import app
from bookgraph.mineru_assisted import (
    MinerUAssistedError,
    build_reading_workspace,
    organize_mineru_downloads,
    prepare_mineru_workspace,
)

mineru_assist_app = typer.Typer(help="Prepare and organize manual MinerU Web results.")
app.add_typer(mineru_assist_app, name="mineru-assist")


@mineru_assist_app.command("prepare")
def prepare(
    library_root: Annotated[Path, typer.Argument(help="Folder containing one BookGraph workspace per book.")],
    pdf: Annotated[Path, typer.Argument(help="Source PDF to copy into the new book workspace.")],
    title: Annotated[str, typer.Option("--title", help="Book title and workspace folder basis.")],
    max_pages: Annotated[int, typer.Option("--max-pages", help="Maximum pages in each MinerU upload PDF.")] = 200,
) -> None:
    """Create a book workspace and PDF batches for manual MinerU Web processing."""
    try:
        prepared = prepare_mineru_workspace(library_root, pdf, title, max_pages=max_pages)
    except MinerUAssistedError as exc:
        raise typer.BadParameter(str(exc)) from exc
    typer.echo(f"workspace: {prepared.manifest_path.parents[1]}")
    typer.echo(f"upload batches: {prepared.upload_dir}")
    typer.echo(f"put MinerU downloads here: {prepared.downloads_dir}")
    for batch in prepared.batches:
        typer.echo(f"{batch.batch_id}: pages {batch.start_page}-{batch.end_page} ({batch.filename})")


@mineru_assist_app.command("organize")
def organize(
    workspace: Annotated[Path, typer.Argument(help="Prepared BookGraph book workspace.")],
) -> None:
    """Validate and normalize user-downloaded MinerU result folders."""
    try:
        batches = organize_mineru_downloads(workspace)
    except MinerUAssistedError as exc:
        raise typer.BadParameter(str(exc)) from exc
    typer.echo("organized MinerU results: " + ", ".join(batches))


@mineru_assist_app.command("build")
def build(
    workspace: Annotated[Path, typer.Argument(help="Prepared BookGraph book workspace.")],
) -> None:
    """Build a reader-ready document and sections from normalized MinerU JSON."""
    try:
        doc_id, sections = build_reading_workspace(workspace)
    except MinerUAssistedError as exc:
        raise typer.BadParameter(str(exc)) from exc
    typer.echo(f"doc_id: {doc_id}")
    typer.echo(f"sections: {sections}")
