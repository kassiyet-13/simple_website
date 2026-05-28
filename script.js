const services = {
  design: {
    title: "Дизайн",
    desc: "Создаём понятные и современные интерфейсы, которые нравятся пользователям.",
  },
  dev: {
    title: "Разработка",
    desc: "Пишем чистый код на HTML, CSS и JavaScript с учётом производительности и доступности.",
  },
  support: {
    title: "Поддержка",
    desc: "Обновляем сайты, исправляем ошибки и помогаем проекту расти со временем.",
  },
};

const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
const serviceBtns = document.querySelectorAll(".service-btn");
const serviceTitle = document.getElementById("serviceTitle");
const serviceDesc = document.getElementById("serviceDesc");
const servicePanel = document.getElementById("servicePanel");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☾" : "☀";
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "dark" ? "☾" : "☀";
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

serviceBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    serviceBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const key = btn.dataset.service;
    const service = services[key];

    servicePanel.style.animation = "none";
    servicePanel.offsetHeight;
    servicePanel.style.animation = "";

    serviceTitle.textContent = service.title;
    serviceDesc.textContent = service.desc;
  });
});

function validateField(id, errorId, rules) {
  const field = document.getElementById(id);
  const errorEl = document.getElementById(errorId);
  const value = field.value.trim();
  let message = "";

  for (const rule of rules) {
    if (!rule.test(value)) {
      message = rule.message;
      break;
    }
  }

  field.classList.toggle("error", Boolean(message));
  errorEl.textContent = message;
  return !message;
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formSuccess.hidden = true;

  const nameValid = validateField("name", "nameError", [
    { test: (v) => v.length > 0, message: "Введите имя" },
    { test: (v) => v.length >= 2, message: "Минимум 2 символа" },
  ]);

  const emailValid = validateField("email", "emailError", [
    { test: (v) => v.length > 0, message: "Введите email" },
    { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: "Некорректный email" },
  ]);

  const messageValid = validateField("message", "messageError", [
    { test: (v) => v.length > 0, message: "Введите сообщение" },
    { test: (v) => v.length >= 10, message: "Минимум 10 символов" },
  ]);

  if (nameValid && emailValid && messageValid) {
    formSuccess.hidden = false;
    contactForm.reset();
    document.querySelectorAll(".error-msg").forEach((el) => (el.textContent = ""));
    document.querySelectorAll(".error").forEach((el) => el.classList.remove("error"));
  }
});

initTheme();
