# Kế hoạch kiểm thử sau sửa lỗi — BookGraph + Book Reader

> Mục tiêu: xác minh các sửa đổi cho ảnh trong section/MDX, an toàn API, dependency HTTP test,
> lint/type-check và reader. Thực hiện lần lượt; dừng ở bước fail và lưu nguyên output để gửi lại.
>
> Các lệnh bên dưới chỉ **đọc** `Sample-input/` và tạo dữ liệu trong workspace tạm. Không chạy
> lệnh từ bên trong `Sample-input/`.

## 0. Phạm vi và tiêu chí hoàn thành

| Hạng mục | Kết quả cần đạt |
|---|---|
| Python test | `pytest -q` collect được HTTP test và toàn bộ test pass |
| Python quality | `ruff check .` và `mypy src/bookgraph` không lỗi |
| Reader quality | test, TypeScript type-check, production build đều pass |
| T2–T3 | Ingest stage ảnh, pipeline tạo document/sections/index/plan |
| T4 | Ảnh từ section đi vào MDX dưới URL `/api/assets/<doc_id>/<basename>`; không còn `<eq>` thô |
| T6 | API không lộ absolute workspace path và chặn traversal/ghi content |
| T5/T7/T8 | Reader render/điều hướng/ảnh/progress/translation hoạt động trong browser |

## 1. Chuẩn bị

Mở Terminal 1 và đặt các biến dùng chung:

```bash
export ROOT=/home/trinh-quoc-bau/Documents/Book_reader
export BOOKGRAPH="$ROOT/bookgraph"
export READER="$ROOT/fumadocs-editor-dev"
export SAMPLE="$ROOT/Sample-input"
cd "$ROOT"
```

Yêu cầu môi trường:

```bash
uv --version
node --version
pnpm --version
curl --version
jq --version
```

Ghi lại nếu có cảnh báo Node engine. Cảnh báo không tự động là fail, nhưng phải được ghi trong kết quả.

---

## 2. BookGraph — dependency, unit/integration test, lint và type check

### 2.1 Đồng bộ dependency và cập nhật lockfile

```bash
cd "$BOOKGRAPH"
uv lock
uv sync --extra dev --extra http
```

**Pass:**

- Lệnh hoàn tất thành công.
- `uv.lock` được cập nhật nếu dependency `httpx2` chưa có trong lockfile.
- Không có dependency-resolution error.

> `httpx2` là dependency cần thiết để `starlette.testclient.TestClient` collect được HTTP tests
> trong phiên bản Starlette hiện tại.

### 2.2 Chạy toàn bộ Python test

```bash
cd "$BOOKGRAPH"
uv run --extra dev --extra http pytest -q
```

**Pass:** toàn bộ test pass; không có collection error cho `tests/test_http_api.py`.

Nếu fail, chạy riêng nhóm đã sửa để khoanh vùng:

```bash
uv run --extra dev --extra http pytest -q \
  tests/test_heading_segmenter.py \
  tests/test_cli_ingest_pipeline.py \
  tests/test_mdx_bridge.py \
  tests/test_http_api.py
```

Đặc biệt xác nhận các hành vi sau có test pass:

- image block được giữ lại thành `![caption](images/<basename>)` trong section Markdown;
- ingest pipeline kỳ vọng index `indexes/bookgraph.db`;
- malformed frontmatter được test với manifest thật;
- error response API không chứa workspace path.

### 2.3 Lint và mypy

```bash
cd "$BOOKGRAPH"
uv run --extra dev ruff check .
uv run --extra dev mypy src/bookgraph
```

**Pass:** mỗi lệnh trả exit code `0`; không có `E501` hoặc `no-untyped-def`.

---

## 3. Reader — type check, unit test và production build

```bash
cd "$READER"
pnpm install
pnpm --filter book-reader types:check
pnpm --filter book-reader test
pnpm --filter book-reader build
```

**Pass:**

- `types:check` không còn lỗi `ImportMeta.env` hoặc CSS side-effect import;
- tất cả Vitest test pass;
- Vite production build hoàn tất thành công.

---

## 4. E2E T2–T4 — ingest, pipeline, section ảnh và MDX

### 4.1 Tạo workspace tạm và chạy pipeline

```bash
export WORKSPACE="$(mktemp -d "$HOME/book-reader-e2e.XXXXXX")"
printf 'Workspace: %s\n' "$WORKSPACE"

cd "$BOOKGRAPH"
uv run --extra dev --extra http bookgraph ingest-pipeline \
  "$SAMPLE" \
  --output "$WORKSPACE" \
  --doc-id sample-book \
  --target-level 2 \
  --daily-sections 1
```

Nếu `Sample-input/` có nhiều Markdown top-level, hãy tạo một folder test mới chỉ chứa một Markdown
nguồn và một thư mục `*_latex/images/`; không thay đổi input gốc.

### 4.2 Kiểm tra T2 — staging và rewrite ảnh

```bash
find "$WORKSPACE/sources/parsed/sample-book" -maxdepth 2 -type f | sort
find "$WORKSPACE/sources/parsed/sample-book/images" -maxdepth 1 -type f | wc -l
rg -n '!\[[^]]*\]\(images/' "$WORKSPACE/sources/parsed/sample-book/source.md" | head -n 20
rg -n 'https?://' "$WORKSPACE/sources/parsed/sample-book/source.md" || true
```

**Pass T2:**

- Có `sources/parsed/sample-book/source.md`.
- Ảnh matching được stage tại `sources/parsed/sample-book/images/`.
- Các image reference matching trong `source.md` có dạng `![...](images/<basename>)`.
- Nếu còn URL `http(s)`, kiểm tra chúng là link văn bản hoặc ảnh không matching đã được warning rõ ràng.
- Pipeline không ghi output vào `$WORKSPACE/wiki/books/`.

### 4.3 Kiểm tra T3 — artifacts pipeline

```bash
find "$WORKSPACE/sources/sections/sample-book" -maxdepth 1 -type f | sort
find "$WORKSPACE/indexes" -maxdepth 1 -type f | sort
find "$WORKSPACE/reading_plans" -maxdepth 1 -type f | sort
jq '{doc_id, daily_sections, section_count: (.section_ids | length)}' \
  "$WORKSPACE/reading_plans/sample-book.json"
```

**Pass T3:**

- Có `sources/sections/sample-book/sections.jsonl` và section `.md`.
- Có `indexes/bookgraph.db`.
- Có `reading_plans/sample-book.json`, với `plan_id` và `doc_id` là `sample-book`.
- Command in `parser: markdown`, `segmenter: heading`, `index_backend: sqlite`, `pipeline: completed`.

### 4.4 Kiểm tra bắt buộc: image block xuất hiện trong section Markdown

```bash
rg -n '!\[[^]]*\]\(images/' "$WORKSPACE/sources/sections/sample-book" --glob '*.md'
```

**Pass:** có ít nhất một dòng kết quả. Mỗi image reference phải có dạng:

```text
![caption](images/<basename>)
```

**Fail:** không có output hoặc section chỉ chứa chữ `image`. Đây là regression của lỗi segmentation và
không nên tiếp tục đánh dấu T4/T5 là pass.

### 4.5 Build MDX và kiểm tra T4

Dùng output tạm để không đè `apps/reader/public/content/` khi mới test bridge:

```bash
export MDX_OUTPUT="$(mktemp -d "$HOME/book-reader-mdx.XXXXXX")"
cd "$BOOKGRAPH"

find "$WORKSPACE/sources/sections/sample-book" -type f -name '*.md' -exec sha256sum {} \; \
  | sort > "$WORKSPACE/sections-before.sha256"

uv run --extra dev --extra http bookgraph build-mdx \
  "$WORKSPACE" sample-book --output-dir "$MDX_OUTPUT"

find "$WORKSPACE/sources/sections/sample-book" -type f -name '*.md' -exec sha256sum {} \; \
  | sort > "$WORKSPACE/sections-after.sha256"
diff -u "$WORKSPACE/sections-before.sha256" "$WORKSPACE/sections-after.sha256"

find "$MDX_OUTPUT/sample-book" -maxdepth 1 -type f | sort
rg -n '<eq>' "$MDX_OUTPUT/sample-book" || true
rg -n '/api/assets/sample-book/' "$MDX_OUTPUT/sample-book" --glob '*.mdx'
```

**Pass T4:**

- Có một `.mdx` cho mỗi section và `outline.json`.
- `diff` hash section source không in khác biệt.
- Không có `<eq>...</eq>` thô.
- Có ít nhất một image URL dạng `/api/assets/sample-book/<basename>` trong MDX.
- MDX có frontmatter `title` và object `bookgraph` với `id`, `doc_id`, `prev_id`, `next_id`,
  `page_start`, `page_end`, `heading_path`, `block_ids`.

Lấy section và asset thật cho các bước API/browser sau:

```bash
export SECTION_FILE="$(find "$WORKSPACE/sources/sections/sample-book" -maxdepth 1 -type f -name '*.md' | sort | head -n 1)"
export SECTION_ID="$(basename "$SECTION_FILE" .md)"
export READER_SECTION="${SECTION_ID#sample-book.}"
export ASSET_URL="$(rg -ho '/api/assets/sample-book/[^)]+' "$MDX_OUTPUT/sample-book" --glob '*.mdx' | head -n 1)"
export BASENAME="${ASSET_URL##*/}"

printf 'SECTION_ID=%s\nREADER_SECTION=%s\nASSET_URL=%s\n' \
  "$SECTION_ID" "$READER_SECTION" "$ASSET_URL"
```

**Pass:** cả `SECTION_ID` lẫn `ASSET_URL` đều không rỗng. Nếu `ASSET_URL` rỗng thì T4 fail.

---

## 5. E2E T6 — HTTP API

### 5.1 Khởi động API

Mở **Terminal 2**:

```bash
export ROOT=/home/trinh-quoc-bau/Documents/Book_reader
export BOOKGRAPH="$ROOT/bookgraph"
export WORKSPACE='<copy giá trị WORKSPACE từ Terminal 1>'

cd "$BOOKGRAPH"
uv run --extra http bookgraph serve-http \
  "$WORKSPACE" --host 127.0.0.1 --port 8000
```

**Pass:** server listen tại `127.0.0.1:8000`; không bind công khai `0.0.0.0` nếu không chủ đích.

### 5.2 Content, outline, context và progress

Quay lại Terminal 1 và dùng các biến đã tạo ở phần 4:

```bash
curl -sS "http://127.0.0.1:8000/api/documents/sample-book/sections/$SECTION_ID" | jq .
curl -sS "http://127.0.0.1:8000/api/documents/sample-book/outline" | jq .
curl -sS "http://127.0.0.1:8000/api/documents/sample-book/sections/$SECTION_ID/context" | jq .
curl -sS "http://127.0.0.1:8000/api/plans/sample-book/progress" | jq .
```

**Pass:**

- Các endpoint trả HTTP `200` và JSON hợp lệ.
- Content response có section canonical ID và không chứa absolute workspace path.
- `markdown_path` là `null` hoặc không xuất hiện; không được chứa path local.
- Plan ID mặc định là `sample-book`, không phải `sample-book-reading`.

### 5.3 Kiểm tra lỗi 404 không lộ path

```bash
curl -sS "http://127.0.0.1:8000/api/documents/nope/outline" | jq .
curl -sS "http://127.0.0.1:8000/api/plans/nope/progress" | jq .
```

**Pass:** HTTP `404`, body có error chuẩn hóa, không có `/home/`, `$WORKSPACE`,
`sections.jsonl` absolute path hoặc stack trace.

### 5.4 Asset isolation và traversal

```bash
curl -i "http://127.0.0.1:8000$ASSET_URL"
curl -i "http://127.0.0.1:8000/api/assets/sample-book/%2e%2e%2fsource.md"
curl -i "http://127.0.0.1:8000/api/assets/sample-book/source.md"
curl -i "http://127.0.0.1:8000/api/assets/sample-book/document.json"
curl -i "http://127.0.0.1:8000/api/assets/sample-book/not-an-image.txt"
```

**Pass:**

- Asset thật trả `200` với Content-Type ảnh thích hợp.
- Traversal, source Markdown, document JSON và file không phải ảnh trả `404` hoặc `422`; tuyệt đối không `200`.

### 5.5 Read-only content và mark-read

```bash
curl -i -X POST \
  "http://127.0.0.1:8000/api/documents/sample-book/sections/$SECTION_ID"

sha256sum "$SECTION_FILE" > "$WORKSPACE/section-before.sha256"
curl -sS -X POST \
  "http://127.0.0.1:8000/api/plans/sample-book/sections/$SECTION_ID/read" | jq .
sha256sum "$SECTION_FILE" > "$WORKSPACE/section-after.sha256"
diff -u "$WORKSPACE/section-before.sha256" "$WORKSPACE/section-after.sha256"

curl -sS "http://127.0.0.1:8000/api/plans/sample-book/progress" | jq .
```

**Pass:**

- POST vào content trả `405` hoặc validation error an toàn, không phải `2xx`.
- `diff` section hash không có output.
- mark-read trả `200`; progress phản ánh section đã hoàn thành.

---

## 6. E2E T5/T7/T8 — Browser reader

### 6.1 Đưa MDX test vào reader và khởi động dev server

Việc này thay thế tạm content local của reader. Backup trước để có thể hoàn tác:

```bash
export READER_CONTENT="$READER/apps/reader/public/content"
export READER_CONTENT_BACKUP="$(mktemp -d "$HOME/book-reader-content-backup.XXXXXX")"

if [ -d "$READER_CONTENT" ]; then
  cp -a "$READER_CONTENT/." "$READER_CONTENT_BACKUP/"
fi
rm -rf "$READER_CONTENT"
mkdir -p "$READER_CONTENT"
cp -a "$MDX_OUTPUT/sample-book" "$READER_CONTENT/"
```

Mở **Terminal 3**:

```bash
export ROOT=/home/trinh-quoc-bau/Documents/Book_reader
export READER="$ROOT/fumadocs-editor-dev"
cd "$READER"

VITE_BOOKGRAPH_API_BASE_URL="http://127.0.0.1:8000" \
VITE_BOOKGRAPH_TRANSLATION_LANGUAGE="vi" \
pnpm --filter book-reader dev -- --host 127.0.0.1 --port 5173
```

Mở URL sau trong browser:

```text
http://127.0.0.1:5173/?doc=sample-book&section=<READER_SECTION>
```

Thay `<READER_SECTION>` bằng giá trị biến đã in ở phần 4.5.

### 6.2 T5 — Reader read-only, navigation, outline và ảnh

Xác nhận trong browser và DevTools → Network:

- Nội dung section, title và breadcrumb hiển thị đúng.
- Outline tải từ `outline.json`; click section đổi đúng nội dung/URL.
- Previous/Next tôn trọng `bookgraph.prev_id` / `bookgraph.next_id`.
- Ảnh render thành công và request đi tới `http://127.0.0.1:8000/api/assets/sample-book/<basename>`.
- `?doc=sample-book&section=../secret` tạo lỗi an toàn, không fetch file local.
- Không có nút edit/save/publish content.
- Không có `POST`, `PUT`, `PATCH` ghi content/provenance.

### 6.3 T7 — Progress và memory

- Ghi progress trước khi bấm **Mark section read**.
- Bấm nút và quan sát Network: chỉ có POST đến route reading-plan.
- Xác nhận UI progress chỉ đổi sau response API thành công.
- Đổi section: memory/context panel phải loading rồi hiển thị dữ liệu của section mới, không giữ dữ liệu cũ.
- Tắt Terminal 2, reload reader: static MDX vẫn đọc được; panel API phải hiển thị lỗi rõ ràng, không crash UI.

> Đây là test implementation hiện tại. Nó **không** chứng minh người dùng đã “đọc thật”; tiêu chí
> UX như scroll-to-end hoặc minimum time vẫn là quyết định sản phẩm chưa chốt.

### 6.4 T8 — Original, Translation và Bilingual

Với một section chưa có translation fresh:

- **Original:** source luôn hiển thị.
- **Translation:** hiển thị notice `missing`/`loading`/`stale`/`error`; không render bản dịch stale như hợp lệ.
- **Bilingual:** cột original vẫn hiển thị, cột translation hiển thị notice; không crash.
- Network gọi đúng route:
  `/api/documents/<doc_id>/sections/<section_id>/translations/vi`.
- Frontend không gọi trực tiếp provider/model.

Nếu workspace có translation artifact **fresh** được tạo bởi BookGraph workflow:

- Translation hiển thị đầy đủ nội dung cho đúng section.
- Bilingual hiển thị source và translation cùng section.
- Đổi section không để translation cũ còn hiển thị.
- Chuyển lại Original không làm thay đổi source section.

Không tự chỉnh file translation thủ công chỉ để ép trạng thái fresh/stale; như vậy không còn kiểm thử
đúng contract artifact/hashing.

### 6.5 Khôi phục reader content sau test

```bash
rm -rf "$READER_CONTENT"
mkdir -p "$READER_CONTENT"
cp -a "$READER_CONTENT_BACKUP/." "$READER_CONTENT/"
```

Nếu content trước đó trống thì để `public/content/` trống như trạng thái ban đầu.

---

## 7. Các mục chưa thể đóng chỉ bằng test

| Task | Nội dung cần quyết định/implement thêm |
|---|---|
| T1 | Review/chấp thuận contract tại `bookgraph/docs/design/book-reader-integration-contract.md`. |
| T2 | Fallback ảnh từ `.docx` vẫn chưa có mapping basename an toàn; chỉ warning khi thiếu ảnh. |
| T4–T5 | Cần quyết định dùng renderer Fumadocs thực hay chính thức chấp thuận Vite/React Markdown renderer hiện tại. |
| T7 | Cần định nghĩa thế nào là “đã đọc”: mở section, scroll-to-end, thời gian tối thiểu, hay kết hợp. |
| T8 | “Realtime translation” cần chốt cơ chế: refresh khi đổi section, polling, job-status endpoint, SSE, hay phương án khác. |

---

## 8. Nội dung cần gửi lại sau khi test

Gửi nguyên văn output của:

```bash
uv lock
uv run --extra dev --extra http pytest -q
uv run --extra dev ruff check .
uv run --extra dev mypy src/bookgraph

pnpm --filter book-reader types:check
pnpm --filter book-reader test
pnpm --filter book-reader build
```

Kèm kết quả E2E ngắn gọn:

1. **T2:** số ảnh stage, số warning, còn image URL chưa rewrite không.
2. **T3:** số section; index `bookgraph.db` và plan có tạo không.
3. **T4:** số image Markdown trong sections; có `/api/assets/sample-book/` trong MDX không; có `<eq>` không.
4. **T5:** render ảnh, navigation/outline, read-only pass/fail.
5. **T6:** status asset thật, status traversal, status POST content; 404 có path leak không.
6. **T7:** mark-read có làm đổi section hash không; UI xử lý API failure thế nào.
7. **T8:** các trạng thái translation nào đã xác minh được.
