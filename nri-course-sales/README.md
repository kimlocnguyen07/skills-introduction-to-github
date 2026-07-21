# Trang bán khóa học – Viện Nghiên cứu Dinh dưỡng TP.HCM (NRI)

Trang tĩnh (HTML/CSS/JS) để giới thiệu khóa học, cho học viên **xem thông tin – đăng ký – thanh toán (QR ACB / chuyển khoản)** và **kết nối Zalo OA** của Viện. Màu sắc theo logo Viện (xanh dương `#0E5B9C` + cam `#E8551F`).

## Cấu trúc

```
nri-course-sales/
├── index.html          # Toàn bộ nội dung trang (logo NRI dựng bằng SVG)
└── assets/
    ├── styles.css      # Giao diện
    └── script.js       # Dữ liệu khóa học + link đăng ký + logic thanh toán/QR
```

## Chạy thử

```bash
cd nri-course-sales
python3 -m http.server 8080   # rồi mở http://localhost:8080
```

## Nội dung đã cập nhật (từ tài liệu Viện cung cấp)

- **6 khóa:** Dinh dưỡng Cơ bản (800k), Nâng cao (3,5tr), **Combo ưu đãi 2,5tr**, Nhi khoa (đóng sớm từ 2,1tr), Thực hành Thực đơn (tại Viện), Bệnh mạn tính.
- **Link đăng ký chính thức** (Google Form) gắn cho từng khóa.
- **Thanh toán:** ACB · STK `445599888` · VIỆN NGHIÊN CỨU DINH DƯỠNG TP.HCM. Mã QR VietQR tự sinh động theo số tiền + nội dung chuyển khoản.
- **Zalo OA:** https://zalo.me/4273635035669797437
- **Liên hệ:** Hotline (028) 39 700 886 · viendinhduong@nrihcm.vn · Số J4, Đường Bửu Long, P. Hòa Hưng, TP.HCM.

## Hình ảnh

- `assets/logo.png` — logo chính thức của Viện (header).
- `assets/team.webp` — ảnh đội ngũ chuyên gia (hero), đã tối ưu từ ảnh gốc 1,7MB xuống ~97KB.

## Ghi chú

- Mã QR dùng dịch vụ `img.vietqr.io`. Khi mở bằng file local hoặc trong bản xem trước có chặn ảnh ngoài, QR sẽ ẩn và hiện dòng hướng dẫn chuyển khoản thay thế — khi deploy trực tuyến (GitHub Pages…) QR hiển thị bình thường.
- Học phí Nhi khoa có 4 mốc ưu đãi đóng sớm (hiển thị trong thẻ khóa học). Cập nhật giá/lịch trong mảng `COURSES` ở `assets/script.js` khi có đợt chiêu sinh mới.
- **Form "Đăng ký nhanh" là Google Form của Viện nhúng trực tiếp** (iframe) — đơn tự lưu vào Google Sheet liên kết và có thể bật email thông báo trong tab "Câu trả lời" của form. Khung thanh toán bên cạnh có ô chọn khóa + họ tên để mã QR tự điền đúng số tiền và nội dung chuyển khoản. Lưu ý: iframe Google có thể không hiển thị trong bản preview trên claude.ai (bị chặn nhúng ngoài) — trên website thật hoạt động bình thường; đã có link dự phòng "Mở phiếu trong tab mới".
