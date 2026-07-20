/* ===== NRI Course Sales Page — logic ===== */

// Nguồn dữ liệu khóa học duy nhất. Cập nhật giá/lịch tại đây khi có đợt mới.
const COURSES = [
  {
    id: "co-ban",
    tag: "Cơ bản",
    name: "Dinh dưỡng Cơ bản",
    desc: "Nền tảng dinh dưỡng: tính nhu cầu năng lượng cá nhân và lựa chọn phương pháp dinh dưỡng phù hợp.",
    meta: ["Trực tuyến qua Zoom", "10 tiết • tối T3–T5–T7 (19h–21h)", "Có bài kiểm tra cuối khóa"],
    price: 800000,
  },
  {
    id: "nhi-khoa",
    tag: "Phổ biến",
    name: "Dinh dưỡng Nhi khoa",
    desc: "Kiến thức chuẩn y khoa: sữa mẹ, ăn dặm, biếng ăn, dị ứng thực phẩm, thiếu vi chất, thừa cân béo phì.",
    meta: ["Trực tuyến qua Zoom", "9 buổi • tối T3–T5–T7 (19h–21h)", "Dành cho phụ huynh & người ngành y"],
    price: 3000000,
    oldPrice: 3000000,
    salePrice: 2500000,
  },
  {
    id: "thuc-hanh-tu-van",
    tag: "Thực hành",
    name: "Thực hành Tư vấn Dinh dưỡng",
    desc: "Rèn kỹ năng tư vấn dinh dưỡng và xây dựng thực đơn cho từng đối tượng qua tình huống thực tế.",
    meta: ["Thực hành có hướng dẫn", "Kỹ năng tư vấn 1–1", "Xây dựng thực đơn cá nhân hóa"],
    price: 3000000,
  },
  {
    id: "thiet-ke-thuc-don",
    tag: "Kỹ năng",
    name: "Thiết kế Thực đơn (phần mềm chuyên dụng)",
    desc: "Thực hành xây dựng thực đơn bằng phần mềm chuyên dụng, tối ưu khẩu phần theo nhu cầu dinh dưỡng.",
    meta: ["Thực hành trên phần mềm", "Cân đối khẩu phần khoa học", "Ứng dụng cho bếp ăn & phòng khám"],
    price: null,
  },
  {
    id: "benh-man-tinh",
    tag: "Chuyên sâu",
    name: "Dinh dưỡng trong Bệnh mạn tính",
    desc: "Vai trò dinh dưỡng trong quản lý bệnh mạn tính; xây dựng khẩu phần hợp lý để tư vấn bệnh nhân.",
    meta: ["Kiến thức chuyên sâu", "Xây dựng khẩu phần điều trị", "Hướng tới tư vấn lâm sàng"],
    price: 3500000,
  },
  {
    id: "dinh-duong-suc-khoe",
    tag: "Cộng đồng",
    name: "Dinh dưỡng & Sức khỏe",
    desc: "Kiến thức dinh dưỡng ứng dụng cho đời sống, nâng cao sức khỏe cho bản thân và gia đình.",
    meta: ["Phù hợp mọi đối tượng", "Kiến thức thực tiễn", "Học linh hoạt"],
    price: null,
  },
];

const fmt = (n) => n == null ? "Liên hệ" : n.toLocaleString("vi-VN") + "đ";

/* ---- Render course cards ---- */
function renderCourses() {
  const grid = document.getElementById("course-grid");
  const select = document.getElementById("course");
  if (!grid) return;

  grid.innerHTML = COURSES.map((c) => {
    const priceHtml = c.salePrice
      ? `<span class="now">${fmt(c.salePrice)}</span><span class="old">${fmt(c.oldPrice)}</span>`
      : `<span class="now">${fmt(c.price)}</span>`;
    return `
      <article class="course-card">
        <span class="course-tag">${c.tag}</span>
        <h3>${c.name}</h3>
        <p class="desc">${c.desc}</p>
        <ul class="course-meta">${c.meta.map((m) => `<li>${m}</li>`).join("")}</ul>
        <div class="course-price">${priceHtml}</div>
        <button type="button" class="btn btn-primary btn-block" data-course="${c.id}">Đăng ký</button>
      </article>`;
  }).join("");

  // Populate select
  COURSES.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c.id;
    const p = c.salePrice || c.price;
    opt.textContent = `${c.name}${p ? " — " + fmt(p) : ""}`;
    select.appendChild(opt);
  });

  // "Đăng ký" on cards -> select + scroll to form
  grid.querySelectorAll("[data-course]").forEach((btn) => {
    btn.addEventListener("click", () => {
      select.value = btn.dataset.course;
      select.dispatchEvent(new Event("change"));
      document.getElementById("register").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ---- Payment amount + content sync ---- */
function updatePayment() {
  const select = document.getElementById("course");
  const course = COURSES.find((c) => c.id === select.value);
  const amountEl = document.getElementById("pay-amount");
  const contentEl = document.getElementById("pay-content");
  const name = (document.getElementById("fullname").value || "HOTEN").trim();
  const phone = (document.getElementById("phone").value || "SODT").trim();

  if (course) {
    const price = course.salePrice || course.price;
    amountEl.textContent = price ? fmt(price) : "Liên hệ Viện";
  } else {
    amountEl.textContent = "—";
  }

  const slug = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9]+/g, "").toUpperCase().slice(0, 20);
  const courseCode = course ? course.id.replace(/-/g, "").toUpperCase().slice(0, 10) : "TENKHOA";
  contentEl.textContent = `${slug(name)}_${slug(phone)}_${courseCode}`;
}

/* ---- Form validation + submit ---- */
function setupForm() {
  const form = document.getElementById("register-form");
  const select = document.getElementById("course");
  ["change", "input"].forEach((ev) => {
    select.addEventListener(ev, updatePayment);
    document.getElementById("fullname").addEventListener(ev, updatePayment);
    document.getElementById("phone").addEventListener(ev, updatePayment);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    ["fullname", "phone", "course"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el.value.trim()) { el.classList.add("invalid"); ok = false; }
      else el.classList.remove("invalid");
    });
    if (!ok) return;

    const course = COURSES.find((c) => c.id === select.value);
    const price = course.salePrice || course.price;
    updatePayment();

    const msg = document.getElementById("modal-msg");
    msg.innerHTML = `Cảm ơn <strong>${document.getElementById("fullname").value.trim()}</strong> đã đăng ký khóa
      <strong>“${course.name}”</strong>${price ? ` (${fmt(price)})` : ""}.`;
    openModal();
  });
}

/* ---- Modal ---- */
function openModal() { document.getElementById("modal").hidden = false; }
function closeModal() { document.getElementById("modal").hidden = true; }
function setupModal() {
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-pay").addEventListener("click", () => {
    closeModal();
    document.getElementById("payment").scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("modal").addEventListener("click", (e) => {
    if (e.target.id === "modal") closeModal();
  });
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  setupForm();
  setupModal();
  updatePayment();
  document.getElementById("year").textContent = new Date().getFullYear();
});
