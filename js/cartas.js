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
let cartasApostadas = []; // Almacenar las cartas apostadas

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
  cartasApostadas = [];

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

  // Descartar la carta seleccionada
  const cartaApostadaJugador = jugador.cartas[indiceCartaJugador]; // Guardar la carta apostada
  cartasApostadas.push(cartaApostadaJugador); // Agregar a las cartas apostadas
  jugador.cartas.splice(indiceCartaJugador, 1); // Eliminar la carta del array

  const indiceCartaComputadora = Math.floor(Math.random() * computadora.cartas.length);
  const cartaApostadaComputadora = computadora.cartas[indiceCartaComputadora];

  // Descartar la carta de la computadora
  cartasApostadas.push(cartaApostadaComputadora);
  computadora.cartas.splice(indiceCartaComputadora, 1);

  // Verificar quién gana
  if (cartaApostadaJugador.valor > cartaApostadaComputadora.valor) {
    jugador.puntos += apuesta;
    document.getElementById('status').textContent = `¡Ganaste esta ronda! Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  } else if (cartaApostadaJugador.valor < cartaApostadaComputadora.valor) {
    computadora.puntos += apuesta;
    document.getElementById('status').textContent = `Perdiste esta ronda. Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  } else {
    document.getElementById('status').textContent = `Empate en esta ronda. Puntos Jugador: ${jugador.puntos} | Puntos Computadora: ${computadora.puntos}`;
  }

  // Mostrar qué carta se apostó
  document.getElementById('instrucciones').innerHTML += `<br>Tu carta apostada: ${cartaApostadaJugador.valor} de ${cartaApostadaJugador.palo}`;
  document.getElementById('instrucciones').innerHTML += `<br>Carta de la computadora: ${cartaApostadaComputadora.valor} de ${cartaApostadaComputadora.palo}`;

  // Verificar si se ha llegado al final del turno
  if (rondaActual < 3) {
    rondaActual++;
    setTimeout(() => {
      mostrarCartas(); // Mostrar cartas restantes
      document.getElementById('instrucciones').textContent = `Apuesta de ${apuesta} puntos. Ronda ${rondaActual}: selecciona una carta.`;
    }, 1000);
  } else {
    // Al final del turno, descartar cartas y verificar ganadores
    mostrarCartas();
    jugador.cartas = []; // Descartar cartas del jugador
    computadora.cartas = []; // Descartar cartas de la computadora
    rondaActual = 1; // Reiniciar el conteo de rondas

    // Volver a barajar las cartas si no hay ganador
    if (jugador.puntos >= 50 || computadora.puntos >= 50) {
      if (jugador.puntos >= 50) {
        alert('¡Felicidades! Has ganado el juego.');
      } else {
        alert('La computadora ha ganado el juego. ¡Mejor suerte la próxima vez!');
      }
      reiniciarJuego();
    } else {
      comenzarNuevoTurno(); // Iniciar nuevo turno
    }
  }
}

// Añadir eventos a los botones de apuesta
document.getElementById('apuesta-5').onclick = () => establecerApuesta(5);
document.getElementById('apuesta-10').onclick = () => establecerApuesta(10);
document.getElementById('apuesta-15').onclick = () => establecerApuesta(15);


function guardarClasificacion() {
  try {
    // Recuperar el array de clasificaciones del localStorage o crear uno nuevo
    let clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];

    // Crear un objeto de clasificación con el puntaje del jugador y la computadora
    let clasificacion = {
      juego: "Juego de Cartas",
      fecha: new Date().toISOString(),
      jugador: jugador.puntos >= 50 ? "Jugador" : "Computadora",
      puntaje: jugador.puntos >= 50 ? jugador.puntos : computadora.puntos
    };

    // Agregar la clasificación al array de clasificaciones
    clasificaciones.push(clasificacion);

    // Ordenar las clasificaciones por puntaje de mayor a menor
    clasificaciones.sort((a, b) => b.puntaje - a.puntaje);

    // Guardar solo las tres mejores clasificaciones
    clasificaciones = clasificaciones.slice(0, 3);

    // Guardar el array de clasificaciones en el localStorage
    localStorage.setItem('clasificaciones', JSON.stringify(clasificaciones));
  } catch (error) {
    console.error(error);
  }
}


function finalizarJuego() {
  // Verificar si el jugador o la computadora llegó a 50 puntos
  if (jugador.puntos >= 50 || computadora.puntos >= 50) {
    if (jugador.puntos >= 50) {
      alert('¡Felicidades! Has ganado el juego.');
    } else {
      alert('La computadora ha ganado el juego. ¡Mejor suerte la próxima vez!');
    }
    guardarClasificacion(); // Guarda la clasificación
    reiniciarJuego();
  } else {
    comenzarNuevoTurno();  // Si no hay ganador, inicia un nuevo turno
  }
}


// Llamar a finalizarJuego al terminar cada turno en la lógica existente
if (rondaActual < 3) {
  rondaActual++;
  setTimeout(() => {
    mostrarCartas(); // Mostrar cartas restantes
    document.getElementById('instrucciones').textContent = `Apuesta de ${apuesta} puntos. Ronda ${rondaActual}: selecciona una carta.`;
  }, 1000);
} else {
  mostrarCartas();
  jugador.cartas = [];
  computadora.cartas = [];
  rondaActual = 1;

  // Finaliza el juego o continúa si no hay ganador
  finalizarJuego();
}

  // Reiniciar el juego después de mostrar el mensaje
  reiniciarJuego();

  console.log(JSON.parse(localStorage.getItem('clasificaciones')));



