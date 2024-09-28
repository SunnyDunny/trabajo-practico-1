// Leer las clasificaciones de localStorage
window.onload = function() {
    const clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];
    const tablaClasificaciones = document.querySelector('#tabla-clasificaciones tbody');
  
    // Limpiar la tabla
    tablaClasificaciones.innerHTML = '';
  
    // Llenar la tabla con las clasificaciones almacenadas
    clasificaciones.forEach(clasificacion => {
      const fila = document.createElement('tr');
      const celdaJugador = document.createElement('td');
      const celdaPuntaje = document.createElement('td');
      const celdaFecha = document.createElement('td');
      const celdaJuego = document.createElement('td');
  
      celdaJugador.innerText = clasificacion.jugador;
      celdaPuntaje.innerText = clasificacion.puntaje;
      celdaFecha.innerText = new Date(clasificacion.fecha).toLocaleDateString(); // Convertir la fecha a formato legible
      celdaJuego.innerText = clasificacion.juego;
  
      fila.appendChild(celdaJugador);
      fila.appendChild(celdaPuntaje);
      fila.appendChild(celdaFecha);
      fila.appendChild(celdaJuego);
      tablaClasificaciones.appendChild(fila);
    });
  };
  