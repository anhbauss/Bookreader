# CONTEXT SUMMARY: BookGraph Progressive Translation Pipeline
**Project:** BookGraph (Local-first bilingual reading workspace & MCP server)
**Feature:** Progressive translation coverage (5%, 10%, 25%, 100%) and "Translate next section" boundary handling.

## 1. Backend Architecture (Python)
- **Translation Provider (`src/bookgraph/translation_provider.py`)**: Implemented OpenAI-compatible REST API provider. Reads config from `bookgraph.toml` `[translation]` block.
- **Security**: API Key strictly loaded from `BOOKGRAPH_TRANSLATION_API_KEY` env var. Never exposed to browser, config files, or coverage records.
- **Coverage State (`src/bookgraph/translation_coverage.py`)**: 
  - State file: `workspace/runs/translation-coverage/<doc_id>.<lang>.json`
  - Tracks requested percent, target section IDs, current translating section, and failures.
  - "Ready" status dynamically evaluated via BookGraph artifact freshness (`status=fresh`).
- **HTTP API (`src/bookgraph/http_api.py`)**:
  - `GET /api/documents/{doc_id}/translations/{lang}/coverage`
  - `POST /api/documents/{doc_id}/translations/{lang}/coverage` (Payload: `{"percent": 5}`)
  - `POST /api/documents/{doc_id}/translations/{lang}/next` (Payload: `{"current_section_id": "..."}`)

## 2. Frontend / Reader UI (TypeScript / React)
- **Polling**: Reader fetches coverage state every 1.5 seconds.
- **UI States**: 
  - Displays coverage selection panel (5 / 10 / 25 / 100%) in Bilingual mode if no coverage exists.
  - Shows translation progress (e.g., "12 / 18 sections ready").
- **Boundary Handling**: Swaps "Next" button with "Translate next section" when hitting the edge of the current translation coverage.
- **Independence**: Original reading mode remains unblocked by translation status.

## 3. Current Status & Next Actions
- **Backend Quality**: 100% Passed. Fixed circular import in `mcp/service.py` & `translation_coverage.py`. Fixed workspace path initialization in tests. Pytest, Ruff (targeted files), and Mypy all pass.
- **Immediate Next Step**: 
  1. Run Frontend validation in `fumadocs-editor-dev`: `corepack pnpm --filter book-reader test -- translation.test.ts`, `types:check`, and `build`.
  2. Boot the HTTP server (`bookgraph serve-http`) with `export BOOKGRAPH_TRANSLATION_API_KEY='...'`.
  3. Test the real API router via frontend with a 5% coverage run on a small document.

  claude --resume 345ba5b9-48e9-4375-8397-a72347937196
