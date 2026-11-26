"""Read model IDs from the selected API; credentials arrive over stdin on desktop."""

from __future__ import annotations

import json
import sys
import time
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import HTTPRedirectHandler, Request, build_opener

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.provider_connection import resolve_connection
from bookgraph.translation_provider import TranslationProviderConfig


class _NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args: Any, **kwargs: Any) -> None:
        # Never forward the user's key to a redirected host.
        return None


_open = build_opener(_NoRedirect()).open


def list_models(provider: str, base_url: str, api_key: str) -> list[dict[str, str]]:
    if not api_key.strip():
        raise ReadingServiceError('Enter your API key before loading models.')
    config = resolve_connection(TranslationProviderConfig(provider, base_url, None, 10))
    anthropic = config.provider == 'anthropic-compatible'
    endpoint = f"{config.base_url}/{'v1/' if anthropic else ''}models"
    headers = ({'x-api-key': api_key.strip(), 'anthropic-version': '2023-06-01'}
               if anthropic else {'Authorization': f'Bearer {api_key.strip()}'})
    models: dict[str, dict[str, str]] = {}
    cursor: str | None = None
    cursors: set[str] = set()
    deadline = time.monotonic() + 30
    try:
        for _ in range(10):
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise TimeoutError()
            url = endpoint + ('?' + urlencode({'after_id': cursor}) if cursor else '')
            with _open(Request(url, headers=headers), timeout=min(10, remaining)) as result:
                body = result.read(1024 * 1024 + 1)
            if len(body) > 1024 * 1024:
                raise ValueError('Oversized model catalog')
            payload = json.loads(body)
            if not isinstance(payload, dict) or not isinstance(payload.get('data'), list):
                raise ValueError('Invalid model catalog')
            for item in payload['data']:
                if not isinstance(item, dict):
                    continue
                identifier = item.get('id')
                if (not isinstance(identifier, str) or not identifier.strip()
                        or len(identifier) > 250 or any(ord(c) < 32 for c in identifier)):
                    continue
                label = item.get('display_name')
                models[identifier] = {
                    'id': identifier,
                    'name': label if isinstance(label, str) and label.strip() else identifier,
                }
            if not payload.get('has_more'):
                return list(models.values())
            cursor = payload.get('last_id')
            if not isinstance(cursor, str) or not cursor or cursor in cursors:
                raise ValueError('Invalid model pagination')
            cursors.add(cursor)
        raise ReadingServiceError(
            'Too many model pages. Copy a model ID from your provider dashboard.'
        )
    except HTTPError as exc:
        if exc.code in {401, 403}:
            message = 'The service rejected the API key or denied access to its model list.'
        elif exc.code in {404, 405, 501}:
            message = 'Model listing is unavailable. Copy a Model ID from your provider dashboard.'
        elif 300 <= exc.code < 400:
            message = 'The model endpoint redirected. Enter its final Base URL and try again.'
        elif exc.code == 429:
            message = 'The model list is rate limited. Wait and try again.'
        else:
            message = 'Cannot load models. Check your provider Base URL and try again.'
        raise ReadingServiceError(message) from exc
    except (URLError, TimeoutError, OSError) as exc:
        raise ReadingServiceError('Cannot reach the model API. Check your connection.') from exc
    except (ValueError, TypeError) as exc:
        raise ReadingServiceError('The service returned an invalid model list.') from exc


def main() -> int:
    try:
        payload = json.loads(sys.stdin.read(65536))
        if not isinstance(payload, dict) or any(
            not isinstance(payload.get(key), str) for key in ('provider', 'base_url', 'api_key')
        ):
            raise ReadingServiceError('Invalid model-list request.')
        models = list_models(payload['provider'], payload['base_url'], payload['api_key'])
        print(json.dumps({'models': models}))
        return 0
    except (ReadingServiceError, ValueError, TypeError) as error:
        message = (str(error) if isinstance(error, ReadingServiceError)
                   else 'Invalid model-list request.')
        print(json.dumps({'error': message}))
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
