import json
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError

import pytest

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.model_catalog import list_models
from bookgraph.provider_connection import resolve_connection
from bookgraph.translation_provider import TranslationProviderConfig, configured_provider


def response(payload):
    result = MagicMock()
    result.__enter__.return_value = result
    result.read.return_value = json.dumps(payload).encode()
    return result


@pytest.mark.parametrize(('provider', 'base', 'protocol', 'expected'), [
    ('openai', 'https://wrong.invalid', 'openai-compatible', 'https://api.openai.com/v1'),
    ('anthropic', 'https://wrong.invalid', 'anthropic-compatible', 'https://api.anthropic.com'),
    ('gemini', 'https://wrong.invalid', 'openai-compatible',
     'https://generativelanguage.googleapis.com/v1beta/openai'),
    ('openai-compatible', 'http://localhost:8045', 'openai-compatible', 'http://localhost:8045/v1'),
    ('anthropic-compatible', 'https://proxy.test/v1', 'anthropic-compatible', 'https://proxy.test'),
])
def test_resolve_explicit_official_and_custom_connections(provider, base, protocol, expected):
    config = resolve_connection(TranslationProviderConfig(provider, base, 'chosen-model', 10))
    assert config.provider == protocol
    assert config.base_url == expected
    assert config.model == 'chosen-model'


@pytest.mark.parametrize('provider', ['openai-compatible', 'anthropic-compatible', 'antigravity'])
def test_custom_connection_never_defaults_to_mwapi(provider):
    with pytest.raises(ReadingServiceError, match='Base URL'):
        resolve_connection(TranslationProviderConfig(provider, '', 'model', 10))


def test_list_openai_models_uses_official_address_and_bearer_key():
    payload = {'data': [{'id': 'chat-model'}, {'id': 'chat-model'}, {'id': ''}]}
    with patch('bookgraph.model_catalog._open', return_value=response(payload)) as send:
        models = list_models('openai', 'https://wrong.invalid', 'test-secret')
    req = send.call_args.args[0]
    assert req.full_url == 'https://api.openai.com/v1/models'
    assert req.get_header('Authorization') == 'Bearer test-secret'
    assert models == [{'id': 'chat-model', 'name': 'chat-model'}]


def test_anthropic_models_follow_pagination_with_protocol_headers():
    pages = [
        response({'data': [{'id': 'model-a', 'display_name': 'Model A'}],
                  'has_more': True, 'last_id': 'model-a'}),
        response({'data': [{'id': 'model-b', 'display_name': 'Model B'}], 'has_more': False}),
    ]
    with patch('bookgraph.model_catalog._open', side_effect=pages) as send:
        models = list_models('anthropic-compatible', 'https://proxy.test/v1', 'test-secret')
    first, second = [call.args[0] for call in send.call_args_list]
    assert first.full_url == 'https://proxy.test/v1/models'
    assert second.full_url.endswith('?after_id=model-a')
    assert first.get_header('X-api-key') == 'test-secret'
    assert first.get_header('Anthropic-version') == '2023-06-01'
    assert models == [{'id': 'model-a', 'name': 'Model A'}, {'id': 'model-b', 'name': 'Model B'}]


def test_catalog_does_not_expose_provider_error_body_or_secret():
    error = HTTPError('https://proxy.test/v1/models', 401, 'raw test-secret', {}, None)
    with patch('bookgraph.model_catalog._open', side_effect=error):
        with pytest.raises(ReadingServiceError, match='API key') as failure:
            list_models('openai-compatible', 'https://proxy.test/v1', 'test-secret')
    assert 'test-secret' not in str(failure.value)


def test_factory_routes_official_credentials_to_official_endpoint(monkeypatch):
    monkeypatch.setenv('BOOKGRAPH_TRANSLATION_API_KEY', 'fake-key')
    provider = configured_provider(TranslationProviderConfig('anthropic', '', 'selected-model', 10))
    with patch('bookgraph.translation_provider._request_json', return_value={
        'content': [{'type': 'text', 'text': 'Title'}],
    }) as send:
        provider.translate_title('Title', target_language='vi')
    assert send.call_args.args[0].full_url == 'https://api.anthropic.com/v1/messages'


def test_unsupported_catalog_gives_manual_model_id_instructions():
    error = HTTPError('https://proxy.test/v1/models', 404, 'raw private response', {}, None)
    with patch('bookgraph.model_catalog._open', side_effect=error):
        with pytest.raises(ReadingServiceError, match='Model ID from your provider dashboard'):
            list_models('openai-compatible', 'https://proxy.test/v1', 'test-secret')


def test_bad_pagination_does_not_loop_indefinitely():
    page = {'data': [{'id': 'model-a'}], 'has_more': True, 'last_id': 'model-a'}
    with patch('bookgraph.model_catalog._open', return_value=response(page)) as send:
        with pytest.raises(ReadingServiceError, match='invalid model list'):
            list_models('anthropic', '', 'test-secret')
    assert send.call_count == 2


def test_legacy_proxy_catalog_preserves_the_gateway_prefix():
    with patch('bookgraph.model_catalog._open', return_value=response({'data': []})) as send:
        assert list_models('antigravity', 'http://localhost:8045/gateway', 'key') == []
    assert send.call_args.args[0].full_url == 'http://localhost:8045/gateway/v1/models'


def test_google_gemini_catalog_uses_google_endpoint_and_ai_studio_key():
    with patch('bookgraph.model_catalog._open', return_value=response({
        'data': [{'id': 'gemini-text-model'}],
    })) as send:
        models = list_models('gemini', 'http://localhost:8045', 'fake-ai-studio-key')
    req = send.call_args.args[0]
    assert req.full_url == 'https://generativelanguage.googleapis.com/v1beta/openai/models'
    assert req.get_header('Authorization') == 'Bearer fake-ai-studio-key'
    assert models == [{'id': 'gemini-text-model', 'name': 'gemini-text-model'}]


def test_google_gemini_translation_routes_to_google(monkeypatch):
    monkeypatch.setenv('BOOKGRAPH_TRANSLATION_API_KEY', 'fake-ai-studio-key')
    provider = configured_provider(TranslationProviderConfig('gemini', '', 'gemini-text-model', 10))
    with patch('bookgraph.translation_provider._request_json', return_value={
        'choices': [{'message': {'content': 'Xin chào'}}],
    }) as send:
        assert provider.translate_section('Hello', target_language='vi') == 'Xin chào'
    req = send.call_args.args[0]
    assert req.full_url == 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
    assert json.loads(req.data)['model'] == 'gemini-text-model'
