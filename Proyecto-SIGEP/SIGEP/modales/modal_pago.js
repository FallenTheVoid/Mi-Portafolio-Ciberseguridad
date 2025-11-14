document.addEventListener("DOMContentLoaded", () => {
  const modalPago = document.getElementById("modal-pago");
  const btnAbrirPago = document.getElementById("btn-abrir-modal-pago");
  const btnCerrarPago = document.getElementById("btn-cancelar-pago");
  const btnRegistrarPago = document.getElementById("btn-registrar-pago");

  const pagoEmpleadoId = document.getElementById("pago-empleado-id");
  const pagoFecha = document.getElementById("pago-fecha");
  const pagoMonto = document.getElementById("pago-monto");
  const pagoMetodo = document.getElementById("pago-metodo");
  const pagoJustificante = document.getElementById("pago-justificante");
  const pagoEstado = document.getElementById("pago-estado");

  // Abrir modal
  btnAbrirPago?.addEventListener("click", (e) => {
    e.preventDefault();
    modalPago?.classList.add("show");
  });

  // Cerrar modal
  btnCerrarPago?.addEventListener("click", (e) => {
    e.preventDefault();
    modalPago?.classList.remove("show");
  });

  // Cerrar al hacer clic fuera del contenido
  modalPago?.addEventListener("click", (e) => {
    if (e.target === modalPago) {
      modalPago.classList.remove("show");
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalPago?.classList.remove("show");
    }
  });

  // Registrar pago
  btnRegistrarPago?.addEventListener("click", () => {
    // Validación básica
    if (!pagoEmpleadoId.value || !pagoMonto.value || !pagoFecha.value) {
      alert("Por favor completa los campos obligatorios: empleado, monto y fecha.");
      return;
    }

    const nuevoPago = {
      empleado_id: pagoEmpleadoId.value,
      monto: parseFloat(pagoMonto.value),
      justificante: pagoJustificante.value,
      fecha: pagoFecha.value,
      metodo: pagoMetodo.value,
      estado: pagoEstado.value
    };

    fetch(`${API_BASE}/pagos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoPago)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error al registrar el pago");
      return res.json();
    })
    .then(() => {
      alert("Pago registrado correctamente.");
      modalPago.classList.remove("show");
      limpiarFormularioPago();
      cargarPagos?.();
      actualizarResumenPagos?.();
    })
    .catch(err => {
      console.error("Error en el registro de pago:", err);
      alert("No se pudo registrar el pago. Verifica los datos o intenta más tarde.");
    });
  });

  // Limpiar formulario
  function limpiarFormularioPago() {
    pagoEmpleadoId.value = "";
    pagoMonto.value = "";
    pagoJustificante.value = "";
    pagoFecha.value = "";
    pagoMetodo.value = "";
    pagoEstado.value = "";
  }
});