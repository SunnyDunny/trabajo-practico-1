document.addEventListener('DOMContentLoaded', () => {
    const tablaClasificaciones = document.getElementById('tabla-clasificaciones').querySelector('tbody');
    
    // Recupera las clasificaciones del localstorage
    const clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];
  
    // Itera sobre las clasificaciones y añadirlas a la tabla
    clasificaciones.forEach(clasificacion => {
      const fila = document.createElement('tr');

      const celdaGanador = document.createElement('td');
      celdaGanador.textContent = clasificacion.jugador;
      fila.appendChild(celdaGanador);

      const celdaPuntaje = document.createElement('td');
      celdaPuntaje.textContent = clasificacion.puntaje;
      fila.appendChild(celdaPuntaje);
  
      const celdaFecha = document.createElement('td');
      celdaFecha.textContent = new Date(clasificacion.fecha).toLocaleString();
      fila.appendChild(celdaFecha);
      
      // Crear celdas para cada propiedad
      const celdaJuego = document.createElement('td');
      celdaJuego.textContent = clasificacion.juego;
      fila.appendChild(celdaJuego);
  
      // Añadir la fila a la tabla
      tablaClasificaciones.appendChild(fila);
    });
  });
  