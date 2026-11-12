# Book_reader — Backlog giao việc

> **Nguồn yêu cầu bắt buộc:** [`book-reader-architecture.md`](book-reader-architecture.md), phiên bản 1 ngày 2026-11-11.  
> Tài liệu này phân rã công việc để giao cho agent/developer; khi có xung đột, **architecture là nguồn quyết định**.

## 0. Ràng buộc kiến trúc không được thay đổi

Mọi task và PR phải tuân thủ các quyết định sau:

1. **BookGraph là nguồn sự thật bất biến** cho nội dung, provenance và memory. `fumadocs-editor` chỉ là reader **read-only**; không ghi ngược nội dung/chỉnh sửa từ UI vào BookGraph.
2. Nội dung reader lấy từ `sources/sections/<doc_id>/<section_id>.md`, **không** lấy từ `wiki/books`.
3. Cần bước build riêng chuyển BookGraph section `.md` sang Fumadocs `.mdx`; không render trực tiếp markdown section trong editor.
4. Dữ liệu động của browser đi qua HTTP API mỏng bọc `bookgraph.mcp.service`; không cho frontend đọc/ghi trực tiếp workspace BookGraph.
5. Ingestion dùng markdown cục bộ làm nguồn parse chính; **không dùng MinerU**. JSON chỉ là dữ liệu tham khảo tùy chọn; docx chỉ là fallback ảnh; PDF chỉ để đối chiếu.
6. Ảnh phải được stage **offline, deterministic** theo basename hash từ folder `*_latex/images/`; không tải CDN trong phạm vi hiện tại.
7. Input folder là dữ liệu không tin cậy: không được path traversal, chỉ xử lý loại ảnh cho phép, và một ảnh thiếu chỉ sinh cảnh báo — không làm fail toàn bộ sách.
8. Không mở rộng sang hai chiều chỉnh sửa hoặc đồng bộ editor → BookGraph trong scope này.

## 1. Thứ tự thực hiện và quy tắc giao việc

Thực hiện tuần tự theo phụ thuộc sau:

```text
T1 Discovery/contracts
  └─► T2 Ingestion
        └─► T3 Integration pipeline
              ├─► T4 MD → MDX build bridge
              │     └─► T5 Basic read-only reader
              └─► T6 HTTP API
                    └─► T7 Dynamic reader panels
                          └─► T8 Translation/bilingual reader
```

- Không bắt đầu một task khi dependency chưa đạt acceptance criteria.
- Mỗi task phải có test tự động phù hợp trước hoặc cùng lúc với implementation.
- Giữ các implementation phía BookGraph sau port/protocol hiện có; không biến heavy tool thành dependency bắt buộc.
- Khi contract/API hiện hữu khác với giả định trong tài liệu này, phải ghi nhận khác biệt và đề xuất thay đổi tối thiểu, không tự ý đổi các ràng buộc ở mục 0.
- Sample ở `Sample-input/` là fixture kiểm chứng end-to-end đầu tiên; không thực thi code có nguồn gốc không tin cậy từ folder này.

### Trạng thái rà soát — 2026-11-11

| Task | Trạng thái trung thực | Việc còn lại để đóng |
| --- | --- | --- |
| T1 | **Hoàn thành implementation** | Review tài liệu contract. |
| T2 | **Một phần** | Chạy test + E2E sample; docx fallback chưa có mapping basename an toàn nên chỉ warning, chưa trích ảnh từ docx. |
| T3 | **Hoàn thành implementation** | Chạy test/integration pipeline và E2E sample. |
| T4 | **Một phần** | Chạy test/build render thực; cần xác nhận renderer reader tương thích đầy đủ Fumadocs MDX/math. |
| T5 | **Một phần** | Chạy type-check/build và UI/E2E; reader hiện là app Vite read-only riêng, không phải surface Fumapress/Fumadocs đầy đủ. |
| T6 | **Một phần** | Cài extra `http`, cập nhật lockfile nếu cần, chạy API/security tests và kiểm tra response upstream-failure. |
| T7 | **Một phần** | Chạy UI/API integration; bổ sung tiêu chí “đã thực sự đọc” trước mark-read nếu UX yêu cầu chặt hơn. |
| T8 | **Một phần** | Chạy UI/API integration cho fresh/missing/stale/error; xác nhận semantics realtime từ upstream BookGraph. |

> **Lý do chưa đóng:** mọi test/build shell được yêu cầu đều chưa chạy được vì terminal harness liên tục trả `hermes is temporarily unavailable`. Không được đánh dấu “xong” acceptance criteria cho đến khi verification thực tế xanh.

---

## T1 — Khảo sát codebase và chốt contract tích hợp **[IMPLEMENTED — awaiting review]**

**Ưu tiên:** P0  
**Phụ thuộc:** Không có  
**Đích:** `bookgraph/` và `fumadocs-editor-dev/`

### Mục tiêu

Xác minh các điểm tích hợp thực sự có sẵn trước khi viết chức năng mới: BookGraph CLI/pipeline, schema đầu ra của `sources/parsed` và `sources/sections`, asset resolver, `bookgraph.mcp.service`, cùng cơ chế content/MDX của Fumadocs.

### Công việc

- Lập bản đồ module, CLI command và test liên quan đến parse, segment, index, reading plan, assets, MCP service.
- Xác minh parser `markdown` hỗ trợ markdown-it + dollarmath theo yêu cầu.
- Ghi rõ shape frontmatter section hiện có (`id`, `prev_id`, `next_id`, `page_start`, `title` và các trường khác nếu có).
- Xác minh cách Fumadocs nạp MDX, serve static asset và extension point để reader read-only/section navigation.
- Viết tài liệu contract ngắn tại `docs/design/` của BookGraph hoặc một vị trí được thống nhất, bao gồm đường dẫn input/output, interface/function sử dụng, và các câu hỏi/khác biệt còn mở.

### Không làm

- Không implement ingestion, API hoặc UI ở task này.
- Không đổi schema hoặc command chỉ để “dễ tích hợp” khi chưa có lý do được xác minh.

### Acceptance criteria

- Có tài liệu contract được review, nêu rõ điểm gắn cho T2–T8.
- Có danh sách cụ thể các file/module sẽ sửa ở từng task tiếp theo.
- Không có giả định chưa kiểm chứng được đưa vào implementation.

---

## T2 — Ingestion folder markdown và staging ảnh local **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P0  
**Phụ thuộc:** T1  
**Đích:** `bookgraph/`

### Mục tiêu

Xây phần mới nhận một folder do người dùng cung cấp, chuẩn hóa markdown và ảnh để đưa được vào pipeline BookGraph mà không phụ thuộc mạng.

### Công việc bắt buộc

1. Quét input folder và nhận diện:
   - đúng một file markdown thân sách;
   - một thư mục con khớp `*_latex/images/`;
   - tùy chọn: `*.json`, `*.docx`, `*.pdf`.
2. Xác định/chấp nhận `doc_id` qua contract T1; tạo output trong `sources/parsed/<doc_id>/`.
3. Phân tích các image reference markdown có URL CDN và chỉ lấy **basename** hợp lệ, ví dụ `<HASH>.jpg`.
4. Tìm basename tương ứng trong folder ảnh local, sau đó copy deterministic vào `sources/parsed/<doc_id>/images/<basename>`.
5. Rewrite image reference thành `images/<basename>` trong markdown đã stage.
6. Nếu local image thiếu, thử fallback docx một cách thận trọng theo contract được xác định ở T1. Nếu vẫn thiếu: ghi warning có ngữ cảnh, giữ nguyên reference, tiếp tục ingest.
7. Cung cấp một entry point CLI/service rõ ràng, idempotent khi chạy lại cùng input và doc ID.

### Bảo mật bắt buộc

- Chỉ lấy tên file bằng basename; từ chối mọi path có `..`, absolute path, separator bất thường hoặc không nằm trong folder ảnh đã xác định.
- Allowlist extension/MIME ảnh (tối thiểu các định dạng thực tế cần dùng như `.jpg`, `.jpeg`, `.png`, `.webp` nếu contract hỗ trợ); không copy file tùy ý.
- Không fetch URL, không chạy macro/docx hay executable từ input folder.
- Không được để đường dẫn input vượt ra ngoài output workspace khi copy/ghi file.

### Tests tối thiểu

- Stage và rewrite thành công với sample markdown + ảnh local hash tương ứng.
- Ảnh thiếu sinh warning và ingest vẫn hoàn thành.
- Reference có path traversal/URL bất thường không thể ghi/đọc ngoài vùng cho phép.
- Input không có markdown hoặc có nhiều markdown có thông báo lỗi xác định rõ.
- Chạy lại không tạo kết quả khác hoặc trùng lặp bất thường.

### Acceptance criteria

- Có test tự động xanh.
- Với `Sample-input/`, mọi ảnh local matching được stage, markdown đã stage không còn phụ thuộc CDN cho các ảnh match.
- Một ảnh lỗi/thiếu không ngăn các section khác được xử lý.

---

## T3 — Kết nối ingestion vào pipeline chuẩn BookGraph **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P0  
**Phụ thuộc:** T2  
**Đích:** `bookgraph/`

### Mục tiêu

Sau ingestion, chạy được pipeline chuẩn theo đúng thứ tự:

```text
bookgraph parse (parser=markdown)
→ segment
→ index build
→ reading-plan create
```

### Công việc

- Thêm orchestration/documented command để đưa markdown đã stage vào parser `markdown` hiện hữu.
- Bảo toàn source evidence và provenance xuyên suốt parse/segment/index.
- Đảm bảo segment là đơn vị đọc cho con người, ưu tiên heading markdown rồi mới fallback theo quy tắc BookGraph.
- Xác nhận asset resolver chấp nhận reference tương đối `images/<basename>` nằm dưới parsed directory.
- Viết smoke/integration test dùng fixture nhỏ; có thể thêm manual verification document cho sample sách lớn.

### Không làm

- Không chuyển sang MinerU hoặc mạng để sửa lỗi ingest.
- Không dùng `wiki/books` làm nguồn section/render.

### Acceptance criteria

- Một document staged sinh được `sources/sections/<doc_id>/` với section có thứ tự và liên kết prev/next/provenance theo contract T1.
- Đã tạo được index và reading plan cho document này.
- Tất cả lệnh/test liên quan trong BookGraph chạy được theo hướng dẫn `bookgraph/AGENTS.md`.

---

## T4 — Build bridge BookGraph section Markdown sang Fumadocs MDX **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P1  
**Phụ thuộc:** T3  
**Đích:** công cụ build riêng, tích hợp với `fumadocs-editor-dev/` theo contract T1

### Mục tiêu

Tạo build step đọc từng `sources/sections/<doc_id>/<section_id>.md` và sinh MDX mà Fumadocs render được an toàn, có thể lặp lại.

### Công việc bắt buộc

- Thiết kế input/output directory, naming, lifecycle build rõ ràng; không sửa source section gốc.
- Chuyển `title` sang frontmatter `title` Fumadocs; thêm `description` chỉ khi suy ra đáng tin cậy.
- Giữ metadata provenance trong key phụ, ví dụ `bookgraph`, bao gồm tối thiểu `id`, `prev_id`, `next_id`, `page_start` và metadata điều hướng có sẵn.
- Rewrite ảnh `images/<basename>` thành đường dẫn reader phục vụ được. Chọn **một** strategy đã chốt trong contract:
  - API asset: `/api/assets/<doc_id>/<basename>`; hoặc
  - sao chép build asset vào public directory của reader.
- Transform `<eq>...</eq>` nằm trong HTML table thành math syntax/component Fumadocs hiểu. Inline/display math `$...$` và `$$...$$` ngoài table phải giữ nguyên.
- Xử lý/escape MDX có nguy cơ bị interpreted sai để content sách không phá build.

### Tests tối thiểu

- Fixture có frontmatter/provenance, ảnh và bảng chứa `<eq>`.
- Xác minh metadata điều hướng giữ lại sau conversion.
- Xác minh MDX build/render thành công và expression math không hiển thị thô.
- Snapshot/golden test output để conversion deterministic.

### Acceptance criteria

- Toàn bộ section của fixture/build sample đã chọn được chuyển thành MDX hợp lệ.
- Không mất liên kết điều hướng/provenance cần cho reader.
- Không còn `<eq>` thô trong output table.

---

## T5 — Reader read-only cơ bản **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P1  
**Phụ thuộc:** T4  
**Đích:** `fumadocs-editor-dev/`

### Mục tiêu

Biến Fumadocs editor thành book reader chỉ đọc cho nội dung BookGraph đã build.

### Công việc bắt buộc

- Render MDX build output; không khởi tạo editor state hoặc affordance chỉnh sửa cho nội dung sách.
- Điều hướng section bằng `bookgraph.prev_id` và `bookgraph.next_id` thay vì đường dẫn suy đoán từ tên file.
- Render mục lục từ outline/section tree contract của BookGraph.
- Đưa ra trạng thái loading, missing section và lỗi build/API rõ ràng.
- Bảo đảm image URL theo strategy T4 hiển thị được.

### Không làm

- Không có nút save/publish/edit, không POST/PUT/PATCH content về BookGraph.
- Chưa làm panel memory hoặc translation ở task này.

### Acceptance criteria

- Có thể mở một sách, đọc một section, đi section trước/sau và điều hướng từ mục lục.
- UI và network behavior chứng minh reader không ghi content vào BookGraph.
- Kiểm thử UI/e2e phù hợp với stack hiện hữu xác nhận luồng đọc cơ bản.

---

## T6 — HTTP API mỏng bọc `bookgraph.mcp.service` **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P1  
**Phụ thuộc:** T1, T3  
**Đích:** `bookgraph/` (hoặc service package đã chốt ở T1)

### Mục tiêu

Cung cấp REST API cho browser mà tái sử dụng behavior của `bookgraph.mcp.service`, không nhân đôi business logic.

### Endpoint/nhóm capability tối thiểu

| Nhóm | Capability |
| --- | --- |
| Content | section, outline, section tree, context |
| Reading progress | get next section, mark read, reading plan |
| Memory | concept, annotation theo section |
| Translation | section translation, dữ liệu song ngữ (có thể trả “not available” chuẩn hóa nếu upstream chưa có) |
| Assets | phục vụ ảnh từ `sources/parsed/<doc_id>/images/` |

### Công việc bắt buộc

- Ánh xạ REST request/response đến service/tool hiện có; giữ model/schema response rõ ràng và được version/ghi tài liệu.
- Validate `doc_id`, `section_id`, basename asset trước khi truy cập filesystem/service.
- Với asset endpoint: chỉ serve file trong directory ảnh của document đã chọn; chống traversal, symlink escape và content type sai.
- Chuẩn hóa error: validation, not found, capability chưa có, upstream failure.
- CORS/auth chỉ thêm nếu đã có requirement/contract; không tự tạo cơ chế auth giả định.
- Test endpoint ở service layer và integration test asset security.

### Acceptance criteria

- Reader có thể dùng API để đọc dữ liệu động mà không gọi MCP tool trực tiếp từ browser.
- Không endpoint nào cho phép ghi/sửa source section hoặc truy cập file ngoài workspace asset cho phép.
- `mark read` chỉ tác động reading-plan/progress theo behavior BookGraph, không sửa body/provenance của section.

---

## T7 — Reader động: tiến độ và panel memory **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P2  
**Phụ thuộc:** T5, T6  
**Đích:** `fumadocs-editor-dev/`

### Mục tiêu

Nối reader cơ bản vào API để hiển thị tiến độ đọc và lớp memory mà agent tạo ra.

### Công việc

- Gọi reading-plan/get-next/mark-read theo luồng user đọc section, với UX tránh mark nhầm khi section chưa thực sự được mở/đọc.
- Hiển thị progress bar từ reading plan.
- Tạo panel read-only cho concept và annotation của section hiện tại.
- Dùng response loading/empty/error rõ ràng khi một capability chưa có dữ liệu.
- Không cache/ghi đè source of truth phía client ngoài nhu cầu UI tạm thời.

### Acceptance criteria

- Mark-read cập nhật progress sau khi được API xác nhận.
- Đổi section làm panel memory đổi đúng theo section id.
- Không có thao tác UI thay đổi section source, provenance, concept hoặc annotation.

---

## T8 — Translation và reader song ngữ **[IMPLEMENTED — verification pending]**

**Ưu tiên:** P3  
**Phụ thuộc:** T6, T7  
**Đích:** `fumadocs-editor-dev/` và API adapter khi cần

### Mục tiêu

Hiển thị bản dịch hiện có/realtime từ BookGraph theo hướng read-only, có thể chuyển giữa bản gốc và song ngữ.

### Công việc

- Dùng capability translation qua HTTP API; không gọi model/provider trực tiếp từ frontend.
- Thiết kế mode original / translation / bilingual, giữ section ID và provenance gốc làm anchor.
- Hiển thị trạng thái đang tạo/chưa có/lỗi mà không làm hỏng trải nghiệm đọc bản gốc.
- Đảm bảo bản dịch không ghi đè source section và không làm lệch điều hướng section.

### Acceptance criteria

- Có thể đọc original khi translation không tồn tại.
- Bản song ngữ map đúng section được chọn và không thay đổi content BookGraph gốc.
- Có test UI/contract cho ba trạng thái: available, pending/unavailable, error.

---

## 2. Definition of Done chung

Một task chỉ được đóng khi tất cả điều kiện sau đạt:

- [ ] Scope và kiến trúc ở mục 0 được giữ nguyên.
- [ ] Code theo convention của repository đích (`bookgraph/AGENTS.md` đối với BookGraph).
- [ ] Có test mới/cập nhật bao phủ behavior đã thay đổi; test liên quan đã chạy và kết quả được báo cáo.
- [ ] Có validation input, error/warning có ngữ cảnh, và không để failure cục bộ làm hỏng cả document nếu architecture yêu cầu graceful degradation.
- [ ] Không đưa secret, dữ liệu sample nặng, output generated không cần thiết, hoặc artifact build vào source control.
- [ ] Documentation/CLI/API contract được cập nhật khi thay đổi có ảnh hưởng người dùng/agent khác.
- [ ] Báo cáo bàn giao nêu: file đổi, command test đã chạy, kết quả, limitation còn lại, và task phụ thuộc nào đã được mở khóa.

## 3. Checklist review kiến trúc trước khi merge

- [ ] Reader có đang dùng `sources/sections`, không dùng `wiki/books`?
- [ ] Content BookGraph có vẫn immutable từ phía reader?
- [ ] Ingestion có offline và resolve ảnh bằng basename local, không fetch CDN?
- [ ] Input path/asset path có chống traversal và chỉ dùng extension cho phép?
- [ ] Thiếu một ảnh có chỉ warning thay vì fail cả sách?
- [ ] Pipeline sau ingest có đúng `parse → segment → index → reading plan` với parser markdown?
- [ ] MDX bridge có bảo toàn provenance và chuyển `<eq>` trong bảng?
- [ ] Dữ liệu động có đi qua HTTP API bọc MCP service, không lộ MCP trực tiếp cho browser?
- [ ] Asset endpoint có giới hạn đúng document/image directory?
- [ ] Không có tính năng edit/write-back ngoài reading progress được phép?
