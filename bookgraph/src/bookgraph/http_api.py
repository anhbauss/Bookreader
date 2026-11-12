"""Optional browser-safe REST adapter over :mod:`bookgraph.mcp.service`.

Business logic remains in the pure MCP service facade. This module only validates
HTTP input, removes workspace-internal paths, maps expected errors to HTTP responses,
and serves allowlisted staged images. Install it with ``bookgraph[http]``.
"""

from __future__ import annotations

from collections.abc import Callable
from pathlib import Path
from typing import Any

from bookgraph.mcp import service
from bookgraph.mcp.errors import (
    ConceptNotFoundError,
    InvalidIdError,
    PlanNotFoundError,
    ReadingServiceError,
    SectionNotFoundError,
    SectionsNotFoundError,
)
from bookgraph.utils import validate_slug_id
from bookgraph.workspace import WorkspacePaths

_ALLOWED_IMAGE_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
}


def create_app(workspace: WorkspacePaths) -> Any:
    """Create the optional ASGI app without leaking Starlette into core service code."""

    try:
        from starlette.applications import Starlette
        from starlette.middleware.cors import CORSMiddleware
        from starlette.requests import Request
        from starlette.responses import FileResponse, JSONResponse
        from starlette.routing import Route
    except ImportError as exc:  # pragma: no cover - exercised only without optional extra
        raise RuntimeError("HTTP API requires the 'http' extra: install bookgraph[http]") from exc

    def response(call: Callable[[], Any]) -> Any:
        try:
            return JSONResponse(_public_view(call()))
        except InvalidIdError as exc:
            return _error(JSONResponse, 422, "validation_error", str(exc))
        except (
            PlanNotFoundError,
            SectionNotFoundError,
            SectionsNotFoundError,
            ConceptNotFoundError,
        ) as exc:
            return _error(JSONResponse, 404, "not_found", str(exc))
        except ReadingServiceError as exc:
            return _error(JSONResponse, 400, "service_error", str(exc))

    async def documents(_request: Request) -> Any:
        return response(lambda: service.list_documents(workspace))

    async def section(request: Request) -> Any:
        return response(
            lambda: _section_view(
                workspace,
                request.path_params["doc_id"],
                request.path_params["section_id"],
            )
        )

    async def outline(request: Request) -> Any:
        return response(
            lambda: service.get_outline(workspace, request.path_params["doc_id"])
        )

    async def section_tree(request: Request) -> Any:
        return response(
            lambda: service.get_section_tree(
                workspace, request.path_params["doc_id"], request.path_params["section_id"]
            )
        )

    async def context(request: Request) -> Any:
        return response(
            lambda: service.get_context(
                workspace, request.path_params["doc_id"], request.path_params["section_id"]
            )
        )

    async def plans(_request: Request) -> Any:
        return response(lambda: service.list_plans(workspace))

    async def plan_progress(request: Request) -> Any:
        return response(
            lambda: service.get_plan_progress(workspace, request.path_params["plan_id"])
        )

    async def next_section(request: Request) -> Any:
        return response(
            lambda: service.get_next_section(workspace, request.path_params["plan_id"])
        )

    async def mark_read(request: Request) -> Any:
        return response(
            lambda: service.mark_read(
                workspace, request.path_params["plan_id"], request.path_params["section_id"]
            )
        )

    async def translation(request: Request) -> Any:
        return response(
            lambda: service.get_section_translation(
                workspace,
                request.path_params["doc_id"],
                request.path_params["section_id"],
                request.path_params["lang"],
                include_content=True,
            )
        )

    async def concept(request: Request) -> Any:
        return response(lambda: service.get_concept(workspace, request.path_params["concept"]))

    async def asset(request: Request) -> Any:
        doc_id = request.path_params["doc_id"]
        basename = request.path_params["basename"]
        try:
            path, content_type = _asset_path(workspace, doc_id, basename)
        except ValueError as exc:
            return _error(JSONResponse, 404, "not_found", str(exc))
        return FileResponse(path, media_type=content_type)

    routes = [
        Route("/api/documents", documents, methods=["GET"]),
        Route(
            "/api/documents/{doc_id:str}/sections/{section_id:str}", section, methods=["GET"]
        ),
        Route("/api/documents/{doc_id:str}/outline", outline, methods=["GET"]),
        Route(
            "/api/documents/{doc_id:str}/sections/{section_id:str}/tree",
            section_tree,
            methods=["GET"],
        ),
        Route(
            "/api/documents/{doc_id:str}/sections/{section_id:str}/context",
            context,
            methods=["GET"],
        ),
        Route("/api/plans", plans, methods=["GET"]),
        Route(
            "/api/plans/{plan_id:str}/progress", plan_progress, methods=["GET"]
        ),
        Route("/api/plans/{plan_id:str}/next", next_section, methods=["GET"]),
        Route(
            "/api/plans/{plan_id:str}/sections/{section_id:str}/read",
            mark_read,
            methods=["POST"],
        ),
        Route(
            "/api/documents/{doc_id:str}/sections/{section_id:str}/translations/{lang:str}",
            translation,
            methods=["GET"],
        ),
        Route("/api/concepts/{concept:str}", concept, methods=["GET"]),
        Route("/api/assets/{doc_id:str}/{basename:str}", asset, methods=["GET"]),
    ]
    return CORSMiddleware(
        Starlette(routes=routes),
        allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
        allow_methods=["GET", "POST"],
        allow_headers=[],
    )


def _section_view(workspace: WorkspacePaths, doc_id: str, section_id: str) -> dict[str, Any]:
    """Return one section while turning each local asset into a browser URL."""

    view = service.get_section(workspace, doc_id, section_id, include_assets=True)
    payload = view.model_dump()
    payload["assets"] = [
        {
            **{key: value for key, value in asset.items() if key not in {"path", "link"}},
            "url": f"/api/assets/{view.doc_id}/{Path(str(asset['link'])).name}",
        }
        for asset in payload["assets"]
    ]
    payload["markdown_path"] = None
    return payload


def _public_view(value: Any) -> Any:
    """Turn Pydantic service views into browser-safe JSON recursively."""

    if hasattr(value, "model_dump"):
        return _public_view(value.model_dump())
    if isinstance(value, list):
        return [_public_view(item) for item in value]
    if isinstance(value, dict):
        public: dict[str, Any] = {}
        for key, item in value.items():
            if key in {"markdown_path", "path", "metadata_path"}:
                public[key] = None
            else:
                public[key] = _public_view(item)
        return public
    return value


def _asset_path(workspace: WorkspacePaths, doc_id: str, basename: str) -> tuple[Path, str]:
    try:
        safe_doc_id = validate_slug_id(doc_id, field_name="doc_id")
    except ValueError as exc:
        raise ValueError("invalid document id") from exc
    if Path(basename).name != basename or basename in {"", ".", ".."}:
        raise ValueError("invalid asset name")
    suffix = Path(basename).suffix.lower()
    content_type = _ALLOWED_IMAGE_TYPES.get(suffix)
    if content_type is None:
        raise ValueError("asset type is not allowed")
    images_root = workspace.sources_parsed / safe_doc_id / "images"
    try:
        root_real = images_root.resolve(strict=True)
        path = (images_root / basename).resolve(strict=True)
    except OSError as exc:
        raise ValueError("asset not found") from exc
    if not path.is_relative_to(root_real) or not path.is_file():
        raise ValueError("asset not found")
    return path, content_type


def _error(response_type: Any, status: int, code: str, message: str) -> Any:
    return response_type({"error": code, "message": message}, status_code=status)
