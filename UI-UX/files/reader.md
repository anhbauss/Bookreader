# Trang Reader

Đo trên ảnh 2576×1348; kích thước viết theo % viewport. Nền toàn trang = `--reader-bg` của theme hiện tại.
Bỏ qua hai nút tím nổi ở mép phải ảnh mẫu: đó là extension trình duyệt, không thuộc app.

## 1. Header (cao ≈ 9%, không nền riêng, không đường kẻ)
- Trái (cách mép ≈ 2.4%): icon mũi tên quay lại "↩" + chữ "Library" (sans 15px). Click về trang Library.
- Giữa (căn giữa tuyệt đối): tên sách serif bold 20px; dưới là tác giả sans 14px màu `--reader-muted`.
- Phải: 4 icon nét mảnh 1.5px, 20px, cách nhau ≈ 48px, theo thứ tự: tìm kiếm, bookmark, mục lục (list), "T" (Visual Settings). Mỗi icon là `<button>` có `aria-label`.

## 2. Vùng đọc: 2 cột
- Nội dung bắt đầu ở ≈ 12% chiều cao, kết thúc ≈ 88%. Không có thanh cuộn.
- Cột trái từ ≈ 11% đến 39% viewport; cột phải từ ≈ 61% đến 89%. Khoảng trống giữa hai cột ≈ 22% (rất rộng, đây là điểm đặc trưng của mẫu). Dưới 1000px: dồn thành 1 cột.
- Chữ serif theo mức Size (xem tokens.md), `line-height: 1.7`, căn trái (ragged-right), `hyphens: auto` (ngắt từ kiểu "intro-ductory").
- Đoạn văn: không có khoảng cách giữa các đoạn; thụt đầu dòng 1.5em (dòng đầu mỗi đoạn). Dấu ngoặc kép cong “ ”.
- Văn bản trải liên tục từ cuối cột trái sang đầu cột phải (như một trang sách mở); một "trang" = cả hai cột.
- Dùng engine render hiện có của app (epub.js, foliate-js...), chỉ tuỳ biến theme/CSS qua API của engine.

## 3. Footer điều hướng
- Góc trái dưới (cách đáy ≈ 3%): "‹ Previous Page"; góc phải dưới: "Next Page ›". Sans 15px, màu `--reader-text`, chỉ có chữ và chevron, không nền, không viền.
- Phím ← / → lật trang. Ở trang đầu/cuối: nút tương ứng bị ẩn hoặc `disabled`.
- Gợi ý: có thể thêm vùng click rộng ở hai mép trang (không hiển thị) để lật trang bằng chuột/touch.

## 4. Visual Settings (popover mở từ icon "T")
- Neo dưới góc trên phải, cách mép phải ≈ 1%, cách đỉnh ≈ 1.5%. Rộng ≈ 22rem (≈ 38% màn rộng 1000px), nền `--surface-float` (trắng), bo 28px, padding 24px, bóng lớn. Phần nền reader phía sau bị dim và blur.
- Tiêu đề "Visual Settings" serif bold 22px; nút đóng (icon ✕ trong vòng tròn) góc trên phải.
- **Theme**: 3 nút ngang bằng nhau (cao ≈ 56px, bo 6px, viền 2px): "Light" nền trắng; "Dark" nền `#302d3d` chữ trắng; "Paper" nền `#fcf7ed`. Nhãn serif, căn giữa. Nút đang chọn có viền `--accent` (các nút còn lại viền `#302d3d`).
- **Font**: 2 dòng "Serif" và "Sans Serif", mỗi dòng cao ≈ 56px, ngăn cách hairline. Dòng đang chọn có dấu ✓ màu `--accent` ở mép phải. Cải tiến nhỏ: hiển thị mỗi nhãn bằng chính phông của nó.
- **Size**: slider có 4 điểm dừng (Small, Medium, Large, Extra Large); thumb tròn 28px `--accent`; đường ray xám nhạt với 4 chấm; nhãn mức hiện tại ("Medium") nằm dưới thumb, sans 14px.
- **Vertical Scroll**: nhãn serif bold bên trái, toggle bên phải (tắt: track xám `#dcdcdc` + núm trắng; bật: track `--accent`). Bật thì chuyển từ phân trang 2 cột sang 1 cột cuộn dọc, max-width ≈ 720px, căn giữa; ẩn nút Previous/Next Page.
- Mỗi thay đổi áp dụng NGAY, không có nút Lưu; lưu vào `localStorage` (`reader.theme`, `reader.font`, `reader.size`, `reader.vertical`). Giữ vị trí đọc khi đổi cỡ chữ hoặc đổi chế độ.
- Esc, click ra ngoài hoặc nút ✕ đều đóng popover. Focus được trả lại icon "T".

## 5. Search (modal mở từ icon kính lúp)
- Overlay: reader phía sau dim `--overlay` và `--overlay-blur`. Modal nằm giữa theo chiều ngang, cách đỉnh ≈ 20%, rộng ≈ min(70% viewport, 640px), nền trắng, bo 20px, padding 24px 32px.
- Trạng thái rỗng: chỉ có một ô input, placeholder "Search in this book…" (xám, sans 17px), icon kính lúp xám ở mép phải. Tự focus khi mở. Modal chỉ cao bằng ô input.
- Có chữ: xuất hiện nút xoá "×" màu `--link-blue` trước icon kính lúp; modal mở rộng thêm khung kết quả bên dưới (cách input ≈ 24px), tối đa cao ≈ 60vh, tự cuộn, có thanh cuộn nhìn thấy được.
- Mỗi kết quả: dòng 1 là số chương bằng chữ số La Mã (bold, 17px), dòng dưới là đoạn trích 17px, line-height 1.45, tối đa 4 dòng; khoảng cách giữa hai kết quả ≈ 28px.
- Từ khớp được tô nền `--accent-soft`, bo 3px. Khớp theo chuỗi con, không phân biệt hoa thường (từ khoá "do" khớp cả trong "doing", "down", "don't").
- Debounce 250ms; có trạng thái "Đang tìm…" và "Không có kết quả". Giới hạn ≈ 100 kết quả, tải thêm khi cuộn cuối.
- Click hoặc Enter ở kết quả: đóng modal, nhảy tới đúng vị trí trong sách và nháy highlight vị trí đó khoảng 2 giây. ↑/↓ chọn kết quả; Esc đóng modal.
- Trap focus trong modal (Tab không lọt ra reader), `role="dialog"`, `aria-modal="true"`.

## 6. Mục lục và bookmark (không có ảnh mẫu)
- Icon mục lục mở drawer trái; icon bookmark bật/tắt dấu trang tại vị trí hiện tại (icon đổi sang dạng đặc khi đã đánh dấu). Dùng chung token với popover: nền trắng, bo, bóng.
