from __future__ import annotations

import json
from pathlib import Path

from bookgraph.models import Section
from bookgraph.section_structure import group_reading_sections


def _sections(titles: list[str], texts: list[str] | None = None) -> list[Section]:
    return [
        Section(
            id=f"book.s{i}",
            doc_id="book",
            title=title,
            level=1,
            heading_path=[title],
            text=texts[i] if texts else f"Body {i}.",
            page_start=i,
            page_end=i,
            block_ids=[f"b{i}"],
        )
        for i, title in enumerate(titles)
    ]


def test_numbered_subsections_are_grouped_under_major_sections() -> None:
    source = _sections(
        [
            "Neural Networks",
            "1.1 Taxonomy",
            "1.1.1 Supervised",
            "1.1.1.1 Models",
            "1.2 Regression",
            "1.2.1 Objective",
            "References",
        ]
    )
    grouped = group_reading_sections(source)
    assert [s.id for s in grouped] == ["book.s0", "book.s1", "book.s4", "book.s6"]
    assert [s.level for s in grouped] == [1, 2, 2, 2]
    assert grouped[1].heading_path == ["Neural Networks", "1.1 Taxonomy"]
    assert "### 1.1.1 Supervised" in grouped[1].text
    assert "#### 1.1.1.1 Models" in grouped[1].text
    assert grouped[1].block_ids == ["b1", "b2", "b3"]
    assert json.loads(str(grouped[1].metadata["merged_section_ids"])) == [
        "book.s1",
        "book.s2",
        "book.s3",
    ]


def test_contributor_names_connectors_and_index_letters_are_not_sections() -> None:
    source = _sections(
        [
            "Contents",
            "Section II Design 81",
            "About the Editors",
            "List of Contributors",
            "Alice",
            "and",
            "List of Contributors",
            "Bob",
            "Preface",
            "Neural Networks",
            "1.1 Taxonomy",
            "Index",
            "a",
            "b",
            "",
        ]
    )
    grouped = group_reading_sections(source)
    assert [s.title for s in grouped] == [
        "Contents",
        "About the Editors",
        "List of Contributors",
        "Preface",
        "Neural Networks",
        "1.1 Taxonomy",
        "Index",
    ]
    assert "Alice" in grouped[2].text and "Bob" in grouped[2].text
    assert "Body 14." in grouped[-1].text
    assert "Section II Design 81" in grouped[0].text


def test_symbols_examples_and_bullets_do_not_become_chapters() -> None:
    source = _sections(
        [
            "First Chapter",
            "1.1 Intro",
            "References",
            "Second Chapter",
            "Symbols and Acronyms",
            "2.1 Learning",
            "2.1.1 Methods",
            "● One method",
            "Example 2.1 A model",
            "2.2 Evaluation",
        ]
    )
    grouped = group_reading_sections(source)
    assert [s.level for s in grouped] == [1, 2, 2, 1, 2, 2, 2]
    assert grouped[-1].heading_path == ["Second Chapter", "2.2 Evaluation"]
    assert "● One method" in grouped[-2].text
    assert "Example 2.1 A model" in grouped[-2].text


def test_content_images_tables_and_formulas_are_preserved() -> None:
    body = "![Figure](images/test.jpg)\n\n<table><tr><td>x</td></tr></table>\n\n$$x=1$$"
    source = _sections(["Chapter", "1.1 Topic", "1.1.1 Detail"], ["Intro", "", body])
    grouped = group_reading_sections(source)
    assert body in grouped[1].text
    assert grouped[1].text.count("$$x=1$$") == 1
    assert grouped[1].page_start == 1 and grouped[1].page_end == 2
    assert grouped[0].next_id == grouped[1].id
    assert grouped[1].prev_id == grouped[0].id
    assert grouped[1].next_id is None


def test_books_without_numbered_structure_are_left_unchanged() -> None:
    source = _sections(["Chapter One", "A Heading", "Chapter Two"])
    assert group_reading_sections(source) == source


def test_grouping_is_idempotent_and_retains_original_aliases() -> None:
    grouped = group_reading_sections(_sections(["Chapter", "1.1 Topic", "1.1.1 Detail"]))
    assert group_reading_sections(grouped) == grouped


def test_state_migration_keeps_completion_only_for_fully_read_groups(tmp_path: Path) -> None:
    from bookgraph.section_structure import stage_section_state
    from bookgraph.workspace import WorkspacePaths

    original = _sections(["Chapter", "1.1 Topic", "1.1.1 Detail", "1.2 Other"])
    grouped = group_reading_sections(original)
    plans = tmp_path / "reading_plans"
    plans.mkdir()
    plan = {
        "plan_id": "main",
        "doc_id": "book",
        "daily_sections": 1,
        "section_ids": [s.id for s in original],
        "completed": ["book.s0", "book.s1"],
    }
    (plans / "main.json").write_text(json.dumps(plan))
    outputs = stage_section_state(WorkspacePaths(tmp_path), grouped, tmp_path / "staging")
    updated = json.loads((outputs[0][0] / "main.json").read_text())
    assert updated["section_ids"] == ["book.s0", "book.s1", "book.s3"]
    assert updated["completed"] == ["book.s0"]
    assert json.loads((plans / "main.json").read_text()) == plan


def test_regrouping_existing_workspace_preserves_accepted_repairs_and_translation_files(
    tmp_path: Path,
) -> None:
    from bookgraph.mineru_assisted import regroup_reading_workspace
    from bookgraph.sections import read_sections, write_sections

    (tmp_path / "mineru").mkdir()
    (tmp_path / "mineru/manifest.json").write_text(json.dumps({"doc_id": "book"}))
    original = _sections(
        ["Chapter", "1.1 Topic", "1.1.1 Detail"], ["Intro", "", "Accepted AI repair: $$x=2$$"]
    )
    write_sections(original, tmp_path / "sources/sections/book")
    translations = tmp_path / "translations/vi/book"
    translations.mkdir(parents=True)
    (translations / "book.s2.md").write_text("Existing translated fragment.")
    assert regroup_reading_workspace(tmp_path) == ("book", 2)
    grouped = read_sections(tmp_path / "sources/sections/book/sections.jsonl")
    assert "Accepted AI repair: $$x=2$$" in grouped[1].text
    assert (translations / "book.s2.md").read_text() == "Existing translated fragment."
    report = json.loads((tmp_path / "runs/section-structure/book.json").read_text())
    backup = read_sections(Path(report["backup"]) / "sections/sections.jsonl")
    assert backup == original
    assert regroup_reading_workspace(tmp_path) == ("book", 2)
