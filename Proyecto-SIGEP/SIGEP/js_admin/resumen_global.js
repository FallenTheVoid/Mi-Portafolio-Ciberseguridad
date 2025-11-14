// ACTUALIZAR RESUMEN DE EMPLEADOS
function actualizarResumenEmpleados() {
  fetch(`${API_BASE}/empleados`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Respuesta inesperada de /empleados:", data);
        return;
      }

      const total = document.getElementById("resumen-total");
      const activos = document.getElementById("resumen-activos");
      const inactivos = document.getElementById("resumen-inactivos");

      if (total) total.textContent = data.length;
      if (activos) activos.textContent = data.filter(e => e.estado === "Activo").length;
      if (inactivos) inactivos.textContent = data.filter(e => e.estado === "Inactivo").length;
    })
    .catch(err => console.error("Error al actualizar resumen de empleados:", err));
}

// ACTUALIZAR RESUMEN DE TURNOS
function actualizarResumenTurnos() {
  fetch(`${API_BASE}/resumen/turnos/hoy`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/turnos/hoy:", data);
        return;
      }
      const hoy = document.getElementById("resumen-turnos-hoy");
      if (hoy) hoy.textContent = data.turnos_hoy;
    })
    .catch(err => console.error("Error al actualizar resumen de turnos hoy:", err));

  fetch(`${API_BASE}/resumen/turnos/programados`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/turnos/programados:", data);
        return;
      }
      const prog = document.getElementById("resumen-turnos-programados");
      if (prog) prog.textContent = data.turnos_programados;
    })
    .catch(err => console.error("Error al actualizar resumen de turnos programados:", err));
}

// ACTUALIZAR RESUMEN DE PAGOS
function actualizarResumenPagos() {
  fetch(`${API_BASE}/resumen/pagos`)
    .then(res => res.json())
    .then(data => {
      if (!data || typeof data !== "object") {
        console.warn("Respuesta inesperada de /resumen/pagos:", data);
        return;
      }

      const total = document.getElementById("resumen-total-pagado");
      const comp = document.getElementById("resumen-pagos-completados");
      const pend = document.getElementById("resumen-pagos-pendientes");

      if (total)
        total.textContent = parseFloat(data.total_pagado).toLocaleString("es-CO", {
          style: "currency",
          currency: "COP"
        });
      if (comp) comp.textContent = data.completados;
      if (pend) pend.textContent = data.pendientes;
    })
    .catch(err => console.error("Error al actualizar resumen de pagos:", err));
}

// ACTUALIZAR RESUMEN DE RECIBOS
function actualizarResumenRecibos() {
  fetch(`${API_BASE}/recibos`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Respuesta inesperada de /recibos:", data);
        return;
      }

      const generados = document.getElementById("resumen-generados");
      const descargados = document.getElementById("resumen-descargados");
      const enviados = document.getElementById("resumen-enviados");

      if (generados) generados.textContent = data.length;
      if (descargados) descargados.textContent = data.reduce((sum, r) => sum + (r.descargas || 0), 0);
      if (enviados) enviados.textContent = data.reduce((sum, r) => sum + (r.enviados || 0), 0);
    })
    .catch(err => console.error("Error al actualizar resumen de recibos:", err));
}

// ACTUALIZAR RESUMEN DE REPORTES
function actualizarResumenReportes() {
  fetch(`${API_BASE}/reportes`)
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener reportes");
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Los datos de reportes no son válidos:", data);
        return;
      }

      const resumen = document.getElementById("resumen-reportes");
      if (resumen) resumen.textContent = data.length;
    })
    .catch(err => console.error("Error al actualizar resumen de reportes:", err));
}

// INICIALIZAR TODOS LOS RESÚMENES
document.addEventListener("DOMContentLoaded", () => {
  actualizarResumenEmpleados();
  actualizarResumenTurnos();
  actualizarResumenPagos();
  actualizarResumenRecibos();
  actualizarResumenReportes();
});