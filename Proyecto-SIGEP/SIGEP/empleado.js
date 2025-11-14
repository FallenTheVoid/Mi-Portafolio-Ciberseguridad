// SPA: navegación entre secciones
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');

    // Activar sección
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');

    // Activar botón
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active-btn'));
    btn.classList.add('active-btn');
    
    // Cerrar menú en móviles
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar').classList.remove('active');
    }

  });
});

// Cerrar sesión
document.querySelector('#cerrar button:nth-child(1)').addEventListener('click', () => {
  alert("Sesión cerrada");
});
document.querySelector('#cerrar button:nth-child(2)').addEventListener('click', () => {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById('perfil').classList.add('active');
});

// Menù Movil
document.getElementById('toggle-menu')?.addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('active');
});

// Renderizado de tablas

function renderTurnos() {
  const tbody = document.querySelector('#turnos table tbody');
  tbody.innerHTML = '';
  turnos.forEach(t => {
    tbody.innerHTML += `
      <tr>
        <td>${t.fecha}</td>
        <td>${t.horario}</td>
        <td>${t.lugar}</td>
      </tr>
    `;
  });
}

function renderPagos() {
  const tbody = document.querySelector('#pagos table tbody');
  tbody.innerHTML = '';
  pagos.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>$${p.monto}</td>
        <td>${p.fecha}</td>
        <td>${p.metodo}</td>
        <td>${p.estado}</td>
        <td><button>Ver</button></td>
      </tr>
    `;
  });
}

function renderRecibos() {
  const tbody = document.querySelector('#recibos table tbody');
  tbody.innerHTML = '';
  recibos.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.id}</td>
        <td>${r.empleado}</td>
        <td>${r.periodo}</td>
        <td>$${r.monto}</td>
        <td>${r.fecha}</td>
        <td><button>Descargar</button></td>
      </tr>
    `;
  });
}

function renderReportes() {
  const tbody = document.querySelector('#reportes table tbody');
  tbody.innerHTML = '';
  reportes.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.nombre}</td>
        <td>${r.fecha}</td>
        <td>${r.peso}</td>
        <td><button>Descargar</button></td>
      </tr>
    `;
  });
}

// Actualizar resumen de turnos
function actualizarResumenTurnos() {
  const filas = document.querySelectorAll('#turnos table tbody tr');
  const hoy = new Date();
  const hoyStr = hoy.toISOString().split('T')[0]; // "YYYY-MM-DD"
  const ahora = hoy.toTimeString().slice(0,5); // "HH:MM"

  let turnosHoy = 0;
  let enCurso = 0;
  let programados = 0;

  filas.forEach(fila => {
    const fechaTexto = fila.children[1]?.textContent.trim(); // "YYYY-MM-DD"
    const horario = fila.children[2]?.textContent.trim();     // "HH:MM - HH:MM"
    const [inicio, fin] = horario.split(' - ');

    if (!fechaTexto || !inicio || !fin) return;

    // Comparar como texto plano
    if (fechaTexto === hoyStr) {
      turnosHoy++;

      if (inicio <= ahora && fin >= ahora) {
        enCurso++;
      }
    }

    if (fechaTexto > hoyStr) {
      programados++;
    }
  });

  document.getElementById('turnos-este-mes').textContent = turnosHoy;
  document.getElementById('horas-trabajadas').textContent = enCurso;
  document.getElementById('turnos-programados').textContent = programados;
}

// Resumen de pago
function actualizarResumenPagos() {
  const filas = document.querySelectorAll('#pagos table tbody tr');
  let total = 0;
  let completados = 0;
  let pendientes = 0;

  filas.forEach(fila => {
    const montoTexto = fila.children[3]?.textContent.replace(/[^\d.]/g, '');
    const metodo = fila.children[4]?.textContent.trim();

    const monto = parseFloat(montoTexto);
    if (!isNaN(monto)) total += monto;

    if (metodo === 'Transferencia' || metodo === 'Efectivo') {
      completados++;
    } else {
      pendientes++;
    }
  });

  document.getElementById('total-pagado').textContent = `COP $${total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  document.getElementById('pagos-completados').textContent = completados;
  document.getElementById('pagos-pendientes').textContent = pendientes;
}

// Generar recibo
// Función para mostrar el modal con datos
function mostrarRecibo({ nombre, cargo, fecha, monto, metodo }) {
  document.getElementById('recibo-nombre').textContent = nombre;
  document.getElementById('recibo-cargo').textContent = cargo;
  document.getElementById('recibo-fecha').textContent = fecha;
  document.getElementById('recibo-monto').textContent = `COP $${parseFloat(monto).toLocaleString('es-CO', { minimumFractionDigits: 2 })}`;
  document.getElementById('recibo-metodo').textContent = metodo;

  document.getElementById('modal-recibo').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Evento para abrir el modal al hacer clic en el botón
document.getElementById('btn-generar-recibo').addEventListener('click', () => {
  mostrarRecibo({
    nombre: "Carlos Ruiz",
    cargo: "Contador",
    fecha: "2025-11-09",
    monto: "850000",
    metodo: "Transferencia"
  });
});

// Cerrar el modal
document.getElementById('btn-cerrar-recibo').addEventListener('click', () => {
  document.getElementById('modal-recibo').style.display = 'none';
  document.body.style.overflow = '';
});

// Modal reporte
// Abrir modal de reporte
document.getElementById('btn-generar-reporte').addEventListener('click', () => {
  document.getElementById('modal-reporte').style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Cerrar modal
document.getElementById('btn-cancelar-reporte').addEventListener('click', () => {
  document.getElementById('modal-reporte').style.display = 'none';
  document.body.style.overflow = '';
});

// Solicitudes 
document.getElementById("form-solicitud").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipo = document.getElementById("tipo").value;
  const inicio = document.getElementById("fecha-inicio").value;
  const fin = document.getElementById("fecha-fin").value;
  const comentario = document.getElementById("comentario").value;

  const solicitud = {
    tipo,
    inicio,
    fin,
    comentario
  };

  console.log("Solicitud enviada:", solicitud);
  alert("Solicitud enviada correctamente");

  this.reset();
});

// Filtros de empleados
document.querySelectorAll('#empleados .filtros input, #empleados .filtros select').forEach(input => {
  input.addEventListener('input', () => {
    const nombre = document.querySelector('#empleados .filtros input[placeholder="Buscar por nombre"]').value.toLowerCase();
    const depto = document.querySelector('#empleados .filtros input[placeholder="Departamento"]').value.toLowerCase();
    const estado = document.querySelector('#empleados .filtros select').value;

    const filtrados = empleados.filter(emp =>
      emp.nombre.toLowerCase().includes(nombre) &&
      emp.depto.toLowerCase().includes(depto) &&
      (estado === '' || emp.estado === estado)
    );

    renderEmpleados(filtrados);
  });
});

// Modal Empleados
document.getElementById('btn-crear-empleado').addEventListener('click', () => {
  document.getElementById('modal-empleado').style.display = 'flex';
});

document.getElementById('btn-cerrar-modal').addEventListener('click', () => {
  document.getElementById('modal-empleado').style.display = 'none';
});

//Modal turnos 
document.getElementById('btn-asignar-turno').addEventListener('click', () => {
  document.getElementById('modal-turno').style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Evita scroll del fondo
});

// Cerrar modal de turnos
document.getElementById('btn-cancelar-turno').addEventListener('click', () => {
  document.getElementById('modal-turno').style.display = 'none';
  document.body.style.overflow = '';
});

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-turno');
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Autocompletar cargo al escribir ID o nombre
document.getElementById('turno-empleado').addEventListener('input', (e) => {
  const valor = e.target.value.trim().toLowerCase();
  const encontrado = empleados.find(emp =>
    emp.id.toLowerCase() === valor || emp.nombre.toLowerCase().includes(valor)
  );
  document.getElementById('turno-cargo').value = encontrado ? encontrado.cargo : '';
});

// Registrar turno
document.getElementById('btn-registrar-turno').addEventListener('click', () => {
  const nombre = document.getElementById('turno-empleado').value.trim();
  const cargo = document.getElementById('turno-cargo').value.trim();
  const fecha = document.getElementById('turno-fecha').value;
  const inicio = document.getElementById('turno-inicio').value;
  const fin = document.getElementById('turno-fin').value;

  if (!nombre || !cargo || !fecha || !inicio || !fin) {
    alert('Completa todos los campos.');
    return;
  }

  const tbody = document.querySelector('#turnos table tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${fecha}</td>
    <td>${inicio} - ${fin}</td>
    <td><button class="edit-btn">Editar</button></td>
  `;
  tbody.appendChild(fila);

  // Limpiar campos
  document.getElementById('turno-empleado').value = '';
  document.getElementById('turno-cargo').value = '';
  document.getElementById('turno-fecha').value = '';
  document.getElementById('turno-inicio').value = '';
  document.getElementById('turno-fin').value = '';

  // Cerrar modal
  document.getElementById('modal-turno').style.display = 'none';
  document.body.style.overflow = '';
});

// Registrar pago
// Abrir modal de pagos
document.getElementById('btn-registrar-pago').addEventListener('click', () => {
  document.getElementById('modal-pago').style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

// Cerrar modal
document.getElementById('btn-cancelar-pago').addEventListener('click', () => {
  document.getElementById('modal-pago').style.display = 'none';
  document.body.style.overflow = '';
});

// Cerrar al hacer clic fuera
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-pago');
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Autocompletar cargo
document.getElementById('pago-empleado').addEventListener('input', (e) => {
  const valor = e.target.value.trim().toLowerCase();
  const encontrado = empleados.find(emp =>
    emp.id.toLowerCase() === valor || emp.nombre.toLowerCase().includes(valor)
  );
  document.getElementById('pago-cargo').value = encontrado ? encontrado.cargo : '';
});

// Registrar pago
document.getElementById('btn-registrar-pago-modal').addEventListener('click', () => {
  const nombre = document.getElementById('pago-empleado').value.trim();
  const cargo = document.getElementById('pago-cargo').value.trim();
  const fecha = document.getElementById('pago-fecha').value;
  const monto = document.getElementById('pago-monto').value;
  const metodo = document.getElementById('pago-metodo').value;

  if (!nombre || !cargo || !fecha || !monto || !metodo) {
    alert('Completa todos los campos.');
    return;
  }

  const tbody = document.querySelector('#pagos table tbody');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${cargo}</td>
    <td>${fecha}</td>
    <td>€${parseFloat(monto).toFixed(2)}</td>
    <td>${metodo}</td>
    <td><button class="edit-btn">Editar</button></td>
  `;
  tbody.appendChild(fila);

  // Limpiar y cerrar
  document.getElementById('pago-empleado').value = '';
  document.getElementById('pago-cargo').value = '';
  document.getElementById('pago-fecha').value = '';
  document.getElementById('pago-monto').value = '';
  document.getElementById('pago-metodo').value = '';
  document.getElementById('modal-pago').style.display = 'none';
  document.body.style.overflow = '';
});

// Inicializar contenido
renderTurnos();
renderPagos();
renderRecibos();
renderSolicitudes();