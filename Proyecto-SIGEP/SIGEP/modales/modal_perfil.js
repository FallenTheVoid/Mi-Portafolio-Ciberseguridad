document.addEventListener("DOMContentLoaded", () => {
  const editarBtn = document.getElementById("editarBtn");
  const modal = document.getElementById("modal-editar-perfil");
  const guardarModalBtn = document.getElementById("guardar-modal");

  const modalNombre = document.getElementById("modal-nombre");
  const modalCargo = document.getElementById("modal-cargo");
  const modalDepartamento = document.getElementById("modal-departamento");
  const modalFecha = document.getElementById("modal-fecha");
  const modalEstado = document.getElementById("modal-estado");
  const perfilId = document.getElementById("perfil-id");

  // Abrir modal y cargar datos
  if (editarBtn) {
    editarBtn.addEventListener("click", () => {
      modal.style.display = "block";

      modalNombre.value = document.getElementById("perfil-nombre")?.textContent.trim();
      modalCargo.value = document.getElementById("perfil-cargo")?.textContent.trim();
      modalDepartamento.value = document.getElementById("perfil-departamento")?.textContent.trim();
      modalFecha.value = document.getElementById("perfil-fecha")?.textContent.trim();
      modalEstado.value = document.getElementById("perfil-estado")?.textContent.trim();
    });
  }

  // Guardar cambios
  if (guardarModalBtn) {
    guardarModalBtn.addEventListener("click", () => {
      const id = perfilId?.value;
      if (!id) {
        alert("No se ha cargado ningún perfil válido");
        return;
      }

      const datosActualizados = {
        nombre: modalNombre.value.trim(),
        cargo: modalCargo.value.trim(),
        departamento: modalDepartamento.value.trim(),
        fecha_ingreso: modalFecha.value.trim(),
        estado: modalEstado.value.trim()
      };

      fetch(`${API_BASE}/empleados/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados)
      })
        .then(res => {
          if (!res.ok) throw new Error("Error al actualizar el perfil");
          return res.json();
        })
        .then(() => {
          alert("Perfil actualizado correctamente");
          modal.style.display = "none";

          document.getElementById("perfil-nombre").textContent = datosActualizados.nombre;
          document.getElementById("perfil-cargo").textContent = datosActualizados.cargo;
          document.getElementById("perfil-departamento").textContent = datosActualizados.departamento;
          document.getElementById("perfil-fecha").textContent = datosActualizados.fecha_ingreso;
          document.getElementById("perfil-estado").textContent = datosActualizados.estado;
        })
        .catch(err => {
          console.error("Error al guardar perfil:", err);
          alert("Hubo un error al actualizar el perfil");
        });
    });
  }

  // Cerrar modal al hacer clic fuera
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});