let nivel_actual = 0;
let tablero = stringDeNivelATablero(NIVELES[nivel_actual]);
let historialTableros = [];

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
      celdaDiv.classList.add("celda");
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

  if (comprobarVictoria(tablero)) {
    // window.alert("Parabens, ganhaste e passas ao proximo nivel!");
    setTimeout(cambiarNivel, 1500);
  }
  imprimirTablero(tablero);
}

function cambiarNivel() {
  nivel_actual++;
  tablero = stringDeNivelATablero(NIVELES[nivel_actual]);
  refrescarTablero();
  // Borra el historial de historialTableros, para evitar deshacer a un nivel anterior
  historialTableros = [];
}

// Encontrar el jugador
function dondeEstaJugador() {
  for (let y = 0; y < tablero.length; y++) {
    for (let x = 0; x < tablero[y].length; x++) {
      if (tablero[y][x] === "@" || tablero[y][x] === "+") {
        return [y, x];
      }
    }
  }
}

// Comprobar si se puede mover el jugador
function mePuedoMover(y, x) {
  if (tablero[y][x] === "$" || tablero[y][x] === "#" || tablero[y][x] === "*") {
    return false;
  } else {
    return true;
  }
}

// Comprobar si la siguiente celda es una caja
function esUnaCaja(y, x) {
  if (tablero[y][x] === "$" || tablero[y][x] === "*") {
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
  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[i].length; j++) {
      if (tablero[i][j] === "." || tablero[i][j] === "+") {
        return false;
      }
    }
  }
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

  if (esUnaMeta(tablero[yNuevaJugador][xNuevaJugador])) {
    tablero[yNuevaJugador][xNuevaJugador] = "+";
  } else {
    tablero[yNuevaJugador][xNuevaJugador] = "@";
  }

  if (esUnaMeta(tablero[yInicialJugador][xInicialJugador])) {
    tablero[yInicialJugador][xInicialJugador] = ".";
  } else {
    tablero[yInicialJugador][xInicialJugador] = " ";
  }

  if (esUnaMeta(tablero[nuevaYdeCaja][nuevaXdeCaja])) {
    tablero[nuevaYdeCaja][nuevaXdeCaja] = "*";
  } else {
    tablero[nuevaYdeCaja][nuevaXdeCaja] = "$";
  }

  // Tras empujar hemos cambiado el tablero, así que lo guardamos para poder usar la función deshacer.

  guardarTableroActual();
  refrescarTablero();
}

// Mover el jugador
function mover(e) {
  let tecla = e.key;
  let coordenadasJugador = dondeEstaJugador();

  let yInicialJugador = coordenadasJugador[0];
  let xInicialJugador = coordenadasJugador[1];

  let yNuevaJugador = yInicialJugador;
  let xNuevaJugador = xInicialJugador;

  // Mover el jugador segun la tecla y evitando obstaculos
  switch (tecla) {
    case "ArrowUp":
      let yArriba = yInicialJugador - 1;

      if (mePuedoMover(yArriba, xInicialJugador)) {
        yNuevaJugador--;
      } else if (esUnaCaja(yArriba, xInicialJugador)) {
        return empujar(yArriba, xInicialJugador, "arriba");
      } else {
        return null;
      }
      break;
    case "ArrowDown":
      let yAbajo = yInicialJugador + 1;
      if (mePuedoMover(yAbajo, xInicialJugador)) {
        yNuevaJugador++;
      } else if (esUnaCaja(yAbajo, xInicialJugador)) {
        return empujar(yAbajo, xInicialJugador, "abajo");
      } else {
        return null;
      }
      break;
    case "ArrowLeft":
      let xIzquierda = xInicialJugador - 1;
      if (mePuedoMover(yInicialJugador, xIzquierda)) {
        xNuevaJugador--;
      } else if (esUnaCaja(yInicialJugador, xIzquierda)) {
        return empujar(yInicialJugador, xIzquierda, "izquierda");
      } else {
        return null;
      }
      break;
    case "ArrowRight":
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

  if (esUnaMeta(tablero[yNuevaJugador][xNuevaJugador])) {
    tablero[yNuevaJugador][xNuevaJugador] = "+";
  } else {
    tablero[yNuevaJugador][xNuevaJugador] = "@";
  }

  if (esUnaMeta(tablero[yInicialJugador][xInicialJugador])) {
    tablero[yInicialJugador][xInicialJugador] = ".";
  } else {
    tablero[yInicialJugador][xInicialJugador] = " ";
  }

  // Tras movernos hemos cambiado el tablero, así que lo guardamos para poder usar la función deshacer.
  guardarTableroActual();
  refrescarTablero();
}

function reiniciarNivel() {
  tablero = stringDeNivelATablero(NIVELES[nivel_actual]);
  refrescarTablero();
}

function guardarTableroActual() {
  // Si historialTableros está vacío, añade la posición inicial del nivel para poder deshacer hasta ella
  if (historialTableros.length === 0) {
    historialTableros.push(stringDeNivelATablero(NIVELES[nivel_actual]));
  }

  // Usamos map y el operador spreader "[...]" para asegurarnos de crear clones del array, no solo copiar las referencias.
  const tableroActual = tablero.map((fila) => [...fila]);
  // Actualizamos el historial añadiendo el tablero que acabamos de copiar.
  historialTableros.push(tableroActual);
}

function deshacerMovimiento() {
  if (historialTableros.length > 1) {
    // Hay que hacer .pop() dos veces, ya que el tablero actual también está en el historial
    historialTableros.pop();
    const tableroAnterior = historialTableros.pop(); // Hacemos .pop() en el historial y guardamos el resultado
    tablero = tableroAnterior.slice(); // Usamos slice para crear una copia profunda (es decir, no copiar solo la referencia)
    // Refrescamos el tablero como de costumbre, y nos aseguramos de guardar el estado actual
    refrescarTablero();
    guardarTableroActual();
  }
}

// Añadir los eventListeners a la ventana y elementos del DOM.
const teclasMovimiento = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

window.addEventListener("keydown", function (e) {
  if (e.key === "r") {
    reiniciarNivel();
  } else if (e.key === "z") {
    deshacerMovimiento();
  } else if (teclasMovimiento.includes(e.key)) {
    mover(e);
  }
});

let boton = document.getElementById("empezar");
let tableroHTML = document.getElementById("tablero");
let inicio = document.getElementById("inicio");

boton.addEventListener("click", function () {
  imprimirTablero(tablero);
  document.body.removeChild(inicio);
});
