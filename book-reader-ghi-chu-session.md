# Book_reader — Ghi chú tổng hợp session

_2026-11-11_

## Dự án là gì
Xây phần mềm **book reader** ghép hai nền tảng có sẵn:
- **BookGraph** (Python) — engine phía sau: parse → segment → index → reading plan → concept/annotation → dịch/export. Nguồn sự thật bất biến của nội dung + lớp memory.
- **fumadocs-editor** (TS/React) — lớp reader hiển thị, dùng **read-only**.

Phục vụ **cả hai**: người đọc cuối + người xem lớp memory/annotation của AI agent.

## Kiến trúc đã chốt (1-1-1)
1. **Nguồn đọc**: reader đọc từ `sources/sections/<doc_id>/<section_id>.md` (không dùng wiki/books để tránh wikilink `[[...]]`).
2. **Cầu nối format**: một bước build chuyển section `.md` → `.mdx` Fumadocs (ánh xạ frontmatter, rút gọn provenance, sửa link ảnh, chuyển `<eq>`).
3. **Serve dữ liệu động**: một HTTP API nhỏ bọc `bookgraph.mcp.service` (tiến độ, concept, annotation, bản dịch realtime).

## Ingestion — ràng buộc & phát hiện quan trọng
- **KHÔNG dùng MinerU** (máy user không chạy nổi). Parser `markdown` của BookGraph đã local hoàn toàn (markdown-it + dollarmath) → đủ dùng.
- Người dùng đưa **một folder** gồm: markdown (thân sách) + `_latex/images/` (ảnh, tên hash) + JSON MinerU + docx (ảnh dự phòng) + PDF gốc. Sample thật: `Sample-input/`.
- **Vấn đề ảnh ĐÃ GIẢI, không cần fetch mạng**: ảnh trong markdown trỏ URL CDN MinerU, NHƯNG basename `<HASH>.jpg` của URL khớp chính xác tên file trong `_latex/images/`. Đã kiểm chứng cả ảnh đầu sách lẫn thân sách. → Ingestion chỉ cần: lấy basename → copy file local cùng tên vào `sources/parsed/<doc_id>/images/` → rewrite `![](https://.../HASH.jpg)` thành `![](images/HASH.jpg)`. Offline, deterministic.
- **Vấn đề LaTeX cần xử lý thêm**: `$...$` / `$$...$$` thì parser OK; nhưng công thức trong bảng ký hiệu nằm trong thẻ `<eq>...</eq>` lồng trong `<table>` HTML — markdown-it không render. Bước build cần chuyển `<eq>` → math fumadocs hiểu.

## Nguồn parse & ảnh
- Nguồn parse chính: **markdown** (JSON chỉ tham khảo để lọc header/footer nếu cần).
- Nguồn ảnh: folder **`_latex/images/`** (khớp basename hash); docx chỉ dự phòng.

## Thứ tự triển khai đề xuất
1. Ingestion (stage ảnh + rewrite + parse) → biến sample thành workspace BookGraph.
2. Build `.md → .mdx`.
3. Reader read-only cơ bản (điều hướng section, mục lục).
4. HTTP API (tiến độ, concept, annotation).
5. Reader nâng cao + bản dịch/song ngữ.

## Rủi ro cần nhớ
- `<eq>` trong bảng: cần transform riêng, bỏ sót sẽ hiển thị thô.
- Ảnh local an toàn vì không phụ thuộc URL CDN (có thể hết hạn).
- Giữ nghiêm read-only một chiều; cho sửa ngược sẽ va chạm provenance/block_ids/hash bản dịch.

## Giới hạn môi trường hiện tại
Chat mode chỉ đọc file project + ghi thư mục nháp; không chạy lệnh / không ghi vào `Documents/Book_reader`. Việc chạy pipeline thật cần agent task hoặc user tự chạy.

## File liên quan
- Tài liệu kiến trúc đầy đủ: `book-reader-architecture.md` (đã tạo trong session này).
