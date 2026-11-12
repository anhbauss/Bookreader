from __future__ import annotations

import json
from pathlib import Path

import pytest
from starlette.testclient import TestClient

from bookgraph.http_api import create_app
from bookgraph.models import Section
from bookgraph.sections import write_sections
from bookgraph.workspace import WorkspacePaths


def _workspace(tmp_path: Path) -> WorkspacePaths:
    workspace = WorkspacePaths(tmp_path / "workspace")
    for directory in workspace.directories():
        directory.mkdir(parents=True, exist_ok=True)
    sections = [
        Section(
            id="signals.intro",
            doc_id="signals",
            title="Introduction",
            level=1,
            heading_path=["Introduction"],
            text="Welcome.",
            next_id="signals.sampling",
        ),
        Section(
            id="signals.sampling",
            doc_id="signals",
            title="Sampling",
            level=2,
            heading_path=["Introduction", "Sampling"],
            text="Take samples.",
            prev_id="signals.intro",
        ),
    ]
    write_sections(sections, workspace.sources_sections / "signals")
    (workspace.sources_parsed / "signals").mkdir(parents=True)
    (workspace.sources_parsed / "signals" / "document.json").write_text(
        json.dumps({"doc_id": "signals", "title": "Signals", "blocks": [], "metadata": {}})
    )
    return workspace


def test_sections_and_outline_are_exposed_as_browser_safe_json(tmp_path: Path) -> None:
    app = create_app(_workspace(tmp_path))

    with TestClient(app) as client:
        section = client.get("/api/documents/signals/sections/signals.sampling")
        outline = client.get("/api/documents/signals/outline")

    assert section.status_code == 200
    payload = section.json()
    assert payload["id"] == "signals.sampling"
    assert payload["prev_id"] == "signals.intro"
    assert payload["markdown_path"] is None
    assert payload["assets"] == []
    assert outline.status_code == 200
    assert [node["id"] for node in outline.json()["nodes"]] == ["signals.intro", "signals.sampling"]


def test_api_allows_the_local_reader_origins(tmp_path: Path) -> None:
    app = create_app(_workspace(tmp_path))

    with TestClient(app) as client:
        preflight = client.options(
            "/api/documents",
            headers={
                "Origin": "http://127.0.0.1:5173",
                "Access-Control-Request-Method": "GET",
            },
        )
        response = client.get(
            "/api/documents", headers={"Origin": "http://localhost:5173"}
        )

    assert preflight.status_code == 200
    assert preflight.headers["access-control-allow-origin"] == "http://127.0.0.1:5173"
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"


def test_invalid_ids_and_missing_sections_have_safe_http_errors(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    app = create_app(workspace)

    with TestClient(app) as client:
        invalid = client.get("/api/documents/../private/sections/x")
        missing = client.get("/api/documents/signals/sections/signals.missing")
        no_sections = client.get("/api/documents/missing/outline")
        no_plan = client.get("/api/plans/missing/progress")

    assert invalid.status_code in {404, 422}
    assert missing.status_code == 404
    assert missing.json()["error"] == "not_found"
    assert no_sections.status_code == 404
    assert no_plan.status_code == 404
    assert str(workspace.root) not in no_sections.json()["message"]
    assert str(workspace.root) not in no_plan.json()["message"]


def test_assets_are_scoped_to_document_images_directory(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    images = workspace.sources_parsed / "signals" / "images"
    images.mkdir()
    (images / "wave.jpg").write_bytes(b"jpg-bytes")
    (workspace.root / "secret.jpg").write_bytes(b"not-public")
    app = create_app(workspace)

    with TestClient(app) as client:
        served = client.get("/api/assets/signals/wave.jpg")
        traversal = client.get("/api/assets/signals/..%2F..%2Fsecret.jpg")
        unsupported = client.get("/api/assets/signals/secret.txt")

    assert served.status_code == 200
    assert served.content == b"jpg-bytes"
    assert served.headers["content-type"].startswith("image/jpeg")
    assert traversal.status_code in {404, 422}
    assert unsupported.status_code == 404


def test_mark_read_requires_a_plan_and_never_writes_section_content(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    source_before = (workspace.sources_sections / "signals" / "signals.intro.md").read_text()
    app = create_app(workspace)

    with TestClient(app) as client:
        response = client.post("/api/plans/missing/sections/signals.intro/read")

    assert response.status_code == 404
    section_path = workspace.sources_sections / "signals" / "signals.intro.md"
    assert section_path.read_text() == source_before


@pytest.mark.parametrize("method", ["post", "put", "patch", "delete"])
def test_content_routes_are_read_only(method: str, tmp_path: Path) -> None:
    app = create_app(_workspace(tmp_path))
    with TestClient(app) as client:
        response = getattr(client, method)("/api/documents/signals/sections/signals.intro")
    assert response.status_code == 405
