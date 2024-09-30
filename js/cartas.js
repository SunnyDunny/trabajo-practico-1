// Definición de baraja
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

// Variables del juego
let rondaActual = 1;
let apuesta = 0;
let cartasApostadas = []; // Cartas apostadas
let nombreJugador = '';


// baraja las cartas
function barajarCartas(baraja) {
  return baraja.sort(() => Math.random() - 0.5);
}

// reinicia el juego
function reiniciarJuego() {
  jugador.puntos = 0;
  computadora.puntos = 0;
  rondaActual = 1;
  jugador.cartas = [];
  computadora.cartas = [];
  cartasApostadas = [];

  document.querySelector('#status').textContent = `Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  document.querySelector('#instrucciones').innerHTML = '';

  comenzarNuevoTurno();
}

// Función para comenzar un nuevo turno cuando no hay ganador
function comenzarNuevoTurno() {
  const barajaBarajada = barajarCartas([...baraja]);
  jugador.cartas = barajaBarajada.slice(0, 3);
  computadora.cartas = barajaBarajada.slice(3, 6);

  mostrarCartas();
}

// Función para mostrar las cartas del jugador en el respectivo id
function mostrarCartas() {
  const cartasDiv = document.querySelector('#cartas-jugador');
  cartasDiv.innerHTML = '';

  jugador.cartas.forEach((carta, index) => {
    const img = document.createElement('img');
    img.src = carta.imagen;
    img.alt = `Carta ${index + 1}`;
    img.className = 'carta';
    img.onclick = () => jugarTurno(index);
    cartasDiv.appendChild(img); //añade elemento en eldiv (se añade nodo/elemento como nuevo hijo de un nodo ya existente)
  });

  // Muestra el reverso de las cartas para la computadora
  const cartasCompDiv = document.querySelector('#cartas-computadora');
  cartasCompDiv.innerHTML = '';
  computadora.cartas.forEach(carta => {
    const img = document.createElement('img');
    img.src = './imagenes/reverso.jpg'; // Cambia a la imagen del reverso de la carta
    img.alt = 'Carta Computadora';
    img.className = 'carta';
    cartasCompDiv.appendChild(img);
  });
}

// Establece apuesta
function establecerApuesta(valor) {
  apuesta = valor;
  document.querySelector('#instrucciones').textContent = `Apostaste ${apuesta}. | Ronda ${rondaActual}: seleccioná una carta.`;
}

// Función para jugar un turno
function jugarTurno(indiceCartaJugador) {
  if (apuesta === 0) {
    alert('¡Tenés que establecer una apuesta antes de jugar!');
    return;
  }

  // Descartar la carta seleccionada cuando es apostada
  const cartaApostadaJugador = jugador.cartas[indiceCartaJugador]; // Guardar la carta apostada
  cartasApostadas.push(cartaApostadaJugador); // Agregar a las cartas apostadas
  jugador.cartas.splice(indiceCartaJugador, 1); // Elimina la carta del array

  const indiceCartaComputadora = Math.floor(Math.random() * computadora.cartas.length);
  const cartaApostadaComputadora = computadora.cartas[indiceCartaComputadora];

  // Descartar la carta de la computadora
  cartasApostadas.push(cartaApostadaComputadora);
  computadora.cartas.splice(indiceCartaComputadora, 1);

  // Verificar quién gana
  if (cartaApostadaJugador.valor > cartaApostadaComputadora.valor) {
    jugador.puntos += apuesta;
    document.querySelector('#status').textContent = `¡Ganaste esta ronda! | Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  } else if (cartaApostadaJugador.valor < cartaApostadaComputadora.valor) {
    computadora.puntos += apuesta;
    document.querySelector('#status').textContent = `Perdiste esta ronda. | Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  } else {
    document.querySelector('#status').textContent = `Empate en esta ronda. | Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  }

  // Mostrar qué carta se apostó
  document.querySelector('#instrucciones').innerHTML += `<br>Tu carta apostada: ${cartaApostadaJugador.valor} de ${cartaApostadaJugador.palo}`;
  document.querySelector('#instrucciones').innerHTML += `<br>Carta de la computadora: ${cartaApostadaComputadora.valor} de ${cartaApostadaComputadora.palo}`;

  // Verifica si se ha llegado al final del turno
  if (rondaActual < 3) {
    rondaActual++;
    setTimeout(() => {
      mostrarCartas(); // Muestra las cartas restantes
      document.querySelector('#instrucciones').textContent = `Apuesta de ${apuesta} puntos. | Ronda ${rondaActual}: seleccioná una carta.`;
    }, 3000);
  } else {
    // Al final del turno, descarta cartas y verifica ganadores
    mostrarCartas();
    jugador.cartas = []; // Descarta las cartas del jugador
    computadora.cartas = []; // Descarta las cartas de la computadora
    rondaActual = 1; // Reinicia el conteo de rondas

    // Vuelve a barajar las cartas si no hay ganador
    if (jugador.puntos >= 50 || computadora.puntos >= 50) {
      if (jugador.puntos >= 50) {
        alert('¡Felicidades ' + nombreJugador + '! Ganaste el juego con ' + jugador.puntos + ' puntos. 🎉');
      } else {
        alert('La computadora ganó el juego con ' + computadora.puntos + ' puntos. ¡Mejor suerte la próxima! 😿');
      }
      guardarClasificacion();
      reiniciarJuego();
    } else {
      comenzarNuevoTurno(); // Inicia nuevo turno
    }
  }
}

// Añade eventos a los botones de apuesta
document.querySelector('#apuesta-5').onclick = () => establecerApuesta(5);
document.querySelector('#apuesta-10').onclick = () => establecerApuesta(10);
document.querySelector('#apuesta-15').onclick = () => establecerApuesta(15);

// Captura el nombre del jugador cuando comienza el juego
document.querySelector('#comenzar-juego').onclick = () => {
  const nombreInput = document.querySelector('#nombre').value.trim();
  if (nombreInput) {
    nombreJugador = nombreInput; // Guarda el nombre del jugador
    document.querySelector('#nombre-jugador').style.display = 'none'; // Oculta el campo de nombre
    comenzarNuevoTurno(); // Inicia el juego
    alert('¡El juego ha comenzado! Establecé tu apuesta y hacé click en una carta.');
  } else {
    alert('Por favor, ingresá tu nombre antes de comenzar.');
  }
};

// Función para guardar la clasificación en localstorage
function guardarClasificacion() {
  const puntaje = Math.max(jugador.puntos, computadora.puntos);
  const jugadorNombre = jugador.puntos >= computadora.puntos ? nombreJugador : 'Computadora';

  const nuevaClasificacion = {
    jugador: jugadorNombre,
    puntaje: puntaje,
    fecha: new Date().toISOString(),
    juego: "Juego de Cartas"
  };

  let clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];

  const indice = clasificaciones.findIndex(clasificacion => clasificacion.juego === "Juego de Cartas" && clasificacion.jugador === jugadorNombre);

  if (indice !== -1) {
    clasificaciones[indice] = nuevaClasificacion; // Actualiza la clasificación existente
  } else {
    clasificaciones.push(nuevaClasificacion); // Agrega nueva clasificación
  }

  clasificaciones.sort((a, b) => b.puntaje - a.puntaje);
  clasificaciones = clasificaciones.slice(0, 3); // Mantiene solo las tres mejores clasificaciones

  console.log('Clasificaciones guardadas:', clasificaciones); // Para depuración

  localStorage.setItem('clasificaciones', JSON.stringify(clasificaciones)); // Guarda en localStorage
}

// Función que se llama al finalizar el juego para verificar si hay ganador y guarda la clasificación
function finalizarJuego() {
  if (jugador.puntos >= 50 || computadora.puntos >= 50) {
    if (jugador.puntos >= 50) {
      alert('¡Felicidades! ' + nombreJugador + '! Ganaste el juego con ' + jugador.puntos + ' puntos 🎉');
    } else {
      alert('La computadora ganó el juego con ' + computadora.puntos + ' puntos. ¡Mejor suerte la próxima! 😿');
    }
    guardarClasificacion(); // Guarda la clasificación al finalizar el juego
    reiniciarJuego(); // Reinicia el juego después de guardar la clasificación
  } else {
    comenzarNuevoTurno(); // Continúa jugando si no se ha alcanzado el puntaje
  }
}
