// Definición del juego
const juego = {
    preguntas: [
      {
        pregunta: "¿Cuál es el signo zodiacal asociado con las personas nacidas entre el 21 de marzo y el 19 de abril?",
        opciones: ["Cáncer", "Géminis", "Aries", "Sagitario"],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Qué elemento representa el signo Tauro?",
        opciones: ["Agua", "Tierra", "Fuego", "Aire"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cuál es el planeta regente de Géminis?",
        opciones: ["Venus", "Mercurio", "Luna", "Marte"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué signo del zodiaco es conocido por su lealtad y sensibilidad?",
        opciones: ["Cáncer", "Tauro", "Aries", "Virgo"],
        respuestaCorrecta: 0
      },
      {
        pregunta: "¿Cuál es el símbolo del signo Leo?",
        opciones: ["Toro", "Balanza", "Cabra", "León"],
        respuestaCorrecta: 3
      },
      {
        pregunta: "¿Qué elemento comparten los signos Sagitario, Leo y Aries?",
        opciones: ["Aire", "Fuego", "Agua", "Tierra"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cuál es el planeta regente de Capricornio?",
        opciones: ["Jupiter", "Saturno", "Urano", "Neptuno"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Qué signo zodiacal está asociado con el agua y la intuición?",
        opciones: ["Cáncer", "Piscis", "Escorpio", "Libra"],
        respuestaCorrecta: 1
      },
      {
        pregunta: "¿Cuál es el opuesto astrológico de Aries?",
        opciones: ["Leo", "Sagitario", "Libra", "Piscis"],
        respuestaCorrecta: 2
      },
      {
      pregunta: "¿Qué casa astrológica representa la comunicación y los viajes cortos?",
        opciones: ["Casa 2|Tauro", "Casa 9|Sagitario", "Casa 3|Geminis", "Casa 12|Piscis"],
        respuestaCorrecta: 2
      },
      {
        pregunta: "¿Cuál es el signo zodiacal que se asocia con la creatividad y la imaginación?",
          opciones: ["Leo", "Capricornio", "Piscis", "Virgo"],
          respuestaCorrecta: 2
        },
        {
            pregunta: "¿Qué elemento comparten los signos Escorpio, Piscis y Cáncer?",
              opciones: ["Agua", "Tierra", "Aire", "Fuego"],
              respuestaCorrecta: 0
            },
            {
            pregunta: "¿Cuál es el planeta regente de Acuario?",
            opciones: ["Neptuno", "Urano", "Júpiter", "Saturno"],
            respuestaCorrecta: 1
          },
            {
            pregunta: "¿Qué casa astrológica está relacionada con el hogar y la familia?",
                opciones: ["Casa 4|Cáncer", "Casa 7|Libra", "Casa 11|Acuario", "Casa 1|Aries"],
                respuestaCorrecta: 0
                },
                {
                    pregunta: "¿Cuál es el símbolo del signo Virgo?",
                      opciones: ["Cabra", "Virgen", "Balanza", "Arco y Flecha"],
                      respuestaCorrecta: 1
                    },
                    {
                        pregunta: "¿Qué elemento representa el signo Libra?",
                          opciones: ["Tierra", "Agua", "Fuego", "Aire"],
                          respuestaCorrecta: 3
                        },    
                {
                    pregunta: "¿Cuál es el planeta regente de Piscis?",
                      opciones: ["Luna", "Marte", "Neptuno", "Urano"],
                      respuestaCorrecta: 2
                    },
                    {
                        pregunta: "¿Qué casa astrológica se relaciona con la carrera y la ambición?",
                          opciones: ["Casa 3|Tauro", "Casa 6|Virgo", "Casa 10|Capricornio", "Casa 1|Aries"],
                          respuestaCorrecta: 2
                        },
                    {
                        pregunta: "¿Cuál es el signo zodiacal que se asocia con la pasión y la intensidad?",
                          opciones: ["Aries", "Escorpio", "Leo", "Tauro"],
                          respuestaCorrecta: 1
                        },
                    {
                        pregunta: "¿Qué elemento comparten los signos Capricornio, Tauro y Virgo?",
                          opciones: ["Agua", "Fuego", "Tierra", "Aire"],
                          respuestaCorrecta: 2
                        },
    ]
  };
  // Variables del juego
let jugadorActual = 0;
let puntajes = [0, 0];
let preguntasRestantes = [...juego.preguntas];
let preguntaActual = -1;
let jugadores = ["Jugador 1", "Jugador 2"];
let tiempoLimite = 10;
let temporizadorId;
let maxPreguntas = 20;
let preguntaActualSeleccionada = null;

// Elementos del DOM usando querySelector
const divPregunta = document.querySelector("#pregunta");
const divOpciones = document.querySelector("#opciones");
const divPuntajes = document.querySelector("#puntajes");
const btnSiguiente = document.querySelector("#siguiente");
const divResultadoRonda = document.querySelector("#resultado-ronda");
const formJugadores = document.querySelector("#form-jugadores");
const contenedorJuego = document.querySelector("#contenedor-juego");
const divResultadoFinal = document.querySelector("#resultado-final");
const divPuntajeFinal = document.querySelector("#puntaje-final");
const divJugadorActual = document.querySelector("#jugador-actual");
const spanTiempo = document.querySelector("#tiempo");

// Función para iniciar el juego
formJugadores.addEventListener("submit", (e) => {
  e.preventDefault();
  jugadores[0] = document.querySelector("#nombre-jugador1").value || "Jugador 1";
  jugadores[1] = document.querySelector("#nombre-jugador2").value || "Jugador 2";

  document.querySelector("#inicio").style.display = "none";
  contenedorJuego.style.display = "block";

  siguientePregunta();
});

// Función para mostrar una pregunta aleatoria
function siguientePregunta() {
  if (preguntasRestantes.length === 0 || preguntaActual >= maxPreguntas) {
    mostrarResultados();
    return;
  }

  preguntaActual++;
  jugadorActual = (preguntaActual % 2);
  const preguntaIndex = Math.floor(Math.random() * preguntasRestantes.length);
  preguntaActualSeleccionada = preguntasRestantes[preguntaIndex];

  divJugadorActual.textContent = `${jugadores[jugadorActual]}, tu turno`;
  divPregunta.textContent = preguntaActualSeleccionada.pregunta;
  divOpciones.innerHTML = "";
  divResultadoRonda.textContent = "";

  preguntaActualSeleccionada.opciones.forEach((opcion, index) => {
    const btnOpcion = document.createElement("button");
    btnOpcion.textContent = opcion;
    btnOpcion.classList.add("opcion");
    btnOpcion.onclick = () => seleccionarOpcion(index, preguntaActualSeleccionada.respuestaCorrecta, btnOpcion);
    divOpciones.appendChild(btnOpcion);
  });

  btnSiguiente.style.display = "none";
  preguntasRestantes.splice(preguntaIndex, 1);

  // Reiniciar el temporizador
  reiniciarTemporizador();
}

// Función para seleccionar una opción
function seleccionarOpcion(index, respuestaCorrecta, btnOpcion) {
  clearInterval(temporizadorId);
  const esCorrecta = index === respuestaCorrecta;

  // Desactivar todas las opciones para evitar reintentos
  desactivarOpciones();

  if (esCorrecta) {
    puntajes[jugadorActual]++;
    btnOpcion.classList.add("correcto");
    divResultadoRonda.textContent = "¡Correcto!";
  } else {
    btnOpcion.classList.add("incorrecto");
    divResultadoRonda.textContent = `Incorrecto. La respuesta correcta era ${preguntaActualSeleccionada.opciones[respuestaCorrecta]}.`;
  }

  // Mostrar el botón "Siguiente" para continuar al próximo turno
  btnSiguiente.style.display = "block";
}

// Desactivar botones después de seleccionar una opción
function desactivarOpciones() {
  const botones = document.querySelectorAll(".opcion");
  botones.forEach(btn => {
    btn.disabled = true;
  });
}

// Función para pasar a la siguiente pregunta o terminar el juego
btnSiguiente.onclick = function() {
  siguientePregunta();
};
  
// Función para guardar la clasificación en localStorage
function guardarClasificacion(jugador, puntaje) {
    const nuevaClasificacion = {
      jugador: jugador,
      puntaje: puntaje,
      fecha: new Date().toISOString(),
      juego: "Trivia Zodiaco"  // Nombre del juego para identificarlo en otras páginas
    };
  
    // Obtener el arreglo de clasificaciones de localStorage o crear uno vacío
    let clasificaciones = JSON.parse(localStorage.getItem('clasificaciones')) || [];
  
    // Agregar la nueva clasificación
    clasificaciones.push(nuevaClasificacion);
  
    // Guardar el array actualizado en localStorage
    localStorage.setItem('clasificaciones', JSON.stringify(clasificaciones));
  }
  
  // Modificar la función `mostrarResultados` para que guarde las clasificaciones
  function mostrarResultados() {
      contenedorJuego.style.display = "none";
      divResultadoFinal.style.display = "block";
    
      // Limpiar el contenido previo
      divPuntajeFinal.textContent = ""; // Asegúrate de que esté vacío antes de llenarlo.
    
      // Determinar ganador y mostrar puntajes
      if (puntajes[0] > puntajes[1]) {
        divResultadoFinal.textContent = `${jugadores[0]} gana! 🎉`;
        divPuntajeFinal.textContent = `${jugadores[0]}: ${puntajes[0]} puntos\n${jugadores[1]}: ${puntajes[1]} puntos`;
        guardarClasificacion(jugadores[0], puntajes[0]);
      } else if (puntajes[1] > puntajes[0]) {
        divResultadoFinal.textContent = `${jugadores[1]} gana! 🎉`;
        divPuntajeFinal.textContent = `${jugadores[0]}: ${puntajes[0]} puntos\n${jugadores[1]}: ${puntajes[1]} puntos`;
        guardarClasificacion(jugadores[1], puntajes[1]);
      } else {
        divResultadoFinal.textContent = "¡Es un empate! 🤝";
        divPuntajeFinal.textContent = `${jugadores[0]}: ${puntajes[0]} puntos\n${jugadores[1]}: ${puntajes[1]} puntos`;
        guardarClasificacion(jugadores[0], puntajes[0]); // Guardar puntaje de ambos si es empate
        guardarClasificacion(jugadores[1], puntajes[1]);
      }
  }
  

// Función para reiniciar el temporizador
function reiniciarTemporizador() {
  clearInterval(temporizadorId);

  let tiempoRestante = tiempoLimite;
  spanTiempo.textContent = tiempoRestante;

  temporizadorId = setInterval(() => {
    tiempoRestante--;
    spanTiempo.textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
      clearInterval(temporizadorId);
      tiempoRestante = 0;
      spanTiempo.textContent = tiempoRestante;

      // Mostrar mensaje de tiempo agotado
      divResultadoRonda.textContent = `Tiempo agotado. La respuesta correcta era ${preguntaActualSeleccionada.opciones[preguntaActualSeleccionada.respuestaCorrecta]}.`;
      desactivarOpciones();
      btnSiguiente.style.display = "block";
    }
  }, 1000);
}