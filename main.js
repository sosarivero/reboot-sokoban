// construir el tablero

let nivel = "#####|#@$.#|#####"
let linea = nivel.split("|")
let tablero = []
for(let i=0; i < linea.length; i++) {
    tablero.push(linea[[i]].split(""))
};
console.log(tablero)