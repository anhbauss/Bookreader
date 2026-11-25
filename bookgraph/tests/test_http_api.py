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


def test_reading_position_survives_restart_and_can_be_moved_or_removed(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    url = "/api/documents/signals/reading-position"
    with TestClient(create_app(workspace)) as client:
        assert client.get(url).json() == {"doc_id": "signals", "section_id": None}
        saved = client.put(url, json={"section_id": "signals.sampling"})
        assert saved.status_code == 200
        assert saved.json()["section_id"] == "signals.sampling"
    with TestClient(create_app(workspace)) as client:
        assert client.get(url).json()["section_id"] == "signals.sampling"
        assert client.put(url, json={"section_id": "signals.intro"}).status_code == 200
        assert client.get(url).json()["section_id"] == "signals.intro"
        assert client.delete(url).json()["section_id"] is None
        assert client.delete(url).status_code == 200
        assert client.get(url).json()["section_id"] is None


@pytest.mark.parametrize("payload", [{}, [], {"section_id": 12}, {"section_id": "../secret"}])
def test_reading_position_rejects_invalid_input(tmp_path: Path, payload: object) -> None:
    with TestClient(create_app(_workspace(tmp_path))) as client:
        result = client.put("/api/documents/signals/reading-position", json=payload)
        assert result.status_code in (400, 422)


def test_reading_position_rejects_unknown_section_without_overwriting(tmp_path: Path) -> None:
    with TestClient(create_app(_workspace(tmp_path))) as client:
        url = "/api/documents/signals/reading-position"
        client.put(url, json={"section_id": "signals.intro"})
        assert client.put(url, json={"section_id": "other.intro"}).status_code == 404
        assert client.get(url).json()["section_id"] == "signals.intro"


def test_old_section_urls_resolve_to_their_group_after_resegmentation(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    section = Section(id="signals.sampling", doc_id="signals", title="1.1 Sampling", level=2,
                      heading_path=["Signals", "1.1 Sampling"], text="Full reading unit.",
                      metadata={"merged_section_ids": json.dumps(["signals.sampling", "signals.detail"])})
    write_sections([section], workspace.sources_sections / "signals")
    with TestClient(create_app(workspace)) as client:
        response = client.get("/api/documents/signals/sections/signals.detail")
        unknown = client.get("/api/documents/signals/sections/signals.unknown")
    assert response.status_code == 200
    assert response.json()["id"] == "signals.sampling"
    assert response.json()["redirected_from"] == "signals.detail"
    assert response.json()["text"] == "Full reading unit."
    assert unknown.status_code == 404


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


def test_desktop_api_requires_its_runtime_bearer_token(tmp_path: Path) -> None:
    app = create_app(
        _workspace(tmp_path),
        bearer_token="desktop-runtime-token",
        allowed_origins=("tauri://localhost",),
    )

    with TestClient(app) as client:
        rejected = client.get("/api/documents")
        accepted = client.get(
            "/api/documents",
            headers={
                "Authorization": "Bearer desktop-runtime-token",
                "Origin": "tauri://localhost",
            },
        )

    assert rejected.status_code == 401
    assert rejected.json() == {"error": "unauthorized", "message": "Authentication is required."}
    assert accepted.status_code == 200
    assert accepted.headers["access-control-allow-origin"] == "tauri://localhost"


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


def test_formula_repair_endpoint_rejects_invalid_input_without_provider_call(tmp_path: Path) -> None:
    app = create_app(_workspace(tmp_path))
    with TestClient(app) as client:
        response = client.post(
            "/api/documents/signals/sections/signals.intro/formula-repairs",
            json={"formula": 12},
        )

    assert response.status_code == 400
    assert response.json()["error"] == "service_error"


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


def test_document_progress_creates_a_default_plan_and_resumes_it(tmp_path: Path) -> None:
    from bookgraph.reading_plans import read_reading_plan

    workspace = _workspace(tmp_path)
    workspace.config.write_text("[reading_plan]\ndaily_sections = 2\n")
    with TestClient(create_app(workspace)) as client:
        progress = client.get("/api/documents/signals/progress")
        assert progress.status_code == 200
        assert progress.json()["completed"] == 0
        assert progress.json()["total"] == 2
        assert client.post("/api/plans/signals/sections/signals.intro/read").status_code == 200
        resumed = client.get("/api/documents/signals/progress")
        assert resumed.json()["completed"] == 1
    plan = read_reading_plan(workspace.reading_plans_root / "signals.json")
    assert plan.daily_sections == 2
    assert plan.completed == ["signals.intro"]


def test_document_progress_keeps_existing_plan_unchanged(tmp_path: Path) -> None:
    from bookgraph.mcp import service

    workspace = _workspace(tmp_path)
    service.create_plan(workspace, "signals", daily_sections=3)
    service.mark_read(workspace, "signals", "signals.sampling")
    plan_path = workspace.reading_plans_root / "signals.json"
    before = plan_path.read_bytes()
    with TestClient(create_app(workspace)) as client:
        assert client.get("/api/documents/signals/progress").json()["completed"] == 1
    assert plan_path.read_bytes() == before


def test_document_progress_does_not_create_a_plan_for_a_missing_book(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    with TestClient(create_app(workspace)) as client:
        assert client.get("/api/documents/missing/progress").status_code == 404
    assert not (workspace.reading_plans_root / "missing.json").exists()


def test_simultaneous_first_opens_create_one_resumable_default_plan(tmp_path: Path) -> None:
    from concurrent.futures import ThreadPoolExecutor

    from bookgraph.mcp import service

    workspace = _workspace(tmp_path)
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(lambda _: service.get_document_progress(workspace, "signals"), range(8)))
    assert all(result.total == 2 for result in results)
    service.mark_read(workspace, "signals", "signals.intro")
    assert service.get_document_progress(workspace, "signals").completed == 1


def test_document_progress_does_not_replace_a_damaged_existing_plan(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    path = workspace.reading_plans_root / "signals.json"
    path.write_text("damaged plan")
    with TestClient(create_app(workspace)) as client:
        assert client.get("/api/documents/signals/progress").status_code == 404
    assert path.read_text() == "damaged plan"
