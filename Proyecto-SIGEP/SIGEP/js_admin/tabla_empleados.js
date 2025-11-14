document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
  const tablaEmpleados = document.getElementById("tabla-empleados");
  const resumenTotal = document.getElementById("resumen-total");
  const resumenActivos = document.getElementById("resumen-activos");
  const resumenInactivos = document.getElementById("resumen-inactivos");

  const filtroNombre = document.getElementById("filtro-nombre");
  const filtroDepartamento = document.getElementById("filtro-departamento");
  const filtroEstado = document.getElementById("filtro-estado");

  const perfilId = document.getElementById("perfil-id");
  const perfilNombre = document.getElementById("perfil-nombre");
  const perfilCargo = document.getElementById("perfil-cargo");
  const perfilDepartamento = document.getElementById("perfil-departamento");
  const perfilFecha = document.getElementById("perfil-fecha");
  const perfilEstado = document.getElementById("perfil-estado");
  const btnGuardarPerfil = document.getElementById("guardar-perfil");

  // CARGAR EMPLEADOS
  function cargarEmpleados() {
    fetch(`${API_BASE}/empleados`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.warn("Respuesta inesperada de /empleados:", data);
          return;
        }
        renderTablaEmpleados(data);
        actualizarResumen(data);
      })
      .catch(err => console.error("Error al cargar empleados:", err));
  }

  // RENDER TABLA
  function renderTablaEmpleados(data) {
    if (!tablaEmpleados) return;
    tablaEmpleados.innerHTML = "";
    data.forEach(emp => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.nombre}</td>
        <td>${emp.cargo}</td>
        <td>${emp.departamento}</td>
        <td>${emp.fecha_ingreso}</td>
        <td>${emp.estado}</td>
        <td><button class="editar-btn" data-id="${emp.id}">Editar</button></td>
      `;
      tablaEmpleados.appendChild(fila);
    });

    document.querySelectorAll(".editar-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        cargarPerfilEmpleado(id);
      });
    });
  }

  // CARGAR PERFIL PARA EDICIÓN
  function cargarPerfilEmpleado(id) {
    fetch(`${API_BASE}/empleados/${id}`)
      .then(res => res.json())
      .then(emp => {
        if (!emp || !perfilId) return;
        perfilId.value = emp.id;
        perfilNombre.value = emp.nombre;
        perfilCargo.value = emp.cargo;
        perfilDepartamento.value = emp.departamento;
        perfilFecha.value = emp.fecha_ingreso;
        perfilEstado.value = emp.estado;

        document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
        document.getElementById("perfil")?.classList.add("active");
      })
      .catch(err => console.error("Error al cargar perfil:", err));
  }

  // GUARDAR CAMBIOS DE PERFIL
  if (btnGuardarPerfil) {
    btnGuardarPerfil.addEventListener("click", () => {
      const datosActualizados = {
        nombre: perfilNombre.value,
        cargo: perfilCargo.value,
        departamento: perfilDepartamento.value,
        fecha_ingreso: perfilFecha.value,
        estado: perfilEstado.value
      };

      fetch(`${API_BASE}/empleados/${perfilId.value}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
      })
        .then(res => res.json())
        .then(() => {
          cargarEmpleados();
          alert("Perfil actualizado correctamente");
        })
        .catch(err => console.error("Error al guardar perfil:", err));
    });
  }

  // RESUMEN
  function actualizarResumen(data) {
    if (!Array.isArray(data)) return;
    if (resumenTotal) resumenTotal.textContent = data.length;
    if (resumenActivos) resumenActivos.textContent = data.filter(e => e.estado === "Activo").length;
    if (resumenInactivos) resumenInactivos.textContent = data.filter(e => e.estado === "Inactivo").length;
  }

  // FILTROS
  [filtroNombre, filtroDepartamento, filtroEstado].forEach(filtro => {
    filtro?.addEventListener("input", aplicarFiltros);
  });

  function aplicarFiltros() {
    fetch(`${API_BASE}/empleados`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.warn("Respuesta inesperada al filtrar empleados:", data);
          return;
        }

        const nombreVal = filtroNombre.value.toLowerCase();
        const departamentoVal = filtroDepartamento.value;
        const estadoVal = filtroEstado.value;

        const filtrados = data.filter(emp =>
          emp.nombre.toLowerCase().includes(nombreVal) &&
          (departamentoVal === "" || emp.departamento === departamentoVal) &&
          (estadoVal === "" || emp.estado === estadoVal)
        );

        renderTablaEmpleados(filtrados);
        actualizarResumen(filtrados);
      })
      .catch(err => console.error("Error al aplicar filtros:", err));
  }

  // INICIALIZAR
  cargarEmpleados();
});