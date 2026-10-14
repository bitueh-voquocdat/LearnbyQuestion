# Learn by Question

Ứng dụng tự học theo câu hỏi, giao diện tiếng Việt, tối giản, thao tác qua popup.

## Chạy trên máy

Cài Node.js 20 trở lên. Mở terminal trong thư mục dự án:

```sh
npm run dev
```

Mở http://localhost:3000. Không mở index.html bằng cách nhấp đúp vì ứng dụng dùng JavaScript modules. Không cần cài thư viện; dự án không có dependency ngoài.

## Xuất bản trên Vercel

1. Giải nén dự án, đưa toàn bộ **nội dung thư mục learn-by-question** lên một repository GitHub.
2. Trong Vercel chọn **Add New → Project**, import repository đó.
3. Nếu repository chứa thư mục con `learn-by-question`, chọn thư mục đó làm **Root Directory**. Nếu package.json nằm ngay gốc repository thì giữ nguyên.
4. **Framework Preset: Other**. Cấu hình đã có trong `vercel.json`: Build Command `npm run build`; Output Directory `dist`. Không cần biến môi trường.
5. Chọn **Deploy**. Mở URL Vercel trả về.

Hoặc từ terminal trong thư mục dự án, nếu đã cài Vercel CLI và đăng nhập tài khoản:

```sh
vercel --prod
```

Dự án này chưa được xuất bản lên tài khoản Vercel trong phiên tạo mã nguồn.

Tham khảo tài liệu chính thức: https://vercel.com/docs/builds/configure-a-build và https://vercel.com/docs/project-configuration/vercel-json

## Luồng sử dụng

- Tạo bộ: tên, chủ đề, màu nhận diện.
- Thêm một câu: câu hỏi, đáp án, gợi ý tùy chọn. **Lưu & thêm tiếp** hoặc **Ctrl/⌘ + Enter** giúp nhập liên tục.
- Nhập nhanh: dán từ hai/ba cột Excel hoặc mỗi dòng `Câu hỏi || Đáp án || Gợi ý`. Gợi ý không bắt buộc. Dấu `||` và tab là dấu phân cách, không dùng trong nội dung của định dạng nhập nhanh. Nội dung nhiều dòng: dùng cửa sổ thêm/sửa từng câu hoặc sao lưu JSON.
- Xem trước dữ liệu, báo số dòng lỗi, tùy chọn bỏ qua câu hỏi trùng (không phân biệt hoa/thường, bỏ khoảng trắng đầu/cuối).
- Ôn: chọn tất cả/đến hạn/sai gần nhất/đánh dấu; chọn giới hạn 10, 20, 50 hoặc tất cả; trộn thứ tự tùy chọn.
- Hiện câu hỏi → nhập câu trả lời (tùy chọn) → mở gợi ý nếu cần → xem đáp án → tự chọn **Đúng / Chưa đúng**.
- Có thể xem đáp án ngay mà không nhập câu trả lời. Không có chấm điểm ngữ nghĩa bằng AI.
- Sau khi hiện đáp án, phím **1** = chưa đúng, **2** = đúng khi con trỏ ở ngoài ô nhập. Ctrl/⌘ + Enter mở đáp án.
- Cuối phiên: kết quả, thời lượng, nút ôn lại những câu sai.
- Quản lý: sửa, xóa có xác nhận, tìm kiếm, lọc, nhân bản bộ, đánh dấu sao, đặt lại tiến độ, xuất từng bộ/toàn bộ.
- Thống kê: số lượt, tỷ lệ tự đánh giá đúng, câu nắm vững, hoạt động 7 ngày.
- Sáng/tối, thiết kế responsive, modal dùng dialog native và hỗ trợ Escape.

## Cách tính lịch ôn

Đúng liên tiếp: lần 1 sau 1 ngày, lần 2 sau 3 ngày, lần 3 sau 7 ngày, tiếp theo 14, 30, tối đa 60 ngày. Sai: đặt chuỗi đúng về 0 và ôn lại sau 10 phút. Bạn vẫn có thể ôn lại câu sai ngay sau phiên. Từ 3 lần đúng liên tiếp được gắn trạng thái “Đã nắm vững”. Đây là lịch đơn giản, không phải thuật toán FSRS.

“Cần ôn lại” dựa trên lần trả lời gần nhất. Số liệu thống kê là **lượt tự đánh giá**, không phải số câu duy nhất. Các phiên chưa hoàn thành vẫn giữ kết quả những câu đã đánh giá; câu trả lời đang gõ và vị trí phiên chưa được lưu sau khi tải lại trang.

## Lưu dữ liệu và sao lưu

- Dữ liệu và giao diện lưu bằng localStorage của trình duyệt, khóa `lbq.v1`.
- **Chưa có tài khoản, backend hoặc đồng bộ nhiều thiết bị.** Vercel chỉ phục vụ mã ứng dụng; nội dung bộ câu hỏi không tự gửi lên máy chủ.
- Địa chỉ Preview, Production và tên miền riêng là các vùng lưu trữ độc lập. Hãy xuất JSON rồi nhập ở địa chỉ mới khi chuyển domain.
- Xóa dữ liệu website, dùng trình duyệt/thiết bị khác hoặc chế độ ẩn danh có thể làm dữ liệu không còn khả dụng. Nên xuất sao lưu định kỳ.
- Xuất toàn bộ chứa bộ câu hỏi, tiến độ, lịch sử và theme. **Nhập JSON chỉ thêm các bộ và tiến độ từng câu**, cấp ID mới, không nhập lịch sử tổng hợp/theme và không ghi đè bộ hiện có. Nhập cùng file nhiều lần sẽ tạo nhiều bản sao.
- Giới hạn nhập: 20 MB, tối đa 500 bộ và 30.000 câu mỗi file. localStorage thực tế thường nhỏ hơn mức này; ứng dụng thông báo nếu hết dung lượng. Khi đó xuất sao lưu trước khi đóng tab.
- Lịch sử giữ tối đa 30.000 lượt. Thống kê phản ánh phần lịch sử còn lưu.
- Tránh sửa đồng thời ở nhiều tab. Khi phát hiện tab khác thay đổi, ứng dụng chặn ghi tiếp và yêu cầu tải lại để tránh ghi đè âm thầm.
- Không có API key hoặc thông tin đăng nhập trong mã nguồn.

## Cấu trúc

```text
public/
  index.html        Khung ứng dụng
  style.css         Giao diện responsive sáng/tối
  app.mjs           UI, bộ câu hỏi, phiên ôn, lưu trữ
  core.mjs          Parser, lịch ôn, kiểm tra dữ liệu, trộn câu
  icon.svg          Biểu tượng
scripts/
  build.mjs         Tạo dist/ từ public/
  serve.mjs         Máy chủ phát triển local
 tests/
  core.test.mjs     Kiểm thử logic
package.json
vercel.json
```

## Kiểm tra

```sh
npm test
npm run build
node --check public/app.mjs
```

Đã chạy đạt 6 kiểm thử logic và build. Chưa kiểm thử bằng trình duyệt tự động hoặc xác nhận trên thiết bị thật trong môi trường tạo dự án.

Checklist kiểm tra trước khi dùng chính thức: tạo bộ → nhập 3 câu → sửa một câu → ôn đúng/sai → ôn lại câu sai → xuất JSON → nhập lại → tải lại trang kiểm tra dữ liệu → kiểm tra trên điện thoại.

## Hướng phát triển đề xuất

1. **Đồng bộ tài khoản**: Firebase hoặc Supabase, có đăng nhập và quyền truy cập theo người dùng; không dùng kho dữ liệu công khai không xác thực.
2. **Gợi ý nhiều tầng**: từ gợi ý khái niệm đến từng bước giải, theo dõi số gợi ý đã dùng.
3. **Chuỗi câu hỏi gợi mở**: định nghĩa → vì sao → ví dụ → phản ví dụ → vận dụng.
4. **Math/LaTeX và ảnh**: phù hợp bộ câu hỏi Toán, bảo toàn công thức khi xuất/nhập.
5. **Chấm hỗ trợ**: so khớp từ khóa hoặc AI gợi ý phần còn thiếu; người học vẫn quyết định kết quả cuối.
6. **Tiếp tục phiên dang dở**, hoàn tác lần đánh giá gần nhất, câu hỏi liên kết và bộ chia sẻ chỉ đọc.
7. **Ôn thích nghi FSRS**, nhắc học và mục tiêu ngày khi đã có dữ liệu đủ để cá nhân hóa.

Các mục trên là đề xuất tiếp theo, chưa được triển khai trong bản 1.0.
