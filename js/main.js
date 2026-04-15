/* ==========================================================
   CV INTERACTIVO — FABRICIO GALINDO
   js/main.js
   ========================================================== */

/* ----------------------------------------------------------
   MÓDULO 2 — Navbar

   Tres comportamientos:
     1. Cambiar apariencia al hacer scroll
     2. Resaltar el link de la sección visible
     3. Abrir/cerrar menú en móvil
---------------------------------------------------------- */

/* 1. Modificador --scrolled al bajar de 40px ------------ */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("navbar--scrolled");
  } else {
    navbar.classList.remove("navbar--scrolled");
  }
});

/* 2. Link activo según sección visible ------------------- */

// querySelectorAll devuelve TODOS los elementos que coincidan
// (a diferencia de querySelector que devuelve solo el primero)
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".navbar__link");

// IntersectionObserver avisa cuando un elemento entra
// o sale del viewport — más eficiente que calcular con scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navAnchors.forEach((a) => {
          // toggle(clase, condición):
          //   true  → agrega la clase
          //   false → la quita
          a.classList.toggle(
            "navbar__link--active",
            a.getAttribute("href") === `#${id}`,
          );
        });
      }
    });
  },
  { threshold: 0.5 },
); // 0.5 = sección debe estar 50% visible

sections.forEach((section) => sectionObserver.observe(section));

/* 3. Botón hamburguesa ----------------------------------- */

const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".navbar__links");

hamburger.addEventListener("click", () => {
  // toggle: si tiene --open la quita, si no la tiene la agrega
  navLinks.classList.toggle("navbar__links--open");
});

// Cerrar el menú al tocar cualquier link
navLinks.querySelectorAll(".navbar__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("navbar__links--open");
  });
});

console.log("✅ main.js cargado — Módulos 1 y 2 listos");
