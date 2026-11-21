from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.book_metadata import enrich_book_metadata
from bookgraph.cli._app import app
from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.workspace import WorkspacePaths


@app.command("book-metadata")
def book_metadata(
    workspace_path: Annotated[Path, typer.Argument(help="One book workspace.")],
    ai: Annotated[
        bool, typer.Option("--ai", help="Use the configured AI on front-page text.")
    ] = False,
    force: Annotated[bool, typer.Option("--force", help="Refresh cached book details.")] = False,
) -> None:
    """Cache book details and, with --ai, select a matching catalog cover."""
    workspace = WorkspacePaths(workspace_path.expanduser().resolve())
    try:
        value = enrich_book_metadata(workspace, use_ai=ai, force=force)
    except ReadingServiceError as exc:
        typer.echo(f"Unable to read book details: {exc}", err=True)
        raise typer.Exit(1) from exc
    typer.echo(value.model_dump_json())
