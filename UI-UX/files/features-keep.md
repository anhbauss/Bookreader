# Tính năng của app hiện tại cần GIỮ LẠI

Nguồn: ảnh chụp app đang chạy (khác với các ảnh mẫu thiết kế). KHÔNG sao chép giao diện đó; chỉ giữ chức năng và đặt vào giao diện mới sao cho màn hình mặc định vẫn sạch như mẫu.

## Danh sách tính năng
1. **Chế độ hiển thị nội dung: Original | Translation | Bilingual.** Dạng segmented control có icon dịch; Bilingual = hai cột song song, EN bên trái, VI bên phải, có đường chia dọc mảnh giữa hai cột.
2. **Mục lục (Contents)**: cây nhiều cấp (Front Matter, Preface, Introduction, 1.1, 1.2.1…), mục đang đọc được tô nền xanh nhạt + chữ xanh đậm; cuộn riêng; click để nhảy.
3. **Reading Plan**: thẻ "Progress", chữ "8 of 343" (số mục đã đọc / tổng số mục), phần trăm (2%), thanh tiến độ, nút "Marked as read" (đánh dấu mục đã đọc, hiện ✓).
4. **Bookgraph Memory** ("Concepts & annotations"): hiển thị chú thích của mục hiện tại ("No annotation for this section yet.") và danh sách khái niệm/từ khoá rút ra từ mục đó.
5. **Công thức toán**: render bằng KaTeX/MathJax, cả công thức khối lẫn inline (chữ Hy Lạp, tổng, phân số).
6. **Badge "Read-only"** (pill xanh lá) ở góc trên phải; điều hướng "Previous / Next" ở cuối nội dung.

## Đặt vào giao diện mới
- Mặc định Reader trông ĐÚNG như reader.md (header gọn, hai cột, không sidebar).
- Mục lục: icon "list" của header mở **drawer trái** (cây mục lục + ô lọc).
- Original / Translation / Bilingual: thêm trong **popover Visual Settings** một mục "Language" với 3 lựa chọn dạng segmented control; ở Bilingual, cột trái là bản gốc, cột phải là bản dịch (căn theo đoạn).
- Reading Plan và Bookgraph Memory: một icon bổ sung ở header (cạnh icon "T") mở **drawer phải** chứa hai thẻ này. Thẻ trắng, bo 12px, nhãn nhỏ viết hoa xám, theo token ở tokens.md.
- Badge Read-only: chỉ hiện khi sách ở chế độ chỉ đọc; đặt trong drawer phải hoặc ngay cạnh tên sách, không chiếm chỗ ở header mặc định.
- Tiến độ trong Library ("35 of 45 pages") và Reading Plan phải dùng chung một nguồn dữ liệu.

## Lỗi quan sát được ở app hiện tại (nên sửa khi làm lại)
- Cột bản dịch có công thức LaTeX bị hiển thị thô (vd `p (\mathbf {w} | ...`): phải render qua KaTeX giống cột gốc, hoặc bảo vệ công thức khi gọi API dịch (thay bằng placeholder rồi gắn lại).
- Danh sách khái niệm Bookgraph chứa nhiều từ thường (Consider, Because, having, therefore…): lọc stop-words và token LaTeX (mathbf, mathrm, mathcal) trước khi hiển thị.
- Dòng chữ nhỏ viết hoa trong các thẻ ("CONTENTS", "READING PLAN") nên đạt độ tương phản AA.
