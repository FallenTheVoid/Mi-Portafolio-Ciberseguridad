// ELEMENTOS
const tablaReportes = document.getElementById("tabla-reportes");
const resumenTotal = document.getElementById("resumen-reportes-total");
const resumenMonto = document.getElementById("resumen-reportes-monto");
const resumenNombre = document.getElementById("resumen-reportes-nombre");

// CARGAR REPORTES
function cargarReportes() {
  fetch(`${API_BASE}/reportes`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.warn("Los datos de reportes no son válidos:", data);
        return;
      }
      renderTablaReportes(data);
      actualizarResumenReportes(data);
    })
    .catch(error => {
      console.error("Error al cargar reportes:", error);
    });
}

// RENDER TABLA
function renderTablaReportes(data) {
  if (!tablaReportes) return;
  tablaReportes.innerHTML = "";
  data.forEach(reporte => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${reporte.nombre_archivo}</td>
      <td>${reporte.fecha}</td>
      <td>${reporte.peso}</td>
      <td><button onclick="descargarReporte('${reporte.archivo}')">📥 Descargar</button></td>
    `;
    tablaReportes.appendChild(fila);
  });
}

// RESUMEN
function actualizarResumenReportes(data) {
  if (!Array.isArray(data)) return;

  if (resumenTotal) resumenTotal.textContent = data.length;

  const totalPeso = data.reduce((sum, r) => sum + parseFloat(r.peso || 0), 0);
  if (resumenMonto) resumenMonto.textContent = totalPeso.toFixed(2) + " MB";

  const ordenados = [...data].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const ultimo = ordenados[0];
  if (ultimo && resumenNombre) resumenNombre.textContent = ultimo.nombre_archivo;
}

// DESCARGAR REPORTE
function descargarReporte(ruta) {
  alert(`Descargando: ${ruta}`);
}

// INICIALIZAR
document.addEventListener("DOMContentLoaded", cargarReportes);