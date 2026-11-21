"""Recover reading hierarchy from flat MinerU title blocks without dropping content."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path

from bookgraph.models import Section
from bookgraph.workspace import WorkspacePaths

_NUMBER = re.compile(r"^(\d+(?:\.\d+)+)\.?\s+\S")
_AUXILIARY = re.compile(
    r"^(references|bibliography|acknowledg(?:ment|ments|ement|ements)|"
    r"symbols and acronyms|symbols|acronyms|appendix|[A-Z]\.\d+\s+appendix)\b",
    re.I,
)
_FRONT = {
    "contents",
    "table of contents",
    "about the editors",
    "about the authors",
    "list of contributors",
    "contributors",
    "preface",
    "foreword",
    "index",
}


def merged_ids(section: Section) -> list[str]:
    raw = section.metadata.get("merged_section_ids")
    try:
        ids = json.loads(raw) if isinstance(raw, str) else [section.id]
    except ValueError:
        return [section.id]
    if not isinstance(ids, list) or not all(
        isinstance(value, str) and value.startswith(section.doc_id + ".") for value in ids
    ):
        return [section.id]
    return ids


def section_aliases(sections: list[Section]) -> dict[str, str]:
    return {old: section.id for section in sections for old in merged_ids(section)}


def _number(section: Section) -> tuple[int, int] | None:
    match = _NUMBER.match(section.title.strip())
    return (int(match[1].split(".")[0]), len(match[1].split("."))) if match else None


def _chapter_candidates(sections: list[Section]) -> dict[int, int]:
    chapters: dict[int, int] = {}
    previous_number = -1
    for index, section in enumerate(sections):
        number = _number(section)
        if number is None:
            continue
        chapter, _ = number
        if chapter not in chapters:
            candidates = [
                i
                for i in range(previous_number + 1, index)
                if sections[i].title.strip().casefold() not in _FRONT
                and not _AUXILIARY.match(sections[i].title.strip())
                and not re.match(
                    r"^(?:[●•]|example\b|and$|section\s+[ivxlcdm]+\b)",
                    sections[i].title.strip(),
                    re.I,
                )
                and sections[i].title.strip()
            ]
            if candidates:
                chapters[chapter] = candidates[-1]
        previous_number = index
    return chapters


def group_reading_sections(sections: list[Section], split_depth: int = 2) -> list[Section]:
    """Keep chapters and N.N units; nest deeper titles and absorb false boundaries.

    The flat sections have already been aligned with exact Markdown spans. Grouping
    changes only boundaries and nested heading markup, never equations, images or
    table bodies. Canonical ids and all source block ids survive in group metadata.
    Books with no numbered structure retain the established heading behavior.
    """
    if (
        not sections
        or not any(_number(section) for section in sections)
        or all(section.metadata.get("segmenter") == "mineru-structured" for section in sections)
    ):
        return sections
    chapter_indices = {index: number for number, index in _chapter_candidates(sections).items()}
    grouped: list[Section] = []
    owner: Section | None = None
    parts: list[Section] = []
    content: list[str] = []
    chapter_title: str | None = None
    front_mode: str | None = None

    def finish() -> None:
        if owner is None:
            return
        pages_start = [part.page_start for part in parts if part.page_start is not None]
        pages_end = [part.page_end for part in parts if part.page_end is not None]
        grouped.append(
            owner.model_copy(
                update={
                    "text": "\n\n".join(piece for piece in content if piece.strip()).strip(),
                    "page_start": min(pages_start) if pages_start else None,
                    "page_end": max(pages_end) if pages_end else None,
                    "block_ids": list(
                        dict.fromkeys(block for part in parts for block in part.block_ids)
                    ),
                    "metadata": {
                        **owner.metadata,
                        "segmenter": "mineru-structured",
                        "split_depth": split_depth,
                        "merged_section_ids": json.dumps([part.id for part in parts]),
                        "markdown_end": parts[-1].metadata.get("markdown_end"),
                        "merged_sections": len(parts),
                    },
                }
            )
        )

    for index, section in enumerate(sections):
        title = section.title.strip()
        normalized = title.casefold()
        number = _number(section)
        level = min(number[1], 6) if number else 3
        boundary = False
        if index in chapter_indices:
            chapter_title = title
            front_mode = None
            level, boundary = 1, True
        elif normalized in _FRONT:
            # Repeated running titles in the contributors/index are not new units.
            boundary = normalized != front_mode
            front_mode = normalized
            chapter_title = None
            level = 1
        elif front_mode in {
            "contents",
            "table of contents",
            "list of contributors",
            "contributors",
            "index",
        }:
            level = 3
        elif number:
            level, boundary = min(number[1], 6), number[1] <= split_depth
        elif _AUXILIARY.match(title):
            level, boundary = 2 if chapter_title else 1, True
        elif owner is None or (chapter_title is None and front_mode is None):
            level, boundary = 1, True
        if boundary or owner is None:
            finish()
            path = [chapter_title, title] if chapter_title and level > 1 else [title]
            owner = section.model_copy(update={"level": level, "heading_path": path})
            parts, content = [section], [section.text]
        else:
            parts.append(section)
            if title:
                # Names/connectors stay in the book, not in its navigation tree.
                heading = (
                    title
                    if front_mode in {"list of contributors", "contributors"}
                    else f"{'#' * level} {title}"
                )
                content.append(heading)
            content.append(section.text)
    finish()
    for index, section in enumerate(grouped):
        section.prev_id = grouped[index - 1].id if index else None
        section.next_id = grouped[index + 1].id if index + 1 < len(grouped) else None
    return grouped


def stage_section_state(
    workspace: WorkspacePaths,
    sections: list[Section],
    staging: Path,
) -> list[tuple[Path, Path]]:
    """Stage updated plans/coverage alongside section output for atomic publication.

    Translation files are never rewritten. Their existing content hashes naturally
    mark changed units stale. A grouped reading unit is complete only if every
    original unit was complete; backups retain the original partial progress.
    """
    if not sections or not any(
        section.metadata.get("merged_sections", 1) != 1 for section in sections
    ):
        return []
    aliases = section_aliases(sections)
    groups = {section.id: merged_ids(section) for section in sections}
    doc_id = sections[0].doc_id
    outputs: list[tuple[Path, Path]] = []
    for folder in [workspace.reading_plans_root, workspace.translation_coverage_root]:
        if not folder.is_dir():
            continue
        staged = staging / folder.name
        changed = False
        for path in folder.glob("*.json"):
            data = json.loads(path.read_text())
            if data.get("doc_id") != doc_id:
                continue
            field = (
                "section_ids" if folder == workspace.reading_plans_root else "target_section_ids"
            )
            old_ids = data.get(field, [])
            new_ids = list(dict.fromkeys(aliases.get(value, value) for value in old_ids))
            if new_ids == old_ids:
                continue
            if not changed:
                shutil.copytree(folder, staged)
            changed = True
            data[field] = new_ids
            if field == "section_ids":
                completed = set(data.get("completed", []))
                data["completed"] = [
                    value
                    for value in new_ids
                    if set(groups.get(value, [value])).issubset(completed)
                ]
            else:
                data["current_section_id"] = None
                data["failed_sections"] = {
                    key: reason
                    for key, reason in data.get("failed_sections", {}).items()
                    if key in new_ids and aliases.get(key, key) == key
                }
            (staged / path.name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        if changed:
            outputs.append((staged, folder))
    return outputs
