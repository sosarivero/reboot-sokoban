// construir el tablero

let nivel = "#######|#-----#|#-JC.-#|#-----#|#######";
let linea = nivel.split("|");
let tablero = [];
for (let i = 0; i < linea.length; i++) {
  tablero.push(linea[[i]].split(""));
}
console.log(tablero);

function imprimirTablero(tablero) {
  // Crea un div que representa el tablero entero
  let tableroDiv = document.createElement("div");
  tableroDiv.classList.add("tablero");

  // Bucle para crear un div para cada línea del tablero
  for (let linea = 0; linea < tablero.length; linea++) {
    let lineaDiv = document.createElement("div");
    lineaDiv.classList.add("linea");
    // Bucle para crear divs para cada celda de cada línea
    for (let celda = 0; celda < tablero[linea].length; celda++) {
      console.log(tablero[linea]);

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

imprimirTablero(tablero);
