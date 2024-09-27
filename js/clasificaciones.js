// Función para cargar y mostrar las clasificaciones en la tabla de clasificaciones
function cargarClasificaciones() {
    const tablaCuerpo = document.querySelector('#tabla-clasificaciones tbody');
    tablaCuerpo.innerHTML = '';  // Limpiar cualquier contenido existente

    // Obtener las clasificaciones guardadas en el localStorage
    let clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];

    // Ordenar las clasificaciones por puntaje (de mayor a menor)
    clasificaciones.sort((a, b) => b.puntaje - a.puntaje);

    // Rellenar la tabla con las clasificaciones
    clasificaciones.forEach((clasificacion, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${clasificacion.jugador}</td>
            <td>${clasificacion.puntaje}</td>
            <td>${clasificacion.juego}</td>
            <td>${new Date(clasificacion.fecha).toLocaleDateString()}</td>
        `;

        tablaCuerpo.appendChild(fila);
    });
}

// Llamar a la función cuando se cargue la página de clasificaciones
document.addEventListener('DOMContentLoaded', cargarClasificaciones);
