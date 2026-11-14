# Trang Library

Đo trên ảnh rộng 2576px (kích thước tương đối tính theo % chiều rộng viewport để không phụ thuộc DPR).
Mục đánh dấu **[ref]** là tính năng của app mẫu: chỉ dựng nếu app của tôi có route/dữ liệu thật; nếu không thì ẩn.

## Khung trang
- Nền `--lib-bg`. Lề trái nội dung ≈ 4.3% viewport; mọi khối (hero, section, hàng thẻ) cùng thẳng một lề trái.
- Lề phải của khối Reading Goal và nhãn "4 Books" thẳng cùng mép phải nội dung (≈ 96%).
- Cuối mỗi section có đường kẻ ngang 1px màu `--lib-track`, rồi section kế tiếp.

## 1. TopBar (cao ≈ 10% khung nhìn, không có nền riêng, không bóng)
- Trái: logo icon hai cuốn sách nghiêng (≈ 28px). Cách logo ≈ 40px là ô tìm sách.
- Ô tìm sách: KHÔNG có hộp, chỉ có chữ "Find a book…" (xám) và gạch chân 1px `--lib-underline`; icon kính lúp ở mép phải ô. Rộng ≈ 47% viewport.
- Phải: link "Explore" và "Activity" **[ref]** (sans, medium, 17px), cách nhau 48px; avatar tròn 40px nền `--lib-avatar`, chữ cái đầu tên màu trắng, kèm caret ▾ mở menu tài khoản.

## 2. Hero
- Cách TopBar ≈ 100px. Dòng chào "Hello {tên}" serif, 52px, regular, màu `--lib-text`.
- Dưới là 1 câu trích dẫn, xám `--lib-muted`, 14px, 1 dòng (cắt "…" nếu dài). Trích dẫn đổi ngẫu nhiên mỗi lần tải.
- Bên phải hero (căn đáy với lời chào): khối **Reading Goal {năm}** **[ref]**: tiêu đề bold 16px bên trái, link "Set Goal" (xám) bên phải; dưới là thanh track cao 6px, rộng ≈ 17% viewport, bo tròn, màu `--lib-track`. Khi đã đặt mục tiêu, phần đã đạt tô `--lib-progress`.

## 3. Section "Currently Reading"
- Cách hero ≈ 100px. Tiêu đề section sans, 28px, medium. Dưới là mô tả "Books you are reading now." xám 14px.
- Mép phải, thẳng hàng tiêu đề: đếm "4 Books", xám 14px.

## 4. Hàng thẻ sách (cuộn ngang)
- Thẻ: rộng ≈ 20.2% viewport (≈ 260px ở màn 1288), cao ≈ 176px, nền `--lib-card`, bóng nhẹ, bo 4px, padding 5px.
- Khoảng cách giữa thẻ ≈ 3.2% viewport (≈ 41px). Hiển thị 4 thẻ cùng lúc ở màn rộng; thêm thẻ thì cuộn ngang bằng thanh cuộn ngang native, mép phải hàng bị cắt tự nhiên.
- Bìa sách chiếm bên trái, tỉ lệ ≈ 0.70 (cao ≈ 94% chiều cao thẻ), không bo góc, `object-fit: cover`.
- Cột phải của thẻ, từ trên xuống:
  1. Tiêu đề sách bold 15px, 1 dòng, cắt bằng "…"; nút "···" (3 chấm) góc trên phải.
  2. "by {tác giả}" xám 13px.
  3. Gạch ngắn 14px (hairline), rồi "+ Add Label" **[ref]** xám 12px.
  4. (đẩy xuống đáy) Dòng trang: ô chip `--lib-input-chip` "Pg. #" (hoặc số trang đang đọc, vd "35") + "of 310" + "Pages" (màu nhạt hơn).
  5. Thanh tiến độ cao 4px: track `--lib-track`, phần đã đọc `--lib-progress`. Rộng = trang_đã_đọc / tổng_trang (vd 35/45 = 78%).
  6. Hàng cuối: "Go to Book Board" **[ref]** + mũi tên dài mảnh "⟶" ở mép phải. Trong app của tôi map thành "Đọc tiếp" mở trang Reader.
- Trạng thái chưa nhập trang: chip hiện placeholder "Pg. #", thanh tiến độ rỗng.

## 5. Hành vi
- Click bìa hoặc tiêu đề: mở Reader tại trang đang đọc. Click "···": menu (xoá khỏi danh sách, đánh dấu đã đọc).
- Hover thẻ (đề xuất): nâng 2px, bóng đậm hơn một chút, transition 150ms.
- Chip số trang là `<input type="number">`; Enter hoặc blur thì lưu; giá trị bị kẹp trong [1, tổng trang].
- Responsive: ≥ 1200px hiển thị 4 thẻ; 768-1199px hiển thị 2 thẻ; dưới 768px 1 thẻ cuộn ngang với scroll-snap. TopBar thu gọn: ô tìm kiếm co lại thành icon dưới 640px; ẩn Explore/Activity vào menu avatar.
- A11y: icon có `aria-label`; thẻ là `<article>`; thanh tiến độ có `role="progressbar"` kèm `aria-valuenow`.
