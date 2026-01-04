<div align="center">

# 🌟 Alex OS - Hệ điều hành cá nhân

### *Hệ thống quản lý mục tiêu, thói quen và phát triển cá nhân*

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini AI](https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

</div>

---

## 📸 Giao diện

<div align="center">
<img src="./public/assets/screenshot.png" alt="Alex OS Screenshot" width="800"/>
</div>

---

## ✨ Tính năng chính

| 🎯 **Mục tiêu** | 📝 **Thói quen** | 📔 **Nhật ký** |
|:---:|:---:|:---:|
| Quản lý mục tiêu theo từng giai đoạn với milestone rõ ràng | Theo dõi và xây dựng thói quen hàng ngày | Ghi chép suy nghĩ, cảm xúc và học hỏi mỗi ngày |

| 📊 **Bảng tin** | 📬 **Hộp thư** | 🎯 **Tập trung** |
|:---:|:---:|:---:|
| Dashboard tổng quan với các ưu tiên hàng ngày | Quản lý tasks và công việc đến hạn | Chế độ tập trung để làm việc hiệu quả |

---

## 🚀 Cài đặt và Chạy

### Yêu cầu hệ thống
- **Node.js** (phiên bản 18 trở lên)
- **npm** hoặc **yarn**

### Các bước cài đặt

```bash
# 1. Clone repository
git clone <repository-url>
cd bovanav2

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình API key
# Mở file .env.local và thêm Gemini API key của bạn
GEMINI_API_KEY=your_api_key_here

# 4. Chạy ứng dụng
npm run dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

---

## 🛠️ Công nghệ sử dụng

- ⚛️ **React 19** - UI Framework
- 📘 **TypeScript** - Ngôn ngữ lập trình
- ⚡ **Vite** - Build tool nhanh
- 🤖 **Gemini AI** - Trợ lý AI thông minh
- 🎨 **Lucide Icons** - Icon đẹp và nhất quán
- 📱 **PWA Ready** - Hỗ trợ cài đặt như app native
- 🔗 **n8n + Google Sheets** - Backend API (tùy chọn)

---

## ☁️ Tích hợp Backend (Tùy chọn)

Ứng dụng hỗ trợ 2 chế độ lưu trữ:

### 1. LocalStorage (Mặc định)
- Dữ liệu lưu trực tiếp trong browser
- Không cần cấu hình backend
- Phù hợp cho sử dụng cá nhân trên 1 thiết bị

### 2. Google Sheets + n8n
- Đồng bộ dữ liệu lên cloud
- Dễ dàng xem/chỉnh sửa data thủ công
- Xem hướng dẫn chi tiết: [`n8n-workflows/README.md`](./n8n-workflows/README.md)

**Cấu hình:**
```bash
# Copy file .env.example thành .env
cp .env.example .env

# Chỉnh sửa các biến môi trường
VITE_USE_LOCAL_STORAGE=false  # Bật chế độ API
VITE_API_GOALS_URL=https://your-n8n.com/webhook/goals
VITE_API_HABITS_URL=https://your-n8n.com/webhook/habits
VITE_API_JOURNAL_URL=https://your-n8n.com/webhook/journal
VITE_API_MILESTONES_URL=https://your-n8n.com/webhook/milestones
```

---

## 📁 Cấu trúc dự án

```
bovanav2/
├── components/          # React components
│   ├── views/          # Các view chính (Goals, Habits, Journal, ...)
│   ├── TaskModal.tsx   # Modal quản lý task
│   └── ...
├── context/            # React context (quản lý state)
├── services/           # API services
├── public/             # Static assets
├── types.ts            # TypeScript interfaces
└── App.tsx             # Main app component
```

---

## 🔗 Links

- 📖 [Hướng dẫn cài đặt chi tiết](./SETUP_GUIDE.md)
- 🎨 [View trên AI Studio](https://ai.studio/apps/drive/14pihR3uMV8PxdavTVFYJP6paRu2QHlPA)

---

<div align="center">

### Made with ❤️ by Alex

**© 2025 Alex OS - Personal Operating System**

</div>
