// construir el tablero

let nivel = "#######|#-----#|#-JC.-#|#-----#|#######";
let linea = nivel.split("|");
let tablero = [];

for (let i = 0; i < linea.length; i++) {
  tablero.push(linea[[i]].split(""));
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
      celdaDiv.innerText = tablero[linea][celda];
      celdaDiv.classList.add("celda");
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
imprimirTablero(tablero);

function refrescarTablero(tablero) {
  borrarTablero();
  imprimirTablero(tablero);
}

// Encontrar el jugador

function dondeEstaJugador() {
  for (let y = 0; y < tablero.length; y++) {
    for (let x = 0; x < tablero[y].length; x++) {
      if (tablero[y][x] === "J" || tablero[y][x] === "+") {
        return [y, x];
      }
    }
  }
}

// Comprobar si se puede mover el jugador

function mePuedoMover(y, x) {
  if (tablero[y][x] === "C" || tablero[y][x] === "#") {
    return false;
  } else {
    return true;
  }
}

// Comprobar si la siguiente celda es una caja

function esUnaCaja(y, x) {
  if (tablero[y][x] === "C") {
    return true;
  } else {
    return false;
  }
}

// Comprueba si la siguiente celda es una meta
function esUnaMeta(celda) {
  console.log("prueba");
  if (celda === "." || celda === "+" || celda === "*") {
    return true;
  } else {
    return false;
  }
}

// Empujar caja

function empujar(Ycaja, Xcaja, direccion) {
  let coordenadasJugador = dondeEstaJugador();

  let YinicialDeJugador = coordenadasJugador[0];
  let XinicialDeJugador = coordenadasJugador[1];

  let nuevaYdeJugador = YinicialDeJugador;
  let nuevaXdeJugador = XinicialDeJugador;

  let YinicialDeCaja = Ycaja;
  let XinicialDeCaja = Xcaja;

  let nuevaYdeCaja = YinicialDeCaja;
  let nuevaXdeCaja = XinicialDeCaja;

  switch (direccion) {
    case "arriba":
      let arribaDeCaja = YinicialDeCaja - 1;
      if (mePuedoMover(arribaDeCaja, XinicialDeCaja)) {
        nuevaYdeCaja--;
        nuevaYdeJugador--;
      } else {
        return null;
      }
      break;
    case "abajo":
      let abajoDeCaja = YinicialDeCaja + 1;
      if (mePuedoMover(abajoDeCaja, XinicialDeCaja)) {
        nuevaYdeCaja++;
        nuevaYdeJugador++;
      } else {
        return null;
      }
      break;
    case "izquierda":
      let izquierdaDeCaja = XinicialDeCaja - 1;
      if (mePuedoMover(YinicialDeCaja, izquierdaDeCaja)) {
        nuevaXdeCaja--;
        nuevaXdeJugador--;
      } else {
        return null;
      }
      break;
    case "derecha":
      let derechaDeCaja = XinicialDeCaja + 1;
      if (mePuedoMover(YinicialDeCaja, derechaDeCaja)) {
        nuevaXdeCaja++;
        nuevaXdeJugador++;
      } else {
        return null;
      }
      break;
  }
  if (esUnaMeta(tablero[nuevaYdeJugador][nuevaXdeJugador])) {
    tablero[nuevaYdeJugador][nuevaXdeJugador] = "+";
  } else {
    tablero[nuevaYdeJugador][nuevaXdeJugador] = "J";
  }
  tablero[nuevaYdeCaja][nuevaXdeCaja] = "C";
  tablero[YinicialDeJugador][XinicialDeJugador] = "-";

  refrescarTablero(tablero);
}

// Mover el jugador

function mover(e) {
  let tecla = e.key;
  let coordenadasJugador = dondeEstaJugador();

  let YinicialDeJugador = coordenadasJugador[0];
  let XinicialDeJugador = coordenadasJugador[1];

  let nuevaYdeJugador = YinicialDeJugador;
  let nuevaXdeJugador = XinicialDeJugador;

  // Mover el jugador segun la tecla y evitando obstaculos

  switch (tecla) {
    case "ArrowUp":
      let yArriba = YinicialDeJugador - 1;

      if (mePuedoMover(yArriba, XinicialDeJugador)) {
        nuevaYdeJugador--;
      } else if (esUnaCaja(yArriba, XinicialDeJugador)) {
        return empujar(yArriba, XinicialDeJugador, "arriba");
      } else {
        return null;
      }
      break;
    case "ArrowDown":
      let yAbajo = YinicialDeJugador + 1;
      if (mePuedoMover(yAbajo, XinicialDeJugador)) {
        nuevaYdeJugador++;
      } else if (esUnaCaja(yAbajo, XinicialDeJugador)) {
        return empujar(yAbajo, XinicialDeJugador, "abajo");
      } else {
        return null;
      }
      break;
    case "ArrowLeft":
      let xIzquierda = XinicialDeJugador - 1;
      if (mePuedoMover(YinicialDeJugador, xIzquierda)) {
        nuevaXdeJugador--;
      } else if (esUnaCaja(YinicialDeJugador, xIzquierda)) {
        return empujar(YinicialDeJugador, xIzquierda, "izquierda");
      } else {
        return null;
      }
      break;
    case "ArrowRight":
      let xDerecha = XinicialDeJugador + 1;
      if (mePuedoMover(YinicialDeJugador, xDerecha)) {
        nuevaXdeJugador++;
      } else if (esUnaCaja(YinicialDeJugador, xDerecha)) {
        return empujar(YinicialDeJugador, xDerecha, "derecha");
      } else {
        return null;
      }
      break;
  }

  if (esUnaMeta(tablero[nuevaYdeJugador][nuevaXdeJugador])) {
    tablero[nuevaYdeJugador][nuevaXdeJugador] = "+";
  } else {
    tablero[nuevaYdeJugador][nuevaXdeJugador] = "J";
  }

  if (esUnaMeta(tablero[YinicialDeJugador][XinicialDeJugador])) {
    tablero[YinicialDeJugador][XinicialDeJugador] = ".";
  } else {
    tablero[YinicialDeJugador][XinicialDeJugador] = "-";
  }
  refrescarTablero(tablero);
}

window.addEventListener("keydown", function (e) {
  mover(e);
});
