from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from bookgraph.formula_repairs import repair_formula
from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.models import Section
from bookgraph.sections import write_sections
from bookgraph.workspace import WorkspacePaths


def _workspace(tmp_path: Path) -> WorkspacePaths:
    workspace = WorkspacePaths(tmp_path / "workspace")
    for directory in workspace.directories():
        directory.mkdir(parents=True, exist_ok=True)
    write_sections(
        [
            Section(
                id="signals.intro",
                doc_id="signals",
                title="Introduction",
                level=1,
                heading_path=["Introduction"],
                text="Equation.",
            )
        ],
        workspace.sources_sections / "signals",
    )
    return workspace


def test_formula_repair_persists_only_a_validated_candidate(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    provider = MagicMock()
    provider.repair_formula.return_value = r"\frac{1}{2}"
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        repaired = repair_formula(
            workspace, "signals", "signals.intro", r"\frac{1{2}", "Nearby equation context."
        )

    assert repaired.repaired_content == r"\frac{1}{2}"
    saved = workspace.formula_repairs_root / "signals" / "signals.intro" / f"{repaired.source_hash}.json"
    assert json.loads(saved.read_text())["repaired_content"] == r"\frac{1}{2}"


def test_formula_repair_rejects_html_or_unbalanced_provider_output(tmp_path: Path) -> None:
    workspace = _workspace(tmp_path)
    provider = MagicMock()
    provider.repair_formula.return_value = "<script>bad</script>"
    with patch("bookgraph.formula_repairs.configured_provider", return_value=provider):
        with pytest.raises(ReadingServiceError, match="invalid TeX"):
            repair_formula(workspace, "signals", "signals.intro", r"\frac{1{2}", "")
