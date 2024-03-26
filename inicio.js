let botton = document.getElementById("empezar");
let tableroHTML = document.getElementById("tablero");
let inicio = document.getElementById("inicio");

botton.addEventListener("click", function () {
    imprimirTablero(tablero);
  document.body.removeChild(inicio);
});
