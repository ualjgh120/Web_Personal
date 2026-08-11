/* =========================================================
   JUAN GONZALEZ HARO — PERSONAL PORTFOLIO
   Interacciones · Responsive · Animaciones
   ========================================================= */


/* ---------- ELEMENTOS PRINCIPALES ---------- */

const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");
const progress = document.getElementById("progress");


/* =========================================================
   MODO CLARO / OSCURO
   ========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
}

function updateThemeButton() {
  if (!themeBtn) return;

  const isDark = body.classList.contains("dark");

  themeBtn.setAttribute("aria-label", isDark ? "Activar modo claro" : "Activar modo oscuro");
  themeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
}

updateThemeButton();

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    localStorage.setItem(
      "portfolio-theme",
      isDark ? "dark" : "light"
    );

    updateThemeButton();
  });
}


/* =========================================================
   MENÚ MÓVIL / TABLET
   ========================================================= */

function closeMenu() {
  if (!nav) return;

  nav.classList.remove("open");

  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

function toggleMenu() {
  if (!nav) return;

  const isOpen = nav.classList.toggle("open");

  if (menuBtn) {
    menuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  }
}

if (menuBtn && nav) {

  menuBtn.setAttribute("aria-expanded", "false");

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu();
  });

}


/* ---------- CERRAR AL PULSAR UN ENLACE ---------- */

document.querySelectorAll(".nav-links a").forEach((link) => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});


/* ---------- CERRAR AL PULSAR FUERA DEL MENÚ ---------- */

document.addEventListener("click", (event) => {

  if (!nav || !nav.classList.contains("open")) return;

  const clickedInsideNav = nav.contains(event.target);

  if (!clickedInsideNav) {
    closeMenu();
  }

});


/* ---------- CERRAR CON ESC ---------- */

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeMenu();
  }

});


/* ---------- CERRAR MENÚ SI PASAMOS A DESKTOP ---------- */

window.addEventListener("resize", () => {

  if (window.innerWidth > 850) {
    closeMenu();
  }

});


/* =========================================================
   ANIMACIONES REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          /*
           * Dejamos de observar el elemento después
           * de mostrarlo para evitar trabajo innecesario.
           */
          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  /*
   * Fallback para navegadores sin IntersectionObserver.
   */
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================================
   BARRA DE PROGRESO DE LECTURA
   ========================================================= */

function updateProgress() {

  if (!progress) return;

  const documentElement = document.documentElement;

  const scrollTop =
    window.scrollY ||
    documentElement.scrollTop;

  const scrollHeight =
    documentElement.scrollHeight -
    documentElement.clientHeight;

  if (scrollHeight <= 0) {
    progress.style.width = "0%";
    return;
  }

  const percentage =
    (scrollTop / scrollHeight) * 100;

  progress.style.width =
    `${Math.min(100, Math.max(0, percentage))}%`;
}


/* ---------- SCROLL OPTIMIZADO ---------- */

let scrollTicking = false;

window.addEventListener(
  "scroll",
  () => {

    if (!scrollTicking) {

      window.requestAnimationFrame(() => {

        updateProgress();

        scrollTicking = false;

      });

      scrollTicking = true;
    }

  },
  { passive: true }
);


/* ---------- ACTUALIZAR AL CARGAR ---------- */

updateProgress();


/* =========================================================
   NAVEGACIÓN SUAVE
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const navHeight =
      nav ? nav.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      navHeight -
      15;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});


/* =========================================================
   EVITAR FALLOS DE ANIMACIÓN AL VOLVER ATRÁS
   ========================================================= */

window.addEventListener("pageshow", () => {

  /*
   * Algunos navegadores restauran la página desde
   * la caché manteniendo posiciones anteriores.
   */
  updateProgress();

});


/* =========================================================
   ACCESIBILIDAD — REDUCIR ANIMACIONES
   ========================================================= */

const reducedMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {

  document.documentElement.style.scrollBehavior = "auto";

}


/* =========================================================
   FIN DEL SCRIPT
   ========================================================= */
