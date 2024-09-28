   // Definimos la baraja española de 40 cartas
   const baraja = [
    { valor: 1, palo: 'Oros', imagen: './imagenes/1_oro.jpg' },
    { valor: 2, palo: 'Oros', imagen: './imagenes/2_oro.jpg' },
    { valor: 3, palo: 'Oros', imagen: './imagenes/3_oro.jpg' },
    { valor: 4, palo: 'Oros', imagen: './imagenes/4_oro.jpg' },
    { valor: 5, palo: 'Oros', imagen: './imagenes/5_oro.jpg' },
    { valor: 6, palo: 'Oros', imagen: './imagenes/6_oro.jpg' },
    { valor: 7, palo: 'Oros', imagen: './imagenes/7_oro.jpg' },
    { valor: 10, palo: 'Oros', imagen: './imagenes/sota_oro.jpg' },
    { valor: 10, palo: 'Oros', imagen: './imagenes/caballo_oro.jpg' },
    { valor: 10, palo: 'Oros', imagen: './imagenes/rey_oro.jpg' },
    { valor: 1, palo: 'Copas', imagen: './imagenes/1_copa.jpg' },
    { valor: 2, palo: 'Copas', imagen: './imagenes/2_copa.jpg' },
    { valor: 3, palo: 'Copas', imagen: './imagenes/3_copa.jpg' },
    { valor: 4, palo: 'Copas', imagen: './imagenes/4_copa.jpg' },
    { valor: 5, palo: 'Copas', imagen: './imagenes/5_copa.jpg' },
    { valor: 6, palo: 'Copas', imagen: './imagenes/6_copa.jpg' },
    { valor: 7, palo: 'Copas', imagen: './imagenes/7_copa.jpg' },
    { valor: 10, palo: 'Copas', imagen: './imagenes/sota_copa.jpg' },
    { valor: 10, palo: 'Copas', imagen: './imagenes/caballo_copa.jpg' },
    { valor: 10, palo: 'Copas', imagen: './imagenes/rey_copa.jpg' },
    { valor: 1, palo: 'Espadas', imagen: './imagenes/1_espada.jpg' },
    { valor: 2, palo: 'Espadas', imagen: './imagenes/2_espada.jpg' },
    { valor: 3, palo: 'Espadas', imagen: './imagenes/3_espada.jpg' },
    { valor: 4, palo: 'Espadas', imagen: './imagenes/4_espada.jpg' },
    { valor: 5, palo: 'Espadas', imagen: './imagenes/5_espada.jpg' },
    { valor: 6, palo: 'Espadas', imagen: './imagenes/6_espada.jpg' },
    { valor: 7, palo: 'Espadas', imagen: './imagenes/7_espada.jpg' },
    { valor: 10, palo: 'Espadas', imagen: './imagenes/sota_espada.jpg' },
    { valor: 10, palo: 'Espadas', imagen: './imagenes/caballo_espada.jpg' },
    { valor: 10, palo: 'Espadas', imagen: './imagenes/rey_espada.jpg' },
    { valor: 1, palo: 'Bastos', imagen: './imagenes/1_basto.jpg' },
    { valor: 2, palo: 'Bastos', imagen: './imagenes/2_basto.jpg' },
    { valor: 3, palo: 'Bastos', imagen: './imagenes/3_basto.jpg' },
    { valor: 4, palo: 'Bastos', imagen: './imagenes/4_basto.jpg' },
    { valor: 5, palo: 'Bastos', imagen: './imagenes/5_basto.jpg' },
    { valor: 6, palo: 'Bastos', imagen: './imagenes/6_basto.jpg' },
    { valor: 7, palo: 'Bastos', imagen: './imagenes/7_basto.jpg' },
    { valor: 10, palo: 'Bastos', imagen: './imagenes/sota_basto.jpg' },
    { valor: 10, palo: 'Bastos', imagen: './imagenes/caballo_basto.jpg' },
    { valor: 10, palo: 'Bastos', imagen: './imagenes/rey_basto.jpg' }
];

// Variables para los jugadores
const jugador = { puntos: 0, cartas: [] };
const computadora = { puntos: 0, cartas: [] };

// Variables de juego
let rondaActual = 1;
let apuesta = 0;

// Función para barajar las cartas
function barajarCartas(baraja) {
    return baraja.sort(() => Math.random() - 0.5);
}

// Función para reiniciar el juego
function reiniciarJuego() {
    jugador.puntos = 0;
    computadora.puntos = 0;
    rondaActual = 1;
    jugador.cartas = [];
    computadora.cartas = [];

    document.getElementById('status').textContent = `Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
    document.getElementById('instrucciones').innerHTML = '';

    comenzarNuevoTurno();
}

// Función para comenzar un nuevo turno
function comenzarNuevoTurno() {
    const barajaBarajada = barajarCartas([...baraja]);
    jugador.cartas = barajaBarajada.slice(0, 3);
    computadora.cartas = barajaBarajada.slice(3, 6);

    mostrarCartas();
}

// Función para mostrar las cartas del jugador
function mostrarCartas() {
    const cartasDiv = document.getElementById('cartas-jugador');
    cartasDiv.innerHTML = '';

    jugador.cartas.forEach((carta, index) => {
        const img = document.createElement('img');
        img.src = carta.imagen;
        img.alt = `Carta ${index + 1}`;
        img.className = 'carta';
        img.onclick = () => jugarTurno(index);
        cartasDiv.appendChild(img);
    });

    // Mostrar cartas de la computadora (reverso por ahora)
    const cartasCompDiv = document.getElementById('cartas-computadora');
    cartasCompDiv.innerHTML = '';
    computadora.cartas.forEach(carta => {
        const img = document.createElement('img');
        img.src = './imagenes/reverso.jpg'; // Cambia a la imagen del reverso de la carta
        img.alt = 'Carta Computadora';
        img.className = 'carta';
        cartasCompDiv.appendChild(img);
    });
}

// Función para establecer la apuesta
function establecerApuesta(valor) {
    apuesta = valor;
    document.getElementById('instrucciones').textContent = `Apuesta de ${apuesta} puntos realizada. Ronda ${rondaActual}: selecciona una carta.`;
}

// Función para jugar un turno
function jugarTurno(indiceCartaJugador) {
    if (apuesta === 0) {
        alert('Debes establecer una apuesta antes de jugar.');
        return;
    }

    const cartaJugador = jugador.cartas[indiceCartaJugador];
    const cartaComputadora = computadora.cartas[Math.floor(Math.random() * computadora.cartas.length)];

    // Verificar quién gana
    if (cartaJugador.valor > cartaComputadora.valor) {
        jugador.puntos += apuesta;
        document.getElementById('status').textContent = `¡Ganaste esta ronda! Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
    } else if (cartaJugador.valor < cartaComputadora.valor) {
        computadora.puntos += apuesta;
        document.getElementById('status').textContent = `Perdiste esta ronda. Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
    } else {
        document.getElementById('status').textContent = `Empate en esta ronda. Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
    }

    rondaActual++;

    // Verificar si se debe finalizar el juego
    if (jugador.puntos >= 50 || computadora.puntos >= 50) {
        alert('¡El juego ha terminado!');
        reiniciarJuego();
    } else if (rondaActual > 3) {
        alert('No hubo ganador, comienza un nuevo turno.');
        comenzarNuevoTurno();
    } else {
        document.getElementById('instrucciones').textContent = `Ronda ${rondaActual}: selecciona una carta.`;
    }
}

// Comenzar el juego
reiniciarJuego();