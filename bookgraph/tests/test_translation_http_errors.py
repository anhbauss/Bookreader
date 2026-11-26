import io
import json
from email.message import Message
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError
from urllib.request import Request

import pytest

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.translation_provider import _request_json


def http_error(code: int, payload: object, retry_after: str | None = None) -> HTTPError:
    headers = Message()
    if retry_after is not None:
        headers["Retry-After"] = retry_after
    return HTTPError(
        "https://api.example.test/chat/completions",
        code,
        "private diagnostic text",
        headers,
        io.BytesIO(json.dumps(payload).encode()),
    )


def success() -> MagicMock:
    response = MagicMock()
    response.__enter__.return_value = response
    response.read.return_value = b'{"choices":[{"message":{"content":"OK"}}]}'
    return response


def test_temporary_503_retries_and_returns_the_successful_response() -> None:
    failures = [http_error(503, {"error": {"status": "UNAVAILABLE"}}) for _ in range(2)]
    request = Request("https://api.example.test/chat/completions", data=b"{}")
    with patch(
        "bookgraph.translation_provider.urlopen", side_effect=[*failures, success()]
    ) as send:
        with patch("bookgraph.translation_provider.time.sleep") as sleep:
            result = _request_json(request, 120)
    assert result["choices"][0]["message"]["content"] == "OK"
    assert send.call_count == 3
    assert [call.args[0] for call in send.call_args_list] == [request] * 3
    assert [call.args[0] for call in sleep.call_args_list] == [1, 2]


def test_exhausted_503_retries_show_the_actual_http_status_without_private_body() -> None:
    failures = [
        http_error(503, {"error": {"message": "private-key-and-book-text"}}) for _ in range(3)
    ]
    with patch("bookgraph.translation_provider.urlopen", side_effect=failures) as send:
        with patch("bookgraph.translation_provider.time.sleep"):
            with pytest.raises(ReadingServiceError, match="HTTP 503.*3 attempts") as failure:
                _request_json(Request("https://api.example.test"), 120)
    assert send.call_count == 3
    assert "private" not in str(failure.value)


@pytest.mark.parametrize(
    ("status", "payload", "expected"),
    [
        (401, {"error": {"message": "secret"}}, "API key"),
        (403, {"error": {"message": "secret"}}, "access"),
        (404, {"error": {"message": "secret"}}, "model or API endpoint"),
        (429, {"error": {"code": "credit_balance_exhausted"}}, "credits"),
        (429, [{"error": {"message": "Quota exceeded, limit: 0, secret"}}], "no API quota"),
        (429, {"error": {"message": "Daily quota exceeded secret"}}, "quota"),
    ],
)
def test_permanent_or_quota_errors_stop_without_retries(status, payload, expected) -> None:
    with patch(
        "bookgraph.translation_provider.urlopen", side_effect=http_error(status, payload)
    ) as send:
        with patch("bookgraph.translation_provider.time.sleep") as sleep:
            with pytest.raises(ReadingServiceError, match=expected) as failure:
                _request_json(Request("https://api.example.test"), 120)
    assert f"HTTP {status}" in str(failure.value)
    assert "secret" not in str(failure.value)
    assert send.call_count == 1
    sleep.assert_not_called()


def test_retry_after_is_respected_and_long_server_waits_are_not_ignored() -> None:
    with patch(
        "bookgraph.translation_provider.urlopen",
        side_effect=[
            http_error(503, {}, "4"),
            success(),
        ],
    ):
        with patch("bookgraph.translation_provider.time.sleep") as sleep:
            _request_json(Request("https://api.example.test"), 120)
    sleep.assert_called_once_with(4)
    with patch(
        "bookgraph.translation_provider.urlopen", side_effect=http_error(503, {}, "3600")
    ) as send:
        with patch("bookgraph.translation_provider.time.sleep") as sleep:
            with pytest.raises(ReadingServiceError, match="HTTP 503"):
                _request_json(Request("https://api.example.test"), 120)
    assert send.call_count == 1
    sleep.assert_not_called()
