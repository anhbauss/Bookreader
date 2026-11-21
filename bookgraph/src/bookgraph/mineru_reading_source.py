"""Preserve MinerU Web Markdown while retaining JSON section ids and provenance."""

from __future__ import annotations

import re
import stat
import unicodedata
import zipfile
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit

from bookgraph.models import Document, Section
from bookgraph.parsers.markdown import markdown_reader
from bookgraph.section_structure import group_reading_sections


class ReadingSourceError(ValueError):
    """Exports cannot be aligned without guessing or dropping source content."""


@dataclass(frozen=True)
class ReadingBatch:
    batch_id: str
    start_page: int
    end_page: int
    folder: Path


def _key(text: str) -> str:
    text = re.sub(r"<[^>]*>", "", text)
    return "".join(c for c in unicodedata.normalize("NFKC", text).casefold() if c.isalnum())


def _basename(reference: str) -> str:
    return PurePosixPath(unquote(urlsplit(reference).path)).name


def _stage_images(batches: list[ReadingBatch], destination: Path) -> dict[tuple[str, str], str]:
    images: dict[tuple[str, str], str] = {}
    total = 0
    for batch in batches:
        for path in sorted(batch.folder.glob("*.zip")):
            try:
                with zipfile.ZipFile(path) as archive:
                    for item in archive.infolist():
                        member = PurePosixPath(item.filename)
                        if member.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
                            continue
                        mode = item.external_attr >> 16
                        if (
                            member.is_absolute()
                            or ".." in member.parts
                            or "\\" in item.filename
                            or stat.S_ISLNK(mode)
                            or not re.fullmatch(r"[A-Za-z0-9_.-]+", member.name)
                        ):
                            raise ReadingSourceError(
                                f"unsafe image in {path.name}: {item.filename}"
                            )
                        total += item.file_size
                        if item.file_size > 64 * 1024**2 or total > 2 * 1024**3:
                            raise ReadingSourceError(
                                "MinerU image archive exceeds import size limits"
                            )
                        reference = f"images/{batch.batch_id}--{member.name}"
                        target = destination / reference
                        data = archive.read(item)
                        key = (batch.batch_id, member.name)
                        if key in images and target.read_bytes() != data:
                            raise ReadingSourceError(
                                f"ambiguous image: {batch.batch_id}/{member.name}"
                            )
                        target.parent.mkdir(parents=True, exist_ok=True)
                        target.write_bytes(data)
                        images[key] = reference
            except (OSError, zipfile.BadZipFile, RuntimeError) as exc:
                raise ReadingSourceError(
                    f"Unable to read image archive {path.name}: {exc}"
                ) from exc
    return images


def _rewrite_images(
    source: str,
    batch_id: str,
    images: dict[tuple[str, str], str],
    missing: set[str],
) -> str:
    def replacement(reference: str) -> str:
        local = images.get((batch_id, _basename(reference)))
        if local is None:
            missing.add(f"{batch_id}: {reference}")
        return local or reference

    def rewrite(text: str) -> str:
        text = re.sub(
            r"(!\[[^\]]*\]\()([^\s)]+)(?=\s|\))",
            lambda m: m[1] + replacement(m[2]),
            text,
        )
        return re.sub(
            r'(<img\b[^>]*?\bsrc=["\x27])([^"\x27]+)',
            lambda m: m[1] + replacement(m[2]),
            text,
            flags=re.IGNORECASE,
        )

    # Image syntax inside source-code examples is not an asset reference.
    lines = source.splitlines(keepends=True)
    offsets = [0]
    for line in lines:
        offsets.append(offsets[-1] + len(line))
    protected = [
        (offsets[token.map[0]], offsets[token.map[1]])
        for token in markdown_reader().parse(source)
        if token.type in {"fence", "code_block"} and token.map is not None
    ]
    protected.extend(
        (m.start(), m.end())
        for m in re.finditer(
            r"(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)",
            source,
        )
    )
    parts = []
    cursor = 0
    for start, end in sorted(protected):
        if end <= cursor:
            continue
        if start > cursor:
            parts.append(rewrite(source[cursor:start]))
        parts.append(source[max(start, cursor) : end])
        cursor = end
    parts.append(rewrite(source[cursor:]))
    return "".join(parts)


def _heading_ranges(source: str) -> list[tuple[str, int, int]]:
    lines = source.splitlines(keepends=True)
    offsets = [0]
    for line in lines:
        offsets.append(offsets[-1] + len(line))
    tokens = markdown_reader().parse(source)
    return [
        (tokens[i + 1].content, offsets[token.map[0]], offsets[token.map[1]])
        for i, token in enumerate(tokens)
        if token.type == "heading_open" and token.map is not None
    ]


def _sections_from_source(
    sections: list[Section],
    document: Document,
    source: str,
    source_path: Path,
) -> list[Section]:
    headings = _heading_ranges(source)
    blocks = {block.id: block for block in document.blocks}
    boundaries: list[tuple[int, int] | None] = []
    cursor = 0
    for section in sections:
        first = blocks.get(section.block_ids[0]) if section.block_ids else None
        if first is None or first.type != "title":
            boundaries.append((0, 0))
        elif not first.text.strip():
            boundaries.append(None)
        elif cursor < len(headings) and _key(first.text) == _key(headings[cursor][0]):
            _, start, end = headings[cursor]
            boundaries.append((start, end))
            cursor += 1
        else:
            raise ReadingSourceError(f"Cannot align JSON section with Markdown: {section.title!r}")
    if cursor != len(headings):
        raise ReadingSourceError("Cannot align all Markdown headings with JSON sections")

    # Some exports have a blank title block (e.g. the J entries in an index).
    # Locate its first text in the bounded Markdown interval, never guess a split.
    for index, boundary in enumerate(boundaries):
        if boundary is not None:
            continue
        preceding = next((b[1] for b in reversed(boundaries[:index]) if b), 0)
        following = next((b[0] for b in boundaries[index + 1 :] if b), len(source))
        content = next(
            (
                blocks[b].text
                for b in sections[index].block_ids
                if b in blocks and blocks[b].type != "title" and blocks[b].text.strip()
            ),
            "",
        )
        needle = _key(content)[:100]
        characters = [(c, i) for i in range(preceding, following) for c in _key(source[i])]
        positions = [offset for _, offset in characters]
        normalized = "".join(c for c, _ in characters)
        match = normalized.find(needle) if needle else -1
        if match < 0 or normalized.find(needle, match + 1) >= 0:
            raise ReadingSourceError("Cannot align a blank JSON heading with Markdown content")
        start = positions[match]
        boundaries[index] = (start, start)

    result = []
    for index, section in enumerate(sections):
        boundary = boundaries[index]
        assert boundary is not None
        next_boundary = boundaries[index + 1] if index + 1 < len(boundaries) else None
        end = next_boundary[0] if next_boundary else len(source)
        result.append(
            section.model_copy(
                update={
                    "text": source[boundary[1] : end].strip(),
                    "metadata": {
                        **section.metadata,
                        "reading_source": "mineru-markdown",
                        "markdown_source": str(source_path),
                        "markdown_start": boundary[1],
                        "markdown_end": end,
                    },
                }
            )
        )
    return result


def prepare_reading_source(
    document: Document,
    sections: list[Section],
    batches: list[ReadingBatch],
    staged_dir: Path,
    final_dir: Path,
) -> tuple[Document, list[Section], dict[str, object]]:
    markdown = [sorted(batch.folder.glob("*.md")) for batch in batches]
    if not any(markdown):
        return (
            document,
            sections,
            {
                "reading_source": "json-legacy",
                "staged_images": 0,
                "warnings": ["Download Markdown exports for faithful rendering."],
            },
        )
    for batch, files in zip(batches, markdown, strict=True):
        if len(files) != 1:
            raise ReadingSourceError(f"Expected one Markdown export for {batch.batch_id}")
    images = _stage_images(batches, staged_dir)
    missing: set[str] = set()
    source = (
        "\n\n".join(
            _rewrite_images(files[0].read_text(), batch.batch_id, images, missing).rstrip("\n")
            for batch, files in zip(batches, markdown, strict=True)
        )
        + "\n"
    )
    if missing:
        raise ReadingSourceError(
            f"Missing {len(missing)} Markdown image(s) in local exports. "
            "Download the companion LaTeX ZIP with images for each batch. "
            + "; ".join(sorted(missing)[:3])
        )
    source_path = final_dir / "source.md"
    updated = []
    for block in document.blocks:
        owner = next(
            (
                b
                for b in batches
                if block.page_idx is not None and b.start_page - 1 <= block.page_idx < b.end_page
            ),
            None,
        )
        reference = (
            images.get((owner.batch_id, _basename(block.asset_path)))
            if owner and block.asset_path
            else None
        )
        if reference:
            block = block.model_copy(
                update={
                    "asset_path": reference,
                    "metadata": {**block.metadata, "original_asset_reference": block.asset_path},
                }
            )
        updated.append(block)
    document = document.model_copy(
        update={
            "blocks": updated,
            "metadata": {
                **document.metadata,
                "reading_source": "mineru-markdown",
                "markdown_source": str(source_path),
            },
        }
    )
    sections = _sections_from_source(sections, document, source, source_path)
    original_count = len(sections)
    sections = group_reading_sections(sections)
    (staged_dir / "source.md").write_text(source)
    return (
        document,
        sections,
        {
            "reading_source": "mineru-markdown",
            "staged_images": len(images),
            "original_sections": original_count,
            "grouped_sections": len(sections),
            "warnings": [f"Image missing from local exports: {item}" for item in sorted(missing)],
        },
    )
