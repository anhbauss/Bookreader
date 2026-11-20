"""Prepare and normalize a human-assisted MinerU Web import.

MinerU Web is intentionally not automated: popups, login and the service's page
limit need human interaction. This module owns the deterministic local half of
that workflow: workspace setup, upload batches, and safe ingestion of downloaded
MinerU export folders.
"""

from __future__ import annotations

import json
import re
import shutil
from dataclasses import asdict, dataclass
from pathlib import Path

from bookgraph.documents import write_document
from bookgraph.parsers.mineru import MinerUMiddleJsonParser
from bookgraph.sections import write_sections
from bookgraph.segmenters.heading import HeadingSegmenter
from bookgraph.utils import validate_slug_id
from bookgraph.workspace import WorkspacePaths, default_config

MAX_BATCH_PAGES = 200


class MinerUAssistedError(ValueError):
    """The local MinerU-assisted preparation cannot continue safely."""


@dataclass(frozen=True)
class MinerUBatch:
    batch_id: str
    start_page: int
    end_page: int
    filename: str


@dataclass(frozen=True)
class MinerUPreparation:
    doc_id: str
    title: str
    source_pdf: Path
    upload_dir: Path
    downloads_dir: Path
    normalized_dir: Path
    manifest_path: Path
    batches: list[MinerUBatch]


def prepare_mineru_workspace(
    library_root: Path, source_pdf: Path, title: str, *, max_pages: int = MAX_BATCH_PAGES
) -> MinerUPreparation:
    """Create a self-contained workspace and split one PDF into upload batches.

    The source PDF is copied rather than moved. The caller must point the user to
    ``mineru/downloads`` to place raw exports; this function never automates MinerU
    Web or modifies the original source file.
    """
    if max_pages < 1:
        raise MinerUAssistedError("max_pages must be positive")
    root = _directory(library_root, "library root")
    source = _file(source_pdf, "source PDF")
    if source.suffix.lower() != ".pdf":
        raise MinerUAssistedError("source must be a PDF")
    cleaned_title = title.strip()
    if not cleaned_title:
        raise MinerUAssistedError("book title is required")
    doc_id = _unique_doc_id(root, cleaned_title)
    workspace = WorkspacePaths(root / doc_id)
    workspace.root.mkdir()
    for directory in workspace.directories():
        directory.mkdir(parents=True, exist_ok=True)
    workspace.config.write_text(default_config(workspace))

    copied_source = workspace.sources_inbox / f"{doc_id}.pdf"
    shutil.copy2(source, copied_source)
    mineru_root = workspace.root / "mineru"
    upload_dir = mineru_root / "upload-batches"
    downloads_dir = mineru_root / "downloads"
    normalized_dir = mineru_root / "normalized"
    for directory in (upload_dir, downloads_dir, normalized_dir):
        directory.mkdir(parents=True, exist_ok=True)

    try:
        from pypdf import PdfReader, PdfWriter
    except ImportError as exc:  # pragma: no cover - depends on optional extra
        raise MinerUAssistedError("PDF preparation requires the 'pypdf' parser extra") from exc
    try:
        reader = PdfReader(str(copied_source))
    except Exception as exc:  # pypdf exposes several implementation-specific errors
        raise MinerUAssistedError("BookGraph could not read this PDF") from exc
    if not reader.pages:
        raise MinerUAssistedError("PDF has no pages")

    batches: list[MinerUBatch] = []
    for offset in range(0, len(reader.pages), max_pages):
        start_page, end_page = offset + 1, min(offset + max_pages, len(reader.pages))
        batch_id = f"batch-{len(batches) + 1:03d}"
        filename = f"{doc_id}.{batch_id}.pages-{start_page:03d}-{end_page:03d}.pdf"
        writer = PdfWriter()
        for page in reader.pages[offset:end_page]:
            writer.add_page(page)
        with (upload_dir / filename).open("wb") as output:
            writer.write(output)
        batches.append(MinerUBatch(batch_id, start_page, end_page, filename))

    manifest_path = mineru_root / "manifest.json"
    manifest_path.write_text(json.dumps({
        "version": 1,
        "doc_id": doc_id,
        "title": cleaned_title,
        "source_pdf": copied_source.name,
        "page_count": len(reader.pages),
        "max_pages_per_batch": max_pages,
        "batches": [asdict(batch) for batch in batches],
    }, indent=2) + "\n")
    return MinerUPreparation(doc_id, cleaned_title, copied_source, upload_dir, downloads_dir, normalized_dir, manifest_path, batches)


def organize_mineru_downloads(workspace_root: Path) -> list[str]:
    """Copy user-provided MinerU export folders into deterministic batch locations.

    The raw ``downloads`` directory is preserved. Each immediate child result is
    mapped by a batch identifier in its name; ambiguous or missing results are
    rejected rather than guessed. Content processing remains the existing markdown
    ingestion pipeline's responsibility.
    """
    workspace = WorkspacePaths(_directory(workspace_root, "workspace"))
    manifest_path = workspace.root / "mineru" / "manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text())
    except (OSError, json.JSONDecodeError) as exc:
        raise MinerUAssistedError("MinerU manifest is missing or invalid") from exc
    if not isinstance(manifest, dict) or not isinstance(manifest.get("batches"), list):
        raise MinerUAssistedError("MinerU manifest is invalid")
    downloads = workspace.root / "mineru" / "downloads"
    normalized = workspace.root / "mineru" / "normalized"
    expected = {str(batch.get("batch_id")) for batch in manifest["batches"] if isinstance(batch, dict)}
    matches: dict[str, list[Path]] = {batch_id: [] for batch_id in expected}
    for item in downloads.iterdir():
        if item.name.startswith("."):
            continue
        candidates = [batch_id for batch_id in expected if batch_id in item.name]
        if len(candidates) == 1:
            matches[candidates[0]].append(item)
    missing = sorted(batch_id for batch_id, items in matches.items() if not _has_primary_result(items))
    if missing:
        raise MinerUAssistedError("missing MinerU JSON results for " + ", ".join(missing))
    if normalized.exists():
        shutil.rmtree(normalized)
    normalized.mkdir()
    report_batches: list[dict[str, object]] = []
    for batch_id in sorted(expected):
        destination = normalized / batch_id
        destination.mkdir()
        copied: list[str] = []
        for source in matches[batch_id]:
            target = destination / source.name
            if source.is_dir():
                shutil.copytree(source, target)
            else:
                shutil.copy2(source, target)
            copied.append(source.name)
        report_batches.append({"batch_id": batch_id, "files": sorted(copied)})
    report = {"version": 1, "batches": report_batches, "status": "organized"}
    (normalized / "import-report.json").write_text(json.dumps(report, indent=2) + "\n")
    return sorted(expected)


def build_reading_workspace(workspace_root: Path) -> tuple[str, int]:
    """Merge normalized MinerU JSON and create the canonical reading sections.

    MinerU Web's JSON results use the legacy ``pdf_info`` format. Every upload
    starts page indexes again at zero, so this applies each manifest batch offset
    before passing the combined result to BookGraph's normal MinerU parser.
    """
    workspace = WorkspacePaths(_directory(workspace_root, "workspace"))
    manifest_path = workspace.root / "mineru" / "manifest.json"
    try:
        manifest = json.loads(manifest_path.read_text())
    except (OSError, json.JSONDecodeError) as exc:
        raise MinerUAssistedError("MinerU manifest is missing or invalid") from exc
    if not isinstance(manifest, dict) or not isinstance(manifest.get("doc_id"), str):
        raise MinerUAssistedError("MinerU manifest is invalid")
    doc_id = manifest["doc_id"]
    batches = manifest.get("batches")
    if not isinstance(batches, list):
        raise MinerUAssistedError("MinerU manifest has no batches")
    normalized = workspace.root / "mineru" / "normalized"
    combined_pages: list[object] = []
    for batch in batches:
        if not isinstance(batch, dict):
            raise MinerUAssistedError("MinerU manifest has an invalid batch")
        batch_id = batch.get("batch_id")
        start_page = batch.get("start_page")
        if not isinstance(batch_id, str) or not isinstance(start_page, int):
            raise MinerUAssistedError("MinerU manifest has an invalid batch")
        json_files = sorted((normalized / batch_id).glob("*.json"))
        if len(json_files) != 1:
            raise MinerUAssistedError(f"expected one JSON result for {batch_id}")
        try:
            payload = json.loads(json_files[0].read_text())
        except (OSError, json.JSONDecodeError) as exc:
            raise MinerUAssistedError(f"invalid MinerU JSON for {batch_id}") from exc
        pages = payload.get("pdf_info") if isinstance(payload, dict) else None
        if not isinstance(pages, list):
            raise MinerUAssistedError(f"{json_files[0].name} is not a legacy MinerU JSON export")
        for fallback_index, page in enumerate(pages):
            if not isinstance(page, dict):
                raise MinerUAssistedError(f"{json_files[0].name} has an invalid page")
            next_page = dict(page)
            page_index = page.get("page_idx", fallback_index)
            if not isinstance(page_index, int):
                page_index = fallback_index
            next_page["page_idx"] = start_page - 1 + page_index
            combined_pages.append(next_page)
    parsed_dir = workspace.sources_parsed / doc_id
    parsed_dir.mkdir(parents=True, exist_ok=True)
    middle_json = parsed_dir / f"{doc_id}_middle.json"
    middle_json.write_text(json.dumps({"pdf_info": combined_pages}, ensure_ascii=False) + "\n")
    try:
        document = MinerUMiddleJsonParser().parse(middle_json, parsed_dir)
    except ValueError as exc:
        raise MinerUAssistedError(f"Unable to parse normalized MinerU results: {exc}") from exc
    if document.doc_id != doc_id:
        document = type(document).model_validate({**document.model_dump(), "doc_id": doc_id})
    document_path = write_document(document, parsed_dir)
    segmenter = HeadingSegmenter(target_level=2)
    sections = segmenter.segment(document)
    write_sections(sections, workspace.sources_sections / doc_id)
    report = {
        "version": 1,
        "status": "ready",
        "doc_id": doc_id,
        "document": document_path.name,
        "sections": len(sections),
        "pages": len(combined_pages),
    }
    (normalized / "build-report.json").write_text(json.dumps(report, indent=2) + "\n")
    return doc_id, len(sections)


def _has_primary_result(items: list[Path]) -> bool:
    """MinerU Web names JSON exports ``MinerU_<upload-name>__<timestamp>.json``."""
    return any(item.is_file() and item.suffix.lower() == ".json" for item in items)


def _directory(path: Path, label: str) -> Path:
    try:
        resolved = path.expanduser().resolve(strict=True)
    except OSError as exc:
        raise MinerUAssistedError(f"{label} not found") from exc
    if not resolved.is_dir():
        raise MinerUAssistedError(f"{label} is not a folder")
    return resolved


def _file(path: Path, label: str) -> Path:
    try:
        resolved = path.expanduser().resolve(strict=True)
    except OSError as exc:
        raise MinerUAssistedError(f"{label} not found") from exc
    if not resolved.is_file():
        raise MinerUAssistedError(f"{label} is not a file")
    return resolved


def _unique_doc_id(library_root: Path, title: str) -> str:
    normalized = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "book"
    try:
        base = validate_slug_id(normalized, field_name="book id")
    except ValueError as exc:
        raise MinerUAssistedError(str(exc)) from exc
    candidate, index = base, 2
    while (library_root / candidate).exists():
        candidate = f"{base}-{index}"
        index += 1
    return candidate
