/* ===== NRI Course Sales Page — logic ===== */

// Nguồn dữ liệu khóa học duy nhất. Cập nhật giá/lịch/link tại đây khi có đợt mới.
// price: giá hiển thị chính; oldPrice: giá gạch ngang (nếu có ưu đãi); null = "Liên hệ".
// form: link phiếu đăng ký chính thức. Nếu null → nút cuộn tới form "Đăng ký nhanh".
const COURSES = [
  {
    id: "co-ban", tag: "Đang tuyển sinh", name: "Dinh dưỡng Cơ bản",
    short: "Khoa Hoc Dinh Duong Co Ban",
    desc: "Nền tảng dinh dưỡng & sức khỏe: chất sinh/không sinh năng lượng, đánh giá tình trạng dinh dưỡng qua nhân trắc, xây dựng chế độ ăn hợp lý.",
    meta: ["Online qua Zoom", "3 buổi (10 tiết) · 19h–21h", "Khai giảng 08–12/09/2026 (T3–T5–T7)"],
    price: 800000,
    form: "https://forms.gle/oVYgos7U8oW7CuMY7",
    cta: "Đăng ký ngay",
  },
  {
    id: "nang-cao", tag: "Đang tuyển sinh", name: "Dinh dưỡng Nâng cao",
    short: "Khoa Hoc Dinh Duong Nang Cao",
    desc: "Hệ tiêu hóa & kém hấp thu, xây dựng thực đơn bằng Nuti Expert, dinh dưỡng cho thể thao, thai kỳ, giảm cân, trẻ em và người cao tuổi.",
    meta: ["Online qua Zoom", "7 buổi (40 tiết) · 19h–21h", "Khai giảng 15–29/09/2026 (T3–T5–T7)"],
    price: 3500000,
    form: null,
    cta: "Đăng ký / Tư vấn",
  },
  {
    id: "combo", tag: "Ưu đãi Combo", featured: true, name: "Combo Cơ bản + Nâng cao",
    short: "Combo Co Ban va Nang Cao",
    desc: "Học trọn 2 khóa Cơ bản & Nâng cao với học phí ưu đãi đặc biệt. Ưu đãi thêm khi đăng ký theo nhóm.",
    meta: ["Online qua Zoom", "10 buổi · 19h–21h", "Khai giảng tháng 09/2026",
           "Nhóm 3–5: giảm thêm 200k/người · 6–10: 300k · ≥11: 400k"],
    price: 2500000, oldPrice: 4300000, priceNote: "Tiết kiệm 1.800.000đ",
    form: "https://forms.gle/3iYRhtkkax3ipqqQ6",
    cta: "Đăng ký Combo",
  },
  {
    id: "nhi-khoa", tag: "Khóa 8 · Tháng 08", name: "Dinh dưỡng Nhi khoa",
    short: "Khoa Hoc Dinh Duong Nhi Khoa",
    desc: "Dinh dưỡng cho trẻ từ sơ sinh đến tuổi dậy thì: sữa mẹ, ăn dặm, biếng ăn, dị ứng, còi xương, suy dinh dưỡng, thừa cân béo phì, thiếu vi chất.",
    meta: ["Online qua Zoom", "9 buổi (40 tiết) · 19h–21h", "Khai giảng 11–28/08/2026 (T3–T5–T7)"],
    price: 2100000, oldPrice: 3000000, priceNote: "Ưu đãi đóng sớm",
    tiers: [
      ["Trước 10/07/2026", 2100000],
      ["10/07 – 17/07", 2400000],
      ["18/07 – 24/07", 2700000],
      ["Từ 25/07/2026", 3000000],
    ],
    form: "https://forms.gle/iG7ZLMVmRBAzUusj9",
    cta: "Đăng ký ngay",
  },
  {
    id: "thuc-don", tag: "Học trực tiếp", name: "Thực hành Xây dựng Thực đơn",
    short: "Khoa Thuc Hanh Xay Dung Thuc Don",
    desc: "Thực hành xây dựng thực đơn trực tiếp tại Viện bằng phần mềm chuyên dụng Nuti Expert.",
    meta: ["Học trực tiếp tại Viện", "Thực hành phần mềm Nuti Expert", "Lịch học: liên hệ Viện"],
    price: null,
    form: "https://docs.google.com/document/d/1H2maw5VOiw9IrgprcvLm2IgHosrVYuC9WVup1gmzHlo/edit?usp=sharing",
    cta: "Xem chi tiết",
  },
  {
    id: "benh-man-tinh", tag: "Chuyên sâu", name: "Dinh dưỡng trong Bệnh mạn tính",
    short: "Khoa Dinh Duong Benh Man Tinh",
    desc: "Vai trò dinh dưỡng trong quản lý một số bệnh mạn tính; xây dựng khẩu phần hợp lý để tư vấn bệnh nhân.",
    meta: ["Kiến thức chuyên sâu", "Xây dựng khẩu phần điều trị", "Hướng tới tư vấn lâm sàng"],
    price: null,
    form: "https://docs.google.com/forms/d/e/1FAIpQLSeS5Zm3inUd5cJ316ew6szyMlZjUuBa7IQt9WkxWWs5yAN-JA/viewform",
    cta: "Đăng ký ngay",
  },
];

// Thông tin chuyển khoản (ACB) — dùng để dựng link VietQR động.
const BANK = { bin: "970416", account: "445599888", name: "VIEN NGHIEN CUU DINH DUONG TP.HCM" };

const fmt = (n) => n == null ? "Liên hệ" : n.toLocaleString("vi-VN") + "đ";

const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
  .replace(/[^a-zA-Z0-9]+/g, " ").trim();

/* ---- Render course cards ---- */
function renderCourses() {
  const grid = document.getElementById("course-grid");
  const select = document.getElementById("course");
  if (!grid) return;

  grid.innerHTML = COURSES.map((c) => {
    const priceHtml = c.oldPrice
      ? `<span class="now">${fmt(c.price)}</span><span class="old">${fmt(c.oldPrice)}</span>`
      : `<span class="now">${fmt(c.price)}</span>`;
    const noteHtml = c.priceNote ? `<p class="price-note">${c.priceNote}</p>` : "";
    const tiersHtml = c.tiers
      ? `<ul class="tiers">${c.tiers.map((t) => `<li><span>${t[0]}</span><b>${fmt(t[1])}</b></li>`).join("")}</ul>`
      : "";
    const btn = c.form
      ? `<a href="${c.form}" target="_blank" rel="noopener" class="btn btn-primary btn-block">${c.cta}</a>`
      : `<button type="button" class="btn btn-primary btn-block" data-course="${c.id}">${c.cta}</button>`;
    return `
      <article class="course-card${c.featured ? " featured" : ""}">
        <span class="course-tag">${c.tag}</span>
        <h3>${c.name}</h3>
        <p class="desc">${c.desc}</p>
        <ul class="course-meta">${c.meta.map((m) => `<li>${m}</li>`).join("")}</ul>
        <div class="course-price">${priceHtml}</div>
        ${noteHtml}
        ${tiersHtml}
        ${btn}
      </article>`;
  }).join("");

  // Populate select in the quick-registration form
  COURSES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.price ? `${c.name} — ${fmt(c.price)}` : c.name;
    select.appendChild(opt);
  });

  // Cards without an official form scroll to the register section and preselect
  grid.querySelectorAll("[data-course]").forEach((btn) => {
    btn.addEventListener("click", () => {
      select.value = btn.dataset.course;
      select.dispatchEvent(new Event("change"));
      document.getElementById("register").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ---- Payment amount + content + QR sync ---- */
function updatePayment() {
  const select = document.getElementById("course");
  const course = COURSES.find((c) => c.id === select.value);
  const amountEl = document.getElementById("pay-amount");
  const contentEl = document.getElementById("pay-content");
  const qrImg = document.getElementById("qr-img");
  const name = (document.getElementById("fullname").value || "").trim();

  const price = course ? course.price : null;
  amountEl.textContent = course ? (price ? fmt(price) : "Liên hệ Viện") : "—";

  const content = course ? `${slug(name) || "Ho ten"}_${course.short}` : "Họ tên_Tên khóa";
  contentEl.textContent = content;

  // Rebuild VietQR link with amount + transfer content
  if (qrImg) {
    const params = new URLSearchParams({ accountName: BANK.name });
    if (price) params.set("amount", String(price));
    params.set("addInfo", content);
    qrImg.src = `https://img.vietqr.io/image/${BANK.bin}-${BANK.account}-compact2.png?${params.toString()}`;
  }
}

/* ---- Payment picker: keep QR in sync while typing ---- */
function setupPayPicker() {
  ["change", "input"].forEach((ev) => {
    document.getElementById("course").addEventListener(ev, updatePayment);
    document.getElementById("fullname").addEventListener(ev, updatePayment);
  });
}

/* ---- QR fallback (e.g. offline preview where external images are blocked) ---- */
function setupQrFallback() {
  const img = document.getElementById("qr-img");
  const fb = document.getElementById("qr-fallback");
  if (!img || !fb) return;
  img.addEventListener("error", () => { img.style.display = "none"; fb.style.display = "block"; });
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupPayPicker();
  setupQrFallback();
  updatePayment();
  document.getElementById("year").textContent = new Date().getFullYear();
});
