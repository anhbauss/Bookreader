"""Cached bibliographic metadata and AI-selected catalog covers for the reader."""

from __future__ import annotations

import base64
import hashlib
import json
import logging
import os
import re
import shutil
import subprocess
import tempfile
import unicodedata
import uuid
from datetime import UTC, datetime
from pathlib import Path
from typing import Any, Literal

from pydantic import BaseModel, Field

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.reading_plans import plan_lock
from bookgraph.translation_provider import TranslationProviderConfig, configured_provider
from bookgraph.workspace import WorkspacePaths

_LOGGER = logging.getLogger(__name__)


class BookMetadata(BaseModel):
    version: int = 1
    cover_review_version: int = 1
    doc_id: str
    title: str
    authors: list[str] = Field(default_factory=list)
    editors: list[str] = Field(default_factory=list)
    publisher: str | None = None
    publication_year: int | None = None
    cover_path: str | None = None
    cover_status: Literal[
        "unchecked", "selected", "no_match", "no_candidate", "failed"
    ] = "unchecked"
    cover_error: str | None = None
    ai_status: Literal["not_requested", "running", "ready", "needs_review", "failed"] = (
        "not_requested"
    )
    source: Literal["local", "ai"] = "local"
    source_signature: str
    model: str | None = None
    error: str | None = None
    updated_at: str


def read_book_metadata(workspace: WorkspacePaths, doc_id: str) -> BookMetadata | None:
    try:
        value = BookMetadata.model_validate_json(
            (workspace.root / "book-metadata.json").read_text()
        )
        return value if value.doc_id == doc_id else None
    except (OSError, ValueError):
        return None


def _object(path: Path) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except (OSError, ValueError):
        return {}


def _source(workspace: WorkspacePaths) -> tuple[str, dict[str, Any], dict[str, Any]]:
    manifest = _object(workspace.root / "mineru" / "manifest.json")
    documents = list(workspace.sources_parsed.glob("*/document.json"))
    if len(documents) == 1:
        document = _object(documents[0])
        if isinstance(document.get("doc_id"), str):
            return document["doc_id"], document, manifest
    if isinstance(manifest.get("doc_id"), str):
        return manifest["doc_id"], {}, manifest
    raise ReadingServiceError("Book metadata requires a registered PDF or one parsed document.")


def _source_pdf(workspace: WorkspacePaths, manifest: dict[str, Any]) -> Path | None:
    filename = manifest.get("source_pdf")
    if isinstance(filename, str):
        # Registered sources stay inside the selected book workspace.
        candidate = (workspace.sources_inbox / filename).resolve()
        if not candidate.is_relative_to(workspace.root.resolve()):
            return None
        if candidate.is_file() and candidate.suffix.lower() == ".pdf":
            return candidate
    candidates = list(workspace.sources_inbox.glob("*.pdf"))
    candidates += list(workspace.sources_inbox.glob("*/original.pdf"))
    if len(candidates) == 1:
        candidate = candidates[0].resolve()
        return candidate if candidate.is_relative_to(workspace.root.resolve()) else None
    return None


def _signature(workspace: WorkspacePaths, doc_id: str, pdf: Path | None) -> str:
    parts: list[tuple[str, int, int]] = []
    paths = [
        workspace.sources_parsed / doc_id / "document.json",
        workspace.root / "mineru/manifest.json",
    ]
    if pdf:
        paths.append(pdf)
    for path in paths:
        if path.is_file():
            stat = path.stat()
            parts.append((str(path), stat.st_size, stat.st_mtime_ns))
    return hashlib.sha256(json.dumps(parts).encode()).hexdigest()


def _pdf_evidence(pdf: Path) -> tuple[str, str | None, list[str]]:
    try:
        from pypdf import PdfReader
    except ImportError:
        return "", None, []
    try:
        reader = PdfReader(pdf)
        metadata = reader.metadata
        title = metadata.title if metadata else None
        author = metadata.author if metadata else None
        text: list[str] = []
        for page in reader.pages[:5]:
            try:
                text.append((page.extract_text() or "")[:6000])
            except Exception:
                continue
        names = re.split(r"\s*;\s*|\s+and\s+", author) if isinstance(author, str) else []
        names = [name.strip() for name in names if _usable_name(name)]
        hints = f"PDF title: {title or ''}\nPDF author: {author or ''}\n"
        return (hints + "\n".join(text))[:16000], title, names
    except Exception:
        return "", None, []


def _usable_name(value: str) -> bool:
    return (
        bool(value.strip())
        and len(value) <= 200
        and value.strip().casefold()
        not in {
            "unknown",
            "author",
            "admin",
            "administrator",
            "user",
            "none",
        }
    )


def _evidence(document: dict[str, Any], pdf: Path | None) -> tuple[str, str | None, list[str]]:
    pdf_text, title, authors = _pdf_evidence(pdf) if pdf else ("", None, [])
    blocks = document.get("blocks", [])
    text: list[str] = []
    first_title: str | None = None
    for block in blocks if isinstance(blocks, list) else []:
        if not isinstance(block, dict):
            continue
        page = block.get("page_idx")
        if isinstance(page, int) and page > 4:
            continue
        value = block.get("text")
        if not isinstance(value, str) or not value.strip():
            continue
        if block.get("type") == "title" and first_title is None:
            first_title = value.strip()[:400]
        text.append(value)
        if sum(map(len, text)) >= 16000:
            break
    if (
        not isinstance(title, str)
        or not title.strip()
        or title.casefold() in {"untitled", "document"}
    ):
        title = first_title
    return (pdf_text + "\n\nParsed front pages:\n" + "\n".join(text))[:20000], title, authors


def _normalized(value: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFKC", value).casefold() if c.isalnum())


def _write(workspace: WorkspacePaths, value: BookMetadata) -> None:
    path = workspace.root / "book-metadata.json"
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    try:
        temporary.write_text(value.model_dump_json(indent=2), encoding="utf-8")
        os.replace(temporary, path)
    finally:
        temporary.unlink(missing_ok=True)


def enrich_book_metadata(
    workspace: WorkspacePaths,
    *,
    use_ai: bool = False,
    force: bool = False,
) -> BookMetadata:
    """Read a few front pages once; never upload the PDF or modify parsed evidence."""
    doc_id, document, manifest = _source(workspace)
    pdf = _source_pdf(workspace, manifest)
    signature = _signature(workspace, doc_id, pdf)
    with plan_lock(workspace.root / "book-metadata.json"):
        old = read_book_metadata(workspace, doc_id)
        same = old is not None and old.source_signature == signature
        needs_cover_review = bool(
            same and old is not None and old.cover_review_version < 3
        )
        reuse_verified_metadata = (
            same and old is not None and old.ai_status in {"ready", "needs_review"}
            and (old.version < 2 or needs_cover_review)
        )
        if (
            same
            and old is not None
            and old.version >= 2
            and old.ai_status in {"ready", "needs_review"}
            and not needs_cover_review
            and not force
        ):
            return old
        evidence, title, authors = _evidence(document, pdf)
        fallback = manifest.get("title") or document.get("title") or doc_id
        metadata = BookMetadata(
            version=2,
            doc_id=doc_id,
            title=title or str(fallback),
            authors=authors,
            cover_path=None,
            source_signature=signature,
            updated_at=datetime.now(UTC).isoformat(),
        )
        if same and old is not None:
            # Refresh failures must not erase previously verified names/title.
            metadata = old.model_copy(
                deep=True,
                update={
                    "cover_path": (
                        old.cover_path if old.version >= 2 and not needs_cover_review else None
                    ),
                    "cover_status": (
                        old.cover_status if old.version >= 2 and not needs_cover_review
                        else "unchecked"
                    ),
                    "cover_review_version": old.cover_review_version,
                    "cover_error": None,
                    "version": 2,
                    "updated_at": metadata.updated_at,
                },
            )
        _write(workspace, metadata)
        if not use_ai:
            return metadata
        metadata.ai_status = "running"
        metadata.error = None
        _write(workspace, metadata)
        try:
            from bookgraph.cli._config import load_config

            config = load_config(workspace).translation
            metadata.model = config.model
            provider = configured_provider(
                TranslationProviderConfig(
                    config.provider,
                    config.base_url,
                    config.model,
                    min(config.timeout_seconds, 60),
                )
            )
            if not evidence.strip() and not reuse_verified_metadata:
                raise ReadingServiceError("No front-page text is available for book details.")
            rejected = False
            if not reuse_verified_metadata:
                extracted = provider.extract_book_metadata(evidence)
                normalized = _normalized(evidence)
                ai_title = extracted.get("title")
                if isinstance(ai_title, str) and ai_title.strip():
                    if _normalized(ai_title) in normalized:
                        metadata.title = ai_title.strip()
                    else:
                        rejected = True
                for field in ("authors", "editors"):
                    values = extracted.get(field, [])
                    grounded = [
                        name.strip()
                        for name in values
                        if isinstance(name, str)
                        and _usable_name(name)
                        and _normalized(name) in normalized
                    ]
                    rejected = rejected or len(grounded) != len(values)
                    setattr(metadata, field, list(dict.fromkeys(grounded)))
                publisher = extracted.get("publisher")
                if isinstance(publisher, str) and _normalized(publisher) in normalized:
                    metadata.publisher = publisher
                year = extracted.get("publication_year")
                if isinstance(year, int) and 1500 <= year <= 2100 and str(year) in evidence:
                    metadata.publication_year = year
            metadata.source = "ai"
            if pdf is not None:
                try:
                    with tempfile.TemporaryDirectory(prefix="bookgraph-cover-") as temp:
                        prefix = str(Path(temp) / "page")
                        subprocess.run(
                            ["pdftoppm", "-f", "1", "-l", "5", "-scale-to", "1200",
                             "-jpeg", "-jpegopt", "quality=80", str(pdf), prefix],
                            check=True, capture_output=True, timeout=60,
                        )
                        pages = sorted(Path(temp).glob("page-*.jpg"))
                        candidates = [
                            {"candidate_id": str(i), "image_mime_type": "image/jpeg",
                             "image_base64": base64.b64encode(path.read_bytes()).decode("ascii")}
                            for i, path in enumerate(pages)
                        ]
                        result = provider.choose_book_cover(
                            {"title": metadata.title, "authors": metadata.authors,
                             "editors": metadata.editors}, candidates
                        )
                        if not (metadata.authors or metadata.editors):
                            visual_title = result.get("title")
                            visual_authors = result.get("authors")
                            if isinstance(visual_title, str) and 0 < len(visual_title) <= 500:
                                metadata.title = visual_title.strip()
                            if isinstance(visual_authors, list):
                                metadata.authors = [
                                    name.strip() for name in visual_authors[:30]
                                    if isinstance(name, str) and _usable_name(name)
                                ]
                        selected_id = result["candidate_id"]
                        metadata.cover_path = None
                        if selected_id is not None:
                            selected = pages[int(selected_id)]
                            crop = result["crop"]
                            geometry = subprocess.run(
                                ["identify", "-format", "%w %h", str(selected)],
                                check=True, capture_output=True, text=True, timeout=10,
                            ).stdout.split()
                            width, height = map(int, geometry)
                            left, top, right, bottom = crop
                            x, y = round(width * left / 1000), round(height * top / 1000)
                            w = max(1, round(width * right / 1000) - x)
                            h = max(1, round(height * bottom / 1000) - y)
                            output = workspace.root / "metadata" / "ai-pdf-cover.jpg"
                            output.parent.mkdir(parents=True, exist_ok=True)
                            temporary = Path(temp) / "cropped.jpg"
                            subprocess.run(
                                ["convert", str(selected), "-crop", f"{w}x{h}+{x}+{y}",
                                 "+repage", str(temporary)],
                                check=True, capture_output=True, timeout=30,
                            )
                            staged = output.with_name(f".{uuid.uuid4().hex}.tmp")
                            try:
                                shutil.copyfile(temporary, staged)
                                os.replace(staged, output)
                            finally:
                                staged.unlink(missing_ok=True)
                            metadata.cover_path = output.relative_to(workspace.root).as_posix()
                            metadata.cover_status = "selected"
                        else:
                            metadata.cover_status = "no_match"
                        metadata.cover_review_version = 3
                except (ReadingServiceError, OSError, subprocess.SubprocessError, ValueError,
                        IndexError, KeyError) as exc:
                    metadata.cover_path = None
                    metadata.cover_status = "failed"
                    metadata.cover_error = str(exc)[:300]
                    _LOGGER.info("PDF cover selection unavailable: %s", str(exc))
            else:
                metadata.cover_path = None
                metadata.cover_status = "no_candidate"
                metadata.cover_review_version = 3
            metadata.ai_status = (
                "needs_review"
                if rejected or not (metadata.authors or metadata.editors)
                else "ready"
            )
        except ReadingServiceError as exc:
            metadata.ai_status = "failed"
            metadata.error = str(exc)
        metadata.updated_at = datetime.now(UTC).isoformat()
        _write(workspace, metadata)
        return metadata
