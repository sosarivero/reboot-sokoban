let botton = document.getElementById("empezar")
let tableroHTML = document.getElementById("tablero")
let inicio = document.getElementById("inicio")

botton.addEventListener("click", function() {
tableroHTML.style.visibility="visible"
document.body.removeChild(inicio)
})