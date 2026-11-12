"""Build read-only Fumadocs MDX from canonical BookGraph sections."""

from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.cli._app import app
from bookgraph.mdx_bridge import MdxBridgeError, build_mdx


@app.command("build-mdx")
def build_mdx_command(
    workspace_path: Annotated[Path, typer.Argument(help="BookGraph workspace root path.")],
    doc_id: Annotated[str, typer.Argument(help="Segmented BookGraph document id.")],
    output_dir: Annotated[
        Path,
        typer.Option("--output-dir", help="Generated MDX content directory in the reader app."),
    ],
) -> None:
    """Convert ``sources/sections/<doc_id>/*.md`` into safe reader MDX."""

    try:
        result = build_mdx(workspace_path, doc_id, output_dir)
    except MdxBridgeError as exc:
        raise typer.BadParameter(str(exc)) from exc
    typer.echo(f"doc_id: {result.doc_id}")
    typer.echo(f"output_dir: {result.output_dir}")
    typer.echo(f"sections_written: {len(result.written)}")
