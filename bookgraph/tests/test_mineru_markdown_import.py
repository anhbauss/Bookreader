from __future__ import annotations

import json
import zipfile
from pathlib import Path

import pytest

from bookgraph.mineru_assisted import MinerUAssistedError, build_reading_workspace
from bookgraph.sections import read_sections


def _workspace(root: Path, *, second_markdown: bool = True) -> Path:
    batches = []
    for number in (1, 2):
        batch = f"batch-{number:03d}"
        folder = root / "mineru" / "normalized" / batch
        folder.mkdir(parents=True)
        batches.append({"batch_id": batch, "start_page": number, "end_page": number})
        payload = {
            "pdf_info": [
                {
                    "page_idx": 0,
                    "para_blocks": [
                        {"type": "title", "content": "Chapter"},
                        {"type": "text", "content": f"Paragraph {number}."},
                        {
                            "type": "image",
                            "lines": [
                                {
                                    "spans": [
                                        {
                                            "type": "image",
                                            "image_path": "https://example.com/same.jpg",
                                        }
                                    ]
                                }
                            ],
                        },
                    ],
                }
            ]
        }
        (folder / "result.json").write_text(json.dumps(payload))
        if number == 1 or second_markdown:
            (folder / "result.md").write_text(
                f"# Chapter\n\nParagraph {number}.\n\n"
                "![Figure](https://example.com/same.jpg)\n\n"
                '<table><tr><td colspan="2"><eq>x^2</eq></td></tr></table>\n\n'
                "$$\n\\frac{1}{2}\n$$\n"
            )
        with zipfile.ZipFile(folder / "MinerU_latex.zip", "w") as archive:
            archive.writestr("export/images/same.jpg", f"image-{number}")
            archive.writestr("export/main.tex", "not reader content")
    (root / "mineru" / "manifest.json").write_text(
        json.dumps(
            {
                "doc_id": "book",
                "title": "Book",
                "batches": batches,
            }
        )
    )
    return root


def test_markdown_source_preserves_tables_math_images_and_json_provenance(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    assert build_reading_workspace(workspace) == ("book", 2)
    sections = read_sections(workspace / "sources/sections/book/sections.jsonl")
    assert [section.id for section in sections] == ["book.chapter", "book.chapter-2"]
    for index, section in enumerate(sections, 1):
        assert section.page_start == index - 1
        assert section.block_ids == [f"p{index - 1}.b{i}" for i in range(3)]
        assert f"Paragraph {index}." in section.text
        assert '<td colspan="2"><eq>x^2</eq>' in section.text
        assert "$$\n\\frac{1}{2}\n$$" in section.text
        reference = f"images/batch-{index:03d}--same.jpg"
        assert f"![Figure]({reference})" in section.text
        assert (workspace / "sources/parsed/book" / reference).read_text() == f"image-{index}"
    document = json.loads((workspace / "sources/parsed/book/document.json").read_text())
    assert document["blocks"][2]["asset_path"] == "images/batch-001--same.jpg"
    assert document["blocks"][2]["metadata"]["original_asset_reference"].startswith("https://")
    report = json.loads((workspace / "mineru/normalized/build-report.json").read_text())
    assert report["reading_source"] == "mineru-markdown"
    assert report["staged_images"] == 2


def test_rebuild_preserves_ids_and_backs_up_previous_sections(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    build_reading_workspace(workspace)
    manifest = workspace / "sources/sections/book/sections.jsonl"
    before = manifest.read_bytes()
    (workspace / "mineru/normalized/batch-001/result.md").write_text("# Chapter\n\nNew content.\n")
    build_reading_workspace(workspace)
    sections = read_sections(manifest)
    assert [section.id for section in sections] == ["book.chapter", "book.chapter-2"]
    assert sections[0].text == "New content."
    backups = list((workspace / "runs/import-backups").glob("*/sections/sections.jsonl"))
    assert any(path.read_bytes() == before for path in backups)


def test_partial_markdown_fails_before_writing(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path, second_markdown=False)
    with pytest.raises(MinerUAssistedError, match="Markdown.*batch-002"):
        build_reading_workspace(workspace)
    assert not (workspace / "sources/parsed/book/document.json").exists()


def test_unmatched_heading_fails_instead_of_losing_content(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    (workspace / "mineru/normalized/batch-001/result.md").write_text("# Other\n\nKeep me.\n")
    with pytest.raises(MinerUAssistedError, match="align"):
        build_reading_workspace(workspace)
    assert not (workspace / "sources/sections/book/sections.jsonl").exists()


def test_zip_traversal_is_rejected(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    with zipfile.ZipFile(
        workspace / "mineru/normalized/batch-001/MinerU_latex.zip", "a"
    ) as archive:
        archive.writestr("../../outside.jpg", "bad")
    with pytest.raises(MinerUAssistedError, match="unsafe"):
        build_reading_workspace(workspace)
    assert not (workspace / "sources/parsed/book/document.json").exists()


def test_empty_heading_uses_body_anchor_without_duplication(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    path = workspace / "mineru/normalized/batch-001/result.json"
    payload = json.loads(path.read_text())
    payload["pdf_info"][0]["para_blocks"] += [
        {"type": "title", "content": ""},
        {"type": "text", "content": "Index entry here."},
    ]
    path.write_text(json.dumps(payload))
    markdown = workspace / "mineru/normalized/batch-001/result.md"
    markdown.write_text(markdown.read_text() + "\nIndex entry here.\n")
    build_reading_workspace(workspace)
    sections = read_sections(workspace / "sources/sections/book/sections.jsonl")
    assert len(sections) == 3
    assert sections[1].text == "Index entry here."
    assert sum(s.text.count("Index entry here.") for s in sections) == 1


def test_missing_images_fail_before_publishing(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    (workspace / "mineru/normalized/batch-001/result.md").write_text(
        "# Chapter\n\n![Missing](images/missing.jpg)\n"
    )
    with pytest.raises(MinerUAssistedError, match="LaTeX ZIP"):
        build_reading_workspace(workspace)
    assert not (workspace / "sources/sections/book/sections.jsonl").exists()


def test_image_examples_inside_code_are_preserved(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    markdown = workspace / "mineru/normalized/batch-001/result.md"
    examples = '\n`![Example](images/not-an-asset.jpg)`\n\n~~~html\n<img src="missing.jpg">\n~~~\n'
    markdown.write_text(markdown.read_text() + examples)
    build_reading_workspace(workspace)
    sections = read_sections(workspace / "sources/sections/book/sections.jsonl")
    assert examples.strip() in sections[0].text


def test_failed_publish_rolls_back_previous_generated_data(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    import os

    workspace = _workspace(tmp_path)
    build_reading_workspace(workspace)
    manifest = workspace / "sources/sections/book/sections.jsonl"
    document = workspace / "sources/parsed/book/document.json"
    before = manifest.read_bytes(), document.read_bytes()
    replace = os.replace

    def fail_install(source: Path, destination: Path) -> None:
        if source.name == "sections" and source.parent.name.startswith(".mineru-build-"):
            raise OSError("simulated installation error")
        replace(source, destination)

    monkeypatch.setattr(os, "replace", fail_install)
    with pytest.raises(OSError, match="simulated"):
        build_reading_workspace(workspace)
    assert (manifest.read_bytes(), document.read_bytes()) == before
