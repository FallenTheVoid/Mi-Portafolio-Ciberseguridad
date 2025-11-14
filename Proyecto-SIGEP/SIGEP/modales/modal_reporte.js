document.addEventListener("DOMContentLoaded", () => {
  const modalReporte = document.getElementById("modal-reporte");
  const btnAbrirModal = document.getElementById("btn-generar-reporte");
  const btnCerrarModal = document.getElementById("btn-cancelar-reporte");
  const btnGenerar = document.getElementById("btn-generar-reporte-modal");

  const tipoReporte = document.getElementById("reporte-tipo");
  const fechaInicio = document.getElementById("reporte-inicio");
  const fechaFin = document.getElementById("reporte-fin");
  const formatoReporte = document.getElementById("reporte-formato");

  // Abrir modal
  btnAbrirModal?.addEventListener("click", () => {
    modalReporte.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  // Cerrar modal
  btnCerrarModal?.addEventListener("click", () => {
    modalReporte.style.display = "none";
    document.body.style.overflow = "";
  });

  // Generar reporte
  btnGenerar?.addEventListener("click", () => {
    const tipo = tipoReporte.value;
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;
    const formato = formatoReporte.value;

    if (!tipo || !inicio || !fin || !formato) {
      alert("Completa todos los campos para generar el reporte.");
      return;
    }

    const nombreArchivo = `${tipo.toLowerCase()}_${inicio}_${fin}.${formato.toLowerCase()}`;
    const nuevoReporte = {
      nombre_archivo: nombreArchivo,
      fecha: new Date().toISOString().split("T")[0],
      peso: "1.2MB",
      archivo: `/reportes/${nombreArchivo}`
    };

    fetch(`${API_BASE}/reportes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoReporte)
    })
    .then(res => res.json())
    .then(() => {
      cargarReportes(); // función global desde tabla_reportes.js
      modalReporte.style.display = "none";
      document.body.style.overflow = "";
    });
  });
});