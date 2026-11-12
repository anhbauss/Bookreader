"""Deterministic, safe conversion from BookGraph reading sections to reader MDX.

The bridge copies data out of canonical ``sources/sections``; it never mutates those
source-evidence files. Generated MDX is an untrusted-content boundary: JavaScript MDX
expressions, imports/exports and JSX components are rendered inert before the reader
sees them.
"""

from __future__ import annotations

import json
import re
import shutil
import tempfile
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path

from bookgraph.graph import build_section_graph
from bookgraph.models import Section
from bookgraph.sections import read_sections
from bookgraph.utils import validate_slug_id
from bookgraph.workspace import WorkspacePaths

_FRONTMATTER = re.compile(r"\A---\n(?P<frontmatter>.*?)\n---\n(?:\n)?(?P<body>.*)\Z", re.DOTALL)
_IMAGE_LINK = re.compile(r"!\[([^\]]*)\]\(([^\s)]+)(\s+[^)]*)?\)")
_EQ_TAG = re.compile(r"<eq>(.*?)</eq>", re.DOTALL | re.IGNORECASE)
_IMPORT_EXPORT = re.compile(r"^\s*(?:import|export)\s+.*$", re.MULTILINE)
_MDX_EXPRESSION = re.compile(r"(?<!\\)\{([^{}\n]*)\}")
_JSX_COMPONENT = re.compile(r"<([A-Z][\w.]*)(?:\s[^<>]*)?\s*/>|</?[A-Z][\w.]*[^<>]*>")
_LATEX_COMMAND = re.compile(r"\\[A-Za-z]+|\\\\")
_MATH_NOTATION = re.compile(r"(?:[_^]\s*\{|\|\s*[^|]+\s*\|)")
_MATH_RELATION = re.compile(
    r"(?:=|\\(?:stackrel|longleftrightarrow|xleftrightarrow|leftrightarrow|rightarrow|to)\b)"
)
_MATH_FUNCTION = re.compile(
    r"\\(?:exp|ln|log|sin|cos|tan|sinh|cosh|min|max|argmin|argmax|det|trace|Pr)(?![A-Za-z])"
)
_MATH_DISPLAY_COMMAND = re.compile(
    r"\\(?:frac|d?frac|binom|choose|sum|prod|int|iint|iiint|oint|nabla|partial|"
    r"mathbb|mathbf|boldsymbol|pmb|operatorname|left|right|begin)(?![A-Za-z])"
)
_MATH_TAG = re.compile(r"\\tag\s*(?:\{[^{}\n]*\}|\([^()\n]*\))")


class MdxBridgeError(ValueError):
    """The canonical sections cannot safely be converted to reader MDX."""


@dataclass(frozen=True)
class MdxBuildResult:
    """Generated MDX output for one canonical BookGraph document."""

    doc_id: str
    output_dir: Path
    written: list[Path]


def build_mdx(workspace_root: Path, doc_id: str, output_dir: Path) -> MdxBuildResult:
    """Convert a document's canonical sections to deterministic, read-only MDX."""

    try:
        resolved_doc_id = validate_slug_id(doc_id, field_name="doc_id")
    except ValueError as exc:
        raise MdxBridgeError(str(exc)) from exc
    workspace = WorkspacePaths(workspace_root.expanduser().resolve())
    sections_dir = workspace.sources_sections / resolved_doc_id
    manifest = sections_dir / "sections.jsonl"
    if not manifest.is_file():
        raise MdxBridgeError(
            f"sections manifest not found: {manifest}; run 'bookgraph segment' first"
        )
    try:
        sections = read_sections(manifest)
    except (OSError, ValueError) as exc:
        raise MdxBridgeError(f"invalid sections manifest {manifest}: {exc}") from exc
    if any(section.doc_id != resolved_doc_id for section in sections):
        raise MdxBridgeError(
            f"sections manifest contains a document other than {resolved_doc_id!r}"
        )

    destination_root = output_dir.expanduser().resolve() / resolved_doc_id
    converted: list[tuple[str, str]] = []
    for section in sections:
        source = sections_dir / f"{section.id}.md"
        if not source.is_file():
            raise MdxBridgeError(f"section source missing: {source}")
        relative_name = _safe_section_filename(section.id, resolved_doc_id)
        converted.append((relative_name, _convert_section(source, section)))

    _replace_document_output(destination_root, converted, sections)
    return MdxBuildResult(
        doc_id=resolved_doc_id,
        output_dir=destination_root,
        written=[destination_root / f"{name}.mdx" for name, _body in converted],
    )


def _safe_section_filename(section_id: str, doc_id: str) -> str:
    prefix = f"{doc_id}."
    if not section_id.startswith(prefix):
        raise MdxBridgeError(
            f"section id {section_id!r} does not belong to document {doc_id!r}"
        )
    name = section_id.removeprefix(prefix)
    if not name or "/" in name or "\\" in name or name in {".", ".."}:
        raise MdxBridgeError(f"unsafe section id: {section_id!r}")
    return name


def _convert_section(source: Path, section: Section) -> str:
    raw = source.read_text()
    match = _FRONTMATTER.fullmatch(raw)
    if match is None:
        raise MdxBridgeError(f"section source has no valid YAML frontmatter: {source}")
    frontmatter = _parse_bookgraph_frontmatter(match.group("frontmatter"), source)
    _validate_frontmatter_matches_section(frontmatter, section, source)
    body = _convert_body(match.group("body"), section.doc_id)
    return _render_mdx_frontmatter(frontmatter) + "\n" + body


def _parse_bookgraph_frontmatter(raw: str, source: Path) -> dict[str, object]:
    """Read BookGraph frontmatter without a YAML dependency.

    `render_section_markdown` emits each value as a JSON scalar/list, which is legal YAML
    and deliberately lets this parser be strict and deterministic.
    """

    parsed: dict[str, object] = {}
    for line in raw.splitlines():
        key, separator, encoded = line.partition(": ")
        if not separator or not key:
            raise MdxBridgeError(f"invalid frontmatter line in {source}: {line!r}")
        try:
            parsed[key] = json.loads(encoded)
        except json.JSONDecodeError as exc:
            raise MdxBridgeError(f"invalid JSON-valued frontmatter in {source}: {key}") from exc
    return parsed


def _validate_frontmatter_matches_section(
    frontmatter: dict[str, object], section: Section, source: Path
) -> None:
    fields = (
        "id",
        "doc_id",
        "title",
        "level",
        "heading_path",
        "page_start",
        "page_end",
        "prev_id",
        "next_id",
        "block_ids",
    )
    for field in fields:
        if frontmatter.get(field) != getattr(section, field):
            raise MdxBridgeError(
                f"frontmatter {field!r} does not match sections manifest in {source}"
            )


def _convert_body(body: str, doc_id: str) -> str:
    converted = _IMAGE_LINK.sub(lambda match: _rewrite_image(match, doc_id), body)
    converted = _EQ_TAG.sub(lambda match: f"${match.group(1).strip()}$", converted)
    converted = _IMPORT_EXPORT.sub("", converted)
    converted = _convert_display_math(converted)
    converted = _convert_html_tables(converted)
    return _escape_unsafe_mdx(converted)


def _convert_display_math(body: str) -> str:
    """Mark standalone LaTeX source lines as display math for the reader.

    Source adapters often emit equations without delimiters. Equation-number
    commands are source annotations; KaTeX does not support ``\\tag`` without
    its optional AMS extension, so they are stripped before rendering.

    The heuristic is
    intentionally conservative: prose still needs a TeX command, mathematical
    notation, and an equation marker; multi-line array environments are accepted
    as a complete block.
    """

    converted: list[str] = []
    for block in re.split(r"(\n{2,})", body):
        if not block or block.isspace() or block.startswith("\n"):
            converted.append(block)
            continue
        stripped = block.strip()
        if _is_display_math(stripped):
            converted.append(f"$$\n{_MATH_TAG.sub('', stripped).strip()}\n$$")
        elif stripped.startswith("$$") and stripped.endswith("$$"):
            # Preserve already-delimited source math but remove unsupported MinerU
            # equation-number annotations before it reaches the Reader.
            converted.append(_MATH_TAG.sub("", block))
        else:
            converted.append(block)
    return "".join(converted)


class _HtmlTableConverter(HTMLParser):
    """Convert source HTML tables into the reader's safe Markdown table subset."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.rows: list[list[str]] = []
        self._row: list[str] | None = None
        self._cell: list[str] | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        del attrs
        if tag == "tr":
            self._row = []
        elif tag in {"td", "th"} and self._row is not None:
            self._cell = []
        elif tag == "br" and self._cell is not None:
            self._cell.append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"td", "th"} and self._cell is not None and self._row is not None:
            self._row.append("".join(self._cell).strip().replace("|", "\\|"))
            self._cell = None
        elif tag == "tr" and self._row is not None:
            self.rows.append(self._row)
            self._row = None

    def handle_data(self, data: str) -> None:
        if self._cell is not None:
            self._cell.append(data)


def _convert_html_tables(body: str) -> str:
    def replace(match: re.Match[str]) -> str:
        parser = _HtmlTableConverter()
        parser.feed(match.group(0))
        parser.close()
        rows = [row for row in parser.rows if row]
        if not rows:
            return _escape_html(match.group(0))
        width = max(len(row) for row in rows)
        normalized = [row + [""] * (width - len(row)) for row in rows]
        header, *data = normalized
        lines = [
            "| " + " | ".join(header) + " |",
            "| " + " | ".join("---" for _ in header) + " |",
        ]
        lines.extend("| " + " | ".join(row) + " |" for row in data)
        return "\n".join(lines)

    return re.sub(r"<table\b[^>]*>[\s\S]*?</table>", replace, body, flags=re.IGNORECASE)


def _is_display_math(value: str) -> bool:
    if value.startswith("$$") and value.endswith("$$"):
        return False
    # Inline $...$ proves this is a prose paragraph, even if it embeds an array.
    # Wrapping the entire paragraph in $$ would create nested math delimiters.
    if "$" in value:
        return False
    if "\\begin{" in value and "\\end{" in value:
        return True
    if value.startswith(("#", "* ")) or re.search(r"[.!?]\s+\S", value):
        return False
    # MinerU can emit a complete displayed equation without a relation marker,
    # such as ``\\frac{1}{2} x^T Λ x\\tag{2.72}``. A display-only TeX command
    # distinguishes this from ordinary prose which merely mentions LaTeX.
    has_math_signal = bool(
        _MATH_DISPLAY_COMMAND.search(value)
        or _MATH_FUNCTION.search(value)
    )
    return bool(
        has_math_signal
        and (_MATH_RELATION.search(value) or "\\tag" in value or _MATH_NOTATION.search(value))
    )


def _escape_unsafe_mdx(body: str) -> str:
    """Escape MDX expressions without changing TeX grouping braces.

    The reader consumes generated files as text and never evaluates MDX.  Escaping
    ordinary braces is still retained for defense in depth, but math regions must
    retain ``{...}`` so KaTeX receives valid LaTeX.
    """

    parts = re.split(r"(\$\$[\s\S]*?\$\$|\$[^$\n]+\$)", body)
    for index in range(0, len(parts), 2):
        parts[index] = _MDX_EXPRESSION.sub(
            lambda match: "\\{" + match.group(1) + "\\}", parts[index]
        )
        parts[index] = _JSX_COMPONENT.sub(lambda match: _escape_html(match.group(0)), parts[index])
    return "".join(parts)


def _rewrite_image(match: re.Match[str], doc_id: str) -> str:
    alt, raw_path, trailing = match.groups()
    path = raw_path.removeprefix("./")
    if not path.startswith("images/"):
        raise MdxBridgeError(
            f"unsupported image reference {raw_path!r}; expected images/<basename>"
        )
    basename = path.removeprefix("images/")
    if not basename or "/" in basename or "\\" in basename or basename in {".", ".."}:
        raise MdxBridgeError(f"unsafe image reference: {raw_path!r}")
    return f"![{alt}](/api/assets/{doc_id}/{basename}{trailing or ''})"


def _escape_html(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _render_mdx_frontmatter(source: dict[str, object]) -> str:
    title = source["title"]
    if not isinstance(title, str):
        raise MdxBridgeError("section title must be a string")
    description = _description(source)
    bookgraph = {
        key: source[key]
        for key in (
            "id",
            "doc_id",
            "level",
            "heading_path",
            "page_start",
            "page_end",
            "prev_id",
            "next_id",
            "block_ids",
        )
    }
    lines = ["---", f"title: {json.dumps(title, ensure_ascii=False)}"]
    if description:
        lines.append(f"description: {json.dumps(description, ensure_ascii=False)}")
    lines.append("bookgraph:")
    for key, value in bookgraph.items():
        lines.append(f"  {key}: {json.dumps(value, ensure_ascii=False)}")
    return "\n".join(lines) + "\n---\n"


def _description(source: dict[str, object]) -> str | None:
    heading_path = source.get("heading_path")
    title = source.get("title")
    if not isinstance(title, str) or not isinstance(heading_path, list):
        return None
    parents = [item for item in heading_path[:-1] if isinstance(item, str) and item]
    return " › ".join(parents) or None


def _replace_document_output(
    destination_root: Path, converted: list[tuple[str, str]], sections: list[Section]
) -> None:
    destination_root.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(
        prefix=".bookgraph-mdx-", dir=destination_root.parent
    ) as temporary:
        staging_root = Path(temporary) / destination_root.name
        staging_root.mkdir()
        for name, content in converted:
            (staging_root / f"{name}.mdx").write_text(content)
        outline = {
            "doc_id": sections[0].doc_id if sections else destination_root.name,
            "nodes": [
                node.model_dump()
                for node in build_section_graph(destination_root.name, sections).nodes
            ],
        }
        (staging_root / "outline.json").write_text(
            json.dumps(outline, ensure_ascii=False, indent=2) + "\n"
        )
        if destination_root.exists() or destination_root.is_symlink():
            if destination_root.is_dir() and not destination_root.is_symlink():
                shutil.rmtree(destination_root)
            else:
                destination_root.unlink()
        staging_root.replace(destination_root)
