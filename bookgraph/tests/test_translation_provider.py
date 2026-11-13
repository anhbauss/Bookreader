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
        translated = AnthropicCompatibleTranslationProvider(config, "secret").translate_section(
            "Hello.", target_language="vi"
        )

    assert translated == "Xin chào."
    request = urlopen.call_args.args[0]
    assert request.full_url == "https://api.mwapi.dev/v1/messages"
    assert request.get_header("X-api-key") == "secret"
    assert request.get_header("Anthropic-version") == "2023-06-01"
    payload = json.loads(request.data)
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
