// ELEMENTOS
const tablaPagos = document.getElementById("tabla-pagos");
const resumenTotalPagado = document.getElementById("resumen-total-pagado");
const resumenPagosCompletados = document.getElementById("resumen-pagos-completados");
const resumenPagosPendientes = document.getElementById("resumen-pagos-pendientes");

// CARGAR PAGOS
function cargarPagos() {
  fetch(`${API_BASE}/pagos`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Respuesta inesperada de /pagos:", data);
        return;
      }
      renderTablaPagos(data);
    })
    .catch(err => console.error("Error al cargar pagos:", err));
}

// RENDER TABLA
function renderTablaPagos(data) {
  if (!tablaPagos) return;
  tablaPagos.innerHTML = "";
  data.forEach(pago => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${pago.id_pago}</td>
      <td>${pago.empleado_id}</td>
      <td>${pago.monto}</td>
      <td>${pago.justificante || "-"}</td>
      <td>${pago.fecha}</td>
      <td>${pago.metodo}</td>
      <td>${pago.estado}</td>
    `;
    tablaPagos.appendChild(fila);
  });
}

// RESUMEN PAGOS
function actualizarResumenPagos() {
  fetch(`${API_BASE}/resumen/pagos`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/pagos:", data);
        return;
      }

      if (resumenTotalPagado)
        resumenTotalPagado.textContent = parseFloat(data.total_pagado).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP"
        });

      if (resumenPagosCompletados)
        resumenPagosCompletados.textContent = data.completados;

      if (resumenPagosPendientes)
        resumenPagosPendientes.textContent = data.pendientes;
    })
    .catch(err => console.error("Error al actualizar resumen de pagos:", err));
}

// INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {
  cargarPagos();
  actualizarResumenPagos();
});