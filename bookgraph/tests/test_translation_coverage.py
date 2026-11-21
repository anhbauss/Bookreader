import json
from pathlib import Path

from bookgraph.models import Section
from bookgraph.sections import write_sections
from bookgraph.translation_coverage import (
    get_translation_coverage,
    request_next_translation,
    request_translation_coverage,
    retry_translation_section,
)
from bookgraph.workspace import WorkspacePaths

DOC = "signals"
LANG = "vi"


def _workspace(tmp_path: Path) -> WorkspacePaths:
    workspace = WorkspacePaths(tmp_path / "workspace")
    for directory in workspace.directories():
        directory.mkdir(parents=True, exist_ok=True)
    sections = [
        Section(
            id=f"signals.{index}",
            doc_id=DOC,
            title=f"Section {index}",
            level=2,
            heading_path=[f"Section {index}"],
            text=f"Content {index}",
        )
        for index in range(20)
    ]
    write_sections(sections, workspace.sources_sections / DOC)
    (workspace.sources_parsed / DOC).mkdir(parents=True)
    (workspace.sources_parsed / DOC / "document.json").write_text(
        json.dumps({"doc_id": DOC, "title": "Signals", "blocks": []})
    )
    return workspace


def test_requested_percent_creates_a_reading_order_prefix(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)

    view = request_translation_coverage(workspace, DOC, LANG, 10)

    assert view.target_sections == 2
    record = json.loads((workspace.translation_coverage_root / "signals.vi.json").read_text())
    assert record["target_section_ids"] == ["signals.0", "signals.1"]
    assert view.status == "queued"


def test_coverage_does_not_shrink_when_a_smaller_percent_is_chosen(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    request_translation_coverage(workspace, DOC, LANG, 25)

    view = request_translation_coverage(workspace, DOC, LANG, 5)

    assert view.target_sections == 5
    assert view.requested_percent == 25


def test_next_extends_only_the_immediate_section_after_current(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    request_translation_coverage(workspace, DOC, LANG, 5)

    view = request_next_translation(workspace, DOC, LANG, "signals.0")

    assert view.target_sections == 2
    record = json.loads((workspace.translation_coverage_root / "signals.vi.json").read_text())
    assert record["target_section_ids"] == ["signals.0", "signals.1"]


def test_retry_accepts_manifest_section_ids_containing_dots(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)

    view = retry_translation_section(workspace, DOC, LANG, "signals.0")

    assert view.target_sections == 1
    record = json.loads((workspace.translation_coverage_root / "signals.vi.json").read_text())
    assert record["target_section_ids"] == ["signals.0"]


def test_missing_coverage_is_reported_without_creating_state(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)

    view = get_translation_coverage(workspace, DOC, LANG)

    assert view.status == "missing"
    assert view.target_sections == 0
    # Workspace initialization creates the directory; a read-only coverage lookup
    # must not create the document/language state record inside it.
    assert not (workspace.translation_coverage_root / "signals.vi.json").exists()


def test_chunked_worker_resumes_and_only_publishes_a_complete_section(tmp_path: Path) -> None:
    from unittest.mock import patch

    from bookgraph.mcp.errors import ReadingServiceError
    from bookgraph.mcp.translation_tools import get_section_translation
    from bookgraph.translation_coverage import run_requested_translations

    workspace = _workspace(tmp_path)
    source = "\n\n".join(f"Paragraph {i}. " * 100 for i in range(12))
    item = Section(
        id="signals.0", doc_id=DOC, title="Title", level=2, heading_path=["Title"], text=source
    )
    write_sections([item], workspace.sources_sections / DOC)

    class Provider:
        def __init__(self, fail: bool = False) -> None:
            self.calls: list[str] = []
            self.fail = fail

        def translate_section(self, source: str, *, target_language: str) -> str:
            self.calls.append(source)
            if self.fail and len(self.calls) == 2:
                raise ReadingServiceError("Request timed out.")
            return source

        def translate_title(self, source: str, *, target_language: str) -> str:
            return source

    retry_translation_section(workspace, DOC, LANG, item.id)
    failing = Provider(fail=True)
    with patch("bookgraph.translation_coverage.configured_provider", return_value=failing):
        run_requested_translations(workspace, DOC, LANG)
    assert get_section_translation(workspace, DOC, item.id, LANG).status == "missing"
    assert "part 2/" in get_translation_coverage(workspace, DOC, LANG).failures[item.id]
    resumed = Provider()
    retry_translation_section(workspace, DOC, LANG, item.id)
    with patch("bookgraph.translation_coverage.configured_provider", return_value=resumed):
        run_requested_translations(workspace, DOC, LANG)
    assert failing.calls[0] not in resumed.calls
    result = get_section_translation(workspace, DOC, item.id, LANG)
    assert result.status == "fresh"
    assert result.content and source in result.content
    assert get_translation_coverage(workspace, DOC, LANG).status == "ready"
    # An explicit retranslation must not silently reuse the previous translation.
    force = Provider()
    retry_translation_section(workspace, DOC, LANG, item.id, force=True)
    with patch("bookgraph.translation_coverage.configured_provider", return_value=force):
        run_requested_translations(workspace, DOC, LANG)
    assert force.calls


def test_worker_does_not_publish_translation_after_source_changes(tmp_path: Path) -> None:
    from unittest.mock import patch

    from bookgraph.mcp.translation_tools import get_section_translation
    from bookgraph.translation_coverage import run_requested_translations

    workspace = _workspace(tmp_path)
    item = Section(
        id="signals.0",
        doc_id=DOC,
        title="Title",
        level=2,
        heading_path=["Title"],
        text="Source before repair.",
    )
    write_sections([item], workspace.sources_sections / DOC)

    class Provider:
        def translate_section(self, source: str, *, target_language: str) -> str:
            updated = item.model_copy(update={"text": "Source after repair."})
            write_sections([updated], workspace.sources_sections / DOC)
            return source

        def translate_title(self, source: str, *, target_language: str) -> str:
            return source

    retry_translation_section(workspace, DOC, LANG, item.id)
    with patch("bookgraph.translation_coverage.configured_provider", return_value=Provider()):
        run_requested_translations(workspace, DOC, LANG)
    assert get_section_translation(workspace, DOC, item.id, LANG).status == "missing"
    assert "changed since" in get_translation_coverage(workspace, DOC, LANG).failures[item.id]
