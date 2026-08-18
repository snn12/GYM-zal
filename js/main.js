"use strict";

/* ---------------- Mobile menu ---------------- */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

function closeMenu() {
  nav.classList.remove("open");
  burger.classList.remove("active");
  burger.setAttribute("aria-expanded", "false");
}

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.classList.toggle("active", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* ---------------- Header on scroll + scroll-spy ---------------- */

const header = document.getElementById("header");
const navLinks = nav.querySelectorAll(".nav__link");

function updateActiveLink() {
  let current = document.getElementById("hero");
  const probe = window.scrollY + header.offsetHeight + 100;

  document.querySelectorAll("main section[id]").forEach((section) => {
    if (section.offsetTop <= probe) {
      current = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current.id
    );
  });
}

function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 30);
  updateActiveLink();
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------------- Scroll reveal ---------------- */

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* ---------------- Animated counters ---------------- */

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("en-US");
    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const counters = document.querySelectorAll(".stat__num");

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => counterObserver.observe(el));
} else {
  counters.forEach((el) => {
    el.textContent = parseInt(el.dataset.count, 10).toLocaleString("en-US");
  });
}

/* ---------------- Image fallback (offline-safe) ---------------- */

const fallbackImg =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>" +
      "<rect width='100%' height='100%' fill='#111'/>" +
      "<circle cx='50%' cy='40%' r='130' fill='#FFD21F' opacity='0.14'/>" +
      "<text x='50%' y='56%' fill='#FFD21F' font-family='Arial' font-size='44' font-weight='bold' text-anchor='middle' letter-spacing='8'>LION GYM</text>" +
      "</svg>"
  );

document.querySelectorAll("img").forEach((img) => {
  img.addEventListener(
    "error",
    function handler() {
      img.removeEventListener("error", handler);
      img.src = fallbackImg;
    },
    { once: true }
  );
});

/* ---------------- Contact form ---------------- */

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  statusEl.classList.remove("success", "error");
  statusEl.textContent = "";

  if (!name || !email || !message) {
    statusEl.classList.add("error");
    statusEl.textContent = "Zəhmət olmasa, bütün məcburi sahələri doldurun.";
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    statusEl.classList.add("error");
    statusEl.textContent = "Zəhmət olmasa, düzgün e-mail ünvanı daxil edin.";
    return;
  }

  statusEl.classList.add("success");
  statusEl.textContent = "✓ Təşəkkürlər! Mesajınız göndərildi.";
  form.reset();
});

/* ---------------- Footer year ---------------- */

document.getElementById("year").textContent = new Date().getFullYear();