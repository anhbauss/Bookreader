"""Serve the optional browser REST adapter for a BookGraph workspace."""

from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer

from bookgraph.cli._app import app
from bookgraph.http_api import create_app
from bookgraph.workspace import WorkspacePaths


@app.command("serve-http")
def serve_http(
    workspace_path: Annotated[Path, typer.Argument(help="BookGraph workspace root path.")],
    host: Annotated[
        str, typer.Option("--host", help="Bind host; default is loopback only.")
    ] = "127.0.0.1",
    port: Annotated[int, typer.Option("--port", help="Bind port.")] = 8000,
) -> None:
    """Serve browser-safe read endpoints and reading-plan progress over REST."""

    if port < 1 or port > 65535:
        raise typer.BadParameter("--port must be between 1 and 65535")
    try:
        import uvicorn
    except ImportError as exc:  # pragma: no cover - requires omitted optional extra
        raise typer.BadParameter(
            "HTTP API requires the 'http' extra: install bookgraph[http]"
        ) from exc
    workspace = WorkspacePaths(workspace_path.expanduser().resolve())
    uvicorn.run(create_app(workspace), host=host, port=port)
