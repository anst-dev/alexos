# Hướng Dẫn Setup Backend (Google Sheets + n8n) cho Alex OS

Alex OS sử dụng **n8n** làm middleware để kết nối Frontend với **Google Sheets** (đóng vai trò là Database). Điều này giúp bạn kiểm soát hoàn toàn dữ liệu của mình miễn phí và riêng tư.

## Bước 1: Chuẩn bị Google Sheet

1.  Tạo một Google Sheet mới tại [sheets.new](https://sheets.new).
2.  Đặt tên file là `Alex OS Database` (hoặc tên tùy thích).
3.  Tạo 4 sheet (tab) ở phía dưới với tên chính xác như sau (có phân biệt hoa thường):
    *   `Goals`
    *   `Milestones`
    *   `Habits`
    *   `JournalEntries`

4.  Trong mỗi sheet, tạo dòng tiêu đề (Header row) ở dòng 1 với các cột sau:

    **Tab `Goals`:**
    ```
    id | title | category | progress | deadline | colorClass | image | notes | createdAt
    ```

    **Tab `Milestones`:**
    ```
    id | title | completed | dueDate | goalId
    ```

    **Tab `Habits`:**
    ```
    id | name | category | streak | completedToday | lastCompletedDate | linkedGoalId
    ```

    **Tab `JournalEntries`:**
    ```
    id | content | mood | createdAt | linkedGoalId
    ```

5.  **Quan trọng:** Copy ID của Google Sheet từ URL.
    *   Ví dụ URL là: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE/edit`
    *   ID là đoạn: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE`
    *   Lưu ID này lại để dùng ở Bước 3.

## Bước 2: Setup n8n và Google Sheets Credentials

Bạn cần một instance n8n đang chạy (có thể là n8n Cloud, self-hosted, hoặc chạy local via npm/docker).

1.  Mở n8n UI.
2.  Vào menu **Credentials** > **Add Credential**.
3.  Tìm và chọn **Google Sheets OAuth2 API**.
4.  Làm theo hướng dẫn của n8n để tạo OAuth Client ID trên Google Cloud Console:
    *   Cần enable **Google Sheets API** và **Google Drive API**.
    *   Redirect URL thường là: `https://YOUR-N8N-INSTANCE/rest/oauth2-credential/callback`
5.  Sau khi connect thành công, đặt tên credential này là `Google Sheets Account`.

## Bước 3: Import và Cấu hình Workflows

Dự án đã có sẵn 4 file workflow trong thư mục `n8n-workflows/`.

1.  Trong n8n, tạo mới workflow.
2.  Chọn **Import from File** (hoặc copy nội dung file JSON và paste vào editor).
3.  Lần lượt import 4 file:
    *   `goals-crud-workflow.json`
    *   `milestones-crud-workflow.json`
    *   `habits-crud-workflow.json`
    *   `journal-crud-workflow.json`

4.  **Với MỖI workflow sau khi import:**
    *   Tìm node **Google Sheets** (thường có 4 node cho Get, Create, Update, Delete).
    *   Double click vào node đó.
    *   Ở phần **Credential**, chọn `Google Sheets Account` bạn vừa tạo.
    *   Ở phần **Document**, chọn "By ID" và dán **Google Sheet ID** (đã lấy ở Bước 1) vào ô **Document ID**. (Lưu ý: Bạn có thể tạo một biến global trong n8n cho ID này để dễ quản lý, hoặc paste trực tiếp).
    *   Đảm bảo tên Sheet (Tab) khớp với tên bạn đã tạo (Goals, Habits, v.v.).
    *   Lưu workflow và **Activate** (gạt nút Active ở góc trên bên phải).

## Bước 4: Kết nối Frontend

1.  Trong mỗi workflow trên n8n, tìm node **Webhook**.
2.  Copy **Production URL** của Webhook đó.
    *   *Lưu ý: Webhook URL thường có dạng `https://your-n8n.com/webhook/goals`*.
    *   Đảm bảo bạn copy URL tương ứng với method (thường là URL chung, n8n phân loại bằng HTTP Method GET/POST/PUT/DELETE).

3.  Quay lại project code `bovanav2`.
4.  Tạo file `.env` từ file `.env.example`:
    ```bash
    cp .env.example .env
    ```
5.  Điền các URL bạn vừa copy vào file `.env`:

    ```env
    VITE_API_BASE_URL=https://your-n8n-instance.com/webhook
    # Nếu URL của bạn khác cấu trúc chuẩn, bạn có thể cần sửa lại code services/api.ts hoặc cấu hình lại Webhook path trong n8n cho thống nhất.
    # Mặc định code đang mong đợi:
    # Goals:      /goals
    # Habits:     /habits
    # Journal:    /journal
    # Milestones: /milestones
    ```

    *Nếu n8n webhook của bạn có path khác nhau hoàn toàn (ví dụ `/webhook/uuid-1`, `/webhook/uuid-2`), bạn cần sửa file `services/api.ts` để map đúng endpoint, hoặc sửa path trong n8n Webhook node thành `/goals`, `/habits`, v.v.*

## Bước 5: Kiểm tra

1.  Restart lại Frontend: `npm run dev`.
2.  Mở app trên trình duyệt.
3.  Thử tạo một Goal mới.
4.  Kiểm tra trên Google Sheet xem dữ liệu có xuất hiện không.
5.  Nếu thấy dữ liệu -> Thành công! 🎉

## Xử lý lỗi (Troubleshooting)

*   **Lỗi CORS:** Đảm bảo n8n instance của bạn cho phép CORS từ domain của frontend (hoặc `*`). Biến môi trường n8n: `N8N_EDITOR_BASE_URL`, `WEBHOOK_URL`, và cấu hình CORS trong n8n.
*   **Dữ liệu không lưu:** Kiểm tra tab Executions trong n8n xem workflow có chạy không và lỗi ở node nào.
*   **App vẫn dùng LocalStorage:** Kiểm tra console log của trình duyệt. Nếu API fail, app sẽ tự động fallback về LocalStorage.

---
**Tính năng Backup:**
Trong khi chờ setup, bạn có thể dùng tính năng **Settings -> Export Data** để tải về file JSON/CSV backup dữ liệu hiện tại của bạn.
