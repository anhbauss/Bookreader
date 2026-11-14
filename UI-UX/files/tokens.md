# Design tokens

Chú thích: **✔** = đo bằng code từ ảnh gốc, dùng đúng giá trị. **~** = ước lượng bằng mắt, có thể lệch vài đơn vị.
Cập nhật các dòng `~` khi đã có số đo thật.

## 1. Theme của Reader (3 theme, đổi bằng `data-theme` trên root)

| Token | Light | Dark | Paper |
|---|---|---|---|
| `--reader-bg` | `#ffffff` ✔ | `#302d3d` ✔ | `#fcf7ed` ✔ |
| `--reader-text` | `#302d3d` ✔ | `#fefefe` ✔ | `#000000` ✔ |
| `--reader-muted` (tác giả, nav) | `#6b6a75` ~ | `#b5b3bf` ~ | `#6b665c` ~ |
| `--reader-icon` | = text | = text | = text |

- Header, vùng đọc và footer dùng CÙNG màu nền, không có đường kẻ ngăn.
- Paper dùng chữ đen thuần theo số đo; nếu thấy gắt, có thể dịu xuống `#1f1d1a` nhưng phải ghi lại thay đổi.
- Kiểm tra tương phản WCAG AA (≥ 4.5:1) cho cả 3 theme.

## 2. Bề mặt nổi (popover, modal): LUÔN trắng, bất kể theme

| Token | Giá trị |
|---|---|
| `--surface-float` | `#ffffff` ✔ (đo ra `#fcfcfc` do lượng tử hoá, thực tế là trắng) |
| `--surface-float-text` | `#302d3d` |
| `--overlay` | `rgba(0,0,0,0.15)` ~ (nền Dark `#302d3d` bị tối còn ≈ `#282834`) |
| `--overlay-blur` | `blur(8px)` ~ |

Popover Visual Settings và modal Search KHÔNG đổi màu theo theme; chúng trắng cả trong Dark.

## 3. Accent

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--accent` | `#5b3fc4` ~ | thumb slider, dấu ✓, viền theme đang chọn, toggle bật |
| `--accent-soft` | `#e9e3f9` ~ | nền highlight từ khớp khi tìm kiếm |
| `--link-blue` | `#2a5db0` ~ | nút xoá (×) trong ô tìm kiếm |

## 4. Library

| Token | Giá trị |
|---|---|
| `--lib-bg` | `#f5f5f0` ✔ (đo `#f4f4f0`, sai số ±3 do lượng tử hoá) |
| `--lib-card` | `#ffffff` ✔ |
| `--lib-text` | `#1a1a1a` ~ |
| `--lib-muted` | `#6b6b6b` ~ |
| `--lib-track` | `#e3e3df` ~ (nền thanh progress, Reading Goal) |
| `--lib-progress` | `#7b3a3a` ~ (nâu đỏ, phần đã đọc) |
| `--lib-avatar` | `#1f5a34` ~ (xanh lá đậm), chữ cái trắng |
| `--lib-input-chip` | `#efefec` ~ (ô "Pg. #") |
| `--lib-underline` | `#8a8a8a` ~ (gạch chân ô tìm sách) |

Lưu ý: màu `#484848` và `#78bc44` trong số đo là bìa sách mẫu (Wuthering Heights, Wow No Thank You), KHÔNG phải token UI.

## 5. Typography

- UI sans: nét giống Ubuntu / Hanken Grotesk. Dùng `"Ubuntu", "Hanken Grotesk", system-ui, sans-serif`.
- Serif: nét giống Charter / Source Serif. Dùng `"Source Serif 4", "Charter", Georgia, serif`.
- Serif dùng cho: nội dung sách, tiêu đề sách ở header reader, tên mục trong Visual Settings, lời chào "Hello …" ở Library.
- Sans dùng cho: mọi chrome còn lại (nav, nút, nhãn, modal tìm kiếm, tiêu đề section "Currently Reading").

Cỡ chữ nội dung sách (Size slider, 4 mức):

| Mức | Nhãn | Cỡ | Line-height |
|---|---|---|---|
| 1 | Small | 16px | 1.7 |
| 2 | Medium (mặc định) | 18px | 1.7 |
| 3 | Large | 20px | 1.7 |
| 4 | Extra Large | 23px | 1.7 |

Thang UI: caption 13px, body 15px, label 17px, section title 28px, hero 52px (serif).

## 6. Spacing, bo góc, bóng

- Đơn vị spacing 4px: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 80.
- Bo góc: thẻ sách 4px; ô input chip 4px; nút theme 6px; popover 28px; modal tìm kiếm 20px; toggle/avatar tròn.
- Bóng thẻ sách: `0 1px 3px rgba(0,0,0,.06)` (rất nhẹ). Bóng popover/modal: `0 12px 40px rgba(0,0,0,.25)`.
- Focus ring: `2px solid var(--accent)`, offset 2px, thấy được trên cả 4 nền.

## 7. CSS mẫu

```css
:root { --accent:#5b3fc4; --accent-soft:#e9e3f9; --surface-float:#fff; }
[data-theme="light"] { --reader-bg:#fff;    --reader-text:#302d3d; --reader-muted:#6b6a75; }
[data-theme="dark"]  { --reader-bg:#302d3d; --reader-text:#fefefe; --reader-muted:#b5b3bf; }
[data-theme="paper"] { --reader-bg:#fcf7ed; --reader-text:#000;    --reader-muted:#6b665c; }
```
