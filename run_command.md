# Lệnh chạy thử Book Reader

Tài liệu này chạy workspace hiện có:

- Workspace BookGraph: `/home/trinh-quoc-bau/book-reader-e2e.xnovm6`
- Document ID: `my-book`
- Reader: `fumadocs-editor-dev/apps/reader`
- BookGraph HTTP API: `127.0.0.1:8000`
- Reader Vite: `127.0.0.1:5173`

> Mở **hai cửa sổ terminal** và giữ cả hai lệnh server đang chạy.

---

## 1. Cài dependency Reader (chỉ cần sau khi clone/cập nhật dependency)

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev
pnpm install
```

Cảnh báo Node `v22` trong khi dự án khai báo Node `>=24` hiện không chặn Reader chạy. Nên dùng Node 24 trở lên nếu có thể.

---

## 2. Sinh lại nội dung Reader từ BookGraph

Chạy sau khi ingest/segment tài liệu mới, hoặc sau khi thay đổi bridge Markdown/MDX:

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run bookgraph build-mdx \
  /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  my-book \
  --output-dir /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content
```

Kết quả sẽ nằm tại:

```text
/home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content/my-book/
```

Trong đó có `outline.json` và các file section `.mdx`.

---

## 3. Terminal A — chạy BookGraph HTTP API

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run --extra http bookgraph serve-http \
  /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  --host 127.0.0.1 \
  --port 8000
```

Giữ terminal này mở. API sẽ phục vụ:

- outline, nội dung section và context;
- tiến độ đọc;
- translation API;
- ảnh trong tài liệu qua `/api/assets/...`.

Có thể kiểm tra nhanh API trong một terminal khác:

```bash
curl http://127.0.0.1:8000/api/documents
```

---

## 4. Terminal B — chạy Reader

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev

pnpm --filter book-reader dev
```

Mở URL section công thức đã kiểm thử:

```text
http://127.0.0.1:5173/?doc=my-book&section=my-book.1-3-n-ng-l-ng-v-c-ng-su-t-c-a-t-n-hi-u
```

Reader sẽ render công thức LaTex bằng KaTeX. Nếu đang mở sẵn trang cũ, refresh mạnh bằng `Ctrl+Shift+R`.

---

## 5. Kiểm thử nhanh sau khi chạy

### Reader

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev

pnpm --filter book-reader test
pnpm --filter book-reader types:check
pnpm --filter book-reader build
```

### BookGraph / MDX bridge

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run --extra dev pytest -q tests/test_mdx_bridge.py
uv run --extra dev ruff check src/bookgraph/mdx_bridge.py tests/test_mdx_bridge.py
```

---

## 6. Thêm một tài liệu Markdown mới

Giả sử nguồn ở `/home/trinh-quoc-bau/Documents/my-book`, có file `.md` và thư mục `images/` nếu có ảnh:

```bash
cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run bookgraph ingest-pipeline \
  /home/trinh-quoc-bau/Documents/my-book \
  --output /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  --doc-id my-book \
  --target-level 2 \
  --daily-sections 1

uv run bookgraph build-mdx \
  /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  my-book \
  --output-dir /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content
```

Sau đó restart BookGraph API nếu nó đang chạy, rồi mở Reader với document ID và section ID trong `outline.json`:

```text
http://127.0.0.1:5173/?doc=my-book&section=<section-id>
```

đường dẫn outline.json:
/home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content/my-book/my-book/outline.json

truy cập trên web:
http://127.0.0.1:5173/?doc=my-book&section=my-book.t-n-hi-u-v-h-th-ng
> Không thêm `my-book` vào `--output-dir`: lệnh `build-mdx` tự tạo thư mục `<output-dir>/<doc-id>`. Nếu thêm sẵn, đường dẫn sẽ bị lồng thành `content/my-book/my-book/` và Reader không tìm thấy nội dung.
