"""Offline ingestion of a user folder containing Markdown and local images.

This module prepares a Markdown source for BookGraph's existing ``markdown`` parser.
It intentionally does *not* parse content, call MinerU, fetch remote URLs, or execute
files from the input folder. Its only persistent output is the staged source Markdown
and verified image files under ``sources/parsed/<doc_id>/``.
"""

from __future__ import annotations

import os
import re
import shutil
import tempfile
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import unquote, urlsplit

from bookgraph.utils import validate_slug_id

_ALLOWED_IMAGE_SUFFIXES = frozenset({".jpg", ".jpeg", ".png", ".webp"})
_IMAGE_LINK_PATTERN = re.compile(r"!\[([^\]]*)\]\(([^\s)]+)(\s+[^)]*)?\)")


class IngestionError(ValueError):
    """The selected input folder cannot be safely prepared for parsing."""


@dataclass(frozen=True)
class IngestionResult:
    """Paths and non-fatal anomalies produced by :func:`ingest_markdown_folder`."""

    doc_id: str
    source_markdown: Path
    source_parts: int
    staged_images: list[str]
    rewritten_references: int
    warnings: list[str]


@dataclass(frozen=True)
class _MarkdownPart:
    """One independently exported MinerU Markdown part belonging to a book."""

    root: Path
    markdown: Path


def ingest_markdown_folder(
    input_folder: Path, workspace_root: Path, doc_id: str
) -> IngestionResult:
    """Stage one Markdown source or a deterministic sequence of Markdown parts.

    A selected folder can contain one source Markdown file directly, or folders for
    individual MinerU exports. In the latter layout each immediate child folder must
    contain exactly one top-level Markdown file. Parts are merged in natural folder
    name order. Their image filenames are namespaced by part ordinal, preventing a
    repeated MinerU CDN basename from silently attaching the wrong figure.

    The input is untrusted. Image references are rewritten only when their URL path is
    safe and the matching local file is present in that part's MinerU LaTeX ``images``
    directory. Missing images are warnings so a single broken figure cannot prevent
    ingesting the rest of a book.
    """

    source_root = _input_root(input_folder)
    resolved_doc_id = _validate_doc_id(doc_id)
    parts = _find_markdown_parts(source_root)
    parsed_dir = _parsed_output(workspace_root, resolved_doc_id)

    warnings: list[str] = []
    staged: dict[str, Path] = {}
    rewritten_references = 0
    rewritten_parts: list[str] = []
    multipart = len(parts) > 1

    for ordinal, part in enumerate(parts, start=1):
        images_dir = _find_images_directory(part.root)
        local_images = _local_image_index(images_dir, part.root)
        docx_present = any(path.is_file() for path in part.root.glob("*.docx"))
        needs_docx_fallback = False

        def rewrite(match: re.Match[str]) -> str:
            nonlocal needs_docx_fallback, rewritten_references
            alt, raw_url, trailing = match.groups()
            basename, issue = _image_basename(raw_url)
            if issue is not None:
                warnings.append(f"image reference {raw_url!r}: {issue}; left unchanged")
                return match.group(0)
            assert basename is not None
            local_image = local_images.get(basename)
            if local_image is None:
                warnings.append(
                    f"image {basename!r} referenced by {raw_url!r} was not found in {images_dir}"
                )
                needs_docx_fallback = True
                return match.group(0)
            staged_name = f"part-{ordinal:03d}--{basename}" if multipart else basename
            staged[staged_name] = local_image
            rewritten_references += 1
            return f"![{alt}](images/{staged_name}{trailing or ''})"

        rewritten_parts.append(_IMAGE_LINK_PATTERN.sub(rewrite, part.markdown.read_text()))
        if needs_docx_fallback and docx_present:
            # A docx archive exposes media files but does not preserve the CDN basename used
            # by markdown. Guessing by order risks attaching a wrong figure.
            warnings.append(
                "one or more images are missing; docx fallback is unavailable "
                "without a safe basename mapping"
            )

    rewritten = (
        rewritten_parts[0]
        if len(rewritten_parts) == 1
        else "\n\n".join(part.rstrip("\n") for part in rewritten_parts) + "\n"
    )
    _write_stage(parsed_dir, rewritten, staged)
    return IngestionResult(
        doc_id=resolved_doc_id,
        source_markdown=parsed_dir / "source.md",
        source_parts=len(parts),
        staged_images=sorted(staged),
        rewritten_references=rewritten_references,
        warnings=warnings,
    )


def _input_root(input_folder: Path) -> Path:
    try:
        root = input_folder.expanduser().resolve(strict=True)
    except OSError as exc:
        raise IngestionError(f"input folder not found: {input_folder}") from exc
    if not root.is_dir():
        raise IngestionError(f"input path is not a directory: {root}")
    return root


def _validate_doc_id(doc_id: str) -> str:
    try:
        return validate_slug_id(doc_id, field_name="doc_id")
    except ValueError as exc:
        raise IngestionError(str(exc)) from exc


def _find_markdown_parts(source_root: Path) -> list[_MarkdownPart]:
    """Discover a single export or immediate child folders containing book parts.

    Supporting only immediate children makes the selected book layout explicit and
    avoids accidentally ingesting Markdown belonging to an image export or unrelated
    nested material. Natural sorting puts ``part-2`` before ``part-10``.
    """

    top_level = _markdown_files(source_root)
    child_folders = sorted(
        (path for path in source_root.iterdir() if path.is_dir()), key=_natural_path_key
    )
    if top_level:
        if len(top_level) != 1:
            raise IngestionError(
                f"expected exactly one top-level Markdown file in {source_root}; found {len(top_level)}"
            )
        if any(_markdown_files(folder) for folder in child_folders):
            raise IngestionError(
                "input folder mixes a top-level Markdown file with Markdown part folders"
            )
        return [_MarkdownPart(root=source_root, markdown=top_level[0])]

    parts: list[_MarkdownPart] = []
    for folder in child_folders:
        markdown = _markdown_files(folder)
        if not markdown:
            continue
        if len(markdown) != 1:
            raise IngestionError(
                f"expected exactly one top-level Markdown file in part folder {folder}; "
                f"found {len(markdown)}"
            )
        parts.append(_MarkdownPart(root=folder, markdown=markdown[0]))
    if not parts:
        raise IngestionError(
            f"expected one top-level Markdown file or Markdown part folders in {source_root}"
        )
    return parts


def _markdown_files(folder: Path) -> list[Path]:
    return sorted(
        path
        for path in folder.iterdir()
        if path.is_file() and path.suffix.lower() in {".md", ".markdown"}
    )


def _natural_path_key(path: Path) -> list[object]:
    return [int(token) if token.isdigit() else token.lower() for token in re.split(r"(\d+)", path.name)]


def _find_images_directory(source_root: Path) -> Path | None:
    candidates: list[Path] = []
    for path in source_root.rglob("images"):
        # MinerU names its LaTeX export either ``<name>_latex`` or
        # ``MinerU_latex_<name>_<job-id>``. Both hold the content-addressed images
        # referenced by the companion Markdown file.
        parent_name = path.parent.name.lower()
        is_mineru_latex_export = parent_name.endswith("_latex") or parent_name.startswith(
            "mineru_latex_"
        )
        if is_mineru_latex_export and path.is_dir():
            try:
                resolved = path.resolve(strict=True)
            except OSError:
                continue
            if resolved.is_relative_to(source_root):
                candidates.append(resolved)
    unique = sorted(set(candidates))
    if len(unique) > 1:
        raise IngestionError(
            "expected at most one '*_latex/images' directory; found " + ", ".join(map(str, unique))
        )
    return unique[0] if unique else None


def _local_image_index(images_dir: Path | None, source_root: Path) -> dict[str, Path]:
    if images_dir is None:
        return {}
    index: dict[str, Path] = {}
    for path in images_dir.iterdir():
        if not path.is_file() or path.suffix.lower() not in _ALLOWED_IMAGE_SUFFIXES:
            continue
        try:
            resolved = path.resolve(strict=True)
        except OSError:
            continue
        if not resolved.is_relative_to(source_root) or not resolved.is_file():
            continue
        # A duplicate basename can only arise through unusual filesystem casing. Refuse to
        # choose an arbitrary image: the matching rule must be deterministic.
        if path.name in index and index[path.name] != resolved:
            raise IngestionError(f"duplicate local image basename: {path.name}")
        index[path.name] = resolved
    return index


def _image_basename(raw_url: str) -> tuple[str | None, str | None]:
    """Return a safe encoded-URL basename or an explanation for leaving it untouched."""

    try:
        split = urlsplit(raw_url)
    except ValueError:
        return None, "invalid image URL"
    if split.scheme not in {"http", "https"} or not split.netloc:
        return None, "image reference is not an HTTP(S) URL"
    decoded_path = unquote(split.path)
    parts = decoded_path.split("/")
    if any(part in {".", ".."} for part in parts):
        return None, "unsafe image URL path"
    basename = parts[-1] if parts else ""
    if not basename or basename in {".", ".."} or "/" in basename or "\\" in basename:
        return None, "unsafe image basename"
    if Path(basename).suffix.lower() not in _ALLOWED_IMAGE_SUFFIXES:
        return None, f"unsupported image type {Path(basename).suffix or '(none)'}"
    return basename, None


def _parsed_output(workspace_root: Path, doc_id: str) -> Path:
    root = workspace_root.expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    parsed = root / "sources" / "parsed" / doc_id
    parsed.mkdir(parents=True, exist_ok=True)
    try:
        resolved = parsed.resolve(strict=True)
    except OSError as exc:
        raise IngestionError(f"cannot create parsed output: {parsed}") from exc
    if not resolved.is_relative_to(root):
        raise IngestionError(f"parsed output escapes workspace: {parsed}")
    return resolved


def _write_stage(parsed_dir: Path, markdown: str, staged: dict[str, Path]) -> None:
    """Replace only ingestion-owned artifacts without disturbing parsed documents.

    A sibling temporary directory makes a run all-or-nothing for `source.md` and
    `images/`: a failure while copying cannot leave a partly rewritten source paired
    with a partly updated image tree. `document.json` from a previous parse is left
    untouched; T3 will reparse the newly staged `source.md`.
    """

    with tempfile.TemporaryDirectory(prefix=".ingest-", dir=parsed_dir) as temporary:
        stage = Path(temporary)
        staged_source = stage / "source.md"
        staged_source.write_text(markdown)
        staged_images = stage / "images"
        if staged:
            staged_images.mkdir()
            for basename, source in staged.items():
                destination = staged_images / basename
                shutil.copyfile(source, destination)

        _replace_file(staged_source, parsed_dir / "source.md")
        target_images = parsed_dir / "images"
        if target_images.exists() or target_images.is_symlink():
            if target_images.is_dir() and not target_images.is_symlink():
                shutil.rmtree(target_images)
            else:
                target_images.unlink()
        if staged:
            os.replace(staged_images, target_images)


def _replace_file(source: Path, destination: Path) -> None:
    if destination.exists() and destination.is_dir():
        raise IngestionError(f"cannot replace source markdown directory: {destination}")
    os.replace(source, destination)
