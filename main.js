let nivel_actual = 0;
let GLOBAL_TABLERO = stringDeNivelATablero(NIVELES[nivel_actual]);
let GLOBAL_HISTORIAL = [];
let ESTILO_SIMPLIFICADO = false;

function stringDeNivelATablero(string) {
  let linea = string.split("\n");
  let tablero = [];
  for (let i = 0; i < linea.length; i++) {
    tablero.push(linea[[i]].split(""));
  }
  return tablero;
}

function imprimirTablero(tablero) {
  // Crea un div que representa el tablero entero
  let tableroDiv = document.createElement("div");
  tableroDiv.id = "tablero";

  // Bucle para crear un div para cada línea del tablero
  for (let linea = 0; linea < tablero.length; linea++) {
    let lineaDiv = document.createElement("div");
    lineaDiv.classList.add("linea");
    // Bucle para crear divs para cada celda de cada línea
    for (let celda = 0; celda < tablero[linea].length; celda++) {
      let celdaDiv = document.createElement("div");
      let contenidoCelda = tablero[linea][celda];
      celdaDiv.innerText = contenidoCelda;
      // Añade la clase 'celda' a cada div
      // Usamos la variable estiloCelda para decidir qué clase de CSS se les aplicará
      let estiloCelda = ESTILO_SIMPLIFICADO ? "celda-texto" : "celda";
      celdaDiv.classList.add(estiloCelda);
      // Añade clase según el tipo de celda (pared, jugador, caja...)
      switch (contenidoCelda) {
        case "#":
          celdaDiv.classList.add("pared");
          break;
        case "@":
          celdaDiv.classList.add("jugador");
          break;
        case "+":
          celdaDiv.classList.add("jugador-en-meta");
          break;
        case "$":
          celdaDiv.classList.add("caja");
          break;
        case "*":
          celdaDiv.classList.add("caja-en-meta");
          break;
        case " ":
          celdaDiv.classList.add("suelo");
          break;
        case ".":
          celdaDiv.classList.add("meta");
          break;
      }
      // Añade cada celda a la línea actual
      lineaDiv.appendChild(celdaDiv);
    }
    // Añade línea al tablero
    tableroDiv.appendChild(lineaDiv);
  }
  // Añade el tablero al body de HTML, para por fin hacer visible todos los elementos creados
  document.body.appendChild(tableroDiv);
}

function borrarTablero() {
  let tableroDiv = document.getElementById("tablero");
  document.body.removeChild(tableroDiv);
}

function refrescarTablero() {
  borrarTablero();
  imprimirTablero(GLOBAL_TABLERO);

  if (comprobarVictoria(GLOBAL_TABLERO)) {
    // window.alert("Parabens, ganhaste e passas ao proximo nivel!");
    return setTimeout(avanzarNivel, 350);
  }
}

function avanzarNivel() {
  nivel_actual = nivel_actual + 1;
  cambiarNivel(nivel_actual);
}

function cambiarNivel(nivel) {
  nivel_actual = nivel;
  GLOBAL_TABLERO = stringDeNivelATablero(NIVELES[nivel]);
  refrescarTablero();
  GLOBAL_HISTORIAL = [];
}

// Encontrar el jugador
function dondeEstaJugador() {
  for (let y = 0; y < GLOBAL_TABLERO.length; y++) {
    for (let x = 0; x < GLOBAL_TABLERO[y].length; x++) {
      if (GLOBAL_TABLERO[y][x] === "@" || GLOBAL_TABLERO[y][x] === "+") {
        return [y, x];
      }
    }
  }
}

// Comprobar si se puede mover el jugador
function mePuedoMover(y, x) {
  if (
    GLOBAL_TABLERO[y][x] === "$" ||
    GLOBAL_TABLERO[y][x] === "#" ||
    GLOBAL_TABLERO[y][x] === "*"
  ) {
    return false;
  } else {
    return true;
  }
}

// Comprobar si la siguiente celda es una caja
function esUnaCaja(y, x) {
  if (GLOBAL_TABLERO[y][x] === "$" || GLOBAL_TABLERO[y][x] === "*") {
    return true;
  } else {
    return false;
  }
}

// Comprueba si la siguiente celda es una meta
function esUnaMeta(celda) {
  if (celda === "." || celda === "+" || celda === "*") {
    return true;
  } else {
    return false;
  }
}

//Comprueba si eres ganador
function comprobarVictoria() {
  for (let i = 0; i < GLOBAL_TABLERO.length; i++) {
    for (let j = 0; j < GLOBAL_TABLERO[i].length; j++) {
      if (GLOBAL_TABLERO[i][j] === "." || GLOBAL_TABLERO[i][j] === "+") {
        return false;
      }
    }
  }
  marcarCompletado(nivel_actual);
  return true;
}

// Empujar caja
function empujar(yCaja, xCaja, direccion) {
  esUnaMeta;
  let coordenadasJugador = dondeEstaJugador();

  let yInicialJugador = coordenadasJugador[0];
  let xInicialJugador = coordenadasJugador[1];

  let yNuevaJugador = yInicialJugador;
  let xNuevaJugador = xInicialJugador;

  let yInicialCaja = yCaja;
  let xInicialCaja = xCaja;

  let nuevaYdeCaja = yInicialCaja;
  let nuevaXdeCaja = xInicialCaja;

  switch (direccion) {
    case "arriba":
      let arribaDeCaja = yInicialCaja - 1;
      if (mePuedoMover(arribaDeCaja, xInicialCaja)) {
        nuevaYdeCaja--;
        yNuevaJugador--;
      } else {
        return null;
      }
      break;
    case "abajo":
      let abajoDeCaja = yInicialCaja + 1;
      if (mePuedoMover(abajoDeCaja, xInicialCaja)) {
        nuevaYdeCaja++;
        yNuevaJugador++;
      } else {
        return null;
      }
      break;
    case "izquierda":
      let izquierdaDeCaja = xInicialCaja - 1;
      if (mePuedoMover(yInicialCaja, izquierdaDeCaja)) {
        nuevaXdeCaja--;
        xNuevaJugador--;
      } else {
        return null;
      }
      break;
    case "derecha":
      let derechaDeCaja = xInicialCaja + 1;
      if (mePuedoMover(yInicialCaja, derechaDeCaja)) {
        nuevaXdeCaja++;
        xNuevaJugador++;
      } else {
        return null;
      }
      break;
  }

  if (esUnaMeta(GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador])) {
    GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador] = "+";
  } else {
    GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador] = "@";
  }

  if (esUnaMeta(GLOBAL_TABLERO[yInicialJugador][xInicialJugador])) {
    GLOBAL_TABLERO[yInicialJugador][xInicialJugador] = ".";
  } else {
    GLOBAL_TABLERO[yInicialJugador][xInicialJugador] = " ";
  }

  if (esUnaMeta(GLOBAL_TABLERO[nuevaYdeCaja][nuevaXdeCaja])) {
    GLOBAL_TABLERO[nuevaYdeCaja][nuevaXdeCaja] = "*";
  } else {
    GLOBAL_TABLERO[nuevaYdeCaja][nuevaXdeCaja] = "$";
  }

  // Tras empujar hemos cambiado el tablero, así que lo guardamos para poder usar la función deshacer.

  guardarTableroActual();
  refrescarTablero();
}

// Mover el jugador
function mover(tecla) {
  let coordenadasJugador = dondeEstaJugador();

  let yInicialJugador = coordenadasJugador[0];
  let xInicialJugador = coordenadasJugador[1];

  let yNuevaJugador = yInicialJugador;
  let xNuevaJugador = xInicialJugador;

  // Mover el jugador segun la tecla y evitando obstaculos
  switch (tecla) {
    case "w":
    case "arrowup":
      let yArriba = yInicialJugador - 1;

      if (mePuedoMover(yArriba, xInicialJugador)) {
        yNuevaJugador--;
      } else if (esUnaCaja(yArriba, xInicialJugador)) {
        return empujar(yArriba, xInicialJugador, "arriba");
      } else {
        return null;
      }
      break;
    case "s":
    case "arrowdown":
      let yAbajo = yInicialJugador + 1;
      if (mePuedoMover(yAbajo, xInicialJugador)) {
        yNuevaJugador++;
      } else if (esUnaCaja(yAbajo, xInicialJugador)) {
        return empujar(yAbajo, xInicialJugador, "abajo");
      } else {
        return null;
      }
      break;
    case "a":
    case "arrowleft":
      let xIzquierda = xInicialJugador - 1;
      if (mePuedoMover(yInicialJugador, xIzquierda)) {
        xNuevaJugador--;
      } else if (esUnaCaja(yInicialJugador, xIzquierda)) {
        return empujar(yInicialJugador, xIzquierda, "izquierda");
      } else {
        return null;
      }
      break;
    case "d":
    case "arrowright":
      let xDerecha = xInicialJugador + 1;
      if (mePuedoMover(yInicialJugador, xDerecha)) {
        xNuevaJugador++;
      } else if (esUnaCaja(yInicialJugador, xDerecha)) {
        return empujar(yInicialJugador, xDerecha, "derecha");
      } else {
        return null;
      }
      break;
  }

  if (esUnaMeta(GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador])) {
    GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador] = "+";
  } else {
    GLOBAL_TABLERO[yNuevaJugador][xNuevaJugador] = "@";
  }

  if (esUnaMeta(GLOBAL_TABLERO[yInicialJugador][xInicialJugador])) {
    GLOBAL_TABLERO[yInicialJugador][xInicialJugador] = ".";
  } else {
    GLOBAL_TABLERO[yInicialJugador][xInicialJugador] = " ";
  }

  // Tras movernos hemos cambiado el tablero, así que lo guardamos para poder usar la función deshacer.
  guardarTableroActual();
  refrescarTablero();
}

function reiniciarNivel() {
  GLOBAL_TABLERO = stringDeNivelATablero(NIVELES[nivel_actual]);
  refrescarTablero();
}

function guardarTableroActual() {
  // Si historialTableros está vacío, añade la posición inicial del nivel para poder deshacer hasta ella
  if (GLOBAL_HISTORIAL.length === 0) {
    GLOBAL_HISTORIAL.push(stringDeNivelATablero(NIVELES[nivel_actual]));
  }

  // Usamos map y el operador spreader "[...]" para asegurarnos de crear clones del array, no solo copiar las referencias.
  const tableroActual = GLOBAL_TABLERO.map((fila) => [...fila]);
  // Actualizamos el historial añadiendo el tablero que acabamos de copiar.
  GLOBAL_HISTORIAL.push(tableroActual);
}

function deshacerMovimiento() {
  if (GLOBAL_HISTORIAL.length > 1) {
    // Hay que hacer .pop() dos veces, ya que el tablero actual también está en el historial
    GLOBAL_HISTORIAL.pop();
    const tableroAnterior = GLOBAL_HISTORIAL.pop(); // Hacemos .pop() en el historial y guardamos el resultado
    GLOBAL_TABLERO = tableroAnterior.slice(); // Usamos slice para crear una copia profunda (es decir, no copiar solo la referencia)
    // Refrescamos el tablero como de costumbre, y nos aseguramos de guardar el estado actual
    refrescarTablero();
    guardarTableroActual();
  }
}

// Añadir los eventListeners a la ventana y elementos del DOM.
const teclasMovimiento = ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"];

window.addEventListener("keydown", function (e) {
  let tecla = e.key.toLowerCase();
  console.log(tecla);
  if (tecla.toLowerCase() === "r") {
    reiniciarNivel();
  } else if (tecla.toLowerCase() === "z") {
    deshacerMovimiento();
  } else if (teclasMovimiento.includes(tecla.toLowerCase())) {
    mover(tecla);
  }
});


let botonIniciar = document.getElementById("empezar");
let tableroHTML = document.getElementById("tablero");
let inicio = document.getElementById("inicio");
let botonEstilo = document.getElementById("cambiar-estilo");
let menuNiveles = document.querySelector("table");
let izquierda = document.querySelector("#izquierda")

botonIniciar.addEventListener("click", function () {
  imprimirTablero(GLOBAL_TABLERO);
  document.body.removeChild(inicio);
  izquierda.style.visibility = "visible";
  menuNiveles.style.visibility = "visible";
});


// El botón cambiará el estilo del juego, haciendo uso de la variable booleana 'ESTILO_SIMPLIFICADO' y la función imprimirTablero.
botonEstilo.addEventListener("click", function () {
  // Manera más fácil de hacer 'toggle' entre los valores de un bool: bool != bool
  ESTILO_SIMPLIFICADO = !ESTILO_SIMPLIFICADO;
  refrescarTablero();
});
