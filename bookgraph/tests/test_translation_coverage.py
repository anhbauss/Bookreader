import json
from pathlib import Path

from bookgraph.models import Section
from bookgraph.sections import write_sections
from bookgraph.translation_coverage import (
    get_translation_coverage,
    request_next_translation,
    request_translation_coverage,
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


def test_missing_coverage_is_reported_without_creating_state(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)

    view = get_translation_coverage(workspace, DOC, LANG)

    assert view.status == "missing"
    assert view.target_sections == 0
    # Workspace initialization creates the directory; a read-only coverage lookup
    # must not create the document/language state record inside it.
    assert not (workspace.translation_coverage_root / "signals.vi.json").exists()
