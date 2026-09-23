document.addEventListener("DOMContentLoaded", function () {
  
  const burger = document.getElementById("burgerBtn");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");
  const closeBtn = document.getElementById("drawerClose");

  // Solo ejecutar si los elementos existen en esta página
  if (burger && drawer && overlay) {
    function openDrawer() {
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      burger.setAttribute("aria-expanded", "true");
    }

    function closeDrawer() {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      const isOpen = drawer.classList.contains("is-open");
      isOpen ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener("click", closeDrawer);

    if (closeBtn) {
      closeBtn.addEventListener("click", closeDrawer);
    }

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  const track = document.getElementById("avisosTrack");
  if (track) {
    const dotsWrap = document.getElementById("avisosDots");
    const prevBtn = document.getElementById("avisosPrev");
    const nextBtn = document.getElementById("avisosNext");

    const cards = Array.from(track.children);
    let current = 0;

    cards.forEach(function (_, i) {
      const dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", "Ir al aviso " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      current = (index + cards.length) % cards.length;
      Array.from(dotsWrap.children).forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
      });
    }
  }
});