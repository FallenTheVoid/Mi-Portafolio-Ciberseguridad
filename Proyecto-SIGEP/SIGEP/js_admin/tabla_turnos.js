// ELEMENTOS
const tablaTurnos = document.getElementById("tabla-turnos");
const resumenHoy = document.getElementById("resumen-turnos-hoy");
const resumenProgramados = document.getElementById("resumen-turnos-programados");

const btnAsignarTurno = document.getElementById("btn-asignar-turno");
const turnoEmpleadoId = document.getElementById("turno-empleado-id");
const turnoFecha = document.getElementById("turno-fecha");
const turnoInicio = document.getElementById("turno-inicio");
const turnoFin = document.getElementById("turno-fin");

// CARGAR TURNOS
function cargarTurnos() {
  fetch(`${API_BASE}/turnos`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Respuesta inesperada de /turnos:", data);
        return;
      }
      renderTablaTurnos(data);
    })
    .catch(err => console.error("Error al cargar turnos:", err));
}

// RENDER TABLA
function renderTablaTurnos(data) {
  if (!tablaTurnos) return;
  tablaTurnos.innerHTML = "";
  data.forEach(turno => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${turno.id_turno || "Sin ID"}</td>
      <td>${turno.empleado_id || ""}</td>
      <td>${turno.nombre || ""}</td>
      <td>${turno.fecha || ""}</td>
      <td>${turno.hora_inicio || ""}</td>
      <td>${turno.hora_fin || ""}</td>
      <td><button class="btn-editar-turno" data-id="${turno.id_turno}">Editar</button></td>
    `;
    tablaTurnos.appendChild(fila);
  });
}

// RESUMEN HOY
function actualizarResumenHoy() {
  fetch(`${API_BASE}/resumen/turnos/hoy`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/turnos/hoy:", data);
        return;
      }
      if (resumenHoy) resumenHoy.textContent = data.turnos_hoy;
    })
    .catch(err => console.error("Error al actualizar resumen de hoy:", err));
}

// RESUMEN PROGRAMADOS
function actualizarResumenProgramados() {
  fetch(`${API_BASE}/resumen/turnos/programados`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/turnos/programados:", data);
        return;
      }
      if (resumenProgramados) resumenProgramados.textContent = data.turnos_programados;
    })
    .catch(err => console.error("Error al actualizar resumen programados:", err));
}

// LIMPIAR FORMULARIO
function limpiarFormularioTurno() {
  turnoEmpleadoId.value = "";
  turnoFecha.value = "";
  turnoInicio.value = "";
  turnoFin.value = "";
}

// INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {
  cargarTurnos();
  actualizarResumenHoy();
  actualizarResumenProgramados();
});