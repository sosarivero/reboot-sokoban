let NIVELES = coleccionNiveles.replaceAll("-", " ").split("=");

const botonesNiveles = document.querySelectorAll(".nivel");

botonesNiveles.forEach((boton) => {
  boton.addEventListener("click", () => {
    let nivel = boton.getAttribute("data-value") - 1;
    cambiarNivel(nivel);
  });
});

function crearTablaNiveles() {
  let contador = 1;
  let table = document.createElement("table");
  for (let i = 0; i < 20; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      let td = document.createElement("td");
      td.setAttribute("data-nivel", contador - 1)
      td.textContent = contador.toString().padStart(2, "0"); // Añade padding para que todos los números tengan caracteres
      contador++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}

crearTablaNiveles();

let selectoresNivel = document.querySelectorAll("td");

selectoresNivel.forEach((td) => {
  td.addEventListener("click", () => cambiarNivel(td.textContent - 1));
});

function marcarCompletado(nivel) {
  let selectorNivel = document.querySelector(`[data-nivel="${nivel}"]`);
  selectorNivel.classList.add("marcado-completo");
}