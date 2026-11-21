# Workspace Contract

Every CLI command that writes files must write below a single explicit workspace/output root.

## Workspace root

The workspace root is passed as either:

```bash
bookgraph init /path/to/workspace
bookgraph init --output /path/to/workspace
bookgraph parse source.md --output /path/to/workspace
```

For commands that already have a positional workspace argument, use that positional path:

```bash
bookgraph add-book /path/to/workspace /path/to/book.pdf
bookgraph paths /path/to/workspace
```

Commands should expand `~` and resolve to absolute paths before writing manifests.

## Directory layout

A valid initialized workspace contains:

```text
workspace/
  bookgraph.toml
  sources/
    inbox/
    parsed/
    sections/
  wiki/
    concepts/
    books/
    comparisons/
    daily/
  indexes/
  annotations/
  concepts/
  translations/
  reading_plans/
  runs/
```

## Path meanings

| Path | Owner | Meaning |
| --- | --- | --- |
| `bookgraph.toml` | CLI config | Workspace defaults; must not contain secrets. |
| `sources/inbox/<book_id>/` | registration / ingestion | Raw source files and `book.json` registration manifest. |
| `sources/parsed/<doc_id>/` | parser stage | Canonical parser outputs, especially `document.json`; optional parser side artifacts. |
| `sources/sections/<doc_id>/` | segmenter stage | Human reading sections, section manifests, and the ingest `quality.json` report. |
| `wiki/books/<doc_id>/` | wiki backend | Per-book compiled linked Markdown/wiki artifacts. |
| `wiki/concepts/` | wiki backend | Cross-book concept pages. |
| `wiki/comparisons/` | wiki backend | Cross-book comparison pages. |
| `wiki/daily/` | daily agent/wiki backend | Daily reading notes and summaries. |
| `indexes/` | index/search/graph stage | Deterministic indexes, graph DB files, search indexes. |
| `annotations/<doc_id>/` | reading agent (MCP `annotate_section`) | Tier-2 per-section agent annotations (concepts + summary); a source of truth read by `index build`. See `annotations.md`. |
| `concepts/registry.json` | `bookgraph concepts` CLI (human review) | Curated concept registry: canonical concepts, aliases, ignored slugs, distinct pairs; a source of truth applied by `index build`. Created on first write. See `concepts.md`. |
| `translations/<lang>/<doc_id>/` | reading agent (MCP `write_section_translation`) | Cached per-section translations (`<section_id>.md`) plus registry sidecars (`<section_id>.json`) recording the source section hash, whether assets were included, and an optional block alignment. See `artifacts.md`. |
| `book-metadata.json` | library metadata | Display title, authors/editors, publisher/year, AI status and source fingerprint. Separate from parsed source evidence. |
| `metadata/cover-<hash>.(jpg|png|webp)` | AI-selected book catalog cover | Locally cached image chosen by the configured model from Google Books/Open Library candidates. Missing or unverified covers use the Library's default design. |
| `reading_plans/` | reading plan stage | Progress state for daily reading. |
| `runs/` | orchestration | Run logs and reproducibility metadata. |
| `runs/translation-chunks/` | reader translation worker | Validated partial translations and title checkpoints, keyed by source, language, provider/model and splitting version. These are resumable work, not published section translations. |

## ID rules

- `book_id`: stable slug for a registered book source.
- `doc_id`: stable slug for a parsed canonical document.
- For a registered book, parser output should prefer the neighbouring `book.json` `book_id` as `doc_id`, unless the user passes an explicit `--doc-id`.
- Slugs are lowercase, ASCII-ish, hyphen-separated, and must not contain path separators.

## Mutation rules

- Commands must create parent directories as needed for their own output path.
- Commands must not delete unrelated artifacts.
- Commands must not rewrite another stage's outputs unless the command contract explicitly says so.
- `add-book` writes only `sources/inbox/<book_id>/...`.
- `parse` writes only `sources/parsed/<doc_id>/...` plus parser side artifacts inside that same parsed directory.

## Long-section translation

The reader worker translates sections in Markdown parts of about 5,000 source
characters, preferring whole blocks. A long prose paragraph may split at whitespace;
indivisible tables, lists, code blocks and equations may exceed that soft limit.
Code and equations are restored locally from protected markers, as are image/link
references. Missing or reordered markers, changed structural targets and responses
flagged as truncated by the provider are rejected before checkpointing.

Completed parts are saved under `runs/translation-chunks/`. A normal retry resumes
matching parts; changing the source, language or provider/model invalidates their
reuse. Explicitly retranslating an existing section (`force=True`) clears its part
checkpoints. Only a fully assembled, validated translation is published through the
usual section artifact writer. The original section structure is unchanged.

## Background reader repair

Reader repair requests start a background job and return immediately; the UI polls
short status requests instead of holding one HTTP request open for the AI call.
Long Markdown/region repairs split into about 4,000-character parts with bounded
neighboring context. Equations, tables and code remain indivisible. A single
formula is kept intact. Individual provider calls still have timeouts (40 seconds
for formulas/regions and at most 60 seconds for Markdown parts).

Validated parts persist under `runs/repair-parts/`, keyed by source, context,
provider/model and repair kind. Retry resumes completed parts. Job status and the
input snapshot live under the section's repair-candidate directory in `jobs/`.
Duplicate requests rejoin active/completed jobs. An interrupted job can be retried;
only fully assembled, validated results become candidates. Source changes during
repair are rejected. The reader still requires **Save** to commit a candidate to
the book, and old synchronous repair endpoints remain available for older clients.

## Library book details

The desktop Library fills newly discovered book details automatically. Its status
is shown on the book card. The configured provider receives only a bounded excerpt
from the first five PDF pages and parsed front-page text, never the PDF file.
For covers, BookGraph searches Google Books and Open Library using the extracted
title and author/editor, then asks the configured provider to select an exact
match or return no cover. Only a selected image is downloaded and cached locally.
AI usage can incur charges. Names and titles must be supported by the excerpt;
unknown names remain empty, and editors are recorded separately from authors.

Results are cached in `book-metadata.json`; rescanning or opening books does not
repeat a completed AI request. **Refresh AI details** explicitly refreshes the
cache, and **Retry AI details** handles a failed request. If the model finds no
confident cover match, the Library uses its default cover design. The same book
metadata is used by the Library and reader header. For CLI use,
`bookgraph book-metadata WORKSPACE` reads local details; add `--ai` to request AI
extraction and cover selection, and `--force` to refresh completed metadata.
