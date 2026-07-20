# Trang bán khóa học – Viện Nghiên cứu Dinh dưỡng TP.HCM (NRI)

Trang tĩnh (HTML/CSS/JS) để giới thiệu khóa học, cho học viên **xem thông tin – đăng ký – thanh toán (QR/chuyển khoản)** và **kết nối Zalo OA** của Viện.

## Cấu trúc

```
nri-course-sales/
├── index.html          # Toàn bộ nội dung trang
└── assets/
    ├── styles.css      # Giao diện
    └── script.js       # Dữ liệu khóa học + xử lý form/thanh toán
```

## Chạy thử

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy server tĩnh:

```bash
cd nri-course-sales
python3 -m http.server 8080   # rồi mở http://localhost:8080
```

## Deploy bằng GitHub Pages

1. Vào **Settings → Pages** của repository.
2. Chọn nhánh chứa trang, thư mục `/` (root) hoặc `/docs`.
3. Truy cập theo đường dẫn `.../nri-course-sales/`.

## ⚠️ Cần cập nhật trước khi công bố (đang là placeholder)

| Vị trí | File | Nội dung cần thay |
|---|---|---|
| Nút "Kết nối Zalo OA" | `index.html` (`#zalo-btn`) | Thay `href="#"` bằng link Zalo OA thật, vd `https://zalo.me/<oa_id>` |
| Thông tin ngân hàng | `index.html` (khối `.bank-info`) | Tên ngân hàng, chủ tài khoản, **số tài khoản** thật |
| Mã QR thanh toán | `index.html` (`.qr-placeholder`) | Thay bằng `<img>` QR VietQR, vd `https://img.vietqr.io/image/<BANK>-<SOTK>-compact2.png` |
| Học phí / lịch học | `assets/script.js` (mảng `COURSES`) | Cập nhật `price`, `salePrice`, `meta` theo đợt chiêu sinh mới |

## Ghi chú

- Thông tin khóa học được tổng hợp từ website Viện (viendinhduongtphcm.org) và có thể thay đổi theo từng đợt — hãy đối chiếu lại trước khi công bố.
- Form đăng ký hiện xử lý phía client (hiện hướng dẫn thanh toán sau khi gửi). Nếu cần **lưu đơn đăng ký tự động**, có thể nối form với Google Form/Sheet, Formspree hoặc một backend — cho mình biết nếu bạn muốn làm bước này.
