const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  window.setTimeout(() => loader.classList.add("hide"), 1800);
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
const header = document.querySelector(".header");

menuButton.addEventListener("click", () => {
  const opened = navigation.classList.toggle("open");
  menuButton.classList.toggle("active", opened);
  menuButton.setAttribute("aria-expanded", String(opened));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

/* Barra fina que acompanha o progresso da página */
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

/* Distribui movimentos diferentes entre os elementos, mantendo o mesmo estilo */
document.querySelectorAll(".about-grid > div:first-child, .section-head > div, .process .section-head > div").forEach((element) => {
  element.classList.add("reveal-left");
});

document.querySelectorAll(".about-copy, .section-head > p").forEach((element) => {
  element.classList.add("reveal-right");
});

document.querySelectorAll(".service-card, .step, .stats > div").forEach((element, index) => {
  element.classList.add("reveal-scale");
  element.style.transitionDelay = `${(index % 4) * 90}ms`;
});

/* Revelação suave conforme cada conteúdo entra na tela */
const observer = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      currentObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: "0px 0px -35px 0px"
});

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

/* Atualizações leves durante o scroll */
let scrollTicking = false;

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

  progressBar.style.transform = `scaleX(${progress})`;
  header.classList.toggle("scrolled", scrollTop > 35);

  const heroGrid = document.querySelector(".hero-grid");
  const heroLight = document.querySelector(".hero-light");

  if (scrollTop < window.innerHeight && heroGrid && heroLight) {
    heroGrid.style.transform = `translate3d(0, ${scrollTop * 0.12}px, 0)`;
    heroLight.style.transform = `translate3d(0, ${scrollTop * 0.08}px, 0)`;
  }

  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollEffects);
    scrollTicking = true;
  }
}, { passive: true });

updateScrollEffects();
document.getElementById("year").textContent = new Date().getFullYear();


/* =====================================
   NOTAS MUSICAIS DURANTE A ROLAGEM
===================================== */

const musicalNotes = ["♪", "♫", "♬"];

let lastMusicalNote = 0;

window.addEventListener("scroll", () => {

    const now = Date.now();

    if (now - lastMusicalNote < 1200) {
        return;
    }

    lastMusicalNote = now;

    const note = document.createElement("span");

    note.className = "floating-music-note";

    note.textContent =
        musicalNotes[
            Math.floor(Math.random() * musicalNotes.length)
        ];

    note.style.left = (15 + Math.random() * 70) + "vw";
    note.style.top = (55 + Math.random() * 25) + "vh";

    document.body.appendChild(note);

    setTimeout(() => {
        note.remove();
    }, 2500);

}, { passive: true });
