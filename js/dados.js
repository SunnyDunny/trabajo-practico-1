// Definir las imágenes de los dados
const dados = {
    1: new Image(),
    2: new Image(),
    3: new Image(),
    4: new Image(),
    5: new Image(),
    6: new Image(),
};

dados[1].src = './imagenes/dado1.png';
dados[2].src = './imagenes/dado2.png';
dados[3].src = './imagenes/dado3.png';
dados[4].src = './imagenes/dado4.png';
dados[5].src = './imagenes/dado5.png';
dados[6].src = './imagenes/dado6.png';

let puntosJugador1 = 0;
let puntosJugador2 = 0;
const limitePuntos = 100;

// Función para lanzar un dado
function lanzarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

// Función para lanzar dos dados
function lanzarDosDados() {
    const dado1 = lanzarDado();
    const dado2 = lanzarDado();
    return { dado1, dado2 };
}

// Función para calcular los puntos de un lanzamiento
function calcularPuntos(dado1, dado2) {
    let puntos = dado1 + dado2;
    if (dado1 === dado2) {
        puntos += 10; // Puntos adicionales por lanzar dos dados iguales
    }
    if (dado1 === 6 || dado2 === 6) {
        puntos += 5; // Puntos adicionales por lanzar un "dado de la suerte"
    }
    return puntos;
}

// Función para mostrar los dados lanzados
function mostrarDados(jugador, dado1, dado2) {
    document.querySelector(`#dado1-jugador${jugador}`).src = dados[dado1].src;
    document.querySelector(`#dado2-jugador${jugador}`).src = dados[dado2].src;
}

// Función para actualizar la tabla de historial
function actualizarTablaHistorial(jugador, puntos, esRobo) {
    const tabla = document.querySelector('#historial');
    const fila = document.createElement('tr');
    const celdaJugador = document.createElement('td');
    const celdaPuntos = document.createElement('td');
    const celdaRobo = document.createElement('td');

    celdaJugador.innerText = `Jugador ${jugador}`;
    celdaPuntos.innerText = puntos > 0 ? `+${puntos}` : `${puntos}`;
    celdaRobo.innerText = esRobo ? 'Sí' : 'No';

    fila.appendChild(celdaJugador);
    fila.appendChild(celdaPuntos);
    fila.appendChild(celdaRobo);
    tabla.appendChild(fila);
}

// Función para verificar y guardar el puntaje más alto en localStorage
function guardarMaxPuntaje() {
    let maxPuntaje = localStorage.getItem('maxPuntaje');
    let nombreJugador1 = document.querySelector('#nombre-jugador1').value || 'Desconocido';
    let nombreJugador2 = document.querySelector('#nombre-jugador2').value || 'Jugador 2';

    if (!maxPuntaje || puntosJugador1 > maxPuntaje || puntosJugador2 > maxPuntaje) {
        maxPuntaje = Math.max(puntosJugador1, puntosJugador2);
        let maxNombre = puntosJugador1 >= puntosJugador2 ? nombreJugador1 : nombreJugador2; // Determinar quién ganó
        localStorage.setItem('maxPuntaje', maxPuntaje);
        localStorage.setItem('maxNombre', maxNombre); // Guardar también el nombre
    }

    // Actualizar la visualización del puntaje más alto
    document.querySelector('#max-puntaje').innerText = `Puntaje más alto: ${maxPuntaje} - ${localStorage.getItem('maxNombre')}`;
}



// Función para jugar el juego
function jugar() {
    if (puntosJugador1 >= limitePuntos || puntosJugador2 >= limitePuntos) {
        return; // El juego termina cuando un jugador llega a 100 puntos
    }

    // Lanzar los dados para el jugador 1
    const jugador1 = lanzarDosDados();
    let puntos1 = calcularPuntos(jugador1.dado1, jugador1.dado2);
    mostrarDados(1, jugador1.dado1, jugador1.dado2);

    // Lanzar los dados para el jugador 2
    const jugador2 = lanzarDosDados();
    let puntos2 = calcularPuntos(jugador2.dado1, jugador2.dado2);
    mostrarDados(2, jugador2.dado1, jugador2.dado2);

    // Si ambos jugadores sacan el mismo valor en algún dado, roban puntos
    if (jugador1.dado1 === jugador2.dado1 || jugador1.dado2 === jugador2.dado2) {
        const roboPuntos = Math.min(5, puntosJugador1); // Se roban hasta 5 puntos
        puntos1 += roboPuntos;
        puntos2 -= roboPuntos;
        actualizarTablaHistorial(1, roboPuntos, true);
        actualizarTablaHistorial(2, -roboPuntos, true);
    }

    puntosJugador1 += puntos1;
    puntosJugador2 += puntos2;

    // Actualizar el puntaje en la pantalla
    document.querySelector('#puntos-jugador1').innerText = puntosJugador1;
    document.querySelector('#puntos-jugador2').innerText = puntosJugador2;

    // Registrar el puntaje en la tabla de historial
    actualizarTablaHistorial(1, puntos1, false);
    actualizarTablaHistorial(2, puntos2, false);

    // Verificar si algún jugador alcanzó los 100 puntos
    if (puntosJugador1 >= limitePuntos) {
        document.querySelector('#resultado').innerText = '¡Jugador 1 gana el juego!';
        guardarMaxPuntaje();
    } else if (puntosJugador2 >= limitePuntos) {
        document.querySelector('#resultado').innerText = '¡Jugador 2 gana el juego!';
        guardarMaxPuntaje();
    }
    if (puntosJugador1 >= limitePuntos) {
        document.querySelector('#resultado').innerText = '¡Jugador 1 gana el juego!';
        guardarMaxPuntaje();
        // Mostrar mensaje de que se ha guardado el puntaje
        alert(`¡${document.querySelector('#nombre-jugador1').value} ha ganado!`);
    } else if (puntosJugador2 >= limitePuntos) {
        document.querySelector('#resultado').innerText = '¡Jugador 2 gana el juego!';
        guardarMaxPuntaje();
        // Mostrar mensaje de que se ha guardado el puntaje
        alert(`¡${document.querySelector('#nombre-jugador2').value} ha ganado!`);
    }
    
}

// Función para reiniciar el juego
function reiniciarJuego() {
    puntosJugador1 = 0;
    puntosJugador2 = 0;
    document.querySelector('#puntos-jugador1').innerText = puntosJugador1;
    document.querySelector('#puntos-jugador2').innerText = puntosJugador2;
    document.querySelector('#resultado').innerText = 'Comienza un nuevo juego.';
    document.querySelector('#historial').innerHTML = ''; // Limpiar historial
}

// Añadir evento para iniciar el juego cuando se haga clic en el botón "Jugar"
document.querySelector('#jugar-btn').addEventListener('click', jugar);

// Añadir evento para reiniciar el juego cuando se haga clic en el botón "Reiniciar"
document.querySelector('#reiniciar-btn').addEventListener('click', reiniciarJuego);

// Mostrar el puntaje más alto al cargar la página
window.onload = function() {
    const maxPuntaje = localStorage.getItem('maxPuntaje') || 0;
    const maxNombre = localStorage.getItem('maxNombre') || 'Desconocido';
    document.querySelector('#max-puntaje').innerText = `Puntaje más alto: ${maxPuntaje} - ${maxNombre}`;
};
