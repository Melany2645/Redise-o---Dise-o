// ---------------------------------------------------------------
// Carrusel de "Avisos importantes"
// ---------------------------------------------------------------
(function avisosCarousel() {
  const track = document.getElementById("avisosTrack");
  const dotsWrap = document.getElementById("avisosDots");
  const prevBtn = document.getElementById("avisosPrev");
  const nextBtn = document.getElementById("avisosNext");

  if (!track) return;

  const cards = Array.from(track.children);
  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `Ir al aviso ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + cards.length) % cards.length;
    // En escritorio los avisos se ven en cuadrícula; en pantallas angostas
    // esta función queda lista para pasar a un desplazamiento de una tarjeta
    // a la vez cuando se active la vista tipo carrusel móvil.
    Array.from(dotsWrap.children).forEach((d, i) =>
      d.classList.toggle("is-active", i === current),
    );
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
})();

// ---------------------------------------------------------------
// Menú hamburguesa (estructura lista; el comportamiento final para
// móvil se termina de definir en la siguiente iteración del diseño)
// ---------------------------------------------------------------
(function mobileNav() {
  const burger = document.getElementById("burgerBtn");
  const nav = burger ? burger.closest(".nav") : null;

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Permite tocar un ítem con submenú para desplegarlo en móvil
  nav.querySelectorAll(".has-sub > .nav__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth > 760) return;
      e.preventDefault();
      link.closest(".has-sub").classList.toggle("is-open");
    });
  });
})();
