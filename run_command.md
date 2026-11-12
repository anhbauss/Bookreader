1. Ingest sách mới và tạo nội dung cho Reader

Mở terminal mới:

cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run bookgraph ingest-pipeline \
  /home/trinh-quoc-bau/Documents/my-book4 \
  --output /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  --doc-id my-book4 \
  --target-level 2 \
  --daily-sections 1

Sau khi lệnh trên thành công, build nội dung MDX cho giao diện:

uv run bookgraph build-mdx \
  /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  my-book4 \
  --output-dir /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content

Kết quả đúng sẽ nằm ở:

/home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content/my-book3/

Đặc biệt, outline đúng là:

/home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content/my-book3/outline.json

Không phải đường dẫn lồng my-book3/my-book3/.

---

2. Khởi động lại BookGraph API

Nếu BookGraph API đang chạy từ trước, dừng nó bằng Ctrl+C, rồi chạy lại để nó thấy document mới:

cd /home/trinh-quoc-bau/Documents/Book_reader/bookgraph

uv run --extra http bookgraph serve-http \
  /home/trinh-quoc-bau/book-reader-e2e.xnovm6 \
  --host 127.0.0.1 \
  --port 8000

Kiểm tra my-book3 đã được API nhận:

curl http://127.0.0.1:8000/api/documents

Trong kết quả cần có document ID my-book3.

---

3. Chạy Reader và mở outline

Ở terminal khác:

cd /home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev

pnpm --filter book-reader dev

Mở outline của sách mới trên trình duyệt:

http://127.0.0.1:5173/content/my-book3/outline.json

Trong outline.json, tìm một section có trường "id", ví dụ minh họa:

{
  "id": "my-book3.chuong-1-gioi-thieu",
  "title": "Chương 1. Giới thiệu"
}

Sau đó mở section đó trong Reader:

http://127.0.0.1:5173/?doc=my-book3&section=my-book3.chuong-1-gioi-thieu

Thay section ID ví dụ bằng ID thực tế trong outline.json.

---

4. Các điểm nên kiểm tra với sách mới

Để biết code có thực sự tổng quát, hãy ưu tiên mở các section chứa:

1. Công thức inline: $...$
2. Công thức block: $$...$$
3. Công thức thiếu delimiter $ nhưng có \frac, \sum, \int, \Omega, chỉ số/mũ…
4. Bảng Markdown chứa công thức.
5. Bảng có \|x\|, |x|, \left|...\right|.
6. Bảng HTML gốc, nếu sách có.
7. Code block Python/C/C++/MATLAB…
8. Ký hiệu HTML như <sup>, <sub>.
9. Ảnh, bảng biểu và caption.

Nếu có lỗi, gửi lại:

- URL Reader đang mở;
- phần text bị lỗi hoặc ảnh chụp;
- tốt nhất là nội dung section .mdx tương ứng trong:

/home/trinh-quoc-bau/Documents/Book_reader/fumadocs-editor-dev/apps/reader/public/content/my-book3/

Như vậy có thể xác định rõ lỗi nằm ở bước trích xuất/BookGraph MDX bridge hay ở Reader renderer.