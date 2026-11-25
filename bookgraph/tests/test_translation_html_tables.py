"""MinerU can render a table as HTML while also staging its crop as an image."""

from pathlib import Path

import pytest

from bookgraph.models import CanonicalBlock, Section
from bookgraph.translation_assets import check_translation_assets

TABLE = "<table><tr><td>0.4</td><td>1.7</td></tr></table>"
OTHER = "<table><tr><td>-1</td><td>0</td><td>1</td></tr></table>"


def _missing(
    tmp_path: Path, source: str, body: str, *, count: int = 1,
    reading_source: str = "mineru-markdown", kind: str = "table",
) -> list[str]:
    parsed = tmp_path / "parsed"
    parsed.mkdir(exist_ok=True)
    blocks = {}
    for index in range(count):
        path = parsed / f"table{index}.png"
        path.write_bytes(b"image")
        block = CanonicalBlock(
            id=f"b{index}", type=kind, text="", asset_path=path.name, order=index
        )
        blocks[block.id] = block
    section = Section(
        id="book.section", doc_id="book", title="Title", level=2,
        heading_path=["Title"], text=source, block_ids=list(blocks),
        metadata={"reading_source": reading_source},
    )
    result = check_translation_assets(
        section, body, blocks=blocks, root=tmp_path, parsed_dir=parsed, body_dir=tmp_path
    )
    return [asset.block_id for asset in result.missing]


def test_unchanged_html_tables_carry_mineru_table_assets(tmp_path: Path) -> None:
    source = f"English\n\n{TABLE}\n\n{OTHER}"
    body = f"Tiếng Việt\n\n{TABLE}\n\n{OTHER}"
    assert _missing(tmp_path, source, body, count=2) == []


@pytest.mark.parametrize("body", ["Missing table", OTHER, f"```html\n{TABLE}\n```"])
def test_missing_changed_or_code_example_table_is_not_accepted(tmp_path: Path, body: str) -> None:
    assert _missing(tmp_path, TABLE, body) == ["b0"]


def test_duplicate_table_cannot_cover_a_different_or_repeated_table(tmp_path: Path) -> None:
    assert _missing(tmp_path, f"{TABLE}\n\n{OTHER}", f"{TABLE}\n\n{TABLE}", count=2) == ["b1"]
    assert _missing(tmp_path, f"{TABLE}\n\n{TABLE}", TABLE, count=2) == ["b1"]


def test_ambiguous_source_mapping_still_requires_images(tmp_path: Path) -> None:
    assert _missing(tmp_path, TABLE, TABLE, count=2) == ["b0", "b1"]


def test_html_does_not_replace_figures_or_unrelated_sources(tmp_path: Path) -> None:
    assert _missing(tmp_path, TABLE, TABLE, kind="image") == ["b0"]
    assert _missing(tmp_path, TABLE, TABLE, reading_source="markdown") == ["b0"]


def test_table_already_linked_in_source_still_requires_its_image(tmp_path: Path) -> None:
    assert _missing(tmp_path, f"![table](table0.png)\n\n{TABLE}", TABLE) == ["b0"]


def test_mixed_image_and_html_tables_keep_their_own_representations(tmp_path: Path) -> None:
    source = f"![table](table0.png)\n\n{TABLE}"
    assert _missing(tmp_path, source, source, count=2) == []


def test_source_table_inside_code_does_not_prove_correspondence(tmp_path: Path) -> None:
    assert _missing(tmp_path, f"```html\n{TABLE}\n```", TABLE) == ["b0"]


def test_translation_store_and_reader_accept_preserved_html_table(tmp_path: Path) -> None:
    from bookgraph.documents import write_document
    from bookgraph.mcp.translation_tools import get_section_translation, write_section_translation
    from bookgraph.models import Document
    from bookgraph.sections import write_sections
    from bookgraph.workspace import WorkspacePaths

    workspace = WorkspacePaths(tmp_path)
    block = CanonicalBlock(
        id="b0", type="table", text="", asset_path="table.png", order=0
    )
    section = Section(
        id="book.section", doc_id="book", title="Title", level=2,
        heading_path=["Title"], text=f"English\n\n{TABLE}", block_ids=[block.id],
        metadata={"reading_source": "mineru-markdown"},
    )
    write_document(Document(doc_id="book", title="Book", blocks=[block]),
                   workspace.sources_parsed / "book")
    (workspace.sources_parsed / "book" / "table.png").write_bytes(b"image")
    write_sections([section], workspace.sources_sections / "book")
    write_section_translation(
        workspace, "book", section.id, "vi", content=f"Tiếng Việt\n\n{TABLE}",
        includes_assets=True,
    )
    view = get_section_translation(workspace, "book", section.id, "vi")
    assert view.status == "fresh"
    assert view.includes_assets is True
    assert view.missing_assets == []
