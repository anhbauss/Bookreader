from __future__ import annotations

import json
from pathlib import Path

import pytest
from typer.testing import CliRunner

from bookgraph.cli import app
from bookgraph.mdx_bridge import MdxBridgeError, build_mdx
from bookgraph.models import Section
from bookgraph.sections import write_sections


def _write_section(workspace: Path, section: Section, body: str) -> Path:
    path = workspace / "sources" / "sections" / section.doc_id
    write_sections([section], path)
    section_path = path / f"{section.id}.md"
    _opening, frontmatter, _old_body = section_path.read_text().split("---\n", 2)
    section_path.write_text(f"---\n{frontmatter}---\n\n{body}")
    return section_path


def test_build_mdx_preserves_reader_metadata_and_rewrites_images_and_table_equations(
    tmp_path: Path,
) -> None:
    section = Section(
        id="signals.sampling",
        doc_id="signals",
        title="Sampling",
        level=2,
        heading_path=["Signals", "Sampling"],
        page_start=3,
        page_end=5,
        prev_id="signals.introduction",
        next_id="signals.reconstruction",
        block_ids=["b1", "b2"],
        text="source",
    )
    _write_section(
        tmp_path,
        section,
        "## Sampling\n\n"
        "![Wave](images/wave.jpg)\n\n"
        "| Symbol | Meaning |\n"
        "| --- | --- |\n"
        "| <eq>x[n]</eq> | sample |\n\n"
        "Outside math remains $f_s > 2f_m$.\n",
    )
    output = tmp_path / "reader-content"

    result = build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "sampling.mdx").read_text()
    assert result.written == [output / "signals" / "sampling.mdx"]
    outline = json.loads((output / "signals" / "outline.json").read_text())
    assert outline["doc_id"] == "signals"
    assert outline["nodes"][0]["id"] == "signals.sampling"
    assert 'title: "Sampling"' in mdx
    assert "bookgraph:" in mdx
    assert 'id: "signals.sampling"' in mdx
    assert 'prev_id: "signals.introduction"' in mdx
    assert "![Wave](/api/assets/signals/wave.jpg)" in mdx
    assert "$x[n]$" in mdx
    assert "<eq>" not in mdx
    assert "$f_s > 2f_m$" in mdx


def test_build_mdx_converts_html_tables_to_safe_markdown_tables(tmp_path: Path) -> None:
    section = Section(
        id="signals.table",
        doc_id="signals",
        title="Table",
        level=2,
        heading_path=["Signals", "Table"],
        text="source",
    )
    _write_section(
        tmp_path,
        section,
        "<table><tr><td>Signal</td><td>Coefficient</td></tr>"
        "<tr><td><eq>x(t)</eq></td><td><eq>c_{k}</eq></td></tr></table>\n",
    )

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "table.mdx").read_text()
    assert "| Signal | Coefficient |" in mdx
    assert "| --- | --- |" in mdx
    assert "| $x(t)$ | $c_{k}$ |" in mdx
    assert "<table>" not in mdx


def test_build_mdx_marks_raw_latex_equations_without_escaping_grouping(tmp_path: Path) -> None:
    section = Section(
        id="signals.math",
        doc_id="signals",
        title="Math",
        level=2,
        heading_path=["Signals", "Math"],
        text="source",
    )
    _write_section(
        tmp_path,
        section,
        "## Math\n\n"
        "x(t) \\stackrel {\\mathrm{FS}} {\\longleftrightarrow} c _ {k}\n\n"
        "p _ {x} (t) = | x (t) | ^ {2}\n\n"
        "\\begin{array}{l} E _ {x} = \\sum _ {n} x[n] \\\\ P _ {x} = 1 \\end{array}\n\n"
        "Inline $\\frac{1}{2}$ remains valid.\n\n"
        "The prose $x = \\sin(t)$ must remain prose, not display math.\n",
    )

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "math.mdx").read_text()
    assert "$$\nx(t) \\stackrel {\\mathrm{FS}} {\\longleftrightarrow} c _ {k}\n$$" in mdx
    assert "$$\np _ {x} (t) = | x (t) | ^ {2}\n$$" in mdx
    assert "$$\n\\begin{array}{l} E _ {x}" in mdx
    assert "\\begin\\{array\\}" not in mdx
    assert "$\\frac{1}{2}$" in mdx
    assert "The prose $x = \\sin(t)$ must remain prose, not display math." in mdx
    assert "$$\nThe prose" not in mdx


def test_build_mdx_marks_untagged_fraction_equations_as_display_math(tmp_path: Path) -> None:
    section = Section(
        id="signals.fraction",
        doc_id="signals",
        title="Fraction",
        level=2,
        heading_path=["Signals", "Fraction"],
        text="source",
    )
    equation = (
        r"- \frac {1}{2} \mathbf {x} ^ {\mathrm{T}} \boldsymbol {\Sigma} ^ {- 1} "
        r"\mathbf {x}\tag{2.71}"
    )
    _write_section(tmp_path, section, f"## Fraction\n\n{equation}\n")

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "fraction.mdx").read_text()
    assert "$$\n- \\frac {1}{2}" in mdx
    assert "\\tag{2.71}" not in mdx
    assert "\\frac \\{1\\}" not in mdx


def test_build_mdx_strips_tags_inside_existing_display_math(tmp_path: Path) -> None:
    section = Section(
        id="signals.tagged",
        doc_id="signals",
        title="Tagged",
        level=2,
        heading_path=["Signals", "Tagged"],
        text="source",
    )
    _write_section(tmp_path, section, "$$\n\\frac{1}{2}\\tag{2.71}\n$$\n")

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "tagged.mdx").read_text()
    assert "\\tag{2.71}" not in mdx
    assert "$$\n\\frac{1}{2}\n$$" in mdx


def test_build_mdx_marks_raw_equations_with_a_relation_as_display_math(tmp_path: Path) -> None:
    section = Section(
        id="signals.relation",
        doc_id="signals",
        title="Relation",
        level=2,
        heading_path=["Signals", "Relation"],
        text="source",
    )
    equation = r"I _ {0} (m) = \frac {1}{2 \pi} \int_ {0} ^ {2 \pi} \exp \left\{m \cos \theta \right\} d \theta ."
    _write_section(tmp_path, section, f"## Relation\n\n{equation}\n")

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "relation.mdx").read_text()
    assert f"$$\n{equation}\n$$" in mdx


def test_build_mdx_marks_untagged_array_equations_as_display_math(tmp_path: Path) -> None:
    section = Section(
        id="signals.array",
        doc_id="signals",
        title="Array",
        level=2,
        heading_path=["Signals", "Array"],
        text="source",
    )
    equation = r"x \begin{array}{c c} & y \\ & 0 & 1 \\ \hline 0 & 1 / 3 & 1 / 3 \end{array}"
    _write_section(tmp_path, section, f"## Array\n\n{equation}\n")

    output = tmp_path / "reader-content"
    build_mdx(tmp_path, "signals", output)

    mdx = (output / "signals" / "array.mdx").read_text()
    assert f"$$\n{equation}\n$$" in mdx


def test_build_mdx_escapes_unsafe_mdx_expressions_and_imports(tmp_path: Path) -> None:
    section = Section(
        id="safe.only",
        doc_id="safe",
        title="Safe",
        level=1,
        heading_path=["Safe"],
        text="source",
    )
    _write_section(
        tmp_path,
        section,
        "# Safe\n\n"
        "import danger from 'danger';\n\n"
        "{process.env.SECRET}\n\n"
        "<Danger />\n",
    )
    output = tmp_path / "reader-content"

    build_mdx(tmp_path, "safe", output)

    mdx = (output / "safe" / "only.mdx").read_text()
    assert "import danger" not in mdx
    assert "\\{process.env.SECRET\\}" in mdx
    assert "&lt;Danger /&gt;" in mdx


def test_build_mdx_rejects_unknown_image_paths(tmp_path: Path) -> None:
    section = Section(
        id="signals.bad",
        doc_id="signals",
        title="Bad",
        level=1,
        heading_path=["Bad"],
        text="source",
    )
    _write_section(tmp_path, section, "# Bad\n\n![Bad](../private.jpg)\n")

    with pytest.raises(MdxBridgeError, match="unsupported image reference"):
        build_mdx(tmp_path, "signals", tmp_path / "reader-content")


def test_build_mdx_fails_for_malformed_section_frontmatter(tmp_path: Path) -> None:
    section = Section(
        id="signals.bad",
        doc_id="signals",
        title="Bad",
        level=1,
        heading_path=["Bad"],
        text="source",
    )
    section_dir = tmp_path / "sources" / "sections" / "signals"
    write_sections([section], section_dir)
    (section_dir / "signals.bad.md").write_text("# Missing frontmatter\n")

    with pytest.raises(MdxBridgeError, match="YAML frontmatter"):
        build_mdx(tmp_path, "signals", tmp_path / "reader-content")


def test_build_mdx_cli_reports_generated_files(tmp_path: Path) -> None:
    section = Section(
        id="signals.one",
        doc_id="signals",
        title="One",
        level=1,
        heading_path=["One"],
        text="source",
    )
    _write_section(tmp_path, section, "# One\n")
    output = tmp_path / "reader-content"

    result = CliRunner().invoke(
        app,
        ["build-mdx", str(tmp_path), "signals", "--output-dir", str(output)],
    )

    assert result.exit_code == 0, result.output
    assert "sections_written: 1" in result.output
    assert (output / "signals" / "one.mdx").is_file()
    assert (output / "signals" / "outline.json").is_file()
