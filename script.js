// Función para obtener los usuarios del localStorage
function obtenerUsuarios() {
    let usuariosGuardados = localStorage.getItem('usuarios');
    return usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
}

// Función para guardar los usuarios en el localStorage
function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Función para mostrar los usuarios en la tabla
function mostrarUsuarios() {
    const usuarios = obtenerUsuarios();
    const tabla = document.getElementById('tablaUsuarios');
    tabla.innerHTML = ''; // Limpiar la tabla antes de cargar los usuarios

    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.cedula}</td>
            <td>${usuario.email}</td>
        `;
        tabla.appendChild(fila);
    });
}

// Validar si la cédula ya existe
function cedulaExiste(cedula) {
    const usuarios = obtenerUsuarios();
    return usuarios.some(usuario => usuario.cedula === cedula);
}

// Manejar el envío del formulario de registro
document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
    const email = document.getElementById('email').value;

    // Validar que la cédula sea un número
    if (!/^\d+$/.test(cedula)) {
        alert('La cédula debe ser un número.');
        return;
    }

    // Validar que la cédula no esté duplicada
    if (cedulaExiste(cedula)) {
        alert('La cédula ya está registrada.');
        return;
    }

    // Obtener el array de usuarios y agregar el nuevo usuario
    const usuarios = obtenerUsuarios();
    const nuevoUsuario = { nombre, cedula, email };
    usuarios.push(nuevoUsuario);

    // Guardar el array actualizado en el localStorage
    guardarUsuarios(usuarios);

    // Actualizar la tabla con el nuevo usuario
    mostrarUsuarios();

    // Limpiar el formulario
    document.getElementById('registroForm').reset();
});

// Función para cargar los usuarios iniciales en la tabla al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarUsuarios();
});
