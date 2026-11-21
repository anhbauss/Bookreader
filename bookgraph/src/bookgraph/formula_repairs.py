"""Durable, source-keyed AI repair candidates for isolated reader content.

Repairs are never applied to source documents. The browser submits one selected reader
block and a small local context. The server calls the configured provider, validates the
restricted result, and stores it separately from source and translation artifacts.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import re
import stat
import uuid
from collections.abc import Callable
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

from pydantic import BaseModel

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.mcp.loading import _load_doc_sections, _validate_id
from bookgraph.models import Section
from bookgraph.repair_chunks import repair_in_chunks
from bookgraph.translation_provider import TranslationProviderConfig, configured_provider
from bookgraph.translations import section_content_hash
from bookgraph.workspace import WorkspacePaths

RepairKind = Literal["formula", "markdown", "region"]
# A whole reader section is the repair unit. These caps protect the server while
# allowing long mathematical sections to be passed intact to the provider.
_MAX_CONTENT_LENGTH = 100_000
_MAX_CONTEXT_LENGTH = 100_000
_LOGGER = logging.getLogger(__name__)


class ContentRepairView(BaseModel):
    doc_id: str
    section_id: str
    kind: RepairKind
    source_hash: str
    title: str | None = None
    content: str
    repaired_content: str
    created_at: str
    accepted_at: str | None = None


def repair_content(
    workspace: WorkspacePaths,
    doc_id: str,
    section_id: str,
    content: str,
    context: str,
    kind: RepairKind,
    *,
    on_progress: Callable[[int, int], None] | None = None,
    expected_section_hash: str | None = None,
) -> ContentRepairView:
    """Repair one selected formula or Markdown block and persist its candidate."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    sections = _load_doc_sections(workspace, resolved_doc_id)
    current = next((section for section in sections if section.id == section_id), None)
    if current is None:
        raise ReadingServiceError("section is not part of this document")
    snapshot = section_content_hash(current)
    if expected_section_hash is not None and expected_section_hash != snapshot:
        raise ReadingServiceError("Section changed before repair started; reload it and retry.")
    if Path(section_id).name != section_id or section_id in {"", ".", ".."}:
        raise ReadingServiceError("section id is unsafe")
    _validate_input(content, context, kind)
    _LOGGER.info(
        "Starting %s repair for %s/%s (content=%d chars, context=%d chars)",
        kind,
        resolved_doc_id,
        section_id,
        len(content),
        len(context),
    )

    # Delay this import: importing ``bookgraph.cli`` registers the HTTP adapter, which
    # imports this module. Loading configuration at module import time would cycle.
    from bookgraph.cli._config import load_config

    config = load_config(workspace).translation
    # Bound each provider call, rather than imposing one deadline on a whole section.
    timeout_seconds = min(config.timeout_seconds, 60 if kind == "markdown" else 40)
    provider = configured_provider(
        TranslationProviderConfig(
            provider=config.provider,
            base_url=config.base_url,
            model=config.model,
            timeout_seconds=timeout_seconds,
        )
    )
    def validate_part(title: str | None, body: str) -> None:
        if kind == "markdown":
            if title is None:
                raise ReadingServiceError("Repair provider returned no section title.")
            _validate_title(title, sections, section_id)
        _validate_repaired_content(body, content, kind)

    local_context = context.replace(content, "[Selected content is supplied separately.]")[:2400]
    if kind == "formula":
        if on_progress:
            on_progress(1, 1)
        title = None
        repaired = provider.repair_formula(content, context=local_context)
    elif len(content) > 4000:
        identity = json.dumps({
            "version": 1, "source": snapshot, "content": content, "context": context,
            "kind": kind, "provider": config.provider, "base_url": config.base_url,
            "model": config.model,
        }, sort_keys=True)
        directory = (workspace.runs_root / "repair-parts" / resolved_doc_id
                     / _source_hash(section_id) / hashlib.sha256(identity.encode()).hexdigest())
        title, repaired = repair_in_chunks(
            content, context, current.title, kind, provider, directory,
            validate_part, on_progress=on_progress,
        )
    elif kind == "region":
        if on_progress:
            on_progress(1, 1)
        title = None
        repaired = provider.repair_region(content, context=local_context)
    else:
        if on_progress:
            on_progress(1, 1)
        title_context = f"--- CURRENT SECTION TITLE ---\n{current.title}\n--- END CURRENT SECTION TITLE ---\n\n"
        title, repaired = provider.repair_markdown(content, context=title_context + local_context)
        _validate_title(title, sections, section_id)
    _validate_repaired_content(repaired, content, kind)
    latest = next((item for item in _load_doc_sections(workspace, resolved_doc_id)
                   if item.id == section_id), None)
    if latest is None or section_content_hash(latest) != snapshot:
        raise ReadingServiceError("Section changed during repair; reload it and retry.")
    view = ContentRepairView(
        doc_id=resolved_doc_id,
        section_id=section_id,
        kind=kind,
        source_hash=_source_hash(content),
        title=title,
        content=content,
        repaired_content=repaired,
        created_at=datetime.now(UTC).isoformat(),
    )
    _write_repair(workspace, view)
    _LOGGER.info("Completed %s repair for %s/%s", kind, resolved_doc_id, section_id)
    return view


def repair_formula(
    workspace: WorkspacePaths, doc_id: str, section_id: str, formula: str, context: str
) -> ContentRepairView:
    """Compatibility wrapper for the former formula-only API."""

    return repair_content(workspace, doc_id, section_id, formula, context, "formula")


def get_accepted_repair(
    workspace: WorkspacePaths, doc_id: str, section_id: str
) -> ContentRepairView | None:
    """Return the newest accepted repair for a section, if the user committed one."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    if section_id not in {section.id for section in _load_doc_sections(workspace, resolved_doc_id)}:
        raise ReadingServiceError("section is not part of this document")
    directory = workspace.formula_repairs_root / resolved_doc_id / section_id
    accepted: list[ContentRepairView] = []
    for path in (directory.glob("*.json") if directory.is_dir() else []):
        try:
            view = ContentRepairView.model_validate_json(path.read_text())
        except (OSError, ValueError):
            continue
        if view.doc_id == resolved_doc_id and view.section_id == section_id and view.accepted_at:
            accepted.append(view)
    return max(accepted, key=lambda view: view.accepted_at or "") if accepted else None


def accept_repair(
    workspace: WorkspacePaths, doc_id: str, section_id: str, source_hash: str
) -> ContentRepairView:
    """Permanently accept an already validated repair candidate."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    if section_id not in {section.id for section in _load_doc_sections(workspace, resolved_doc_id)}:
        raise ReadingServiceError("section is not part of this document")
    if Path(section_id).name != section_id or section_id in {"", ".", ".."}:
        raise ReadingServiceError("section id is unsafe")
    if not source_hash or any(character not in "0123456789abcdef" for character in source_hash):
        raise ReadingServiceError("repair id is invalid")
    path = workspace.formula_repairs_root / resolved_doc_id / section_id / f"{source_hash}.json"
    try:
        view = ContentRepairView.model_validate_json(path.read_text())
    except (OSError, ValueError) as exc:
        raise ReadingServiceError("repair candidate was not found") from exc
    if view.doc_id != resolved_doc_id or view.section_id != section_id or view.source_hash != source_hash:
        raise ReadingServiceError("repair candidate is invalid")
    if view.kind != "markdown" or not view.title:
        raise ReadingServiceError("only a complete Markdown section repair can be saved")
    # Reader content is emitted from the generated MDX/Markdown bridge, whereas the
    # manifest stores the pre-bridge source text. Those representations legitimately
    # differ (for example display-math delimiters and escaped TeX braces), so comparing
    # ``section.text`` to the browser candidate falsely rejects every valid save.
    # The candidate itself is already manifest-scoped, schema-validated and addressed
    # by a content hash; commit its repaired Markdown body to the section source.
    _write_section_repair(workspace, resolved_doc_id, section_id, view.title, view.repaired_content)
    _write_manifest_repair(
        workspace, resolved_doc_id, section_id, view.title, view.repaired_content
    )
    accepted = view.model_copy(update={"accepted_at": datetime.now(UTC).isoformat()})
    _write_repair(workspace, accepted)
    return accepted


def _write_section_repair(
    workspace: WorkspacePaths, doc_id: str, section_id: str, title: str, body: str
) -> None:
    """Atomically update title metadata and body in one Markdown section source."""

    path = workspace.sources_sections / doc_id / f"{section_id}.md"
    try:
        source = path.read_text()
    except OSError as exc:
        raise ReadingServiceError("section source could not be saved") from exc
    marker = "---\n"
    if not source.startswith(marker):
        raise ReadingServiceError("section source has invalid frontmatter")
    end = source.find(marker, len(marker))
    if end < 0:
        raise ReadingServiceError("section source has invalid frontmatter")
    fields = source[len(marker):end].splitlines()
    updated = [f"title: {json.dumps(title)}" if line.startswith("title: ") else line for line in fields]
    frontmatter = marker + "\n".join(updated) + "\n" + marker
    _atomic_write(path, f"{frontmatter}\n\n{body.strip()}\n")


def _write_manifest_repair(
    workspace: WorkspacePaths, doc_id: str, section_id: str, title: str, text: str
) -> None:
    """Keep the canonical manifest's title *and text* in sync with an accepted repair."""

    path = workspace.sources_sections / doc_id / "sections.jsonl"
    sections = _load_doc_sections(workspace, doc_id)
    updated = []
    for section in sections:
        if section.id != section_id:
            updated.append(section)
            continue
        heading_path = [*section.heading_path]
        if heading_path:
            heading_path[-1] = title
        updated.append(
            section.model_copy(update={"title": title, "heading_path": heading_path, "text": text})
        )
    _atomic_write(path, "".join(section.model_dump_json() + "\n" for section in updated))


def _atomic_write(path: Path, content: str) -> None:
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o666)
    try:
        with os.fdopen(fd, "w") as handle:
            handle.write(content)
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temporary, path)
    except BaseException:
        temporary.unlink(missing_ok=True)
        raise


def _validate_title(title: str, sections: list[Section], section_id: str) -> None:
    if not title or len(title) > 300 or "\n" in title or "<" in title or ">" in title:
        raise ReadingServiceError("Content repair provider returned an invalid section title.")
    original = next(section for section in sections if getattr(section, "id") == section_id)
    match = re.match(r"^\s*(\d+(?:\.\d+)*\.?)(?:\s+|$)", getattr(original, "title"))
    if match and not title.startswith(match.group(1)):
        raise ReadingServiceError("Content repair provider did not preserve the section number.")


def _validate_input(content: str, context: str, kind: RepairKind) -> None:
    if not isinstance(content, str) or not content.strip() or len(content) > _MAX_CONTENT_LENGTH:
        raise ReadingServiceError("content must be non-empty and within the size limit")
    if not isinstance(context, str) or len(context) > _MAX_CONTEXT_LENGTH:
        raise ReadingServiceError("content context is too long")
    if kind not in {"formula", "markdown", "region"}:
        raise ReadingServiceError("content repair kind is invalid")
    # Markdown prose can legitimately contain comparison signs and legacy <sub>/<sup>
    # tags from the source parser. Only TeX repair has a delimiter restriction.
    if kind == "formula" and ("$" in content or "<" in content or ">" in content):
        raise ReadingServiceError("formula contains unsupported HTML or delimiters")


def _validate_repaired_content(repaired: str, original: str, kind: RepairKind) -> None:
    if len(repaired) > _MAX_CONTENT_LENGTH:
        raise ReadingServiceError("Content repair provider returned unsafe content.")
    if kind == "markdown":
        _validate_markdown_repair(repaired)
    if kind == "region":
        _validate_markdown_repair(repaired)
    if kind == "formula":
        if "$" in repaired or "<" in repaired or ">" in repaired or not _balanced_tex_braces(repaired):
            raise ReadingServiceError("Formula repair provider returned invalid TeX.")


def _balanced_tex_braces(tex: str) -> bool:
    """Check raw brace balance while ignoring escaped braces such as ``\\{``.

    A piecewise function written as ``\\left\\{ ... \\right.`` is valid TeX but has no
    literal closing ``}`` for the escaped opening brace, so a naive ``count("{")`` check
    wrongly rejects it. Skipping an escaped brace (and the command it belongs to) avoids
    that false rejection while still catching genuinely malformed input.
    """

    depth = 0
    index = 0
    while index < len(tex):
        char = tex[index]
        if char == "\\":
            # Skip the backslash and the next character: either an escaped brace or the
            # first letter of a command such as ``\left`` or ``\frac``.
            index += 2
            continue
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth < 0:
                return False
        index += 1
    return depth == 0


def _validate_markdown_repair(content: str) -> None:
    """Permit safe legacy markup while blocking executable or embedded browser content."""

    lowered = content.lower()
    forbidden = ("<script", "</script", "<style", "</style", "<iframe", "<object", "<embed", "javascript:", "data:text/html")
    if any(token in lowered for token in forbidden):
        raise ReadingServiceError("Content repair provider returned unsafe markup.")


def _source_hash(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()[:24]


def _repair_path(workspace: WorkspacePaths, view: ContentRepairView) -> Path:
    return workspace.formula_repairs_root / view.doc_id / view.section_id / f"{view.source_hash}.json"


def _write_repair(workspace: WorkspacePaths, view: ContentRepairView) -> None:
    path = _repair_path(workspace, view)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o666)
    try:
        with os.fdopen(fd, "w") as handle:
            handle.write(view.model_dump_json(indent=2) + "\n")
            handle.flush()
            os.fsync(handle.fileno())
        try:
            os.chmod(temporary, stat.S_IMODE(path.stat().st_mode))
        except FileNotFoundError:
            pass
        os.replace(temporary, path)
    except BaseException:
        temporary.unlink(missing_ok=True)
        raise
