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
  let table = document.createElement('table');
  for (let i = 0; i < 19; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
      let td = document.createElement('td');
      td.textContent = contador.toString().padStart(2, '0');
      contador++
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);
}

crearTablaNiveles();