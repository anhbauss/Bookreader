from __future__ import annotations

import json
from pathlib import Path
from unittest.mock import MagicMock, patch

from bookgraph.book_metadata import enrich_book_metadata, read_book_metadata
from bookgraph.workspace import WorkspacePaths


def workspace(tmp_path: Path) -> WorkspacePaths:
    root = WorkspacePaths(tmp_path)
    directory = root.sources_parsed / "book"
    directory.mkdir(parents=True)
    (directory / "document.json").write_text(
        json.dumps(
            {
                "doc_id": "book",
                "title": "filename-default",
                "metadata": {},
                "blocks": [
                    {"type": "title", "text": "Real Book Title", "page_idx": 0},
                    {
                        "type": "text",
                        "text": "By Jane Doe. Published by Example Press, 2024.",
                        "page_idx": 1,
                    },
                    {"type": "text", "text": "Hidden later chapter", "page_idx": 20},
                ],
            }
        )
    )
    return root


def test_ai_metadata_is_grounded_cached_and_does_not_change_source(tmp_path: Path) -> None:
    root = workspace(tmp_path)
    original = (root.sources_parsed / "book" / "document.json").read_bytes()
    provider = MagicMock()
    provider.extract_book_metadata.return_value = {
        "title": "Real Book Title",
        "authors": ["Jane Doe"],
        "editors": [],
        "publisher": "Example Press",
        "publication_year": 2024,
    }
    with patch("bookgraph.book_metadata.configured_provider", return_value=provider):
        value = enrich_book_metadata(root, use_ai=True)
        cached = enrich_book_metadata(root, use_ai=True)
    assert value.title == "Real Book Title" and value.authors == ["Jane Doe"]
    assert value.ai_status == "ready" and cached == value
    provider.extract_book_metadata.assert_called_once()
    assert "Hidden later chapter" not in provider.extract_book_metadata.call_args.args[0]
    assert (root.sources_parsed / "book" / "document.json").read_bytes() == original
    assert read_book_metadata(root, "book").authors == ["Jane Doe"]


def test_ai_cannot_invent_authors_or_mix_editors_with_authors(tmp_path: Path) -> None:
    root = workspace(tmp_path)
    provider = MagicMock()
    provider.extract_book_metadata.return_value = {
        "title": "Real Book Title",
        "authors": ["Alan V. Oppenheim"],
        "editors": ["Jane Doe"],
        "publisher": None,
        "publication_year": None,
    }
    with patch("bookgraph.book_metadata.configured_provider", return_value=provider):
        result = enrich_book_metadata(root, use_ai=True)
    assert result.authors == [] and result.editors == ["Jane Doe"]
    assert "Alan V." not in result.model_dump_json()


def test_local_metadata_uses_front_page_title_without_an_ai_call(tmp_path: Path) -> None:
    root = workspace(tmp_path)
    with patch("bookgraph.book_metadata.configured_provider") as provider:
        result = enrich_book_metadata(root)
    provider.assert_not_called()
    assert result.title == "Real Book Title"
    assert result.ai_status == "not_requested"


def test_ai_failure_keeps_local_metadata_and_can_be_retried(tmp_path: Path) -> None:
    from bookgraph.mcp.errors import ReadingServiceError

    root = workspace(tmp_path)
    with patch(
        "bookgraph.book_metadata.configured_provider",
        side_effect=ReadingServiceError("Provider unavailable."),
    ):
        failed = enrich_book_metadata(root, use_ai=True)
    assert failed.title == "Real Book Title" and failed.ai_status == "failed"
    provider = MagicMock()
    provider.extract_book_metadata.return_value = {
        "title": "Real Book Title",
        "authors": ["Jane Doe"],
        "editors": [],
        "publisher": None,
        "publication_year": None,
    }
    with patch("bookgraph.book_metadata.configured_provider", return_value=provider):
        assert enrich_book_metadata(root, use_ai=True).ai_status == "ready"


def test_pdf_cover_uses_local_rendering_and_rejects_paths_outside_workspace(tmp_path: Path) -> None:
    root = workspace(tmp_path)
    (root.root / "mineru").mkdir()
    (root.root / "mineru" / "manifest.json").write_text(
        json.dumps(
            {
                "doc_id": "book",
                "title": "filename-default",
                "source_pdf": "../../outside.pdf",
            }
        )
    )
    with patch("bookgraph.book_metadata.subprocess.run") as run:
        enrich_book_metadata(root)
    run.assert_not_called()


def test_rendered_cover_is_saved_in_workspace_and_exposed_as_a_relative_path(
    tmp_path: Path,
) -> None:
    root = workspace(tmp_path)
    root.sources_inbox.mkdir()
    (root.sources_inbox / "book.pdf").write_bytes(b"PDF test")
    (root.root / "mineru").mkdir()
    (root.root / "mineru" / "manifest.json").write_text(
        json.dumps(
            {
                "doc_id": "book",
                "title": "filename-default",
                "source_pdf": "book.pdf",
            }
        )
    )

    def render(args: list[str], **kwargs: object) -> MagicMock:
        Path(args[-1] + ".jpg").write_bytes(b"local cover")
        return MagicMock(returncode=0)

    with (
        patch("bookgraph.book_metadata._pdf_evidence", return_value=("", None, [])),
        patch("bookgraph.book_metadata.shutil.which", return_value="/usr/bin/pdftoppm"),
        patch("bookgraph.book_metadata.subprocess.run", side_effect=render) as run,
    ):
        value = enrich_book_metadata(root)
    assert value.cover_path == "metadata/cover.jpg"
    assert (root.root / value.cover_path).is_file()
    assert "-singlefile" in run.call_args.args[0] and "-f" in run.call_args.args[0]


def test_reader_documents_use_the_same_title_and_authors_as_the_library(tmp_path: Path) -> None:
    from bookgraph.mcp.reading_tools import list_documents
    from bookgraph.models import Section
    from bookgraph.sections import write_sections

    root = workspace(tmp_path)
    write_sections(
        [
            Section(
                id="book.intro",
                doc_id="book",
                title="Introduction",
                level=1,
                heading_path=["Introduction"],
                text="Introduction.",
            )
        ],
        root.sources_sections / "book",
    )
    provider = MagicMock()
    provider.extract_book_metadata.return_value = {
        "title": "Real Book Title",
        "authors": ["Jane Doe"],
        "editors": [],
        "publisher": None,
        "publication_year": None,
    }
    with patch("bookgraph.book_metadata.configured_provider", return_value=provider):
        enrich_book_metadata(root, use_ai=True)
    document = list_documents(root).documents[0]
    assert document.title == "Real Book Title"
    assert document.authors == ["Jane Doe"]


def test_refresh_failure_does_not_erase_verified_names(tmp_path: Path) -> None:
    from bookgraph.mcp.errors import ReadingServiceError

    root = workspace(tmp_path)
    provider = MagicMock()
    provider.extract_book_metadata.return_value = {
        "title": "Real Book Title",
        "authors": ["Jane Doe"],
        "editors": [],
        "publisher": None,
        "publication_year": None,
    }
    with patch("bookgraph.book_metadata.configured_provider", return_value=provider):
        enrich_book_metadata(root, use_ai=True)
    with patch(
        "bookgraph.book_metadata.configured_provider", side_effect=ReadingServiceError("Offline")
    ):
        failed = enrich_book_metadata(root, use_ai=True, force=True)
    assert failed.ai_status == "failed"
    assert failed.authors == ["Jane Doe"] and failed.title == "Real Book Title"


def test_cover_refresh_failure_keeps_the_previous_local_cover(tmp_path: Path) -> None:
    root = workspace(tmp_path)
    cover = root.root / "metadata" / "cover.jpg"
    cover.parent.mkdir()
    cover.write_bytes(b"existing cover")
    with patch("bookgraph.book_metadata._render_cover", return_value="metadata/cover.jpg"):
        enrich_book_metadata(root)
    with patch("bookgraph.book_metadata._render_cover", return_value=None):
        refreshed = enrich_book_metadata(root, force=True)
    assert refreshed.cover_path == "metadata/cover.jpg"
    assert cover.read_bytes() == b"existing cover"
