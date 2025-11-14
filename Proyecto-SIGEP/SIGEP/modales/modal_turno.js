document.addEventListener("DOMContentLoaded", () => {
  const modalTurno = document.getElementById("modal-turno");
  const btnAbrirTurno = document.getElementById("btn-asignar-turno");
  const btnCerrarTurno = document.getElementById("btn-cancelar-turno");
  const btnRegistrarTurno = document.getElementById("btn-registrar-turno");

  const turnoEmpleadoId = document.getElementById("turno-empleado-id");
  const turnoCargo = document.getElementById("turno-cargo");
  const turnoFecha = document.getElementById("turno-fecha");
  const turnoInicio = document.getElementById("turno-inicio");
  const turnoFin = document.getElementById("turno-fin");

  // Abrir modal y cargar empleados
  btnAbrirTurno?.addEventListener("click", (e) => {
    e.preventDefault();
    cargarListaEmpleados();
    modalTurno?.classList.add("show");
  });

  // Cerrar modal
  btnCerrarTurno?.addEventListener("click", (e) => {
    e.preventDefault();
    modalTurno?.classList.remove("show");
  });

  // Cerrar al hacer clic fuera del contenido
  modalTurno?.addEventListener("click", (e) => {
    if (e.target === modalTurno) {
      modalTurno.classList.remove("show");
    }
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalTurno?.classList.remove("show");
    }
  });

  // Evitar envío por Enter
  modalTurno?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });

  // Autocompletar cargo al seleccionar empleado
  turnoEmpleadoId.addEventListener("change", () => {
    const selected = turnoEmpleadoId.selectedOptions[0];
    turnoCargo.value = selected?.dataset.cargo || "";
  });

  // Registrar turno solo al hacer clic
  btnRegistrarTurno?.addEventListener("click", () => {
    if (!turnoEmpleadoId.value || !turnoFecha.value || !turnoInicio.value || !turnoFin.value) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const nuevoTurno = {
      empleado_id: turnoEmpleadoId.value,
      fecha: turnoFecha.value,
      hora_inicio: turnoInicio.value,
      hora_fin: turnoFin.value
    };

    fetch(`${API_BASE}/turnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoTurno)
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al asignar turno");
        return res.json();
      })
      .then(() => {
        alert("Turno asignado correctamente.");
        modalTurno.classList.remove("show");
        limpiarFormularioTurno();
        if (typeof cargarTurnos === "function") cargarTurnos();
        if (typeof actualizarResumenTurnos === "function") actualizarResumenTurnos();
      })
      .catch(err => {
        console.error("Error al asignar turno:", err);
        alert("No se pudo asignar el turno. Verifica los datos o intenta más tarde.");
      });
  });

  // Cargar lista de empleados en el select
  function cargarListaEmpleados() {
    fetch(`${API_BASE}/empleados`)
      .then(res => res.json())
      .then(data => {
        turnoEmpleadoId.innerHTML = '<option value="">Selecciona un empleado</option>';
        data.forEach(emp => {
          const option = document.createElement("option");
          option.value = emp.empleado_id;
          option.textContent = `${emp.nombre} (${emp.cargo || "Sin cargo"})`;
          option.dataset.cargo = "";
          turnoEmpleadoId.appendChild(option);
        });
      })
      .catch(err => console.error("Error al cargar empleados:", err));
  }

  function limpiarFormularioTurno() {
    turnoEmpleadoId.value = "";
    turnoCargo.value = "";
    turnoFecha.value = "";
    turnoInicio.value = "";
    turnoFin.value = "";
  }
});