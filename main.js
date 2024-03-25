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
      if (tablero[y][x] === "J") {
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

function esUnaCaja (y, x) {
    if (tablero[y][x] === "C" ){
      return true;
    } else {
      return false;
    }
  }
  
 // Empujar caja

 function empujar(ycaja,xcaja) {
    let coordenadasJugador = dondeEstaJugador();
  
    let YinicialDeJugador = coordenadasJugador[0];
    let XinicialDeJugador = coordenadasJugador[1];
  
    let nuevaYdeJugador = YinicialDeJugador;
    let nuevaXdeJugador = XinicialDeJugador;
  
    let YinicialDeCaja = ycaja;
    let XinicialDeCaja = xcaja;
  
    let nuevaYdeCaja= YinicialDeCaja
    let nuevaXdeCaja = XinicialDeCaja;
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
      let yAbajo = YinicialDeJugador - 1;
      if (mePuedoMover(yAbajo, XinicialDeJugador)) {
        nuevaYdeJugador--;
      } else if (esUnaCaja(yAbajo, XinicialDeJugador)){
      nuevaYdeJugador--;
      } else { 
        return null;
      }
      break;
    case "ArrowDown":
      let yArriba = YinicialDeJugador + 1;
      if (mePuedoMover(yArriba, XinicialDeJugador)) {
        nuevaYdeJugador++;
      } else {
        return null;
      }
      break;
    case "ArrowLeft":
      let xIzquierda = XinicialDeJugador - 1;
      if (mePuedoMover(YinicialDeJugador, xIzquierda)) {
        nuevaXdeJugador--;
      } else {
        return null;
      }
      break;
    case "ArrowRight":
      let xDerecha = XinicialDeJugador + 1;
      if (mePuedoMover(YinicialDeJugador, xDerecha)) {
        nuevaXdeJugador++;
      } else {
        return null;
      }
      break;
  }

  tablero[nuevaYdeJugador][nuevaXdeJugador] = "J";
  tablero[YinicialDeJugador][XinicialDeJugador] = "-";
  refrescarTablero(tablero);
}

window.addEventListener("keydown", function (e) {
  mover(e);
  console.log(e.key);
});
