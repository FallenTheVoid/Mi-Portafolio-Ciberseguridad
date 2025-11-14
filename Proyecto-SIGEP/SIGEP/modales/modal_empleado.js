document.addEventListener("DOMContentLoaded", () => {
  const btnAbrir = document.getElementById("btn-crear-empleado");
  const btnCerrar = document.getElementById("btn-cerrar-modal");
  const modal = document.getElementById("modal-empleado");
  const btnRegistrar = document.getElementById("btn-registrar");

  const empleadoId = document.getElementById("empleado-id");
  const nombre = document.getElementById("empleado-nombre");
  const correo = document.getElementById("empleado-correo");
  const telefono = document.getElementById("empleado-telefono");
  const cargo = document.getElementById("empleado-cargo");
  const departamento = document.getElementById("empleado-departamento");

  if (btnAbrir && modal) {
    btnAbrir.addEventListener("click", () => {
      modal.classList.add("show");
    });
  }

  if (btnCerrar && modal) {
    btnCerrar.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", async (event) => {
      event.preventDefault();
      const nuevoEmpleado = {
        empleado_id: empleadoId.value,
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
        cargo: cargo.value,
        departamento: departamento.value,
        fecha_ingreso: new Date().toISOString().split("T")[0],
        estado: "Activo"
      };

      try {
        const res = await fetch(`${API_BASE}/empleados`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEmpleado)
        });

        if (!res.ok) throw new Error("Error al registrar el empleado");

        const data = await res.json();
        modal.classList.remove("show");
        limpiarFormulario();
        alert("Empleado registrado correctamente");

        agregarEmpleadoATabla(data);
      } catch (err) {
        console.error("Error al registrar empleado:", err);
        alert("Hubo un problema al registrar el empleado");
      }
    });
  }

  function limpiarFormulario() {
    empleadoId.value = "";
    nombre.value = "";
    correo.value = "";
    telefono.value = "";
    cargo.value = "";
    departamento.value = "";
  }

  function agregarEmpleadoATabla(empleado) {
    const tabla = document.getElementById("tabla-empleados").getElementsByTagName("tbody")[0];
    const fila = tabla.insertRow();

    fila.innerHTML = `
      <td>${empleado.id}</td>
      <td>${empleado.nombre}</td>
      <td>${empleado.cargo}</td>
      <td>${empleado.departamento}</td>
      <td>${empleado.fecha_ingreso}</td>
      <td>${empleado.estado}</td>
    `;
  }
});