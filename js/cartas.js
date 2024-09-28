// Definimos la baraja española de 40 cartas
const baraja = [
  { valor: 1, palo: 'Oros', imagen:'./imagenes/1_oro.jpg' },
  { valor: 2, palo: 'Oros', imagen:'./imagenes/2_oro.jpg' },
  { valor: 3, palo: 'Oros', imagen:'./imagenes/3_oro.jpg' },
  { valor: 4, palo: 'Oros', imagen:'./imagenes/4_oro.jpg' },
  { valor: 5, palo: 'Oros', imagen:'./imagenes/5_oro.jpg' },
  { valor: 6, palo: 'Oros', imagen:'./imagenes/6_oro.jpg' },
  { valor: 7, palo: 'Oros', imagen:'./imagenes/7_oro.jpg' },
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

// Función para barajar las cartas
function barajarCartas(baraja) {
  return baraja.sort(() => Math.random() - 0.5);
}

// Definimos los jugadores
const jugador = { puntos: 0 };
const computadora = { puntos: 0 };

// Variables para manejar las rondas
let rondaActual = 1;
let rondasSinGanador = 0;

// Función para deshabilitar los botones después de terminar el juego
function deshabilitarBotones() {
  document.getElementById('apuesta-5').disabled = true;
  document.getElementById('apuesta-10').disabled = true;
  document.getElementById('apuesta-15').disabled = true;
}

// Función para jugar un turno
function jugarTurno(apuesta) {
  const barajaBarajada = barajarCartas([...baraja]);
  const cartasJugador = barajaBarajada.slice(0, 3);
  const cartasComputadora = barajaBarajada.slice(3, 6);

  jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, apuesta);
}

// Función para jugar rondas
function jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, apuesta) {
  let rondasGanadasJugador = 0;
  let rondasGanadasComputadora = 0;

  // Actualizar imágenes de las cartas del jugador
  for (let i = 0; i < cartasJugador.length; i++) {
    document.getElementById(`carta${i + 1}-jugador`).src = cartasJugador[i].imagen;
  }

  // Actualizar imágenes de las cartas de la computadora
  for (let i = 0; i < cartasComputadora.length; i++) {
    document.getElementById(`carta${i + 1}-computadora`).src = cartasComputadora[i].imagen;
  }

  // Resetear instrucciones para la nueva ronda
  let instruccionesHTML = `Ronda ${rondaActual}: `;

  for (let i = 0; i < 3; i++) {
    const cartaJugador = cartasJugador[i];
    const cartaComputadora = cartasComputadora[i];

    instruccionesHTML += `Jugador - ${cartaJugador.valor} de ${cartaJugador.palo}, Computadora - ${cartaComputadora.valor} de ${cartaComputadora.palo} | `;

    if (cartaJugador.valor > cartaComputadora.valor) {
      rondasGanadasJugador++;
    } else if (cartaJugador.valor < cartaComputadora.valor) {
      rondasGanadasComputadora++;
    }
  }

  // Asignar puntos
  if (rondasGanadasJugador > rondasGanadasComputadora) {
    jugador.puntos += apuesta;
  } else if (rondasGanadasJugador < rondasGanadasComputadora) {
    computadora.puntos += apuesta;
  } else {
    jugador.puntos += apuesta / 2;
    computadora.puntos += apuesta / 2;
  }

  // Actualizar el puntaje en pantalla
  document.getElementById('status').textContent = `Ronda: ${rondaActual} | Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  document.getElementById('instrucciones').innerHTML = instruccionesHTML;

  // Verificar si alguien ganó el juego
  if (jugador.puntos >= 50) {
    document.getElementById('status').textContent = '¡Ganaste!';
    deshabilitarBotones();
    return;
  } else if (computadora.puntos >= 50) {
    document.getElementById('status').textContent = '¡La computadora ganó!';
    deshabilitarBotones();
    return;
  }

  // Aumentar ronda y controlar la lógica de repartir nuevas cartas
  rondaActual++;
  rondasSinGanador++;

  if (rondasSinGanador === 3) {
    // Mostrar alert al barajar nuevamente
    alert('¡No hubo ganador en 3 rondas! Barajando nuevas cartas.');

    // Repartir nuevas cartas y reiniciar rondas
    rondaActual = 1;
    rondasSinGanador = 0;
    document.getElementById('instrucciones').innerHTML += '<br>Repartiendo nuevas cartas para 3 rondas más...';
    jugarTurno(0); // Llamamos a jugarTurno con apuesta 0 para repartir nuevas cartas
  }
}

// Asignamos los eventos a los botones ya existentes en el HTML
const apuesta5 = document.getElementById('apuesta-5');
const apuesta10 = document.getElementById('apuesta-10');
const apuesta15 = document.getElementById('apuesta-15');

apuesta5.addEventListener('click', () => jugarTurno(5));
apuesta10.addEventListener('click', () => jugarTurno(10));
apuesta15.addEventListener('click', () => jugarTurno(15));
