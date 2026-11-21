from __future__ import annotations

from pathlib import Path

from pypdf import PdfWriter
from typer.testing import CliRunner

from bookgraph.cli import app


def _pdf(path: Path) -> None:
    writer = PdfWriter()
    writer.add_blank_page(width=100, height=100)
    with path.open("wb") as output:
        writer.write(output)


def test_prepare_prints_the_manual_mineru_workflow_paths(tmp_path: Path) -> None:
    library = tmp_path / "library"
    library.mkdir()
    source = tmp_path / "source.pdf"
    _pdf(source)

    result = CliRunner().invoke(app, ["mineru-assist", "prepare", str(library), str(source), "--title", "Signals"])

    assert result.exit_code == 0, result.output
    assert "upload batches:" in result.output
    assert "put MinerU downloads here:" in result.output
    assert (library / "signals" / "mineru" / "upload-batches").is_dir()
