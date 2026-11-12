from __future__ import annotations

import json
from pathlib import Path

from typer.testing import CliRunner

from bookgraph.cli import app


def _folder_input(tmp_path: Path) -> Path:
    source = tmp_path / "input"
    images = source / "signals_latex" / "images"
    images.mkdir(parents=True)
    (source / "signals.md").write_text(
        "# Signals\n\n"
        "Introduction.\n\n"
        "## Sampling\n\n"
        "![Sample](https://cdn-mineru.example/assets/sampling.jpg)\n\n"
        "Sample at twice the highest frequency.\n\n"
        "## Reconstruction\n\n"
        "Recover the signal from its samples.\n"
    )
    (images / "sampling.jpg").write_bytes(b"image-bytes")
    return source


def test_ingest_pipeline_runs_markdown_pipeline_without_mineru(tmp_path: Path) -> None:
    source = _folder_input(tmp_path)
    workspace = tmp_path / "workspace"

    result = CliRunner().invoke(
        app,
        [
            "ingest-pipeline",
            str(source),
            "--output",
            str(workspace),
            "--doc-id",
            "signals",
            "--daily-sections",
            "2",
        ],
    )

    assert result.exit_code == 0, result.output
    assert "parser: markdown" in result.output
    assert "segmenter: heading" in result.output
    assert "pipeline: completed" in result.output
    assert "plan_id: signals" in result.output
    assert "source_parts: 1" in result.output

    document_path = workspace / "sources" / "parsed" / "signals" / "document.json"
    document = json.loads(document_path.read_text())
    assert document["doc_id"] == "signals"
    image = next(block for block in document["blocks"] if block["type"] == "image")
    assert image["metadata"]["src"] == "images/sampling.jpg"
    staged_image = workspace / "sources" / "parsed" / "signals" / "images" / "sampling.jpg"
    assert staged_image.read_bytes() == b"image-bytes"

    sections = workspace / "sources" / "sections" / "signals"
    assert (sections / "sections.jsonl").is_file()
    assert any(
        "![Sample](images/sampling.jpg)" in path.read_text() for path in sections.glob("*.md")
    )
    assert (workspace / "indexes" / "bookgraph.db").is_file()
    plan = json.loads((workspace / "reading_plans" / "signals.json").read_text())
    assert plan["doc_id"] == "signals"
    assert plan["daily_sections"] == 2


def test_ingest_pipeline_does_not_parse_when_ingestion_fails(tmp_path: Path) -> None:
    source = tmp_path / "input"
    source.mkdir()
    (source / "one.md").write_text("# One")
    (source / "two.md").write_text("# Two")
    workspace = tmp_path / "workspace"

    result = CliRunner().invoke(
        app,
        ["ingest-pipeline", str(source), "--output", str(workspace), "--doc-id", "signals"],
    )

    assert result.exit_code != 0
    assert "exactly one top-level Markdown" in result.output
    assert not (workspace / "sources" / "parsed" / "signals" / "document.json").exists()


def test_ingest_pipeline_rejects_existing_plan_without_overwrite(tmp_path: Path) -> None:
    source = _folder_input(tmp_path)
    workspace = tmp_path / "workspace"
    runner = CliRunner()
    command = ["ingest-pipeline", str(source), "--output", str(workspace), "--doc-id", "signals"]

    assert runner.invoke(app, command).exit_code == 0
    second = runner.invoke(app, command)

    assert second.exit_code != 0
    assert "reading plan 'signals' already exists" in second.output
