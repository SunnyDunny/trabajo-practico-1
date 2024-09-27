document.addEventListener("DOMContentLoaded", function () {
    const formularioIngreso = document.querySelector("#formularioIngreso");
    const formularioRegistro = document.querySelector("#formularioRegistro");
    const enlaceRegistro = document.querySelector("#enlaceRegistro");
    const contenidoPrincipal = document.querySelector("#contenidoPrincipal");
    const contenedorIngreso = document.querySelector(".contenedor-ingreso");
    const contenedorRegistro = document.querySelector(".contenedor-registro");
    const mensajeErrorIngreso = document.querySelector(".contenedor-ingreso .mensaje-error");
    const mensajeErrorRegistro = document.querySelector(".contenedor-registro .mensaje-error");

    // Comprobar si el usuario ya está registrado
    if (localStorage.getItem("usuarioRegistrado")) {
        mostrarFormularioIngreso();
    } else {
        mostrarFormularioRegistro();
    }

    // Mostrar el formulario de registro
    enlaceRegistro.addEventListener("click", function (e) {
        e.preventDefault();
        mostrarFormularioRegistro();
    });

    // Validar el ingreso
    formularioIngreso.addEventListener("submit", function (e) {
        e.preventDefault();
        const usuario = document.querySelector("#usuario").value;
        const contraseña = document.querySelector("#contraseña").value;

        if (validarIngreso(usuario, contraseña)) {
            contenedorIngreso.style.display = "none";
            contenidoPrincipal.style.display = "block";
        } else {
            mensajeErrorIngreso.textContent = "Usuario o contraseña incorrectos.";
        }
    });

    // Valida el registro
    formularioRegistro.addEventListener("submit", function (e) {
        e.preventDefault();
        const nuevoUsuario = document.querySelector("#nuevoUsuario").value;
        const nuevaContraseña = document.querySelector("#nuevaContraseña").value;

        if (nuevoUsuario && nuevaContraseña) {
            registrarUsuario(nuevoUsuario, nuevaContraseña);
            localStorage.setItem("usuarioRegistrado", "true");  // Guarda en local storage
            mensajeErrorRegistro.textContent = "Registro exitoso. Ya podés iniciar sesión.";
            mostrarFormularioIngreso();
        } else {
            mensajeErrorRegistro.textContent = "Por favor, completa todos los campos.";
        }
    });

    // Función para validar el ingreso
    function validarIngreso(usuario, contraseña) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        return usuariosRegistrados.some(function (usuarioRegistrado) {
            return usuarioRegistrado.usuario === usuario && usuarioRegistrado.contraseña === contraseña;
        });
    }

    // Función para registrar un nuevo usuario
    function registrarUsuario(usuario, contraseña) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuariosRegistrados.push({ usuario, contraseña });
        localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));
    }

    // Función para mostrar el formulario de ingreso
    function mostrarFormularioIngreso() {
        contenedorIngreso.style.display = "block";
        contenedorRegistro.style.display = "none";
    }

    // Función para mostrar el formulario de registro
    function mostrarFormularioRegistro() {
        contenedorIngreso.style.display = "none";
        contenedorRegistro.style.display = "block";
    }
});
