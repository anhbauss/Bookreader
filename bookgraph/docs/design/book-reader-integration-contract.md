# Book_reader integration contract

> **Status:** Discovery baseline for T2–T8.  
> **Authority:** [`../../../book-reader-architecture.md`](../../../book-reader-architecture.md) is the product/architecture source of truth. This document records only the contracts confirmed in the current codebases on 2026-11-11.

## 1. Architectural boundary

| Concern | Owner | Confirmed integration boundary |
| --- | --- | --- |
| Canonical parsed content, sections, provenance, annotations, concepts, translations and reading plans | BookGraph | Workspace artifacts plus pure Python functions re-exported from `bookgraph.mcp.service` |
| Book rendering | New reader app built beside/integration with `fumadocs-editor-dev` | Generated MDX copied/referenced as reader content; the reader is strictly read-only |
| Browser data access | New thin HTTP adapter | Calls `bookgraph.mcp.service`; browser must not invoke MCP tools or filesystem directly |

`wiki/books` is explicitly **not** a reader input. It is an output surface of the wiki backend, whereas human reading sections are canonical under `sources/sections/<doc_id>/`.

## 2. Confirmed BookGraph workspace contract

`WorkspacePaths` defines these relevant canonical locations:

```text
<workspace>/
├── sources/
│   ├── inbox/
│   ├── parsed/<doc_id>/document.json
│   └── sections/<doc_id>/
│       ├── sections.jsonl
│       └── <section_id>.md
├── indexes/
├── annotations/
├── translations/
└── reading_plans/
```

Evidence: `src/bookgraph/workspace.py`.

### 2.1 Parsing markdown

- Parser name: `markdown`.
- Command: `bookgraph parse <source.md> --output <workspace> --parser markdown --doc-id <doc_id>`.
- The parser is local/deterministic and uses CommonMark, tables and the `dollarmath` plugin.
- Markdown source evidence is stored in `sources/parsed/<doc_id>/document.json`; blocks retain source line provenance.
- A Markdown image that is the only item in a paragraph becomes a canonical `image` block and preserves its source URL/path in `metadata["src"]`.

Evidence: `src/bookgraph/cli/parse.py`, `src/bookgraph/parsers/markdown.py`.

### 2.2 Sections and reading order

- Command: `bookgraph segment <workspace> <doc_id>`.
- The default segmenter is heading-based. This is the appropriate deterministic first path for the input markdown in scope.
- `sources/sections/<doc_id>/sections.jsonl` is the machine-readable manifest; its nonblank line order is the reading order.
- Each `<section_id>.md` carries YAML frontmatter:

```yaml
id: <section-id>
doc_id: <doc-id>
title: <section-title>
level: <int>
heading_path: [<string>, ...]
page_start: <int-or-null>
page_end: <int-or-null>
prev_id: <section-id-or-null>
next_id: <section-id-or-null>
block_ids: [<block-id>, ...]
```

- Section IDs are filename-safe lowercase slug components separated by `.`. The writer rejects duplicate or unsafe IDs.

Evidence: `src/bookgraph/cli/segment.py`, `src/bookgraph/sections.py`.

### 2.3 Index and reading plan

Run after segmenting:

```text
bookgraph index build <workspace> --doc-id <doc_id>
bookgraph reading-plan create <workspace> <doc_id>
```

- The SQLite index is built from `sections.jsonl`; this is distinct from `wiki/books`.
- Reading plans persist separately in `reading_plans/<plan_id>.json`.
- Marking a section read updates only the reading plan under a lock; it does not mutate source section content or provenance.

Evidence: `src/bookgraph/cli/index.py`, `src/bookgraph/cli/reading_plan.py`, `src/bookgraph/mcp/reading_tools.py`.

## 3. Asset contract for T2 and T6

### 3.1 Ingestion output required by T2

T2 must stage every accepted image into:

```text
sources/parsed/<doc_id>/images/<basename>
```

and rewrite matched Markdown image links to:

```markdown
![alt](images/<basename>)
```

This matches BookGraph's existing asset resolver: it tests `parsed_dir/images/<relative-reference>` before `parsed_dir/<relative-reference>`, rejects URLs and absolute paths, requires a real regular file, and verifies resolved containment under the parsed document directory (including symlink escape prevention).

### 3.2 Additional T2 validation beyond resolver

T2 must still enforce the architecture's stricter staging boundary before copying:

- derive the target only from a safe basename;
- reject traversal, absolute paths and separator-bearing names;
- allowlist image formats; and
- never fetch a remote URL.

The existing resolver protects *reading* existing artifacts but is not a substitute for secure ingestion copying.

### 3.3 HTTP asset endpoint contract for T6

The adapter’s public asset route should be:

```text
GET /api/assets/{doc_id}/{basename}
```

It must validate both path components and serve only a regular, non-symlink-escaping file from `sources/parsed/<doc_id>/images/`, with a server-derived allowlisted content type. Do not expose BookGraph's absolute `AssetRef.path` to the browser.

Evidence: `src/bookgraph/assets.py`, `src/bookgraph/mcp/asset_views.py`, `src/bookgraph/mcp/loading.py`.

## 4. Confirmed `bookgraph.mcp.service` facade for T6

`bookgraph.mcp.service` is a pure public facade with no FastMCP dependency; the MCP server is deliberately a thin wrapper. The HTTP service must call this facade rather than replicate its business logic.

| Reader capability | Service function(s) |
| --- | --- |
| Document list / section | `list_documents`, `get_section` |
| Context / navigation | `get_context`, `get_related`, `get_outline`, `get_section_tree`, `get_chapter_outline` |
| Reading plan / progress | `create_plan`, `list_plans`, `get_next_section`, `get_plan_progress`, `mark_read` |
| Concepts / annotation context | `get_concept`, `get_context` |
| Translation | `get_section_translation`, `list_section_artifacts` |
| Assets referenced by a section | `get_section(..., include_assets=True)` (server must transform to safe HTTP URLs) |

`SectionView` already provides `id`, `doc_id`, `title`, heading/page provenance, body `text`, `prev_id`, `next_id`, `block_ids`, resolved asset metadata and quality warnings. `SectionContext` adds graph neighbours, section concepts and the current annotation summary.

The HTTP adapter must define its own browser-safe request/response schemas. In particular, strip or replace `markdown_path` and absolute asset paths; they are workspace-internal implementation details.

Evidence: `src/bookgraph/mcp/service.py`, `src/bookgraph/mcp/views.py`, `src/bookgraph/mcp/reading_tools.py`, `src/bookgraph/mcp/loading.py`.

## 5. Fumadocs integration findings for T4, T5, T7 and T8

### 5.1 Existing repository roles

- `apps/docs` is a Fumapress documentation app. It loads `.mdx` from a `content/` directory through `defineDocs` and `fumadocsMdx`.
- `apps/playground` is an editable Vite demonstration of `@fumadocs-editor/ui`; it includes filesystem sync, upload and collaborative editing behavior and is **not** suitable as the production reader foundation without removing those flows.
- The editor package is not a renderer-only surface. Even with `editable={false}`, `MdxEditor` retains editor-centric chrome including Visual/MDX tabs, so T5 should render generated MDX with Fumadocs/Fumapress components rather than embed `MdxEditor`.

Evidence: `fumadocs-editor-dev/apps/docs/press.config.tsx`, `fumadocs-editor-dev/apps/playground/src/app.tsx`, `fumadocs-editor-dev/packages/ui/src/editor.tsx`, `fumadocs-editor-dev/packages/ui/src/root.tsx`.

### 5.2 Recommended reader shape

Create a **new read-only reader app** in the Fumadocs workspace (final app name/location to be decided before T4), rather than repurposing the editable playground. It should:

1. accept generated MDX content from the bridge;
2. register the math/MDX components necessary to render converted `<eq>` formulas;
3. obtain dynamic data exclusively from the T6 HTTP API;
4. use `bookgraph.prev_id` / `bookgraph.next_id` metadata for section navigation; and
5. display an outline from the API (`get_outline` or `get_section_tree`).

**Build strategy selected for T4:** stage/copy generated MDX into the new reader app's dedicated content directory. This fits the proven `apps/docs/content` Fumapress source model and keeps reader content immutable. The bridge must not modify original `sources/sections` files. A generated directory must be ignored by version control or otherwise clearly treated as build output.

**Asset strategy selected for T4/T6:** generated MDX rewrites image links to `/api/assets/<doc_id>/<basename>`. The reader never reaches into BookGraph's workspace path or copies mutable original files into its own public directory.

### 5.3 Math and MDX constraints

- The current docs app registers default Fumadocs MDX components and custom components in `press.config.tsx`.
- The editor parser enables math through `syntax={{ math: true }}`, but that editor-specific API is not the reader rendering contract.
- T4 must use the math integration documented/supported by the selected reader app's Fumadocs/Fumapress version and must prove it with a rendered fixture.
- Book content must be treated as untrusted-ish data. The bridge must avoid blindly allowing arbitrary MDX/JSX or imports from source Markdown. The exact sanitation/escaping mechanism is an implementation decision for T4 and must be captured with tests.

## 6. Task hand-off matrix

| Task | Confirmed start point | Required output |
| --- | --- | --- |
| T2 Ingestion | New BookGraph ingestion module + CLI command; source parser remains `markdown` | Staged safe Markdown and images under `sources/parsed/<doc_id>/` ready to parse |
| T3 Pipeline | Existing `parse`, `segment`, `index build`, `reading-plan create` commands | One documented/orchestrated deterministic sequence |
| T4 MD → MDX bridge | New converter; source `sources/sections/<doc_id>/*.md`; target new reader content directory | Generated MDX preserving `bookgraph` metadata and using `/api/assets/...` |
| T5 Basic reader | New dedicated reader app, not editable playground | Render MDX, prev/next and outline, with no write capability |
| T6 HTTP adapter | New thin server package/module wrapping `bookgraph.mcp.service` | Browser-safe REST responses and safe asset serving |
| T7 Dynamic reader | Reader API client + UI panels | Progress plus read-only concepts/annotation |
| T8 Translation | API translation responses + reader modes | Original/translation/bilingual display without source mutation |

## 7. Open decisions that require resolution at implementation start

1. **New reader app name and deployment topology:** choose its workspace location plus how the Fumapress app proxies/reaches the HTTP adapter in development and production.
2. **MDX safety policy:** select and test the supported parser/plugin mechanism that lets normal Markdown/HTML tables render but rejects executable/untrusted MDX expressions/imports.
3. **`<eq>` table transform specification:** record real sample forms before coding the transform, especially whether content has delimiters/attributes/nested HTML that require AST-based conversion.
4. **Docx fallback matching:** architecture permits fallback only when local basename lookup fails, but current repo does not confirm a safe deterministic mapping from docx media to markdown CDN basenames. T2 must implement it only if an evidence-preserving matcher is available; otherwise emit a clear warning and preserve the original link.
5. **HTTP framework/package:** no HTTP REST server is currently present in BookGraph. T6 should select a lightweight adapter with no impact on the pure service facade and make any web framework an optional extra where appropriate.

## 8. Commands and quality gates

BookGraph:

```bash
cd bookgraph
uv run --extra dev pytest -q
uv run --extra dev ruff check .
uv run --extra dev mypy src/bookgraph
```

Fumadocs workspace:

```bash
cd fumadocs-editor-dev
pnpm test
pnpm lint
pnpm types:check
pnpm build
```

The Fumadocs repository declares Node `>=24` and pnpm `11.5.3` in its root manifest.
