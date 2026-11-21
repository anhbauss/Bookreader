"""Resumable repair of long Markdown without splitting equations, tables or code."""

from __future__ import annotations

import hashlib
import json
import os
import uuid
from collections.abc import Callable
from pathlib import Path
from typing import Literal, Protocol

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.translation_chunks import split_translation_chunks


class MarkdownRepairer(Protocol):
    def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]: ...

    def repair_region(self, content: str, *, context: str) -> str: ...


def _hash(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def repair_in_chunks(
    content: str,
    context: str,
    original_title: str,
    kind: Literal["markdown", "region"],
    provider: MarkdownRepairer,
    directory: Path,
    validate: Callable[[str | None, str], None],
    *,
    max_chars: int = 4000,
    on_progress: Callable[[int, int], None] | None = None,
) -> tuple[str | None, str]:
    """Checkpoint only validated parts; return one assembled, unpublished candidate."""
    chunks = split_translation_chunks(content, max_chars=max_chars)
    # The browser used to duplicate the whole section in context. Exclude that
    # duplication and send bounded neighboring text instead.
    user_context = context.replace(content, "[Content is supplied in parts below.]")[:1200]
    title: str | None = None
    parts: list[str] = []
    offset = 0
    for index, source in enumerate(chunks, start=1):
        if on_progress:
            on_progress(index, len(chunks))
        path = directory / f"part-{index:05d}.json"
        repaired: str | None = None
        part_title: str | None = None
        try:
            cached = json.loads(path.read_text(encoding="utf-8"))
            candidate = cached["body"]
            candidate_title = cached["title"]
            if (
                cached["source_hash"] == _hash(source)
                and isinstance(candidate, str)
                and cached["body_hash"] == _hash(candidate)
                and (candidate_title is None or isinstance(candidate_title, str))
                and cached["title_hash"] == _hash(candidate_title or "")
            ):
                validate(candidate_title, candidate)
                repaired, part_title = candidate, candidate_title
        except (OSError, ValueError, KeyError, TypeError, ReadingServiceError):
            pass
        if repaired is None:
            local_context = (
                f"--- CURRENT SECTION TITLE ---\n{original_title}\n"
                "--- END CURRENT SECTION TITLE ---\n"
                f"Repair part {index} of {len(chunks)} only. Return the same section title. "
                "Neighboring text is context only; do not include it in the result.\n"
                f"--- USER CONTEXT ---\n{user_context}\n"
                f"--- BEFORE ---\n{content[max(0, offset - 1000) : offset]}\n"
                f"--- AFTER ---\n{content[offset + len(source) : offset + len(source) + 1000]}"
            )
            terminal = f"BOOKGRAPH_REPAIR_END_{_hash(source)[:16]}"
            request = f"{source.strip()}\n\n{terminal}"
            try:
                if kind == "markdown":
                    part_title, result = provider.repair_markdown(request, context=local_context)
                else:
                    part_title = None
                    result = provider.repair_region(request, context=local_context)
                result = result.strip()
                if result.count(terminal) != 1 or not result.endswith(terminal):
                    raise ReadingServiceError(
                        "Repair is incomplete: end-of-part marker is missing."
                    )
                body = result[: -len(terminal)].strip()
                if not body:
                    raise ReadingServiceError("Repair provider returned an empty part.")
                leading = source[: len(source) - len(source.lstrip())]
                trailing = source[len(source.rstrip()) :]
                repaired = leading + body + trailing
                validate(part_title, repaired)
            except ReadingServiceError as exc:
                raise ReadingServiceError(
                    f"Repair part {index}/{len(chunks)} failed: {exc} "
                    "Completed parts are saved; retry to resume."
                ) from exc
            directory.mkdir(parents=True, exist_ok=True)
            temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
            try:
                temporary.write_text(
                    json.dumps(
                        {
                            "source_hash": _hash(source),
                            "title": part_title,
                            "body": repaired,
                            "body_hash": _hash(repaired),
                            "title_hash": _hash(part_title or ""),
                        },
                        ensure_ascii=False,
                    ),
                    encoding="utf-8",
                )
                os.replace(temporary, path)
            finally:
                temporary.unlink(missing_ok=True)
        if index == 1:
            title = part_title
        parts.append(repaired)
        offset += len(source)
    return title, "".join(parts)
