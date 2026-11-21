"""Find and download a catalog cover only after the configured model selects it."""

from __future__ import annotations

import hashlib
import json
import logging
import os
import uuid
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlparse, urlunparse
from urllib.request import Request, urlopen

from bookgraph.mcp.errors import ReadingServiceError

_LOGGER = logging.getLogger(__name__)
_USER_AGENT = "BookGraph/0.1 (personal desktop book reader)"
_JSON_HOSTS = {"www.googleapis.com", "openlibrary.org"}
_COVER_HOSTS = {
    "books.google.com",
    "books.googleusercontent.com",
    "covers.openlibrary.org",
    "archive.org",
}


def _text(value: Any, limit: int = 300) -> str:
    return value.strip()[:limit] if isinstance(value, str) else ""


def _request_bytes(
    url: str, *, allowed_hosts: set[str], limit: int, timeout: int
) -> tuple[bytes, str]:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not _host_allowed(parsed.hostname, allowed_hosts):
        raise ReadingServiceError("Book cover service returned an unsupported URL.")
    request = Request(
        url, headers={"User-Agent": _USER_AGENT, "Accept": "application/json,image/*"}
    )
    with urlopen(request, timeout=timeout) as response:
        final_host = urlparse(response.geturl()).hostname
        if not _host_allowed(final_host, allowed_hosts):
            raise ReadingServiceError("Book cover service redirected to an unsupported host.")
        data = response.read(limit + 1)
        if len(data) > limit:
            raise ReadingServiceError("Book cover response exceeded the size limit.")
        return data, response.headers.get("Content-Type", "").split(";", 1)[0].lower()


def _host_allowed(host: str | None, allowed_hosts: set[str]) -> bool:
    return bool(
        host
        and (
            host in allowed_hosts
            or ("archive.org" in allowed_hosts and host.endswith(".archive.org"))
        )
    )


def _candidate(
    *,
    candidate_id: str,
    source: str,
    title: Any,
    authors: Any,
    publisher: Any,
    year: Any,
    isbn: Any,
    image_url: Any,
) -> dict[str, Any] | None:
    title_text = _text(title)
    image = _text(image_url, 2000)
    if not title_text or not image:
        return None
    parsed_image = urlparse(image)
    if parsed_image.scheme == "http" and parsed_image.hostname in _COVER_HOSTS:
        image = urlunparse(parsed_image._replace(scheme="https"))
    names = (
        [name for item in authors if (name := _text(item, 200))]
        if isinstance(authors, list)
        else []
    )
    return {
        "candidate_id": candidate_id,
        "source": source,
        "title": title_text,
        "authors": names[:12],
        "publisher": _text(publisher, 200),
        "year": year if isinstance(year, int) and not isinstance(year, bool) else None,
        "isbn": [value for item in isbn if (value := _text(item, 24))]
        if isinstance(isbn, list)
        else [],
        "image_url": image,
    }


def find_cover_candidates(
    title: str, authors: list[str], editors: list[str]
) -> list[dict[str, Any]]:
    """Return a few catalog records; no image is fetched until the AI chooses one."""

    query_authors = authors or editors
    # Catalogs often index the main title separately from its subtitle.
    catalog_title = title.split(":", 1)[0].strip() or title
    query = " ".join(
        part
        for part in (
            f"intitle:{catalog_title}",
            f"inauthor:{' '.join(query_authors)}" if query_authors else "",
        )
        if part
    )
    candidates: list[dict[str, Any]] = []

    try:
        url = "https://www.googleapis.com/books/v1/volumes?" + urlencode(
            {"q": query, "maxResults": 5, "printType": "books"}
        )
        data, _ = _request_bytes(url, allowed_hosts=_JSON_HOSTS, limit=1_500_000, timeout=5)
        payload = json.loads(data)
        for index, item in enumerate(payload.get("items", [])[:5]):
            info = item.get("volumeInfo", {}) if isinstance(item, dict) else {}
            if not isinstance(info, dict):
                continue
            links = info.get("imageLinks", {})
            image = next(
                (
                    links.get(key)
                    for key in ("extraLarge", "large", "medium", "small", "thumbnail")
                    if isinstance(links, dict) and links.get(key)
                ),
                None,
            )
            identifiers = info.get("industryIdentifiers", [])
            isbn = (
                [entry.get("identifier") for entry in identifiers if isinstance(entry, dict)]
                if isinstance(identifiers, list)
                else []
            )
            cover = _candidate(
                candidate_id=f"google-{index + 1}",
                source="Google Books",
                title=info.get("title"),
                authors=info.get("authors"),
                publisher=info.get("publisher"),
                year=int(info["publishedDate"][:4])
                if isinstance(info.get("publishedDate"), str)
                and info["publishedDate"][:4].isdigit()
                else None,
                isbn=isbn,
                image_url=image,
            )
            if cover:
                candidates.append(cover)
    except (
        OSError,
        ValueError,
        KeyError,
        TypeError,
        HTTPError,
        URLError,
        ReadingServiceError,
    ) as exc:
        _LOGGER.info("Google Books cover lookup unavailable: %s", type(exc).__name__)

    try:
        params = urlencode(
            {
                "title": catalog_title,
                "author": " ".join(query_authors),
                "fields": "title,author_name,first_publish_year,isbn,cover_i,publisher",
                "limit": 5,
            }
        )
        data, _ = _request_bytes(
            f"https://openlibrary.org/search.json?{params}",
            allowed_hosts=_JSON_HOSTS,
            limit=1_500_000,
            timeout=5,
        )
        payload = json.loads(data)
        for index, item in enumerate(payload.get("docs", [])[:5]):
            if not isinstance(item, dict) or not isinstance(item.get("cover_i"), int):
                continue
            cover_url = f"https://covers.openlibrary.org/b/id/{item['cover_i']}-L.jpg?default=false"
            cover = _candidate(
                candidate_id=f"openlibrary-{index + 1}",
                source="Open Library",
                title=item.get("title"),
                authors=item.get("author_name"),
                publisher=(item.get("publisher") or [None])[0],
                year=item.get("first_publish_year"),
                isbn=item.get("isbn"),
                image_url=cover_url,
            )
            if cover:
                candidates.append(cover)
    except (
        OSError,
        ValueError,
        KeyError,
        TypeError,
        HTTPError,
        URLError,
        ReadingServiceError,
    ) as exc:
        _LOGGER.info("Open Library cover lookup unavailable: %s", type(exc).__name__)

    return candidates[:10]


def fetch_cover_candidate(candidate: dict[str, Any]) -> tuple[bytes, str] | None:
    """Fetch a small, allowlisted catalog image so the configured model can inspect it."""

    try:
        data, _ = _request_bytes(
            candidate["image_url"],
            allowed_hosts=_COVER_HOSTS,
            limit=2 * 1024 * 1024,
            timeout=10,
        )
    except (
        OSError,
        ValueError,
        KeyError,
        TypeError,
        HTTPError,
        URLError,
        ReadingServiceError,
    ) as exc:
        _LOGGER.info("Catalog cover candidate unavailable: %s", type(exc).__name__)
        return None
    if data.startswith(b"\xff\xd8\xff"):
        return data, "image/jpeg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return data, "image/png"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return data, "image/webp"
    return None


def download_selected_cover(
    workspace: Path,
    candidate: dict[str, Any],
    *,
    book_title: str,
    authors: list[str],
    image_data: bytes,
) -> str | None:
    """Persist the inspected cover after checking its catalog identity."""

    candidate_title = _text(candidate.get("title"))
    ratio = SequenceMatcher(
        None,
        "".join(ch.casefold() for ch in book_title if ch.isalnum()),
        "".join(ch.casefold() for ch in candidate_title if ch.isalnum()),
    ).ratio()
    if candidate_title.casefold() not in book_title.casefold() and ratio < 0.65:
        return None
    candidate_authors = candidate.get("authors", [])
    if (
        authors
        and candidate_authors
        and not any(
            SequenceMatcher(
                None,
                "".join(ch.casefold() for ch in author if ch.isalnum()),
                "".join(ch.casefold() for ch in _text(name) if ch.isalnum()),
            ).ratio()
            >= 0.65
            for author in authors
            for name in candidate_authors
        )
    ):
        return None
    data = image_data
    if data.startswith(b"\xff\xd8\xff"):
        extension = "jpg"
    elif data.startswith(b"\x89PNG\r\n\x1a\n"):
        extension = "png"
    elif len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        extension = "webp"
    else:
        _LOGGER.info("Selected book cover was not a supported raster image")
        return None
    directory = workspace / "metadata"
    directory.mkdir(parents=True, exist_ok=True)
    suffix = hashlib.sha256(data).hexdigest()[:12]
    target = directory / f"cover-{suffix}.{extension}"
    if not target.exists():
        temporary = directory / f".{uuid.uuid4().hex}.tmp"
        try:
            temporary.write_bytes(data)
            os.replace(temporary, target)
        finally:
            temporary.unlink(missing_ok=True)
    return target.relative_to(workspace).as_posix()
