from __future__ import annotations

import json
from unittest.mock import MagicMock, patch

from pytest import MonkeyPatch

from bookgraph.translation_provider import (
    AnthropicCompatibleTranslationProvider,
    TranslationProviderConfig,
    configured_provider,
)


def test_anthropic_provider_posts_messages_request_and_reads_text_response() -> None:
    config = TranslationProviderConfig(
        provider="anthropic-compatible",
        base_url="https://api.mwapi.dev",
        model="claude-haiku-5-5",
        timeout_seconds=120,
    )
    response = MagicMock()
    response.read.return_value = json.dumps(
        {"content": [{"type": "text", "text": "Xin chào."}]}
    ).encode()
    response.__enter__.return_value = response

    with patch("bookgraph.translation_provider.urlopen", return_value=response) as urlopen:
        provider = AnthropicCompatibleTranslationProvider(config, "secret")
        translated = provider.translate_section("Hello.", target_language="vi")
        translated_title = provider.translate_title("Decision Theory", target_language="vi")

    assert translated == "Xin chào."
    assert translated_title == "Xin chào."
    body_request, title_request = [call.args[0] for call in urlopen.call_args_list]
    assert body_request.full_url == "https://api.mwapi.dev/v1/messages"
    assert body_request.get_header("X-api-key") == "secret"
    assert body_request.get_header("Anthropic-version") == "2023-06-01"
    payload = json.loads(body_request.data)
    assert payload["model"] == "claude-haiku-5-5"
    assert payload["temperature"] == 0.1
    assert payload["max_tokens"] == 8192
    assert payload["system"].startswith("You translate book sections faithfully.")
    assert payload["messages"] == [
        {
            "role": "user",
            "content": "Translate this complete section into vi. Preserve every non-prose structural token exactly as instructed.\n\n--- SOURCE ---\nHello.",
        }
    ]
    title_payload = json.loads(title_request.data)
    assert title_payload["max_tokens"] == 256
    assert title_payload["messages"][0]["content"].endswith("--- TITLE ---\nDecision Theory")


def test_formula_repair_requires_a_single_safe_json_formula() -> None:
    from bookgraph.translation_provider import _formula_repair_result

    assert _formula_repair_result('{"formula":"\\\\frac{1}{2}"}') == "\\frac{1}{2}"


def test_configured_provider_selects_anthropic_provider_from_environment(
    monkeypatch: MonkeyPatch,
) -> None:
    monkeypatch.setenv("BOOKGRAPH_TRANSLATION_API_KEY", "secret")

    provider = configured_provider(
        TranslationProviderConfig(
            provider="anthropic-compatible",
            base_url="https://api.mwapi.dev",
            model="claude-haiku-5-5",
            timeout_seconds=120,
        )
    )

    assert isinstance(provider, AnthropicCompatibleTranslationProvider)


def test_anthropic_translation_rejects_output_cut_off_by_token_limit() -> None:
    import pytest

    from bookgraph.mcp.errors import ReadingServiceError

    config = TranslationProviderConfig("anthropic-compatible", "https://example.test", "model", 120)
    response = {"stop_reason": "max_tokens", "content": [{"type": "text", "text": "Partial"}]}
    with patch("bookgraph.translation_provider._request_json", return_value=response):
        with pytest.raises(ReadingServiceError, match="truncated"):
            AnthropicCompatibleTranslationProvider(config, "secret").translate_section(
                "Source", target_language="vi"
            )


def test_openai_translation_rejects_output_cut_off_by_token_limit() -> None:
    import pytest

    from bookgraph.mcp.errors import ReadingServiceError
    from bookgraph.translation_provider import OpenAICompatibleTranslationProvider

    config = TranslationProviderConfig("openai-compatible", "https://example.test", "model", 120)
    response = {"choices": [{"finish_reason": "length", "message": {"content": "Partial"}}]}
    with patch("bookgraph.translation_provider._request_json", return_value=response):
        with pytest.raises(ReadingServiceError, match="truncated"):
            OpenAICompatibleTranslationProvider(config, "secret").translate_section(
                "Source", target_language="vi"
            )


def test_book_metadata_provider_extracts_json_and_bounds_the_excerpt() -> None:
    from bookgraph.translation_provider import OpenAICompatibleTranslationProvider

    result = {"title": "Real Book", "authors": ["Jane Doe"], "editors": [],
              "publisher": None, "publication_year": 2024}
    config = TranslationProviderConfig("openai-compatible", "https://example.test", "model", 60)
    response = {"choices": [{"message": {"content": json.dumps(result)}}]}
    with patch("bookgraph.translation_provider._request_json", return_value=response) as request:
        value = OpenAICompatibleTranslationProvider(config, "secret").extract_book_metadata("x" * 30000)
    assert value == result
    payload = json.loads(request.call_args.args[0].data)
    assert len(payload["messages"][1]["content"]) < 20100
    assert "do not browse, guess" in payload["messages"][0]["content"]
    assert payload["max_tokens"] == 1200


def test_book_metadata_provider_rejects_invalid_names_and_empty_responses() -> None:
    import pytest

    from bookgraph.mcp.errors import ReadingServiceError
    from bookgraph.translation_provider import _metadata_result

    with pytest.raises(ReadingServiceError, match="empty"):
        _metadata_result(None)  # type: ignore[arg-type]
    with pytest.raises(ReadingServiceError, match="invalid names"):
        _metadata_result(json.dumps({"title": "Book", "authors": "Invented", "editors": [],
                                    "publisher": None, "publication_year": None}))
