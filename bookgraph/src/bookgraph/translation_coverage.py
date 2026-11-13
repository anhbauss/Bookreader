"""Durable progressive translation coverage for one document and language.

Coverage records describe *requested work*, while per-section translation artifacts remain
the source of truth for whether a section is actually readable.  They live under
``runs/translation-coverage`` so source sections and translation artifacts are never
mutated outside their existing writers.
"""

from __future__ import annotations

import logging
import math
import os
import stat
import threading
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.mcp.loading import _load_doc_sections, _validate_id
from bookgraph.mcp.translation_tools import get_section_translation, write_section_translation
from bookgraph.models import Section
from bookgraph.translation_provider import TranslationProviderConfig, configured_provider
from bookgraph.workspace import WorkspacePaths

CoverageStatus = Literal["missing", "queued", "running", "ready", "failed"]
_LOGGER = logging.getLogger(__name__)


class TranslationCoverageRecord(BaseModel):
    doc_id: str
    lang: str
    requested_percent: int
    target_section_ids: list[str] = Field(default_factory=list)
    failed_sections: dict[str, str] = Field(default_factory=dict)
    current_section_id: str | None = None
    updated_at: str | None = None


class TranslationCoverageView(BaseModel):
    doc_id: str
    lang: str
    requested_percent: int
    total_sections: int
    target_sections: int
    ready_sections: int
    pending_sections: int
    failed_sections: int
    status: CoverageStatus
    current_section_id: str | None = None
    next_section_id: str | None = None
    failures: dict[str, str] = Field(default_factory=dict)


_LOCKS: dict[Path, threading.Lock] = {}
_LOCKS_GUARD = threading.Lock()
_WORKERS: set[Path] = set()
_WORKERS_GUARD = threading.Lock()


def get_translation_coverage(
    workspace: WorkspacePaths, doc_id: str, lang: str
) -> TranslationCoverageView:
    """Return public progress, deriving readiness from fresh section artifacts."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    sections = _load_doc_sections(workspace, resolved_doc_id)
    record = _read_record(_record_path(workspace, resolved_doc_id, lang))
    if record is None:
        return TranslationCoverageView(
            doc_id=resolved_doc_id,
            lang=lang,
            requested_percent=0,
            total_sections=len(sections),
            target_sections=0,
            ready_sections=0,
            pending_sections=0,
            failed_sections=0,
            status="missing",
        )
    target = record.target_section_ids
    fresh_ids = {
        section_id
        for section_id in target
        if get_section_translation(workspace, resolved_doc_id, section_id, lang, False).status
        == "fresh"
    }
    failures = {key: value for key, value in record.failed_sections.items() if key in target}
    pending = [
        section_id
        for section_id in target
        if section_id not in fresh_ids and section_id not in failures
    ]
    status: CoverageStatus
    if record.current_section_id:
        status = "running"
    elif failures:
        status = "failed"
    elif pending:
        status = "queued"
    else:
        status = "ready"
    next_section_id = _next_uncovered(sections, target)
    return TranslationCoverageView(
        doc_id=resolved_doc_id,
        lang=lang,
        requested_percent=record.requested_percent,
        total_sections=len(sections),
        target_sections=len(target),
        ready_sections=len(fresh_ids),
        pending_sections=len(pending),
        failed_sections=len(failures),
        status=status,
        current_section_id=record.current_section_id,
        next_section_id=next_section_id,
        failures=failures,
    )


def request_translation_coverage(
    workspace: WorkspacePaths, doc_id: str, lang: str, percent: int
) -> TranslationCoverageView:
    """Persist a requested prefix of the document; a worker performs the network work."""

    if percent not in {5, 10, 25, 100}:
        raise ReadingServiceError("translation coverage percent must be one of 5, 10, 25, or 100")
    resolved_doc_id = _validate_id(doc_id, "doc_id")
    sections = _load_doc_sections(workspace, resolved_doc_id)
    count = min(len(sections), max(1, math.ceil(len(sections) * percent / 100)))
    path = _record_path(workspace, resolved_doc_id, lang)
    with _record_lock(path):
        old = _read_record(path)
        # Never silently shrink an already chosen prefix; choosing a larger percentage extends it.
        target_count = count if old is None else max(len(old.target_section_ids), count)
        target = [section.id for section in sections[:target_count]]
        old_failures = old.failed_sections if old else {}
        record = TranslationCoverageRecord(
            doc_id=resolved_doc_id,
            lang=lang,
            requested_percent=max(percent, old.requested_percent) if old else percent,
            target_section_ids=target,
            failed_sections={key: value for key, value in old_failures.items() if key in target},
            updated_at=_now(),
        )
        _write_record(record, path)
    return get_translation_coverage(workspace, resolved_doc_id, lang)


def request_next_translation(
    workspace: WorkspacePaths, doc_id: str, lang: str, current_section_id: str
) -> TranslationCoverageView:
    """Extend coverage by the immediate section after ``current_section_id`` only."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    sections = _load_doc_sections(workspace, resolved_doc_id)
    ids = [section.id for section in sections]
    try:
        position = ids.index(current_section_id)
    except ValueError as exc:
        raise ReadingServiceError("current section is not part of this document") from exc
    if position + 1 >= len(ids):
        return get_translation_coverage(workspace, resolved_doc_id, lang)
    target_id = ids[position + 1]
    path = _record_path(workspace, resolved_doc_id, lang)
    with _record_lock(path):
        old = _read_record(path) or TranslationCoverageRecord(
            doc_id=resolved_doc_id, lang=lang, requested_percent=0
        )
        target = ids[: max(len(old.target_section_ids), position + 2)]
        failures = {key: value for key, value in old.failed_sections.items() if key in target}
        failures.pop(target_id, None)  # explicit next action also retries that section
        _write_record(
            old.model_copy(
                update={
                    "target_section_ids": target,
                    "failed_sections": failures,
                    "updated_at": _now(),
                }
            ),
            path,
        )
    return get_translation_coverage(workspace, resolved_doc_id, lang)


def run_requested_translations(workspace: WorkspacePaths, doc_id: str, lang: str) -> None:
    """Translate pending requested sections. Called only by the backend worker thread."""

    resolved_doc_id = _validate_id(doc_id, "doc_id")
    path = _record_path(workspace, resolved_doc_id, lang)
    with _WORKERS_GUARD:
        if path in _WORKERS:
            return
        _WORKERS.add(path)
    try:
        _run_requested_translations(workspace, resolved_doc_id, lang, path)
    finally:
        with _WORKERS_GUARD:
            _WORKERS.discard(path)


def _run_requested_translations(
    workspace: WorkspacePaths, resolved_doc_id: str, lang: str, path: Path
) -> None:
    provider = None
    model: str | None = None
    while True:
        with _record_lock(path):
            record = _read_record(path)
            if record is None:
                return
            pending = _pending_ids(workspace, record)
            if not pending:
                if record.current_section_id is not None:
                    completed = record.model_copy(
                        update={"current_section_id": None, "updated_at": _now()}
                    )
                    _write_record(completed, path)
                return
            section_id = pending[0]
            record = record.model_copy(
                update={"current_section_id": section_id, "updated_at": _now()}
            )
            _write_record(record, path)
        try:
            if provider is None:
                # Import only when a backend worker needs configuration. Importing
                # ``bookgraph.cli`` at module load time registers every Typer command,
                # including the HTTP adapter that imports this coverage module.
                from bookgraph.cli._config import load_config

                config = load_config(workspace).translation
                model = config.model
                provider = configured_provider(
                    TranslationProviderConfig(
                        provider=config.provider,
                        base_url=config.base_url,
                        model=config.model,
                        timeout_seconds=config.timeout_seconds,
                    )
                )
            section = next(
                item
                for item in _load_doc_sections(workspace, resolved_doc_id)
                if item.id == section_id
            )
            translated = provider.translate_section(section.text, target_language=lang)
            write_section_translation(
                workspace,
                resolved_doc_id,
                section_id,
                lang,
                content=translated,
                includes_assets=_section_has_asset_markdown(section.text),
                model=model,
            )
        except (ReadingServiceError, StopIteration) as exc:
            _LOGGER.warning("Translation of %s failed: %s", section_id, exc)
            _record_failure(path, section_id, "Translation failed validation or provider request.")
            return
        except Exception:  # pragma: no cover - final guard for background worker isolation
            _LOGGER.exception("Translation of %s failed unexpectedly", section_id)
            _record_failure(path, section_id, "Translation worker failed unexpectedly.")
            return
        with _record_lock(path):
            latest = _read_record(path)
            if latest:
                _write_record(
                    latest.model_copy(
                        update={
                            "current_section_id": None,
                            "failed_sections": {
                                key: value
                                for key, value in latest.failed_sections.items()
                                if key != section_id
                            },
                            "updated_at": _now(),
                        }
                    ),
                    path,
                )


def _pending_ids(workspace: WorkspacePaths, record: TranslationCoverageRecord) -> list[str]:
    return [
        section_id
        for section_id in record.target_section_ids
        if section_id not in record.failed_sections
        and get_section_translation(workspace, record.doc_id, section_id, record.lang, False).status
        != "fresh"
    ]


def _section_has_asset_markdown(source: str) -> bool:
    return "![" in source or "<img " in source


def _record_failure(path: Path, section_id: str, message: str) -> None:
    with _record_lock(path):
        record = _read_record(path)
        if record is None:
            return
        failures = {**record.failed_sections, section_id: message}
        failed = record.model_copy(
            update={
                "failed_sections": failures,
                "current_section_id": None,
                "updated_at": _now(),
            }
        )
        _write_record(failed, path)


def _next_uncovered(sections: list[Section], target_ids: list[str]) -> str | None:
    target = set(target_ids)
    return next((section.id for section in sections if section.id not in target), None)


def _record_path(workspace: WorkspacePaths, doc_id: str, lang: str) -> Path:
    safe_lang = lang.strip().lower()
    valid_characters = "abcdefghijklmnopqrstuvwxyz0123456789-"
    if not safe_lang or any(character not in valid_characters for character in safe_lang):
        raise ReadingServiceError("invalid translation language")
    return workspace.translation_coverage_root / f"{doc_id}.{safe_lang}.json"


def _read_record(path: Path) -> TranslationCoverageRecord | None:
    if not path.is_file():
        return None
    try:
        return TranslationCoverageRecord.model_validate_json(path.read_text())
    except (OSError, ValueError) as exc:
        raise ReadingServiceError("translation coverage record is invalid") from exc


def _write_record(record: TranslationCoverageRecord, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    fd = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o666)
    try:
        with os.fdopen(fd, "w") as handle:
            handle.write(record.model_dump_json(indent=2) + "\n")
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


def _record_lock(path: Path) -> threading.Lock:
    key = path.resolve()
    with _LOCKS_GUARD:
        lock = _LOCKS.setdefault(key, threading.Lock())
    return lock


def _now() -> str:
    return datetime.now(UTC).isoformat()
