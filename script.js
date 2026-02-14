"use strict";

// =========================
// Page Entrance + Exit Transitions
// =========================
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
  });
});

const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    if (!target) return;

    document.body.classList.add("is-exiting");
    setTimeout(() => {
      window.location.href = target;
    }, 460);
  });
});

// =========================
// Floating Heart Generator
// =========================
function initHearts() {
  if (!document.body.classList.contains("has-hearts")) return;

  const heartCount = Number(document.body.dataset.hearts) || 14;
  const field = document.createElement("div");
  field.className = "heart-field";
  field.setAttribute("aria-hidden", "true");

  for (let i = 0; i < heartCount; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "💗";

    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 8;
    const delay = Math.random() * 8;
    const size = 0.85 + Math.random() * 1.1;

    heart.style.left = `${left}%`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;
    heart.style.fontSize = `${size}rem`;
    field.appendChild(heart);
  }

  document.body.appendChild(field);
}

// =========================
// Reveal-on-Scroll Animation
// =========================
function initReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

initHearts();
initReveal();
