# Book_reader — Tài liệu kiến trúc & Kế hoạch ingestion

_Phiên bản 1 · 2026-11-11 · bản nháp để duyệt trước khi code_

## 1. Mục tiêu

Xây một phần mềm **book reader** kết hợp hai nền tảng có sẵn trong dự án:

- **BookGraph** (Python) — engine phía sau: parse → segment → index → reading plan → concept/annotation → dịch/export. Là **nguồn sự thật bất biến** của nội dung và lớp memory.
- **fumadocs-editor** (TypeScript/React) — lớp **reader** hiển thị nội dung, dùng ở chế độ **read-only**.

Phần mềm phục vụ **cả hai** đối tượng: người dùng cuối đọc sách, và người xem lớp memory/annotation mà AI agent tạo ra.

## 2. Quyết định kiến trúc đã chốt

| # | Hạng mục | Quyết định |
| --- | --- | --- |
| 1 | Nguồn đọc | Reader đọc thân bài từ `sources/sections/<doc_id>/<section_id>.md` (đơn vị đọc gốc, có prev/next, provenance; không dùng `wiki/books` để tránh wikilink `[[...]]` không phải MDX chuẩn) |
| 2 | Cầu nối format | Một **bước build** chuyển section `.md` BookGraph → `.mdx` Fumadocs (ánh xạ frontmatter, rút gọn provenance, sửa link ảnh, chuyển `<eq>`) |
| 3 | Serve dữ liệu động | Một **HTTP API nhỏ** bọc `bookgraph.mcp.service` cho tiến độ, concept, annotation, bản dịch realtime |
| 4 | Ingestion | **Không MinerU.** Người dùng đưa folder (markdown + ảnh local + JSON + docx + PDF). Parse bằng parser `markdown`. Ảnh stage **offline** theo basename hash |
| 5 | Nguồn parse chính | **Markdown** (JSON chỉ tham khảo để lọc header/footer nếu cần) |
| 6 | Nguồn ảnh | Folder `_latex/images/` (khớp theo basename hash); docx chỉ dự phòng |

## 3. Sơ đồ luồng tổng thể

```
[Folder người dùng]                 [BookGraph engine]              [Reader]
 markdown.md          ──┐
 _latex/images/*.jpg   ─┤  (A) INGESTION      (B) PIPELINE          (C) BUILD        (D) READER
 MinerU_*.json        ──┼─►  stage ảnh    ──►  parse → segment  ──►  .md → .mdx  ──►  fumadocs
 docx (dự phòng)      ──┤    rewrite link       → index           │   + <eq>→math     (read-only)
 PDF (đối chiếu)      ──┘    → sources/parsed    → reading plan    │                      ▲
                                                 → concept         │                      │
                                                 → annotation ─────┴──► (E) HTTP API ──────┘
                                                                         bọc mcp.service
                                                                   (tiến độ, concept, dịch realtime)
```

## 4. Giai đoạn A — Ingestion (phần mới, phải tự viết)

BookGraph hiện **chưa có** bước nhận "folder markdown + ảnh local tách rời". Đây là thành phần mới cần xây. Các bước:

### A.1 — Nhận diện folder đầu vào
Quét folder người dùng, xác định: 1 file `.md` (thân sách), 1 folder con `*_latex/images/` (ảnh), tùy chọn `*.json` (MinerU middle), `*.docx` (dự phòng ảnh), `*.pdf` (gốc).

### A.2 — Stage ảnh (offline, deterministic)
Với mỗi ảnh tham chiếu trong markdown — dạng `![alt](https://cdn-mineru.openxlab.org.cn/.../<HASH>.jpg)`:
1. Trích **basename** `<HASH>.jpg` từ URL.
2. Tìm file cùng tên trong `_latex/images/`.
3. Copy vào `sources/parsed/<doc_id>/images/<HASH>.jpg`.
4. Nếu thiếu trong folder images → thử trích từ docx (dự phòng).
5. Nếu vẫn không có → ghi cảnh báo, giữ nguyên reference (ingest không fail cả sách vì 1 ảnh).

**Đã kiểm chứng trên sample thật:** mọi ảnh (đầu sách + thân sách) đều khớp folder local theo basename. Không cần tải internet.

### A.3 — Rewrite reference trong markdown
Đổi `![alt](https://.../<HASH>.jpg)` → `![alt](images/<HASH>.jpg)`. Đây là dạng `resolver` của BookGraph (`bookgraph.assets.resolve_asset_path`) chấp nhận: đường dẫn tương đối nằm trong `parsed_dir`.

### A.4 — Parse + segment + index
Chạy pipeline chuẩn của BookGraph với parser `markdown`:
`bookgraph parse → segment → index build → reading-plan create`.
Parser markdown local hoàn toàn (markdown-it + dollarmath), không MinerU.

**Bảo mật:** folder người dùng là dữ liệu không tin cậy — chống path traversal khi copy ảnh (chỉ chấp nhận basename, không theo `..`), giới hạn kiểu file ảnh.

## 5. Giai đoạn C — Build cầu nối (.md → .mdx)

Chuyển mỗi `sources/sections/<doc_id>/<section_id>.md` thành `.mdx` mà fumadocs đọc được:

1. **Frontmatter**: ánh xạ `title` (có sẵn) → `title` Fumadocs; thêm `description` nếu suy ra được. Giữ provenance (`id`, `prev_id`, `next_id`, `page_start`...) dưới một khóa phụ (vd. `bookgraph:`) thay vì vứt đi — reader cần cho điều hướng.
2. **Ảnh**: đổi `images/<HASH>.jpg` → URL mà reader phục vụ được (vd. `/api/assets/<doc_id>/<HASH>.jpg` qua HTTP API, hoặc copy vào thư mục public của fumadocs).
3. **LaTeX `<eq>`**: chuyển `<eq>...</eq>` trong bảng HTML → cú pháp math fumadocs hiểu (`$...$` hoặc component math). Công thức `$...$`/`$$...$$` ngoài bảng giữ nguyên.

## 6. Giai đoạn E — HTTP API (bọc mcp.service)

Một server HTTP mỏng, expose các tool đã có trong `bookgraph.mcp.service` dưới dạng REST cho browser:
- đọc: section, outline, section tree, context
- tiến độ: get next section, mark read, reading plan
- memory: get concept, annotation của section
- dịch: get section translation, bản song ngữ
- asset: phục vụ file ảnh từ `sources/parsed/<doc_id>/images/`

Reader (fumadocs) gọi API này cho mọi dữ liệu động, giữ BookGraph read-only một chiều.

## 7. Giai đoạn D — Tính năng reader cần xây thêm trên fumadocs

fumadocs-editor là **editor**, nên reader cần bổ sung: chế độ read-only thực thụ, điều hướng theo section (dùng `prev_id`/`next_id` của BookGraph), mục lục từ outline, thanh tiến độ đọc (nối với reading plan), panel hiển thị concept/annotation của agent, và (giai đoạn sau) hiển thị bản dịch/song ngữ.

## 8. Thứ tự triển khai đề xuất

1. **A — Ingestion** (stage ảnh + rewrite + parse): biến sample thành workspace BookGraph hoàn chỉnh. Đây là nền, làm trước.
2. **C — Build .md→.mdx**: có nội dung để fumadocs render.
3. **D — Reader read-only cơ bản**: đọc được sách, điều hướng section, mục lục.
4. **E — HTTP API**: mở phần động (tiến độ, concept, annotation).
5. **D nâng cao + dịch**: panel memory, bản dịch/song ngữ.

## 9. Rủi ro & điểm cần lưu ý

- **`<eq>` trong bảng**: cần parser/transform riêng; nếu bỏ sót, bảng ký hiệu toán sẽ hiển thị thô.
- **URL CDN hết hạn**: không ảnh hưởng vì ta dùng ảnh local — nhưng nếu sách tương lai *không* kèm folder ảnh local mà chỉ có URL, lúc đó mới cần cơ chế fetch (chưa làm bây giờ).
- **docx dự phòng**: thứ tự ảnh trong docx có thể không khớp markdown — chỉ dùng khi folder images thiếu đúng file, và khớp thận trọng.
- **Hai chiều chỉnh sửa**: giữ nghiêm read-only. Nếu sau này cho sửa trong fumadocs rồi ghi ngược, sẽ va chạm provenance/`block_ids`/hash bản dịch của BookGraph — cần thiết kế riêng, ngoài phạm vi hiện tại.
