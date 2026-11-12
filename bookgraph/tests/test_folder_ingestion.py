from __future__ import annotations

from pathlib import Path

import pytest
from typer.testing import CliRunner

from bookgraph.cli import app
from bookgraph.ingestion import IngestionError, ingest_markdown_folder


def _input_folder(tmp_path: Path) -> tuple[Path, Path]:
    source = tmp_path / "input"
    images = source / "signals_latex" / "images"
    images.mkdir(parents=True)
    return source, images


def test_ingestion_stages_local_images_and_rewrites_remote_links(tmp_path: Path) -> None:
    source, images = _input_folder(tmp_path)
    (source / "book.md").write_text(
        "# Signals\n\n![Diagram](https://cdn-mineru.example/path/figure-1.jpg)\n"
    )
    (images / "figure-1.jpg").write_bytes(b"jpeg-data")
    workspace = tmp_path / "workspace"

    result = ingest_markdown_folder(source, workspace, "signals")

    parsed = workspace / "sources" / "parsed" / "signals"
    assert result.source_markdown == parsed / "source.md"
    assert result.staged_images == ["figure-1.jpg"]
    assert result.rewritten_references == 1
    assert result.warnings == []
    assert (parsed / "images" / "figure-1.jpg").read_bytes() == b"jpeg-data"
    assert (parsed / "source.md").read_text() == "# Signals\n\n![Diagram](images/figure-1.jpg)\n"


def test_ingestion_merges_numbered_part_folders_and_namespaces_images(tmp_path: Path) -> None:
    book = tmp_path / "book"
    first = book / "part-2"
    second = book / "part-10"
    first_images = first / "first_latex" / "images"
    second_images = second / "second_latex" / "images"
    first_images.mkdir(parents=True)
    second_images.mkdir(parents=True)
    (first / "first.md").write_text(
        "# First part\n\n![First](https://cdn-mineru.example/assets/figure.jpg)\n"
    )
    (second / "second.md").write_text(
        "# Second part\n\n![Second](https://cdn-mineru.example/assets/figure.jpg)\n"
    )
    (first_images / "figure.jpg").write_bytes(b"first-image")
    (second_images / "figure.jpg").write_bytes(b"second-image")

    result = ingest_markdown_folder(book, tmp_path / "workspace", "combined-book")

    parsed = tmp_path / "workspace" / "sources" / "parsed" / "combined-book"
    assert result.source_parts == 2
    assert result.staged_images == ["part-001--figure.jpg", "part-002--figure.jpg"]
    assert result.rewritten_references == 2
    assert result.warnings == []
    assert result.source_markdown.read_text() == (
        "# First part\n\n![First](images/part-001--figure.jpg)\n\n"
        "# Second part\n\n![Second](images/part-002--figure.jpg)\n"
    )
    assert (parsed / "images" / "part-001--figure.jpg").read_bytes() == b"first-image"
    assert (parsed / "images" / "part-002--figure.jpg").read_bytes() == b"second-image"


def test_ingestion_stages_images_from_mineru_latex_export_directory(tmp_path: Path) -> None:
    source = tmp_path / "input"
    images = source / "MinerU_latex_Bishop-Book_123" / "images"
    images.mkdir(parents=True)
    (source / "book.md").write_text(
        "![Figure](https://cdn-mineru.example/path/figure-1.jpg)\n"
    )
    (images / "figure-1.jpg").write_bytes(b"jpeg-data")

    result = ingest_markdown_folder(source, tmp_path / "workspace", "bishop")

    assert result.staged_images == ["figure-1.jpg"]
    assert result.rewritten_references == 1
    assert result.warnings == []


def test_ingestion_warns_when_local_image_is_missing(tmp_path: Path) -> None:
    source, _ = _input_folder(tmp_path)
    original = "![Missing](https://cdn-mineru.example/path/missing.jpg)"
    (source / "book.md").write_text(original)
    (source / "fallback.docx").write_bytes(b"not-executed")

    result = ingest_markdown_folder(source, tmp_path / "workspace", "signals")

    assert result.staged_images == []
    assert result.rewritten_references == 0
    assert any("missing.jpg" in warning for warning in result.warnings)
    assert any("docx fallback is unavailable" in warning for warning in result.warnings)
    assert result.source_markdown.read_text() == original


def test_ingestion_rejects_traversal_shaped_reference_without_writing_outside_workspace(
    tmp_path: Path,
) -> None:
    source, images = _input_folder(tmp_path)
    original = "![Bad](https://cdn-mineru.example/path/../outside.jpg)"
    (source / "book.md").write_text(original)
    (images / "outside.jpg").write_bytes(b"must-not-copy")
    workspace = tmp_path / "workspace"

    result = ingest_markdown_folder(source, workspace, "signals")

    assert result.staged_images == []
    assert any("unsafe image URL path" in warning for warning in result.warnings)
    assert result.source_markdown.read_text() == original
    assert not (workspace / "sources" / "parsed" / "signals" / "images" / "outside.jpg").exists()
    assert not (tmp_path / "outside.jpg").exists()


def test_ingestion_requires_exactly_one_top_level_markdown_file(tmp_path: Path) -> None:
    source, _ = _input_folder(tmp_path)
    (source / "one.md").write_text("# One")
    (source / "two.md").write_text("# Two")

    with pytest.raises(IngestionError, match="exactly one top-level Markdown"):
        ingest_markdown_folder(source, tmp_path / "workspace", "signals")


def test_ingestion_is_idempotent_and_replaces_its_previous_image_stage(tmp_path: Path) -> None:
    source, images = _input_folder(tmp_path)
    (source / "book.md").write_text("![One](https://cdn-mineru.example/one.jpg)")
    (images / "one.jpg").write_bytes(b"one")
    workspace = tmp_path / "workspace"

    first = ingest_markdown_folder(source, workspace, "signals")
    (source / "book.md").write_text("![Two](https://cdn-mineru.example/two.png)")
    (images / "two.png").write_bytes(b"two")
    second = ingest_markdown_folder(source, workspace, "signals")

    image_dir = workspace / "sources" / "parsed" / "signals" / "images"
    assert first.staged_images == ["one.jpg"]
    assert second.staged_images == ["two.png"]
    assert not (image_dir / "one.jpg").exists()
    assert (image_dir / "two.png").read_bytes() == b"two"
    assert second.source_markdown.read_text() == "![Two](images/two.png)"


def test_ingest_folder_cli_reports_staging_result(tmp_path: Path) -> None:
    source, images = _input_folder(tmp_path)
    (source / "book.md").write_text("![Figure](https://cdn-mineru.example/figure.webp)")
    (images / "figure.webp").write_bytes(b"webp")
    workspace = tmp_path / "workspace"

    result = CliRunner().invoke(
        app,
        ["ingest-folder", str(source), "--output", str(workspace), "--doc-id", "signals"],
    )

    assert result.exit_code == 0, result.output
    assert "doc_id: signals" in result.output
    assert "source_parts: 1" in result.output
    assert "images_staged: 1" in result.output
    assert "references_rewritten: 1" in result.output
