// Definimos la baraja española de 40 cartas
const baraja = [
    { valor: 1, palo: 'Oros', imagen:'1_oro.jpg' },
    { valor: 2, palo: 'Oros', imagen:'2_oro.jpg' },
    { valor: 3, palo: 'Oros', imagen:'3_oro.jpg' },
    { valor: 4, palo: 'Oros', imagen:'4_oro.jpg' },
    { valor: 5, palo: 'Oros', imagen:'5_oro.jpg' },
    { valor: 6, palo: 'Oros', imagen:'6_oro.jpg' },
    { valor: 7, palo: 'Oros', imagen:'7_oro.jpg' },
    { valor: 10, palo: 'Oros', figura: 'sota_oro.jpg' },
    { valor: 10, palo: 'Oros', figura: 'caballo_oro.jpg' },
    { valor: 10, palo: 'Oros', figura: 'rey_oro.jpg' },
    { valor: 1, palo: 'Copas', imagen: '1_copa.jpg' },
    { valor: 2, palo: 'Copas', imagen: '2_copa.jpg' },
    { valor: 3, palo: 'Copas', imagen: '3_copa.jpg' },
    { valor: 4, palo: 'Copas', imagen: '4_copa.jpg' },
    { valor: 5, palo: 'Copas', imagen: '5_copa.jpg' },
    { valor: 6, palo: 'Copas', imagen: '6_copa.jpg' },
    { valor: 7, palo: 'Copas', imagen: '7_copa.jpg' },
    { valor: 10, palo: 'Copas', figura: 'sota_copa.jpg' },
    { valor: 10, palo: 'Copas', figura: 'caballo_copa.jpg' },
    { valor: 10, palo: 'Copas', figura: 'rey_copa.jpg' },
    { valor: 1, palo: 'Espadas', imagen: '1_espada.jpg' },
    { valor: 2, palo: 'Espadas', imagen: '2_espada.jpg' },
    { valor: 3, palo: 'Espadas', imagen: '3_espada.jpg' },
    { valor: 4, palo: 'Espadas', imagen: '4_espada.jpg' },
    { valor: 5, palo: 'Espadas', imagen: '5_espada.jpg' },
    { valor: 6, palo: 'Espadas', imagen: '6_espada.jpg' },
    { valor: 7, palo: 'Espadas', imagen: '7_espada.jpg' },
    { valor: 10, palo: 'Espadas', figura: 'sota_espada.jpg' },
    { valor: 10, palo: 'Espadas', figura: 'caballo_espada.jpg' },
    { valor: 10, palo: 'Espadas', figura: 'rey_espada.jpg' },
    { valor: 1, palo: 'Bastos', imagen: '1_basto.jpg' },
    { valor: 2, palo: 'Bastos', imagen: '2_basto.jpg' },
    { valor: 3, palo: 'Bastos', imagen: '3_basto.jpg' },
    { valor: 4, palo: 'Bastos', imagen: '4_basto.jpg' },
    { valor: 5, palo: 'Bastos', imagen: '5_basto.jpg' },
    { valor: 6, palo: 'Bastos', imagen: '6_basto.jpg' },
    { valor: 7, palo: 'Bastos', imagen: '7_basto.jpg' },
    { valor: 10, palo: 'Bastos', figura: 'sota_basto.jpg' },
    { valor: 10, palo: 'Bastos', figura: 'caballo_basto.jpg' },
    { valor: 10, palo: 'Bastos', figura: 'rey_basto.jpg' }
  ];
  
  // Definimos la función para jugar un turno
function jugarTurno(jugador, computadora) {
    // Repartimos 3 cartas a cada jugador
    const cartasJugador = baraja.slice(0, 3);
    const cartasComputadora = baraja.slice(3, 6);
  
    // Creamos los botones de apuesta
    const apuesta5 = document.getElementById('apuesta-5');
    const apuesta10 = document.getElementById('apuesta-10');
    const apuesta15 = document.getElementById('apuesta-15');
  
    // Agregamos eventos a los botones de apuesta
    apuesta5.addEventListener('click', () => {
      jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, 5);
    });
    apuesta10.addEventListener('click', () => {
      jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, 10);
    });
    apuesta15.addEventListener('click', () => {
      jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, 15);
    });
  }
  
  // Definimos la función para jugar rondas
  function jugarRondas(jugador, computadora, cartasJugador, cartasComputadora, apuesta) {
    // Jugamos 3 rondas
    let rondasGanadasJugador = 0;
    let rondasGanadasComputadora = 0;
    for (let i = 0; i < 3; i++) {
      // Jugamos una ronda
      const cartaJugador = cartasJugador[i];
      const cartaComputadora = cartasComputadora[i];
  
      // Comparamos las cartas y determinamos quién gana la ronda
      if (cartaJugador.valor > cartaComputadora.valor) {
        rondasGanadasJugador++;
      } else if (cartaJugador.valor < cartaComputadora.valor) {
        rondasGanadasComputadora++;
      }
    }
  
    // Determinamos quién gana el turno
    if (rondasGanadasJugador > rondasGanadasComputadora) {
      jugador.puntos += apuesta;
    } else if (rondasGanadasJugador < rondasGanadasComputadora) {
      computadora.puntos += apuesta;
    } else {
      jugador.puntos += apuesta / 2;
      computadora.puntos += apuesta / 2;
    }
  
    // Verificamos si alguien ganó el juego
    if (jugador.puntos >= 50) {
      console.log('¡Ganaste!');
      return;
    } else if (computadora.puntos >= 50) {
      console.log('¡La computadora ganó!');
      return;
    }
  }
  
  // Definimos los jugadores
  const jugador = { puntos: 0 };
  const computadora = { puntos: 0 };
  
  // Creamos los botones de apuesta
  const apuesta5 = document.createElement('button');
  apuesta5.id = 'apuesta-5';
  apuesta5.textContent = 'Apuesta 5';
  document.body.appendChild(apuesta5);
  
  const apuesta10 = document.createElement('button');
  apuesta10.id = 'apuesta-10';
  apuesta10.textContent = 'Apuesta 10';
  document.body.appendChild(apuesta10);
  
  const apuesta15 = document.createElement('button');
  apuesta15.id = 'apuesta-15';
  apuesta15.textContent = 'Apuesta 15';
  document.body.appendChild(apuesta15);
  
  // Jugamos turnos hasta que alguien gane
  jugarTurno(jugador, computadora);