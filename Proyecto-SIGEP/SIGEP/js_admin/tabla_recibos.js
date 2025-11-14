document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
  const tablaRecibos = document.getElementById("tabla-recibos");
  const resumenTotal = document.getElementById("resumen-total-recibos");
  const resumenMonto = document.getElementById("resumen-monto-recibos");

  const filtroCliente = document.getElementById("filtro-cliente");
  const filtroEstado = document.getElementById("filtro-estado-recibo");

  // CARGAR RECIBOS
  function cargarRecibos() {
    fetch(`${API_BASE}/recibos`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.warn("Respuesta inesperada de /recibos:", data);
          return;
        }
        renderTablaRecibos(data);
        actualizarResumenRecibos(data);
      })
      .catch(err => console.error("Error al cargar recibos:", err));
  }

  // RENDER TABLA
  function renderTablaRecibos(data) {
    if (!tablaRecibos) return;
    tablaRecibos.innerHTML = "";
    data.forEach(recibo => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${recibo.id}</td>
        <td>${recibo.cliente}</td>
        <td>${recibo.empresa}</td>
        <td>${recibo.telefono}</td>
        <td>${recibo.concepto}</td>
        <td>${recibo.monto}</td>
        <td>${recibo.fecha}</td>
        <td>${recibo.estado}</td>
      `;
      tablaRecibos.appendChild(fila);
    });
  }

  // RESUMEN
  function actualizarResumenRecibos(data) {
    if (!Array.isArray(data)) return;

    if (resumenTotal) resumenTotal.textContent = data.length;

    const totalMonto = data.reduce((sum, r) => sum + parseFloat(r.monto || 0), 0);
    if (resumenMonto) resumenMonto.textContent = totalMonto.toFixed(2);
  }

  // FILTROS
  [filtroCliente, filtroEstado].forEach(filtro => {
    filtro?.addEventListener("input", aplicarFiltrosRecibos);
  });

  function aplicarFiltrosRecibos() {
    fetch(`${API_BASE}/recibos`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.warn("Respuesta inesperada al filtrar recibos:", data);
          return;
        }

        const clienteVal = filtroCliente.value.toLowerCase();
        const estadoVal = filtroEstado.value;

        const filtrados = data.filter(recibo =>
          recibo.cliente.toLowerCase().includes(clienteVal) &&
          (estadoVal === "" || recibo.estado === estadoVal)
        );

        renderTablaRecibos(filtrados);
        actualizarResumenRecibos(filtrados);
      })
      .catch(err => console.error("Error al filtrar recibos:", err));
  }

  // INICIALIZAR
  cargarRecibos();
});