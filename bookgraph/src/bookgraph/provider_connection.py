"""Resolve explicit official providers and user-supplied compatible gateways."""

from dataclasses import replace
from urllib.parse import urlsplit, urlunsplit

from bookgraph.mcp.errors import ReadingServiceError
from bookgraph.translation_provider import TranslationProviderConfig

OFFICIAL = {
    'openai': ('openai-compatible', 'https://api.openai.com/v1'),
    'anthropic': ('anthropic-compatible', 'https://api.anthropic.com'),
    'gemini': ('openai-compatible', 'https://generativelanguage.googleapis.com/v1beta/openai'),
}


def resolve_connection(config: TranslationProviderConfig) -> TranslationProviderConfig:
    if config.provider in OFFICIAL:
        protocol, base = OFFICIAL[config.provider]
        return replace(config, provider=protocol, base_url=base)
    # Previously saved proxy configurations remain gateways, never Google credentials.
    legacy_proxy = config.provider == 'antigravity'
    if legacy_proxy:
        config = replace(config, provider='openai-compatible')
    if config.provider not in {'openai-compatible', 'anthropic-compatible'}:
        raise ReadingServiceError(
            'Choose OpenAI, Anthropic, Google Gemini or a compatible gateway.'
        )
    base = (config.base_url or '').strip()
    if not base:
        raise ReadingServiceError('Enter the API gateway Base URL.')
    try:
        url = urlsplit(base)
        valid = (url.scheme in {'http', 'https'} and url.hostname and url.port != 0
                 and not (url.username or url.password or url.query or url.fragment)
                 and not any(character.isspace() for character in base))
    except ValueError:
        valid = False
    if not valid:
        raise ReadingServiceError(
            'Enter an HTTP(S) Base URL without credentials or query parameters.'
        )
    path = url.path.rstrip('/')
    if config.provider == 'anthropic-compatible':
        path = path.removesuffix('/messages').removesuffix('/v1')
    else:
        path = path.removesuffix('/chat/completions')
        if not path:
            path = '/v1'
        if legacy_proxy and not path.endswith('/v1'):
            path += '/v1'
    return replace(config, base_url=urlunsplit((url.scheme, url.netloc, path, '', '')))
