# Personal Dashboard Pro - Vision & Guide
## 1. Sứ Mệnh (Mission)
> **"Sống có mục đích, giảm tải tiếng nói trong đầu."**
Ứng dụng này không chỉ là một công cụ To-Do list. Nó là một **Hệ điều hành cá nhân (Personal OS)** giúp bạn:
*   **Ghi nhớ mục tiêu**: Không để những giấc mơ bị trôi vào quên lãng giữa bộn bề công việc.
*   **Bộ não thứ 2 (Second Brain)**: Nơi lưu trữ mọi ý tưởng, lo lắng, và nhiệm vụ để giải phóng não bộ cho việc tư duy sáng tạo.
*   **Giảm Stress**: Khi mọi thứ đã được ghi lại và sắp xếp, bạn sẽ không còn lo lắng về việc "quên một cái gì đó".
## 2. Tại sao phải dùng ứng dụng này?
### Nếu KHÔNG dùng:
*   **Quá tải nhận thức**: Bạn luôn phải nhớ "chiều nay ăn gì", "deadline ngày mai", "ý tưởng vừa nảy ra". Não bộ bị quá tải, dẫn đến stress và kiệt sức (burnout).
*   **Mất phương hướng**: Bạn làm việc chăm chỉ nhưng không biết mình đang tiến về đâu. Một năm trôi qua và bạn thấy mình dậm chân tại chỗ.
*   **Rời rạc**: Dữ liệu nằm rải rác: Note trên điện thoại, sổ tay, Google Calendar, Excel... không có cái nhìn tổng quan.
### Khi CÓ ứng dụng (Hiệu quả mang lại):
*   **Tâm trí thảnh thơi**: Bạn tin tưởng rằng mọi thứ quan trọng đã được lưu trữ an toàn.
*   **Tập trung tối đa**: Khi làm việc, bạn chỉ nhìn thấy những gì cần làm NGAY LÚC ĐÓ (Focus Mode).
*   **Tiến bộ đo lường được**: Nhìn thấy các thanh kỹ năng tăng lên, streak thói quen dài ra tạo động lực dopamine lành mạnh.
## 3. Hướng dẫn sử dụng hiệu quả (Best Practices)
### Nguyên tắc cốt lõi: "Giữ mọi thứ đơn giản (Keep It Simple)"
Đừng cố gắng theo dõi *mọi thứ*. Chỉ theo dõi những gì *quan trọng*.
### Quy trình hàng ngày (Daily Workflow):
1.  **Sáng (5 phút)**:
    *   Mở App (hoặc Widget trên điện thoại).
    *   Check mục tiêu ngày hôm nay.
    *   Cam kết thực hiện 1-3 việc quan trọng nhất (The Big 3).
2.  **Trong ngày**:
    *   Dùng **Focus Mode** khi làm việc sâu.
    *   Có ý tưởng/lo lắng? Mở **Quick Add** (hoặc chat với AI Bot) để "dump" nó vào Inbox ngay lập tức. Đừng để nó chiếm dụng RAM trong não.
3.  **Tối (5 phút)**:
    *   Tick hoàn thành các thói quen (Habits).
    *   Viết nhật ký nhanh (Journal): 1 điều biết ơn, 1 bài học rút ra.
    *   Review lại ngày mai.
### Tối ưu cho Điện thoại & Công việc
*   **Mobile First**: Giao diện được thiết kế để thao tác bằng 1 tay. Các nút bấm to, rõ ràng.
*   **Không cần mở máy tính**: Dữ liệu đồng bộ qua Google Sheets. Khi đang đi đường, bạn có thể dùng App trên điện thoại hoặc thậm chí nhắn tin qua Telegram (nếu tích hợp n8n sau này) để log dữ liệu.
*   **Offline Mode**: App sẽ hỗ trợ lưu local khi mất mạng và sync lại khi có kết nối.
## 4. Kiến trúc kỹ thuật (Technical Philosophy)
*   **Frontend**: React/Vite (Nhanh, mượt, PWA có thể cài lên điện thoại).
*   **Backend**: Không có Backend phức tạp. Sử dụng **n8n** làm "Keo dính" (Glue).
*   **Database**: **Google Sheets**.
    *   *Tại sao?* Vì nó đơn giản, miễn phí, dễ chỉnh sửa thủ công, và bạn sở hữu dữ liệu của mình 100%.
    *   Dễ dàng xuất báo cáo, vẽ biểu đồ tùy chỉnh mà không cần code.
---
> **Lời nhắc**: Công cụ chỉ là phương tiện. Kỷ luật và sự rõ ràng trong tư duy mới là đích đến. Hãy để ứng dụng này là người trợ lý tận tụy, không phải là ông chủ khó tính.