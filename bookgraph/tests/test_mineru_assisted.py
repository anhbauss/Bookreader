from __future__ import annotations

import json
from pathlib import Path

from pypdf import PdfWriter
import pytest

from bookgraph.mineru_assisted import (
    MinerUAssistedError,
    build_reading_workspace,
    organize_mineru_downloads,
    prepare_mineru_workspace,
)


def _pdf(path: Path, pages: int) -> None:
    writer = PdfWriter()
    for _ in range(pages):
        writer.add_blank_page(width=100, height=100)
    with path.open("wb") as output:
        writer.write(output)


def test_preparation_copies_source_and_splits_uploads(tmp_path: Path) -> None:
    library = tmp_path / "library"
    library.mkdir()
    source = tmp_path / "Signals.pdf"
    _pdf(source, 201)

    prepared = prepare_mineru_workspace(library, source, "Signals", max_pages=200)

    assert prepared.doc_id == "signals"
    assert prepared.source_pdf.read_bytes() == source.read_bytes()
    assert [batch.filename for batch in prepared.batches] == [
        "signals.batch-001.pages-001-200.pdf",
        "signals.batch-002.pages-201-201.pdf",
    ]
    manifest = json.loads(prepared.manifest_path.read_text())
    assert manifest["page_count"] == 201
    assert prepared.downloads_dir.is_dir()
    assert prepared.normalized_dir.is_dir()


def test_organize_preserves_downloads_and_copies_each_batch(tmp_path: Path) -> None:
    library = tmp_path / "library"
    library.mkdir()
    source = tmp_path / "Signals.pdf"
    _pdf(source, 2)
    prepared = prepare_mineru_workspace(library, source, "Signals", max_pages=1)
    for batch in prepared.batches:
        (prepared.downloads_dir / f"MinerU_signals.{batch.batch_id}__20261120163900.json").write_text(batch.batch_id)
        (prepared.downloads_dir / f"MinerU_markdown_signals.{batch.batch_id}_123.md").write_text(batch.batch_id)
        (prepared.downloads_dir / f"MinerU_latex_signals.{batch.batch_id}_123.zip").write_bytes(b"zip")

    organized = organize_mineru_downloads(prepared.manifest_path.parents[1])

    assert organized == ["batch-001", "batch-002"]
    assert (prepared.downloads_dir / "MinerU_signals.batch-001__20261120163900.json").read_text() == "batch-001"
    assert (prepared.normalized_dir / "batch-002" / "MinerU_markdown_signals.batch-002_123.md").read_text() == "batch-002"


def test_build_merges_json_page_offsets_and_creates_sections(tmp_path: Path) -> None:
    library = tmp_path / "library"
    library.mkdir()
    source = tmp_path / "Signals.pdf"
    _pdf(source, 2)
    prepared = prepare_mineru_workspace(library, source, "Signals", max_pages=1)
    for index, batch in enumerate(prepared.batches):
        payload = {"pdf_info": [{"page_idx": 0, "para_blocks": [{"type": "title", "content": f"Chapter {index + 1}"}, {"type": "text", "content": "Read me."}]}]}
        (prepared.downloads_dir / f"MinerU_signals.{batch.batch_id}__20261120163900.json").write_text(json.dumps(payload))
    organize_mineru_downloads(prepared.manifest_path.parents[1])

    doc_id, section_count = build_reading_workspace(prepared.manifest_path.parents[1])

    assert doc_id == "signals"
    assert section_count == 2
    document = json.loads((prepared.manifest_path.parents[1] / "sources" / "parsed" / "signals" / "document.json").read_text())
    assert [block["page_idx"] for block in document["blocks"]] == [0, 0, 1, 1]
    assert (prepared.manifest_path.parents[1] / "sources" / "sections" / "signals" / "sections.jsonl").is_file()


def test_organize_rejects_missing_batch(tmp_path: Path) -> None:
    library = tmp_path / "library"
    library.mkdir()
    source = tmp_path / "Signals.pdf"
    _pdf(source, 2)
    prepared = prepare_mineru_workspace(library, source, "Signals", max_pages=1)
    (prepared.downloads_dir / "mineru-batch-001").mkdir()

    with pytest.raises(MinerUAssistedError, match="batch-002"):
        organize_mineru_downloads(prepared.manifest_path.parents[1])
