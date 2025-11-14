document.addEventListener("DOMContentLoaded", () => {
  // SPA: navegación entre secciones
  document.querySelectorAll(".menu-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
      document.getElementById(target)?.classList.add("active");

      // Activar botón
      document.querySelectorAll(".menu-btn").forEach(b => b.classList.remove("active-btn"));
      btn.classList.add("active-btn");

      // Cerrar menú en móviles
      if (window.innerWidth <= 768) {
        document.querySelector(".sidebar")?.classList.remove("active");
      }
    });
  });

  // Cerrar sesión
  const btnCancelarCierre = document.getElementById("btn-cancelar-cierre");
  const btnConfirmarCierre = document.getElementById("btn-confirmar-cierre");

  btnConfirmarCierre?.addEventListener("click", () => {
   alert("Sesión cerrada");
  });

 btnCancelarCierre?.addEventListener("click", () => {
   document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
   document.getElementById("perfil")?.classList.add("active");
  });

  // Menú móvil
  const toggleMenu = document.getElementById("toggle-menu");
  if (toggleMenu) {
    toggleMenu.addEventListener("click", () => {
      document.querySelector(".sidebar")?.classList.toggle("active");
    });
  }
});