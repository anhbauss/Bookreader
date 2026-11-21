"""Short HTTP requests around durable, resumable background repair work."""

from __future__ import annotations

import hashlib
import json
import logging
import os
import re
import threading
from datetime import UTC, datetime
from pathlib import Path
from typing import Literal

from pydantic import BaseModel

from bookgraph.formula_repairs import (
    ContentRepairView,
    RepairKind,
    _atomic_write,
    _validate_input,
    repair_content,
)
from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.mcp.loading import _load_doc_sections, _validate_id
from bookgraph.reading_plans import plan_lock
from bookgraph.translations import section_content_hash
from bookgraph.workspace import WorkspacePaths

_LOGGER = logging.getLogger(__name__)
_ACTIVE: set[Path] = set()
_GUARD = threading.Lock()


class RepairJobView(BaseModel):
    job_id: str
    status: Literal["queued", "running", "ready", "failed"]
    current_part: int = 0
    total_parts: int = 0
    error: str | None = None
    result: ContentRepairView | None = None
    updated_at: str


class _RepairJob(RepairJobView):
    doc_id: str
    section_id: str
    kind: RepairKind
    content: str
    context: str
    section_hash: str
    owner_pid: int


def _now() -> str:
    return datetime.now(UTC).isoformat()


def _job_path(workspace: WorkspacePaths, doc_id: str, section_id: str, job_id: str) -> Path:
    _validate_id(doc_id, "doc_id")
    if Path(section_id).name != section_id or section_id in {"", ".", ".."}:
        raise ReadingServiceError("section id is unsafe")
    if not re.fullmatch(r"[a-f0-9]{64}", job_id):
        raise ReadingServiceError("repair job id is invalid")
    return workspace.formula_repairs_root / doc_id / section_id / "jobs" / f"{job_id}.json"


def _read(path: Path) -> _RepairJob:
    try:
        return _RepairJob.model_validate_json(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as exc:
        raise ReadingServiceError("Repair job was not found or could not be read.") from exc


def _write(path: Path, job: _RepairJob) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    _atomic_write(path, job.model_dump_json(indent=2))


def _public(job: _RepairJob) -> RepairJobView:
    return RepairJobView.model_validate(job.model_dump())


def _owner_alive(path: Path, job: _RepairJob) -> bool:
    if job.owner_pid <= 0:
        return False
    if job.owner_pid == os.getpid():
        with _GUARD:
            return path in _ACTIVE
    try:
        os.kill(job.owner_pid, 0)
        return True
    except (OSError, ValueError):
        return False


def start_repair_job(
    workspace: WorkspacePaths,
    doc_id: str,
    section_id: str,
    content: str,
    context: str,
    kind: RepairKind,
) -> RepairJobView:
    from bookgraph.cli._config import load_config

    resolved_doc = _validate_id(doc_id, "doc_id")
    sections = _load_doc_sections(workspace, resolved_doc)
    section = next((item for item in sections if item.id == section_id), None)
    if section is None:
        raise ReadingServiceError("section is not part of this document")
    _validate_input(content, context, kind)
    config = load_config(workspace).translation
    snapshot = section_content_hash(section)
    identity = json.dumps(
        {
            "version": 1,
            "doc_id": resolved_doc,
            "section_id": section_id,
            "source": snapshot,
            "kind": kind,
            "content": content,
            "context": context,
            "provider": config.provider,
            "base_url": config.base_url,
            "model": config.model,
        },
        sort_keys=True,
    )
    job_id = hashlib.sha256(identity.encode()).hexdigest()
    path = _job_path(workspace, resolved_doc, section_id, job_id)
    with plan_lock(path):
        if path.exists():
            previous = _read(path)
            if previous.status == "ready" or (
                previous.status in {"queued", "running"} and _owner_alive(path, previous)
            ):
                return _public(previous)
        job = _RepairJob(
            job_id=job_id,
            doc_id=resolved_doc,
            section_id=section_id,
            kind=kind,
            content=content,
            context=context,
            section_hash=snapshot,
            owner_pid=os.getpid(),
            status="queued",
            updated_at=_now(),
        )
        with _GUARD:
            _ACTIVE.add(path)
        _write(path, job)
    try:
        threading.Thread(
            target=_run, args=(workspace, path), daemon=True, name=f"repair-{job_id[:12]}"
        ).start()
    except Exception:
        with _GUARD:
            _ACTIVE.discard(path)
        raise
    return _public(job)


def get_repair_job(
    workspace: WorkspacePaths,
    doc_id: str,
    section_id: str,
    job_id: str,
) -> RepairJobView:
    path = _job_path(workspace, doc_id, section_id, job_id)
    with plan_lock(path):
        job = _read(path)
        if job.doc_id != doc_id or job.section_id != section_id:
            raise ReadingServiceError("repair job does not match this section")
        if job.status in {"queued", "running"} and not _owner_alive(path, job):
            job = job.model_copy(
                update={
                    "status": "failed",
                    "updated_at": _now(),
                    "error": "Repair was interrupted. Completed parts are saved; retry to resume.",
                }
            )
            _write(path, job)
    return _public(job)


def _update(path: Path, **values: object) -> None:
    with plan_lock(path):
        job = _read(path)
        _write(path, job.model_copy(update={**values, "updated_at": _now()}))


def _run(workspace: WorkspacePaths, path: Path) -> None:
    try:
        job = _read(path)
        _update(path, status="running")
        result = repair_content(
            workspace,
            job.doc_id,
            job.section_id,
            job.content,
            job.context,
            job.kind,
            expected_section_hash=job.section_hash,
            on_progress=lambda current, total: _update(
                path,
                current_part=current,
                total_parts=total,
            ),
        )
        _update(path, status="ready", result=result)
    except ReadingServiceError as exc:
        _update(path, status="failed", error=str(exc))
    except Exception:
        _LOGGER.exception("Repair worker failed")
        _update(
            path, status="failed", error="Repair failed unexpectedly. Retry to resume saved parts."
        )
    finally:
        with _GUARD:
            _ACTIVE.discard(path)
