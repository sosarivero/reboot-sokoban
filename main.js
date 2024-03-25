// construir el tablero

let nivel = "#######|#-----#|#-JC.-#|#-----#|#######"
let linea = nivel.split("|")
let tablero = []
for(let i=0; i < linea.length; i++) {
    tablero.push(linea[[i]].split(""))
};
console.log(tablero)

function imprimirTablero(tablero) {
    let tableroDiv = document.createElement("div");
    tableroDiv.classList.add("tablero");
   
    for (let linea = 0; linea < tablero.length; linea++) {
        let lineaDiv = document.createElement("div");
        lineaDiv.classList.add("linea");
        for (let celda = 0; celda < tablero[linea].length; celda++) {
            console.log(tablero[linea])

            let celdaDiv = document.createElement("div");
            celdaDiv.innerText = tablero[linea][celda];
            celdaDiv.classList.add("celda");
            lineaDiv.appendChild(celdaDiv)
        }

        tableroDiv.appendChild(lineaDiv);
    }
    document.body.appendChild(tableroDiv);
}

imprimirTablero(tablero);