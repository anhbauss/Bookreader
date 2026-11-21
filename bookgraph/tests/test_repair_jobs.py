from __future__ import annotations

import threading
import time
from pathlib import Path
from unittest.mock import MagicMock, patch

from starlette.testclient import TestClient

from bookgraph.http_api import create_app
from bookgraph.models import Section
from bookgraph.sections import write_sections
from bookgraph.workspace import WorkspacePaths


def _workspace(tmp_path: Path) -> WorkspacePaths:
    workspace = WorkspacePaths(tmp_path)
    write_sections(
        [
            Section(
                id="book.section",
                doc_id="book",
                title="1.2 Title",
                level=2,
                heading_path=["1.2 Title"],
                text="Original source.",
            )
        ],
        workspace.sources_sections / "book",
    )
    return workspace


BASE = "/api/documents/book/sections/book.section/repair-jobs"


def test_repair_http_stays_responsive_and_deduplicates_background_jobs(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    entered = threading.Event()
    release = threading.Event()
    provider = MagicMock()

    def repair(content: str, *, context: str) -> tuple[str, str]:
        entered.set()
        assert release.wait(3)
        return "1.2 Title", "Fixed source."

    provider.repair_markdown.side_effect = repair
    payload = {"content": "Original source.", "context": "", "kind": "markdown"}
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        with TestClient(create_app(workspace)) as client:
            try:
                queued = client.post(BASE, json=payload)
                assert queued.status_code == 202
                job_id = queued.json()["job_id"]
                assert entered.wait(2)
                # The worker is still blocked, but normal reader requests and polling work.
                assert client.get("/api/documents/book/outline").status_code == 200
                running = client.get(f"{BASE}/{job_id}").json()
                assert running["status"] == "running"
                assert running["current_part"] == running["total_parts"] == 1
                assert "content" not in running and "context" not in running
                assert client.post(BASE, json=payload).json()["job_id"] == job_id
                assert provider.repair_markdown.call_count == 1
            finally:
                release.set()
            deadline = time.monotonic() + 3
            while time.monotonic() < deadline:
                done = client.get(f"{BASE}/{job_id}").json()
                if done["status"] != "running":
                    break
                time.sleep(0.01)
            assert done["status"] == "ready"
            assert done["result"]["repaired_content"] == "Fixed source."
            assert done["result"]["accepted_at"] is None
            # Rejoining a completed request does not charge another provider call.
            assert client.post(BASE, json=payload).json()["status"] == "ready"
            assert provider.repair_markdown.call_count == 1
    source = workspace.sources_sections / "book" / "book.section.md"
    assert "Original source." in source.read_text() and "Fixed source." not in source.read_text()


def test_long_background_repair_reports_progress_and_keeps_source_unchanged(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    provider = MagicMock()
    provider.repair_markdown.side_effect = lambda content, **kwargs: (
        "1.2 Title",
        content.replace("broken", "fixed"),
    )
    content = "\n\n".join(f"broken paragraph {i}. " * 50 for i in range(10))
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        with TestClient(create_app(workspace)) as client:
            job = client.post(
                BASE, json={"content": content, "context": content, "kind": "markdown"}
            )
            job_id = job.json()["job_id"]
            deadline = time.monotonic() + 3
            while time.monotonic() < deadline:
                done = client.get(f"{BASE}/{job_id}").json()
                if done["status"] in {"ready", "failed"}:
                    break
                time.sleep(0.01)
    assert done["status"] == "ready", done
    assert done["total_parts"] > 1
    assert done["result"]["repaired_content"] == content.replace("broken", "fixed")
    assert len(list(workspace.runs_root.rglob("part-*.json"))) == done["total_parts"]
    assert (
        "Original source." in (workspace.sources_sections / "book" / "book.section.md").read_text()
    )


def test_failed_repair_exposes_an_actionable_error(tmp_path: Path) -> None:
    from bookgraph.mcp.errors import ReadingServiceError

    workspace = _workspace(tmp_path)
    provider = MagicMock()
    provider.repair_formula.side_effect = ReadingServiceError("Provider timed out; retry.")
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        with TestClient(create_app(workspace)) as client:
            queued = client.post(BASE, json={"content": r"\frac{1{2}", "kind": "formula"})
            job_id = queued.json()["job_id"]
            deadline = time.monotonic() + 3
            while time.monotonic() < deadline:
                done = client.get(f"{BASE}/{job_id}").json()
                if done["status"] == "failed":
                    break
                time.sleep(0.01)
    assert done["status"] == "failed"
    assert done["result"] is None
    assert "timed out" in done["error"]


def test_interrupted_job_is_reported_and_can_resume(tmp_path: Path) -> None:
    import json

    from bookgraph.repair_jobs import get_repair_job, start_repair_job
    from bookgraph.translations import section_content_hash

    workspace = _workspace(tmp_path)
    provider = MagicMock()
    provider.repair_markdown.return_value = ("1.2 Title", "Fixed source.")
    # A persisted owner that no longer exists represents a server restart.
    from bookgraph.repair_jobs import _job_path, _RepairJob

    job_id = "a" * 64
    item = Section(
        id="book.section",
        doc_id="book",
        title="1.2 Title",
        level=2,
        heading_path=["1.2 Title"],
        text="Original source.",
    )
    path = _job_path(workspace, "book", item.id, job_id)
    path.parent.mkdir(parents=True)
    path.write_text(
        _RepairJob(
            job_id=job_id,
            status="running",
            doc_id="book",
            section_id=item.id,
            kind="markdown",
            content=item.text,
            context="",
            section_hash=section_content_hash(item),
            owner_pid=0,
            updated_at="before restart",
            current_part=2,
            total_parts=5,
        ).model_dump_json()
    )
    interrupted = get_repair_job(workspace, "book", item.id, job_id)
    assert interrupted.status == "failed"
    assert interrupted.error and "retry to resume" in interrupted.error
    assert json.loads(path.read_text())["status"] == "failed"
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        actual = start_repair_job(workspace, "book", item.id, item.text, "", "markdown")
        deadline = time.monotonic() + 3
        while time.monotonic() < deadline:
            done = get_repair_job(workspace, "book", item.id, actual.job_id)
            if done.status in {"ready", "failed"}:
                break
            time.sleep(0.01)
    assert done.status == "ready"
