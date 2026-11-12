Tính năng cốt lõi hiện đã hoạt động:

- Original hiển thị nội dung BookGraph.
- Translation chỉ hiển thị artifact fresh và an toàn về assets.
- Bilingual hiển thị hai cột đủ rộng.
- Markdown có đậm, nghiêng, inline math và display math.
- Translation preview toán học đã được sửa thành Markdown/KaTeX hợp lệ.
- Unit test, type check, build đã pass.

Bước tiếp theo hợp lý nhất là chuyển từ “demo một section” sang quy trình dịch có thể mở rộng.

1. Kiểm tra UI cuối cùng

Test nhanh trên các viewport:

1. Desktop rộng: Bilingual có hai cột, công thức dài có thanh cuộn ngang trong chính block công thức.
2. Màn hình hẹp (<760px): Bilingual tự chuyển thành Original trước, Vietnamese sau.
3. Chuyển qua lại Original / Translation / Bilingual nhiều lần.
4. Chọn một section:
   - không có translation → phải có notice;
   - translation stale → không được hiển thị như bản hợp lệ;
   - có hình/bảng → translation thiếu asset phải bị chặn đúng cách.

Nếu mọi thứ ổn, coi UI reader T8 đã hoàn thành ở mức chức năng.

2. Chuẩn hoá quy tắc tạo translation

Lỗi trước đó xảy ra vì artifact dịch viết theo Markdown/TeX không hợp lệ. Nên xác định quy tắc bắt buộc cho mọi bản dịch về sau:

- Công thức trong câu: $...$
- Công thức riêng một khối:

$$
...
$$
- Không để TeX độc lập không delimiter giữa đoạn văn.
- Không dịch hoặc làm hỏng các lệnh TeX như \frac, \lambda, \sigma, \mathrm.
- Giữ Markdown cấu trúc:
  - heading;
  - danh sách;
  - bảng;
  - link destination;
  - image paths;
  - anchors.
- Mỗi section có hình/bảng phải giữ đúng asset links và ghi includes_assets=True.

Điểm quan trọng: ghi translation chỉ qua write_section_translation, không sửa trực tiếptions.

3. Dịch theo batch nhỏ, có kiểm tra

Đừng dịch cả 343 sections ngay. Bắt đầu với một batch 5–10 sections:

1. Chọn một chương hoặc cụm sections.
2. Lấy source sections và block IDs từ BookGraph.
3. Dịch với Markdown/KaTeX hợp lệ.
4. Ghi qua write_section_translation.
5. Kiểm tra rằng từng artifact có:
status=fresh
6. Mở reader ở Translation và Bilingual để kiểm tra trực quan.
7. Chỉ khi ổn mới dịch batch tiếp theo.

Với mục tiêu Bilingual chất lượng cao, nên dùng block-aligned units thay vì một string content duy nhất. Khi đó sau này BookGraph có thể interleave nội dung theo từng đoạn thay vì chỉ hiển thị hai cột
toàn section.

4. Bổ sung test có giá trị lâu dài

Nên thêm các test renderer cho dữ liệu thật đã từng lỗi:

- Vietnamese prose xen kẽ inline math:
tham số $\lambda$ có $K$ trạng thái
- Display math nhiều dòng với \frac, \int, \propto.
- Emphasis sát cạnh math:
**tiên nghiệm** $p(\lambda)=\mathrm{const}$
- Công thức dài trong Bilingual không làm vỡ layout.
- Translation malformed: phải hiển thị fallback dễ hiểu hoặc bị chặn ở bước tạo artifac

5. Dọn trạng thái trước khi commit

Khi đã hài lòng với UI và kiểm tra thủ công:

cd /home/trinh-quoc-bau/Documents/Book_reader

git diff -- fumadocs-editor-dev/apps/reader/src
git status --short

Xem kỹ để chỉ giữ các thay đổi mong muốn:

- apps/reader/src/app.tsx
- apps/reader/src/styles.css
- apps/reader/src/markdown.tsx
- apps/reader/src/markdown.test.tsx
- các file translation artifact mà bạn muốn giữ làm preview/demo.

Không commit các temporary script trong /tmp; chúng không nằm trong git. Không commit những thay đổi không liên quan trong web_feedback.md nếu nó chỉ là ghi chú debug.

Khuyến nghị: làm bước 1 trước — kiểm tra responsive/Bilingual trực quan — rồi bắt đầu một batch dịch 5 section theo block-aligned units.
