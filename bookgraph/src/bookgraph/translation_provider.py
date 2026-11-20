"""Pluggable backend-only translation providers.

The first adapter speaks the OpenAI-compatible chat-completions protocol, which lets a
workspace use a routing service today and direct provider adapters later.  Provider
credentials are deliberately read only from the process environment.
"""

from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass
from typing import Any, Protocol
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from bookgraph.mcp.errors import ReadingServiceError


_LOGGER = logging.getLogger(__name__)


@dataclass(frozen=True)
class TranslationProviderConfig:
    provider: str | None
    base_url: str | None
    model: str | None
    timeout_seconds: int


class TranslationProvider(Protocol):
    def translate_section(self, source: str, *, target_language: str) -> str:
        """Return a Markdown translation of one complete source section."""

    def translate_title(self, title: str, *, target_language: str) -> str:
        """Return a concise translation of one section title."""

    def repair_formula(self, formula: str, *, context: str) -> str:
        """Return only a repaired TeX expression for one isolated formula."""

    def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]:
        """Return a corrected section title and Markdown body."""

    def repair_region(self, content: str, *, context: str) -> str:
        """Return only repaired Markdown for a short reader region around one formula."""


_SYSTEM_PROMPT = (
    "You translate book sections faithfully. Return only Markdown, never a commentary or a code "
    "fence. Preserve all Markdown structure, heading levels, link destinations, image paths, HTML "
    "anchors, and TeX commands. Preserve heading markers exactly: if the source does not "
    "start a block with #, never add a # heading marker in the translation. Exercise prompts, "
    "captions, and ordinary prose must remain ordinary prose, not headings. Keep inline TeX "
    "inside $...$ and standalone equations inside $$...$$. Never truncate equations or prose."
)


def _translation_prompt(source: str, target_language: str) -> str:
    return (
        f"Translate this complete section into {target_language}. Preserve every non-prose "
        "structural token exactly as instructed.\n\n--- SOURCE ---\n"
        f"{source}"
    )


def _title_translation_prompt(title: str, target_language: str) -> str:
    return (
        f"Translate this section title into {target_language}. Return only the translated title, "
        "preserving numbering, names, dates, and mathematical notation.\n\n--- TITLE ---\n"
        f"{title}"
    )


def _formula_repair_prompt(formula: str, context: str) -> str:
    return (
        "Repair only this isolated LaTeX formula so KaTeX can render it. Return JSON with "
        "exactly one key, `formula`, whose value is the repaired TeX expression without $ or $$ "
        "delimiters. Preserve the mathematical meaning. Do not add an equation tag or a "
        "Markdown/HTML wrapper; the equation number is rendered separately. If the formula is "
        "already valid, return it unchanged."
        f"\n\n--- FORMULA ---\n{formula}\n\n--- LOCAL CONTEXT ---\n{context}"
    )


def _formula_repair_result(content: str) -> str:
    return _repair_json_value(content, "formula", "Formula repair")


def _markdown_repair_prompt(content: str, context: str) -> str:
    return (
        "Repair this complete reader section so it renders correctly. Return JSON with exactly two "
        "keys: `title` (a corrected concise plain-text section title) and `content` (the repaired "
        "Markdown body only, without the section heading). Preserve meaning, links, image paths, "
        "TeX, equation tags, and the language of the source. Preserve any leading section number in "
        "the title. Do not add HTML, scripts, external URLs, commentary, or code fences."
        f"\n\n--- SECTION BODY ---\n{content}\n\n--- LOCAL CONTEXT ---\n{context}"
    )


def _markdown_repair_result(content: str) -> tuple[str, str]:
    normalized = _strip_markdown_fence(content).strip()
    try:
        value = json.loads(normalized)
    except json.JSONDecodeError as exc:
        raise ReadingServiceError("Content repair provider did not return the required JSON result.") from exc
    if (
        not isinstance(value, dict)
        or set(value) != {"title", "content"}
        or not isinstance(value["title"], str)
        or not isinstance(value["content"], str)
    ):
        raise ReadingServiceError("Content repair provider did not return the required JSON result.")
    title = value["title"].strip()
    repaired = value["content"].strip()
    if not title or not repaired or "<" in title or ">" in title:
        raise ReadingServiceError("Content repair provider returned unsafe content.")
    return title, repaired


def _region_repair_prompt(content: str, context: str) -> str:
    return (
        "Repair only this short Markdown reader region around one formula. Return JSON with "
        "exactly one key, `content`, whose value is the repaired Markdown for the region. Keep "
        "the same surrounding prose and any unrelated neighboring equations unchanged; only fix "
        "the malformed formula and any prose directly broken by it. Preserve links, image paths, "
        "TeX, and equation tags. Do not add HTML, scripts, external URLs, commentary, or code fences."
        f"\n\n--- REGION ---\n{content}\n\n--- LOCAL CONTEXT ---\n{context}"
    )


def _region_repair_result(content: str) -> str:
    return _repair_json_value(content, "content", "Region repair")


def _repair_json_value(content: str, key: str, label: str) -> str:
    """Read one strict repair object, tolerating a provider-added JSON fence.

    Compatible gateways do not always honour an Anthropic/OpenAI structured-output
    request.  A fenced JSON object is still safe to accept once it passes the exact
    one-key schema below; prose before/after the object is deliberately rejected.
    """

    value: object
    normalized = _strip_markdown_fence(content).strip()
    try:
        value = json.loads(normalized)
    except json.JSONDecodeError as exc:
        raise ReadingServiceError(
            f"{label} provider did not return the required JSON result."
        ) from exc
    if not isinstance(value, dict) or set(value) != {key} or not isinstance(value[key], str):
        raise ReadingServiceError(f"{label} provider did not return the required JSON result.")
    repaired = value[key].strip()
    if not repaired:
        raise ReadingServiceError(f"{label} provider returned unsafe content.")
    return repaired


class OpenAICompatibleTranslationProvider:
    """Minimal OpenAI-compatible chat-completions client using the standard library."""

    def __init__(self, config: TranslationProviderConfig, api_key: str) -> None:
        if config.provider != "openai-compatible":
            raise ReadingServiceError("translation.provider must be 'openai-compatible'")
        if not config.base_url or not config.model:
            raise ReadingServiceError(
                "Configure translation.base_url and translation.model before starting translation."
            )
        self._url = f"{config.base_url.rstrip('/')}/chat/completions"
        self._model = config.model
        self._timeout_seconds = config.timeout_seconds
        self._api_key = api_key

    def translate_section(self, source: str, *, target_language: str) -> str:
        payload = {
            "model": self._model,
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": _SYSTEM_PROMPT},
                {"role": "user", "content": _translation_prompt(source, target_language)},
            ],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self._api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            _LOGGER.warning("Translation provider returned an invalid OpenAI-compatible response")
            raise ReadingServiceError("Translation provider returned an invalid response.") from exc
        if not isinstance(content, str) or not content.strip():
            raise ReadingServiceError("Translation provider returned an empty translation.")
        return _strip_markdown_fence(content)

    def translate_title(self, title: str, *, target_language: str) -> str:
        payload = {
            "model": self._model,
            "temperature": 0.1,
            "messages": [
                {"role": "system", "content": "You translate section titles. Return only the title."},
                {"role": "user", "content": _title_translation_prompt(title, target_language)},
            ],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Authorization": f"Bearer {self._api_key}", "Content-Type": "application/json"},
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ReadingServiceError("Translation provider returned an invalid response.") from exc
        if not isinstance(content, str) or not content.strip():
            raise ReadingServiceError("Translation provider returned an empty translation.")
        return _strip_markdown_fence(content)

    def repair_formula(self, formula: str, *, context: str) -> str:
        return self._repair_json(_formula_repair_prompt(formula, context), "formula", "Formula repair")

    def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]:
        return self._repair_markdown(_markdown_repair_prompt(content, context))

    def repair_region(self, content: str, *, context: str) -> str:
        return self._repair_json(_region_repair_prompt(content, context), "content", "Region repair")

    def _repair_markdown(self, prompt: str) -> tuple[str, str]:
        payload = {
            "model": self._model,
            "temperature": 0,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": "You repair complete reader sections. Return the requested JSON only."},
                {"role": "user", "content": prompt},
            ],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Authorization": f"Bearer {self._api_key}", "Content-Type": "application/json"},
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ReadingServiceError("Content repair provider returned an invalid response.") from exc
        if not isinstance(content, str):
            raise ReadingServiceError("Content repair provider returned an invalid response.")
        return _markdown_repair_result(content)

    def _repair_json(self, prompt: str, key: str, label: str) -> str:
        payload = {
            "model": self._model,
            "temperature": 0,
            "response_format": {"type": "json_object"},
            "messages": [
                {"role": "system", "content": "You repair isolated reader content. Return the requested JSON only."},
                {"role": "user", "content": prompt},
            ],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Authorization": f"Bearer {self._api_key}", "Content-Type": "application/json"},
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = data["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError) as exc:
            raise ReadingServiceError(f"{label} provider returned an invalid response.") from exc
        if not isinstance(content, str):
            raise ReadingServiceError(f"{label} provider returned an invalid response.")
        return _repair_json_value(content, key, label)


class AnthropicCompatibleTranslationProvider:
    """Minimal Anthropic Messages API client for compatible gateway services."""

    def __init__(self, config: TranslationProviderConfig, api_key: str) -> None:
        if config.provider != "anthropic-compatible":
            raise ReadingServiceError("translation.provider must be 'anthropic-compatible'")
        if not config.base_url or not config.model:
            raise ReadingServiceError(
                "Configure translation.base_url and translation.model before starting translation."
            )
        self._url = f"{config.base_url.rstrip('/')}/v1/messages"
        self._model = config.model
        self._timeout_seconds = config.timeout_seconds
        self._api_key = api_key

    def translate_section(self, source: str, *, target_language: str) -> str:
        payload = {
            "model": self._model,
            "max_tokens": 8192,
            "temperature": 0.1,
            "system": _SYSTEM_PROMPT,
            "messages": [
                {"role": "user", "content": _translation_prompt(source, target_language)}
            ],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "x-api-key": self._api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = next(
                item["text"] for item in data["content"] if item.get("type") == "text"
            )
        except (KeyError, StopIteration, TypeError) as exc:
            _LOGGER.warning("Translation provider returned an invalid Anthropic-compatible response")
            raise ReadingServiceError("Translation provider returned an invalid response.") from exc
        if not isinstance(content, str) or not content.strip():
            raise ReadingServiceError("Translation provider returned an empty translation.")
        return _strip_markdown_fence(content)

    def translate_title(self, title: str, *, target_language: str) -> str:
        payload = {
            "model": self._model,
            "max_tokens": 256,
            "temperature": 0.1,
            "system": "You translate section titles. Return only the title.",
            "messages": [{"role": "user", "content": _title_translation_prompt(title, target_language)}],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "x-api-key": self._api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = next(item["text"] for item in data["content"] if item.get("type") == "text")
        except (KeyError, StopIteration, TypeError) as exc:
            raise ReadingServiceError("Translation provider returned an invalid response.") from exc
        if not isinstance(content, str) or not content.strip():
            raise ReadingServiceError("Translation provider returned an empty translation.")
        return _strip_markdown_fence(content)

    def repair_formula(self, formula: str, *, context: str) -> str:
        return self._repair_json(_formula_repair_prompt(formula, context), "formula", "Formula repair")

    def repair_markdown(self, content: str, *, context: str) -> tuple[str, str]:
        return self._repair_markdown(_markdown_repair_prompt(content, context))

    def repair_region(self, content: str, *, context: str) -> str:
        return self._repair_json(_region_repair_prompt(content, context), "content", "Region repair")

    def _repair_markdown(self, prompt: str) -> tuple[str, str]:
        payload = {
            "model": self._model,
            "max_tokens": 8192,
            "temperature": 0,
            "system": "You repair complete reader sections. Return the requested JSON only.",
            "messages": [{"role": "user", "content": prompt}],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "x-api-key": self._api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = next(item["text"] for item in data["content"] if item.get("type") == "text")
        except (KeyError, StopIteration, TypeError) as exc:
            raise ReadingServiceError("Content repair provider returned an invalid response.") from exc
        if not isinstance(content, str):
            raise ReadingServiceError("Content repair provider returned an invalid response.")
        return _markdown_repair_result(content)

    def _repair_json(self, prompt: str, key: str, label: str) -> str:
        payload = {
            "model": self._model,
            "max_tokens": 1024,
            "temperature": 0,
            "system": "You repair isolated reader content. Return the requested JSON only.",
            "messages": [{"role": "user", "content": prompt}],
        }
        request = Request(
            self._url,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "x-api-key": self._api_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        data = _request_json(request, self._timeout_seconds)
        try:
            content = next(item["text"] for item in data["content"] if item.get("type") == "text")
        except (KeyError, StopIteration, TypeError) as exc:
            raise ReadingServiceError(f"{label} provider returned an invalid response.") from exc
        if not isinstance(content, str):
            raise ReadingServiceError(f"{label} provider returned an invalid response.")
        return _repair_json_value(content, key, label)


def configured_provider(config: TranslationProviderConfig) -> TranslationProvider:
    """Build the configured provider without exposing its credential to callers."""

    api_key = os.environ.get("BOOKGRAPH_TRANSLATION_API_KEY", "").strip()
    if not api_key:
        raise ReadingServiceError("Set BOOKGRAPH_TRANSLATION_API_KEY on the BookGraph server.")
    if config.provider == "openai-compatible":
        return OpenAICompatibleTranslationProvider(config, api_key)
    if config.provider == "anthropic-compatible":
        return AnthropicCompatibleTranslationProvider(config, api_key)
    raise ReadingServiceError(
        "translation.provider must be 'openai-compatible' or 'anthropic-compatible'"
    )


def _request_json(request: Request, timeout_seconds: int) -> dict[str, Any]:
    try:
        with urlopen(request, timeout=timeout_seconds) as response:  # noqa: S310
            return json.loads(response.read().decode("utf-8"))
    except (HTTPError, URLError, TimeoutError, ValueError, OSError) as exc:
        # Do not propagate provider responses: they can contain credentials, request data,
        # or provider-specific internals and are later exposed through the browser API.
        _LOGGER.warning("Translation provider request failed: %s", type(exc).__name__)
        raise ReadingServiceError("Translation provider request failed.") from exc


def _strip_markdown_fence(content: str) -> str:
    """Tolerate a provider wrapping the required Markdown answer in one fence."""

    value = content.strip()
    if not value.startswith("```"):
        return value
    lines = value.splitlines()
    if len(lines) >= 2 and lines[-1].strip() == "```":
        return "\n".join(lines[1:-1]).strip()
    return value
