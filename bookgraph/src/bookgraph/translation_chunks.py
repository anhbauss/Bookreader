"""Bounded Markdown translation requests with durable, source-keyed checkpoints."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import uuid
from collections.abc import Callable
from dataclasses import asdict
from pathlib import Path
from typing import Protocol

from markdown_it import MarkdownIt
from mdit_py_plugins.dollarmath import dollarmath_plugin

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.models import Section
from bookgraph.translation_provider import TranslationProviderConfig
from bookgraph.translation_structure import check_translation_structure, describe_structure_issues
from bookgraph.translations import section_content_hash, validate_lang
from bookgraph.utils import validate_slug_id
from bookgraph.workspace import WorkspacePaths

DEFAULT_CHUNK_CHARS = 5000
_VERSION = 1
_PARSER = (
    MarkdownIt("commonmark", {"html": True})
    .enable("table")
    .use(dollarmath_plugin, allow_blank_lines=True)
)
# Never divide or ask an LLM to rewrite equations, code, image paths or links.
_INLINE = re.compile(
    r"(?P<ticks>`+)[\s\S]*?(?P=ticks)"
    r"|(?<!\\)\$\$[\s\S]*?(?<!\\)\$\$"
    r"|(?<!\\)\$[^$\n]+?(?<!\\)\$"
    r"|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]"
    r"|\\begin\{(?P<env>[\w*]+)\}[\s\S]*?\\end\{(?P=env)\}"
    r"|!?\[[^\]\n]*\]\(\s*(?:<[^>]*>|(?:\\.|[^()\n]|\([^()\n]*\))*)\s*\)"
    r"|<img\b[^>]*>",
    re.IGNORECASE,
)


class SectionTranslator(Protocol):
    def translate_section(self, source: str, *, target_language: str) -> str: ...

    def translate_title(self, title: str, *, target_language: str) -> str: ...


def _offsets(source: str) -> list[int]:
    offsets = [0]
    for line in source.splitlines(keepends=True):
        offsets.append(offsets[-1] + len(line))
    return offsets


def _protected_ranges(source: str) -> list[tuple[int, int]]:
    offsets = _offsets(source)
    ranges = [(m.start(), m.end()) for m in _INLINE.finditer(source)]
    for token in _PARSER.parse(source):
        if token.map and token.type in {"fence", "code_block", "math_block", "math_block_eqno"}:
            ranges.append((offsets[token.map[0]], offsets[token.map[1]]))
    merged: list[tuple[int, int]] = []
    for start, end in sorted(ranges):
        if merged and start < merged[-1][1]:
            merged[-1] = (merged[-1][0], max(end, merged[-1][1]))
        else:
            merged.append((start, end))
    return merged


def split_translation_chunks(source: str, *, max_chars: int = DEFAULT_CHUNK_CHARS) -> list[str]:
    """Split at blocks, then long prose whitespace, preserving every source character.

    An indivisible table/list/code/equation can exceed the soft character budget.
    Equations and code are subsequently passed through locally, not sent to the LLM.
    """
    if max_chars < 1:
        raise ValueError("max_chars must be positive")
    if not source:
        return []
    offsets = _offsets(source)
    protected = _protected_ranges(source)
    boundaries = {0, len(source)}
    for token in _PARSER.parse(source):
        if token.level != 0 or not token.map:
            continue
        start, end = offsets[token.map[0]], offsets[token.map[1]]
        boundaries.update((start, end))
        if token.type == "paragraph_open" and end - start > max_chars:
            boundaries.update(start + m.end() for m in re.finditer(r"\s+", source[start:end]))
    safe = sorted(b for b in boundaries if not any(a < b < z for a, z in protected))
    chunks: list[str] = []
    start = 0
    while start < len(source):
        within = [b for b in safe if start < b <= start + max_chars]
        end = max(within) if within else next(b for b in safe if b > start)
        chunks.append(source[start:end])
        start = end
    return chunks


def _protect(source: str) -> tuple[str, dict[str, str]]:
    prefix = f"BOOKGRAPH_KEEP_{_digest(source)[:16]}_"
    pieces: list[str] = []
    replacements: dict[str, str] = {}
    cursor = 0
    for index, (start, end) in enumerate(_protected_ranges(source)):
        marker = f"{prefix}{index}_TOKEN"
        pieces.extend((source[cursor:start], marker))
        replacements[marker] = source[start:end]
        cursor = end
    pieces.append(source[cursor:])
    return "".join(pieces), replacements


def _translate_part(source: str, lang: str, provider: SectionTranslator) -> str:
    masked, replacements = _protect(source)
    remaining = masked
    for marker in replacements:
        remaining = remaining.replace(marker, "")
    if not remaining.strip():
        return source
    terminal = f"BOOKGRAPH_KEEP_{_digest(source)[:16]}_END"
    request = f"{masked.strip()}\n\n{terminal}"
    translated = provider.translate_section(request, target_language=lang).strip()
    if not translated:
        raise ReadingServiceError("Translation provider returned an empty part.")
    positions = [translated.find(marker) for marker in replacements]
    if positions != sorted(positions):
        raise ReadingServiceError("Translation reordered protected source content.")
    for marker in replacements:
        if translated.count(marker) != 1:
            raise ReadingServiceError(
                "Translation changed a protected formula, code block or link."
            )
    if translated.count(terminal) != 1 or not translated.endswith(terminal):
        raise ReadingServiceError("Translation is incomplete: the end-of-part marker is missing.")
    translated = translated[: -len(terminal)].rstrip()
    for marker, original in replacements.items():
        translated = translated.replace(marker, original)
    issues = check_translation_structure(source, translated)
    if issues:
        raise ReadingServiceError(
            "Translation changed structure: " + describe_structure_issues(issues)
        )
    # Preserve the original boundary: split prose remains a single paragraph;
    # distinct Markdown blocks remain separated by their original blank lines.
    leading = masked[: len(masked) - len(masked.lstrip())]
    trailing = masked[len(masked.rstrip()) :]
    return leading + translated + trailing


def _digest(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def _cache_root(workspace: WorkspacePaths, section: Section, lang: str) -> Path:
    validate_slug_id(section.doc_id, field_name="doc_id")
    return (
        workspace.runs_root
        / "translation-chunks"
        / section.doc_id
        / validate_lang(lang)
        / _digest(section.id)
    )


def clear_translation_chunks(workspace: WorkspacePaths, section: Section, lang: str) -> None:
    """An explicit retranslation discards checkpoints; an ordinary retry resumes them."""
    root = _cache_root(workspace, section, lang)
    if root.exists():
        shutil.rmtree(root)


def _read_checkpoint(path: Path, source: str) -> str | None:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        value = data["translation"]
        if (
            isinstance(value, str)
            and value.strip()
            and data["source_hash"] == _digest(source)
            and data["translation_hash"] == _digest(value)
        ):
            return value
    except (OSError, ValueError, KeyError, TypeError):
        pass
    return None


def _write_checkpoint(path: Path, source: str, translated: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    try:
        temporary.write_text(
            json.dumps(
                {
                    "source_hash": _digest(source),
                    "translation": translated,
                    "translation_hash": _digest(translated),
                },
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def translate_in_chunks(
    workspace: WorkspacePaths,
    section: Section,
    lang: str,
    provider: SectionTranslator,
    config: TranslationProviderConfig,
    *,
    max_chars: int = DEFAULT_CHUNK_CHARS,
    on_progress: Callable[[int, int], None] | None = None,
) -> tuple[str, str]:
    """Return a complete body/title, resuming only validated, matching checkpoints."""
    identity = json.dumps(
        {
            "version": _VERSION,
            "source": section_content_hash(section),
            "lang": lang,
            "provider": {k: v for k, v in asdict(config).items() if k != "timeout_seconds"},
            "max_chars": max_chars,
        },
        sort_keys=True,
    )
    folder = _cache_root(workspace, section, lang) / _digest(identity)
    chunks = split_translation_chunks(section.text, max_chars=max_chars)
    parts: list[str] = []
    for index, source in enumerate(chunks, start=1):
        if on_progress:
            on_progress(index, len(chunks))
        path = folder / f"part-{index:05d}.json"
        translated = _read_checkpoint(path, source)
        if translated is None:
            try:
                translated = _translate_part(source, lang, provider)
            except ReadingServiceError as exc:
                raise ReadingServiceError(
                    f"Translation part {index}/{len(chunks)} failed: {exc} "
                    "Completed parts are saved; retry to resume."
                ) from exc
            _write_checkpoint(path, source, translated)
        parts.append(translated)
    body = "".join(parts)
    issues = check_translation_structure(section.text, body)
    if issues:
        raise ReadingServiceError(
            "Translation changed structure: " + describe_structure_issues(issues)
        )
    title_path = folder / "title.json"
    title = _read_checkpoint(title_path, section.title)
    if title is None:
        title = provider.translate_title(section.title, target_language=lang)
        if not title.strip():
            raise ReadingServiceError("Translation provider returned an empty title.")
        _write_checkpoint(title_path, section.title, title)
    return body, title
