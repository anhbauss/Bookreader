"""Durable, explicit resume positions, independent of completed reading plans."""

from __future__ import annotations

import json
import os
import re
import tempfile

from bookgraph.mcp import service
from bookgraph.mcp.errors import InvalidIdError, ReadingServiceError, SectionNotFoundError
from bookgraph.mcp.loading import _validate_id
from bookgraph.workspace import WorkspacePaths


def reading_position(
    workspace: WorkspacePaths, doc_id: str, *, section_id: str | None = None,
    update: bool = False,
) -> dict[str, str | None]:
    """Read, replace, or clear the single saved section for a document."""
    _validate_id(doc_id, "doc_id")
    path = workspace.annotations_root / "reading-positions" / f"{doc_id}.json"
    try:
        if update:
            if section_id is None:
                path.unlink(missing_ok=True)
            else:
                if not re.fullmatch(r"[a-z0-9]+(?:[.-][a-z0-9]+)*", section_id):
                    raise InvalidIdError("Invalid section_id.")
                section_id = service.get_section(
                    workspace, doc_id, section_id, include_assets=False
                ).id
                path.parent.mkdir(parents=True, exist_ok=True)
                # Readers always see a complete record, including during a crash.
                with tempfile.NamedTemporaryFile(
                    mode="w", dir=path.parent, suffix=".tmp", delete=False
                ) as stream:
                    temporary = stream.name
                    try:
                        json.dump({"section_id": section_id}, stream)
                        stream.flush()
                        os.fsync(stream.fileno())
                        os.replace(temporary, path)
                    finally:
                        if os.path.exists(temporary):
                            os.unlink(temporary)
        elif path.exists():
            saved = json.loads(path.read_text(encoding="utf-8"))
            section_id = saved["section_id"]
            if not isinstance(section_id, str):
                raise ValueError("Invalid saved section")
            try:
                section_id = service.get_section(
                    workspace, doc_id, section_id, include_assets=False
                ).id
            except SectionNotFoundError:
                # A removed section must not prevent opening the book.
                section_id = None
    except (OSError, ValueError, KeyError, TypeError) as exc:
        raise ReadingServiceError("Unable to access the saved reading position.") from exc
    return {"doc_id": doc_id, "section_id": section_id}
