"""Check that a translation carries its section's figures and tables.

The section content hash covers a section's title and text only, so a re-parse that
newly stages a figure leaves a prose-only translation ``fresh``. Whether a translation
is complete therefore cannot rest on the writer's ``includes_assets`` claim: it is
verified from the body. Every *staged* asset block of the section — one whose file
resolves under the parsed document, i.e. one ``get_section`` hands out as an
``AssetRef`` — must be linked by an image in the body (a Markdown image or an
``<img src>``) that resolves to the same file, wherever the link is written from
(``AssetRef.link``, or a workspace-relative path). An asset whose file was never
staged cannot be linked or checked, so for those the writer's claim still stands;
``asset_missing`` and ``bookgraph assets repair`` own them.

MinerU Markdown also renders some table crops as inline HTML instead of image
links. Those tables count when the source's table blocks map unambiguously to its
HTML tables in reading order and the translated body preserves each table exactly.

:func:`check_translation_assets` is the one entry point the translation tools and the
translated export share, so they judge the same body the same way.
"""

from __future__ import annotations

import re
from collections import Counter
from collections.abc import Mapping
from dataclasses import dataclass
from pathlib import Path

from markdown_it import MarkdownIt

from bookgraph.assets import asset_link, asset_reference, resolve_asset_path
from bookgraph.models import (
    ASSET_BLOCK_TYPES,
    CanonicalBlock,
    MissingTranslationAsset,
    Section,
)
from bookgraph.translation_structure import resolve_translation_image, structural_targets

_MARKDOWN = MarkdownIt("commonmark", {"html": True})
_HTML_TABLE = re.compile(r"<table\b[^>]*>[\s\S]*?</table\s*>", re.IGNORECASE)


def _html_tables(markdown: str) -> list[str]:
    """Read actual HTML blocks, excluding fenced/indented code and comments."""
    return [
        match.group()
        for token in _MARKDOWN.parse(markdown)
        if token.type == "html_block"
        for match in _HTML_TABLE.finditer(re.sub(r"<!--[\s\S]*?-->", "", token.content))
    ]


def _inline_table_blocks(
    section: Section, body: str, blocks: Mapping[str, CanonicalBlock],
    *, root: Path, parsed_dir: Path,
) -> set[str]:
    """Accept only a one-to-one source mapping, never table counts alone.

    MinerU's Markdown and canonical blocks share reading order. Table crops not
    linked as images correspond to the HTML tables only when their counts agree.
    Exact source HTML (including cell values and math) must survive in the body;
    a repeated table cannot stand in for two source occurrences. Ambiguous mappings
    fall back to requiring the crop image, as other parsers always do.
    """
    if section.metadata.get("reading_source") != "mineru-markdown":
        return set()
    source_tables = _html_tables(section.text)
    if not source_tables:
        return set()
    source_images = {
        resolved
        for kind, target in structural_targets(section.text)
        if kind == "image"
        and (resolved := resolve_translation_image(root, target, [parsed_dir, root])) is not None
    }
    candidates: list[str] = []
    for block_id in section.block_ids:
        block = blocks.get(block_id)
        if block is None or block.type != "table":
            continue
        path = resolve_asset_path(parsed_dir, block)
        if path is None:
            return set()
        if Path(path).resolve() not in source_images:
            candidates.append(block_id)
    if len(candidates) != len(source_tables):
        return set()
    remaining = Counter(_html_tables(body))
    carried = set()
    for block_id, table in zip(candidates, source_tables, strict=True):
        if remaining[table]:
            remaining[table] -= 1
            carried.add(block_id)
    return carried


@dataclass(frozen=True)
class TranslationAssetCheck:
    """What a translation body carries of its section's figures/tables.

    ``missing`` lists the staged assets the body does not link; ``unverified`` is
    whether the section also has asset blocks whose file was never staged, which no
    body can be checked against.
    """

    missing: list[MissingTranslationAsset]
    unverified: bool = False

    def includes_assets(self, claimed: bool) -> bool:
        """Whether the translation is complete: every staged asset is linked, and the
        writer ``claimed`` the unstaged ones (if any) were carried too."""

        return not self.missing and (claimed or not self.unverified)


def translation_link_bases(root: Path, parsed_dir: Path, body_dir: Path) -> list[Path]:
    """Where a translation's relative image links resolve: next to the body, then under
    the parsed document, then the workspace root.

    The one list the export (embedding and structure check), the MCP structure check,
    and :func:`check_translation_assets` all resolve against.
    """

    return [body_dir, parsed_dir / "images", parsed_dir, root]


def check_translation_assets(
    section: Section,
    body: str,
    *,
    blocks: Mapping[str, CanonicalBlock],
    root: Path,
    parsed_dir: Path,
    body_dir: Path,
) -> TranslationAssetCheck:
    """Check a translation ``body`` (frontmatter split off) against ``section``'s assets.

    ``blocks`` are the parsed document's blocks by id, ``parsed_dir`` its
    ``sources/parsed/<doc_id>/`` directory, and ``body_dir`` the directory the
    translation body lives in (its relative links resolve there first).
    """

    staged: list[tuple[CanonicalBlock, str]] = []
    unverified = False
    for block_id in section.block_ids:
        block = blocks.get(block_id)
        if block is None or block.type not in ASSET_BLOCK_TYPES or not asset_reference(block):
            continue
        path = resolve_asset_path(parsed_dir, block)
        if path is None:
            unverified = True
        else:
            staged.append((block, path))
    if not staged:
        return TranslationAssetCheck(missing=[], unverified=unverified)
    bases = translation_link_bases(root, parsed_dir, body_dir)
    linked = {
        resolved
        for kind, target in structural_targets(body)
        if kind == "image"
        and (resolved := resolve_translation_image(root, target, bases)) is not None
    }
    inline_tables = _inline_table_blocks(
        section, body, blocks, root=root, parsed_dir=parsed_dir
    )
    missing = [
        MissingTranslationAsset(
            block_id=block.id,
            type=block.type,
            link=asset_link(parsed_dir, path),
            reference=asset_reference(block),
            caption=block.text,
        )
        for block, path in staged
        if Path(path).resolve() not in linked and block.id not in inline_tables
    ]
    return TranslationAssetCheck(missing=missing, unverified=unverified)


def describe_missing_assets(missing: list[MissingTranslationAsset], limit: int = 5) -> str:
    """A one-line summary of ``missing`` for warnings and error messages."""

    parts = [f"{asset.type} {asset.block_id} ({asset.link})" for asset in missing[:limit]]
    if len(missing) > limit:
        parts.append(f"and {len(missing) - limit} more")
    return ", ".join(parts)
