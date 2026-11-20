Kế hoạch triển khai

Milestone 1 — Tạo desktop foundation

Mục tiêu: Reader hiện tại chạy được trong Tauri khi phát triển và khi build production.

Công việc

1. Khởi tạo Tauri trong fumadocs-editor-dev/apps/reader.
2. Giữ Vite là frontend build system.
3. Thêm cấu hình:
   - app name;
   - icon;
   - bundle identifier;
   - development URL;
   - frontend build command;
   - CSP tối thiểu phù hợp.
4. Thiết lập quy trình dev:
   - frontend Vite hot reload;
   - Tauri window;
   - backend local process.
5. Thiết lập quy trình package ít nhất cho Windows trước.

Kết quả mong muốn

npm run tauri dev
npm run tauri build

Ứng dụng mở thành một cửa sổ desktop và Reader hiện tại hoạt động như web app.

Tiêu chí hoàn thành

- Có thể build installer/package local.
- Deep link, reload, navigation mode Original / Translation / Bilingual không hỏng.
- Desktop không cần mở trình duyệt ngoài.

---

Milestone 2 — Thiết lập cấu hình local và onboarding

Mục tiêu: Người dùng mới đi qua onboarding một lần; lần sau app mở thẳng vào Library.

Dữ liệu cấu hình không nhạy cảm

Có thể lưu trong app config:

type AppSettings = {
  onboardingCompleted: boolean;
  displayName: string;
  translationProvider: string;
  libraryRoot?: string;
  lastOpenedBookId?: string;
  readerPreferences: {
    theme: "light" | "dark" | "paper";
    font: "serif" | "sans";
    size: "s" | "m" | "l" | "xl";
    vertical: boolean;
  };
};

API key được lưu riêng trong credential vault, chỉ giữ metadata không nhạy cảm trong config:

type TranslationCredentialStatus = {
  configured: boolean;
  maskedSuffix?: string;
  lastValidatedAt?: string;
};

Công việc

1. Thêm OnboardingPage.
2. Thêm lớp desktopApi ở frontend, tách khỏi API HTTP của BookGraph.
3. Tauri commands:
   - get_app_settings
   - save_profile
   - get_translation_credential_status
   - save_translation_api_key
   - delete_translation_api_key
4. Validation:
   - tên không rỗng;
   - API key không được logging;
   - provider là enum được hỗ trợ;
   - API key chỉ truyền qua IPC khi lưu/thay thế.
5. Điều hướng:
   - chưa onboarding → Onboarding;
   - đã onboarding nhưng chưa chọn library → Library empty state;
   - đã chọn library → Library.

Tiêu chí hoàn thành

- Khởi động lần đầu hiển thị onboarding.
- Đóng/mở lại app không hỏi lại tên/API key.
- UI chỉ hiển thị suffix che bớt của key, ví dụ ••••••••a1b2.
- Thay/xóa key không để lại key cũ trong config/logs.

---

Milestone 3 — Chọn và quản lý Library root

Mục tiêu: Người dùng chọn folder bằng native dialog; app ghi nhớ và có thể đổi folder sau.

Công việc

1. Tauri command mở native folder picker.
2. Xác nhận thư mục được chọn:
   - tồn tại;
   - có quyền đọc;
   - không phải file;
   - xử lý thư mục bị xóa/mất mount sau đó.
3. Lưu libraryRoot trong cấu hình local.
4. UI Library:
   - empty state khi chưa chọn folder;
   - hiển thị tên/path rút gọn của folder;
   - Chọn thư mục khác;
   - Quét lại.
5. Không dùng browser <input type="file"> làm nguồn quyền truy cập chính, vì giới hạn quyền và trải nghiệm không tốt trong desktop app.

Tiêu chí hoàn thành

- Người dùng chọn folder qua hệ điều hành.
- Khởi động lại app vẫn biết folder Library.
- Nếu folder không còn truy cập được, Library hiện trạng thái lỗi dễ hiểu thay vì crash.

---

Milestone 4 — Book discovery và Library UI

Mục tiêu: Quét thư mục con và hiển thị danh sách sách thực tế.

Backend contract đề xuất

GET /api/library
GET /api/library/books/{book_id}
POST /api/library/rescan

Ví dụ dữ liệu trả về browser:

type LibraryBook = {
  id: string;
  title: string;
  folderName: string;
  coverUrl?: string;
  sourceKind: "pdf" | "bookgraph";
  status: "new" | "preparing" | "ready" | "needs_attention" | "unavailable";
  sectionCount?: number;
  progress?: {
    currentSection?: number;
    totalSections?: number;
    percent: number;
  };
  translation?: {
    availableSections: number;
    totalSections?: number;
  };
};

Không trả về:

- API key;
- raw filesystem paths không cần thiết;
- workspace-internal path;
- lỗi provider chưa được sanitize.

Quy tắc quét

1. Chỉ xét folder con trực tiếp của Library root.
2. Bỏ qua .bookgraph, folder ẩn, và metadata nội bộ.
3. Với mỗi folder:
   - kiểm tra manifest BookGraph;
   - nếu chưa có, nhận diện PDF/nguồn đầu tiên theo quy tắc rõ ràng;
   - nếu có nhiều file nguồn, đánh dấu cần người dùng chọn thay vì đoán sai.
4. Sắp xếp ổn định theo title/folder name.
5. Không tự động parse lại mọi cuốn sách mỗi lần app mở.

Library UI

- Header: tên thư viện, nút Quét lại, nút đổi folder.
- Grid/list book cards.
- Mỗi card: cover placeholder, title, trạng thái, tiến độ, action chính.
- Search/filter local theo title.
- Empty state cho:
  - library trống;
  - không thấy folder book hợp lệ;
  - folder không còn quyền đọc.

Tiêu chí hoàn thành

- Thêm/xóa/đổi tên book folder và bấm Quét lại cập nhật UI đúng.
- Folder không hợp lệ không làm hỏng cả danh sách.
- Danh sách không expose path nội bộ ngoài nhu cầu UX.

---

Milestone 5 — Mở Reader từ Library

Mục tiêu: Chọn một sách Ready mở đúng nội dung bằng UI Reader hiện tại.

Công việc

1. Thống nhất book_id với doc_id mà reader/backend đang dùng.
2. Thay URL-driven routing thuần browser bằng route desktop-compatible:
   - Library;
   - Book detail;
   - Reader theo book_id/section_id.
3. Khi mở Reader:
   - tải outline;
   - khôi phục section cuối cùng;
   - khôi phục reader preferences;
   - fallback section đầu nếu section trước không còn tồn tại.
4. Nút Library trong header quay lại Library desktop, không chỉ href="?".
5. Đưa tiến độ đọc vào local metadata/BookGraph workspace.

Tiêu chí hoàn thành

- Mở sách từ Library vào đúng Reader.
- Mở lại app/sách tiếp tục section gần nhất.
- Quay về Library không mất trạng thái cần thiết.
- Reader vẫn hoạt động khi API key không hợp lệ hoặc chưa có, vì Original không phụ thuộc vào dịch.

---

Milestone 6 — Đóng gói và kiểm thử phát hành nội bộ

Mục tiêu: Có bản cài thử nghiệm đáng tin trên một hệ điều hành đích.

Ưu tiên platform

Tôi đề xuất bắt đầu bằng Windows, nếu đây là máy và nhóm người dùng đầu tiên đang dùng. Sau đó mới đến macOS/Linux.

Kiểm thử bắt buộc

1. Fresh install, chưa có config.
2. Onboarding với key hợp lệ.
3. Đổi key và bảo đảm key cũ không hiển thị.
4. Chọn library mới, đổi library, library bị di chuyển/xóa.
5. Library có:
   - zero book;
   - book đã chuẩn bị;
   - folder có một PDF;
   - folder lỗi/thiếu file;
   - nhiều file nguồn.
6. Đóng/mở app và kiểm tra settings, library root, tiến độ đọc.
7. Mở Reader ở ba mode và các theme, bao gồm Paper.
8. Kiểm tra offline:
   - Library/Original Reader vẫn mở;
   - chức năng dịch báo trạng thái phù hợp, không treo UI.
9. Quét logs để chắc chắn không xuất hiện API key hoặc raw provider error body.

---

Thứ tự thực hiện thực tế

1. Tauri foundation + chạy Reader trong desktop
2. App config + secure API-key store
3. Onboarding
4. Native folder selection
5. Backend library scanning API
6. Library grid/list
7. Open Reader + resume progress
8. Windows package + QA checklist

Không nên làm dịch 10/25/50/100% trước khi hoàn tất chuỗi trên. Nếu library root, book identity, secure API key storage và background process chưa ổn định, phần dịch sau đó sẽ phải sửa kiến trúc nhiều lần.

---

Chuẩn bị cho Giai đoạn 2 ngay từ bây giờ

Dù chưa code chức năng dịch tỷ lệ, Giai đoạn 1 nên đặt sẵn các contract sau:

type TranslationCoverage = {
  totalSections: number;
  translatedSections: number;
  requestedSections?: number;
  status: "not_started" | "queued" | "running" | "ready" | "failed";
};

và thư mục dữ liệu theo từng book:

.bookgraph/
├── manifest.json
├── sections/
├── translations/
├── reading-state.json
└── jobs/

Khi sang Giai đoạn 2, 10% / 25% / 50% / 100% chỉ là thao tác tạo translation job dựa theo tổng section; không cần đổi lại cấu trúc Library hoặc Reader.

Cogitated for 2m 6s · done 3:32 PM

─────────────────────────────────────────────────────────────────────────────────────────────── 1 new message ───────────────────────────────────────────────────────────────────────────────────────────────

Message from @Plan (ctrl+o to expand)

  Thought for 7s


và thư mục dữ liệu theo từng book:

.bookgraph/
├── manifest.json
├── sections/
├── translations/
├── reading-state.json
└── jobs/

Khi sang Giai đoạn 2, 10% / 25% / 50% / 100% chỉ là thao tác tạo translation job dựa theo tổng section; không cần đổi lại cấu trúc Library hoặc Reader.
  → Reader nhận runtime endpoint
  → khi đổi book / tắt app, sidecar được dừng sạch

Bảo vệ API key