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


_SYSTEM_PROMPT = (
    "You translate book sections faithfully. Return only Markdown, never a commentary or a code "
    "fence. Preserve all Markdown structure, heading levels, link destinations, image paths, HTML "
    "anchors, and TeX commands. Keep inline TeX inside $...$ and standalone equations inside "
    "$$...$$. Never truncate equations or prose."
)


def _translation_prompt(source: str, target_language: str) -> str:
    return (
        f"Translate this complete section into {target_language}. Preserve every non-prose "
        "structural token exactly as instructed.\n\n--- SOURCE ---\n"
        f"{source}"
    )


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
