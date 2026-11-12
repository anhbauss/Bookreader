"""BookGraph MCP serving.

The reading/query logic lives in :mod:`bookgraph.mcp.service` and has no
dependency on FastMCP, so it can be unit-tested without the optional ``mcp``
extra. :mod:`bookgraph.mcp.server` is the thin FastMCP wrapper and is imported
lazily (only when the ``mcp`` extra is installed).
"""

from __future__ import annotations

from importlib import import_module
from typing import Any

__all__ = ["service"]


def __getattr__(name: str) -> Any:
    """Load the public service facade lazily to avoid submodule import cycles."""

    if name == "service":
        return import_module("bookgraph.mcp.service")
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
