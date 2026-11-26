# BookGraph

BookGraph is a local PDF reader with optional AI translation and formula repair.
Desktop release builds include the Python service. Readers do not need Python or uv.

Development: `uv sync --extra parsers --extra http --extra dev`.
Run the CLI with `uv run bookgraph --help`.

Desktop packaging instructions are in `../scripts/release/README.md`.

## API setup and choosing a model

The desktop Sign in screen offers four connection types:

- **OpenAI (official)** and **Anthropic (official)** use their official API addresses.
  Enter the matching API key, click **Load models**, then select a text/chat model.
- **Google Gemini (official)** uses your Google AI Studio key and the official Google API address.
- **Other API gateway** lets you choose OpenAI-compatible or Anthropic-compatible
  protocol and enter the gateway's own Base URL and key.

**Load models** reads the model catalog from the selected service. Labels show both
the display name and API ID when they differ. Listing does not verify that a model
supports this app's chat translation requests. If listing is unavailable, choose
**Enter model ID manually** (or use the gateway's Model ID field), then copy the
exact API identifier from your provider dashboard's **Models/API** page. Gemini users can click **Load models** with their Google AI Studio key. No model is guessed or
silently selected, and no translation request is made while loading the catalog.

Keys are passed to model discovery over stdin, never in command-line arguments.
A saved key is reused only for the same provider and address. Existing gateway
settings retain their previous address and model under **Other API gateway**;
they are not silently switched to an official service. Fresh setups have no MWAPI
fallback. All API configuration remains on Sign in, reachable via Profile → Logout.

Model catalog protocol references: [OpenAI](https://developers.openai.com/api/reference/resources/models/methods/list)
and [Anthropic](https://platform.claude.com/docs/en/api/models/list).

## Google Gemini

Select **Google Gemini (official)** on Sign in, enter your key from
[Google AI Studio](https://aistudio.google.com/api-keys), click **Load models** and
select a Gemini text model. No Base URL, protocol choice or local proxy is needed.

Requests go directly to Google's official OpenAI-compatible endpoint:
`https://generativelanguage.googleapis.com/v1beta/openai`. The same Google endpoint
is used for model discovery, translation, content repair and book metadata.
See [Google's compatibility documentation](https://aistudio.google.com/docs/openai).

For CLI use, set `translation.provider = "gemini"` and `translation.model` in
`bookgraph.toml`, then supply the AI Studio key as `BOOKGRAPH_TRANSLATION_API_KEY`.
Explicit translation environment values override the corresponding workspace fields.

Older proxy presets are read as custom gateways with their previous host and model;
their saved credentials are never silently reassigned to Google Gemini.
