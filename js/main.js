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
  { threshold: 0.4 },
); // 0.4 = sección debe estar 40% visible

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

/* ----------------------------------------------------------
   MÓDULO 4 — Habilidades: animación de barras de progreso

   Flujo:
   1. IntersectionObserver detecta cuando un .skills__item
      entra al viewport
   2. setTimeout escalonado → efecto cascada
   3. Se agrega .skills__item--visible → aparece el item
   4. Se lee data-level del .skills__bar-fill
   5. Se asigna ese valor como width → la barra crece
---------------------------------------------------------- */
const skillItems = document.querySelectorAll(".skills__item");

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay escalonado: cada item espera 100ms más que el anterior
        // index 0 → 0ms, index 1 → 100ms, index 2 → 200ms...
        setTimeout(() => {
          // Activa la transición CSS de opacidad y posición
          entry.target.classList.add("skills__item--visible");

          // Lee el valor de data-level del elemento hijo
          const bar = entry.target.querySelector(".skills__bar-fill");
          const level = bar.getAttribute("data-level");

          // Asigna el width — la transition CSS lo anima suavemente
          bar.style.width = level + "%";
        }, index * 100);

        // Deja de observar — la animación ocurre solo una vez
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
); // 20% visible es suficiente para disparar

skillItems.forEach((item) => skillsObserver.observe(item));
