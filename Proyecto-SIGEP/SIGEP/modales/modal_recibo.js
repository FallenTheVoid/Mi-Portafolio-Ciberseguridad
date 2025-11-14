document.addEventListener("DOMContentLoaded", () => {
  const modalRecibo = document.getElementById("modal-recibo");
  const btnAbrirRecibo = document.getElementById("btn-abrir-modal-recibo");
  const btnCerrarRecibo = document.getElementById("btn-cancelar-recibo");
  const btnRegistrarRecibo = document.getElementById("btn-registrar-recibo");

  const id = document.getElementById("recibo-id");
  const cliente = document.getElementById("recibo-cliente");
  const empresa = document.getElementById("recibo-empresa");
  const telefono = document.getElementById("recibo-telefono");
  const concepto = document.getElementById("recibo-concepto");
  const monto = document.getElementById("recibo-monto");
  const fecha = document.getElementById("recibo-fecha");
  const estado = document.getElementById("estado-recibo");

  // Abrir modal
  btnAbrirRecibo?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    modalRecibo?.classList.add("show");
  });

  // Cerrar modal
  btnCerrarRecibo?.addEventListener("click", (e) => {
    e.preventDefault();
    modalRecibo?.classList.remove("show");
  });

  // Cerrar al hacer clic fuera del contenido
  modalRecibo?.addEventListener("click", (e) => {
    if (e.target === modalRecibo) {
      modalRecibo.classList.remove("show");
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalRecibo?.classList.remove("show");
    }
  });

  // Registrar recibo
  btnRegistrarRecibo?.addEventListener("click", () => {
    const nuevoRecibo = {
      id: id.value,
      cliente: cliente.value,
      empresa: empresa.value,
      telefono: telefono.value,
      concepto: concepto.value,
      monto: monto.value,
      fecha: fecha.value,
      estado: estado.value,
      descargas: 0,
      enviados: 0
    };

    fetch(`${API_BASE}/recibos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoRecibo)
    })
    .then(res => res.json())
    .then(() => {
      modalRecibo.classList.remove("show");
      limpiarFormularioRecibo();
      cargarRecibos(); 
    })
    .catch(err => console.error("Error al registrar recibo:", err));
  });

  // Limpiar formulario
  function limpiarFormularioRecibo() {
    cliente.value = "";
    empresa.value = "";
    telefono.value = "";
    concepto.value = "";
    monto.value = "";
    fecha.value = "";
    estado.value = "";
  }
});