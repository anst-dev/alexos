# 🚀 Personal Dashboard - Hướng Dẫn Setup Hoàn Chỉnh

## 📋 Tổng quan dự án

Personal Dashboard tích hợp với Google Sheets qua n8n workflows để lưu trữ và đồng bộ dữ liệu mục tiêu, thói quen và nhật ký.

## 🎯 Kiến trúc hệ thống

```
Frontend (React + TypeScript)
        ↓
    api.ts (Service Layer)
        ↓
    n8n Webhooks
        ↓
    Google Sheets (Database)
```

## 📦 Các thành phần đã tạo

### 1. n8n Workflows (4 workflows)
- ✅ `goals-crud-workflow.json` - Quản lý mục tiêu
- ✅ `habits-crud-workflow.json` - Quản lý thói quen  
- ✅ `journal-crud-workflow.json` - Quản lý nhật ký
- ✅ `milestones-crud-workflow.json` - Quản lý cột mốc

### 2. Frontend Integration
- ✅ `services/api.ts` - Đã cập nhật để sử dụng n8n webhooks
- ✅ `.env.local` - Configuration file

### 3. Documentation
- ✅ `n8n-workflows/README.md` - Hướng dẫn chi tiết workflows
- ✅ `SETUP_GUIDE.md` - Hướng dẫn setup tổng thể (file này)

## 🚀 Hướng dẫn Setup từng bước

### Bước 1: Tạo Google Sheets

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo spreadsheet mới tên: "Personal Dashboard Database"
3. Tạo 4 sheets (tabs) với cấu trúc sau:

#### Sheet: Goals
Header row (row 1):
```
id | title | category | progress | deadline | image | colorClass | notes | createdAt
```

#### Sheet: Milestones
Header row (row 1):
```
id | goalId | title | completed | dueDate
```

#### Sheet: Habits
Header row (row 1):
```
id | name | streak | completedToday | lastCompletedDate | category | linkedGoalId
```

#### Sheet: JournalEntries
Header row (row 1):
```
id | createdAt | content | mood | linkedGoalId
```

4. Copy **Spreadsheet ID** từ URL:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
```

### Bước 2: Setup n8n

#### 2.1 Cài đặt n8n (nếu chưa có)

**Cloud (Recommended):**
- Đăng ký tại [n8n.cloud](https://n8n.cloud)

**Self-hosted:**
```bash
npm install -g n8n
n8n start
```

#### 2.2 Tạo Google Sheets Credentials

1. Vào n8n → **Settings** → **Credentials**
2. Click **Add credential**
3. Chọn **Google Sheets OAuth2 API**
4. Làm theo hướng dẫn OAuth2:
   - Tạo Google Cloud Project (nếu chưa có)
   - Enable Google Sheets API
   - Tạo OAuth 2.0 Client ID
   - Authorize n8n
5. Save credential với tên: `Google Sheets OAuth2`

#### 2.3 Import Workflows

Cho mỗi workflow file trong folder `n8n-workflows/`:

1. Vào n8n → **Workflows**
2. Click **Import from File**
3. Chọn file workflow (goals, habits, journal, milestones)
4. Click **Import**

#### 2.4 Cấu hình Workflows

Cho **mỗi workflow** đã import:

1. Open workflow
2. Click vào **mỗi Google Sheets node** (Get/Create/Update/Delete)
3. Cấu hình:
   - **Credential**: Chọn `Google Sheets OAuth2`
   - **Document ID**: 
     - Option 1: Thay `={{ $env.GOOGLE_SHEET_ID }}` bằng Spreadsheet ID của bạn
     - Option 2: Set environment variable trong n8n
4. **Save** workflow
5. **Activate** workflow (toggle góc trên phải)

#### 2.5 Lấy Webhook URLs

Sau khi activate, mỗi workflow có Production Webhook URL:

1. Click **Webhook node** trong workflow
2. Copy **Production URL**
3. Lưu lại 4 URLs:
   ```
   Goals: https://your-n8n-url/webhook/goals
   Habits: https://your-n8n-url/webhook/habits
   Journal: https://your-n8n-url/webhook/journal
   Milestones: https://your-n8n-url/webhook/milestones
   ```

### Bước 3: Setup Frontend

#### 3.1 Cập nhật Environment Variables

Mở file `.env.local` và cập nhật:

```env
# Thay bằng n8n URL của bạn
VITE_N8N_BASE_URL=https://your-n8n-instance-url

# Thay bằng webhook URLs từ bước 2.5
VITE_API_GOALS_URL=https://your-n8n-url/webhook/goals
VITE_API_HABITS_URL=https://your-n8n-url/webhook/habits
VITE_API_JOURNAL_URL=https://your-n8n-url/webhook/journal
VITE_API_MILESTONES_URL=https://your-n8n-url/webhook/milestones

# Tắt local storage để dùng n8n
VITE_USE_LOCAL_STORAGE=false

# Sync interval (5 phút = 300000ms)
VITE_SYNC_INTERVAL=300000
```

#### 3.2 Install Dependencies & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Bước 4: Test Integration

#### 4.1 Test từ n8n

Test mỗi workflow bằng cách:

1. Open workflow
2. Click **Test workflow**
3. Click **Execute Workflow**
4. Check Google Sheets để verify data

#### 4.2 Test từ Frontend

1. Mở app: `http://localhost:5173`
2. Thử tạo Goal mới
3. Check trong Google Sheets → Goals sheet
4. Verify data đã được lưu

#### 4.3 Test với cURL (Optional)

```bash
# Test GET
curl https://your-n8n-url/webhook/goals

# Test POST
curl -X POST https://your-n8n-url/webhook/goals \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Goal",
    "category": "Sự nghiệp",
    "progress": 0,
    "deadline": "2025-12-31"
  }'
```

## 🔧 Troubleshooting

### Workflow không chạy
- ✓ Kiểm tra workflow đã **activated**
- ✓ Check Google Sheets credentials còn valid
- ✓ Xem n8n execution logs để debug

### Frontend không kết nối được
- ✓ Check `.env.local` có đúng URLs
- ✓ Verify CORS settings trong n8n
- ✓ Check browser console cho errors

### Data không sync
- ✓ Verify sheet names match exactly (case-sensitive)
- ✓ Check column names trong Google Sheets
- ✓ Review n8n execution history

### Google Sheets errors
- ✓ Reauthorize OAuth2 credentials
- ✓ Check API quotas/limits
- ✓ Verify spreadsheet permissions

## 📊 API Endpoints Reference

| Resource | Method | Endpoint | Body Example |
|----------|--------|----------|--------------|
| Goals | GET | `/webhook/goals` | - |
| Goals | POST | `/webhook/goals` | `{"title":"Learn React","category":"Sự nghiệp","progress":0,"deadline":"2025-12-31"}` |
| Goals | PUT | `/webhook/goals/:id` | `{"progress":50}` |
| Goals | DELETE | `/webhook/goals/:id` | - |
| Habits | GET | `/webhook/habits` | - |
| Habits | POST | `/webhook/habits` | `{"name":"Morning Run","category":"Sức khỏe"}` |
| Habits | PUT | `/webhook/habits/:id` | `{"streak":5,"completedToday":true}` |
| Habits | DELETE | `/webhook/habits/:id` | - |
| Journal | GET | `/webhook/journal` | - |
| Journal | POST | `/webhook/journal` | `{"content":"Today was great!","mood":"😊"}` |
| Journal | PUT | `/webhook/journal/:id` | `{"content":"Updated content"}` |
| Journal | DELETE | `/webhook/journal/:id` | - |
| Milestones | GET | `/webhook/milestones` | - |
| Milestones | POST | `/webhook/milestones` | `{"goalId":"123","title":"Phase 1","completed":false}` |
| Milestones | PUT | `/webhook/milestones/:id` | `{"completed":true}` |
| Milestones | DELETE | `/webhook/milestones/:id` | - |

## 🎨 Next Steps

### Recommended Enhancements

1. **Authentication** - Thêm user authentication
2. **Sync Scheduler** - Tạo workflow sync tự động mỗi 5 phút
3. **Offline Support** - Implement offline queue
4. **Error Handling** - Enhanced error notifications
5. **Data Validation** - Add schema validation
6. **Conflict Resolution** - Handle concurrent edits

### Monitoring & Maintenance

- Monitor n8n execution history
- Check Google Sheets API quotas
- Review error logs regularly
- Backup Google Sheets data
- Update workflows as needed

## 📝 Notes

- **DELETE operations**: Hiện tại chỉ mark deletion. Cần implement thực sự delete row trong Google Sheets.
- **Rate Limiting**: Google Sheets có limits, cân nhắc caching.
- **Security**: Workflows không có auth, cần add trong production.
- **Performance**: Monitor execution time và optimize nếu cần.

## 🆘 Support & Resources

- [n8n Documentation](https://docs.n8n.io)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [n8n Community](https://community.n8n.io)
- [Project README](./n8n-workflows/README.md)

## ✅ Checklist

Setup complete khi bạn có thể:

- [ ] Tạo goal từ frontend → hiển thị trong Google Sheets
- [ ] Update goal progress → sync với Google Sheets
- [ ] Tạo habit và track daily → lưu vào Sheets
- [ ] Viết journal entry → lưu trong JournalEntries sheet
- [ ] Create milestone cho goal → lưu trong Milestones sheet

---

**Happy Building! 🎉**

Nếu gặp vấn đề, check troubleshooting section hoặc review n8n execution logs.