// La función toma un nivel en formato string y lo convierte en un array de arrays. Por ejemplo:
//  STRING ORIGINAL |  string.split("\n")   |   for ... { lineas[i].split("") }
// "#####                [ "#####",             [ ["#", "#", "#", "#", "#"],
//  #@$.#     -->          "#@$.#",       -->     ["#", "@", "$", ".", "#"],       
//  #####"                 "#####" ]              ["#", "#", "#", "#", "#"] ]   

function stringDeNivelATablero(string) {
    // Primera usa split, que crea un array tras separar cada línea.
    let lineas = string.split("\n"); // "\n" significa 'salto de línea'
    let tablero = []; // Creamos un tablero vacío, que es el que devolverá la función.
    
    for (let i = 0; i < lineas.length; i++) { // Hacemos un for loop, para iterar por cada elemento del array "lineas"
      lineaSeparada = lineas[i].split(""); // Usamos split de nuevo, ahora para separar cada caracter
      tablero.push(lineaSeparada); // Añadimos la línea, ahora con sus caracteres separados, al array tablero
    }
    return tablero;
  }
  
  function imprimirTablero(tablero) {
    // Crea un <div></div> en memoria, guardado en la variable tableroDiv.
    let tableroDiv = document.createElement("div");
    // Le añadimos una id. Es como si en HTML escribiéramos <div id="tablero"></div>
    tableroDiv.id = "tablero";
    // El primer FOR es para cada línea del tablero
    for (let linea = 0; linea < tablero.length; linea++) {
      let lineaDiv = document.createElement("div"); // Igual que antes, creamos un div por línea 
      lineaDiv.classList.add("linea"); // Como va a haber varias líneas le añadimos class, no id.
      // El segundo FOR es para cada CELDA dentro de cada línea
      for (let celda = 0; celda < tablero[linea].length; celda++) {
        let celdaDiv = document.createElement("div");
        // Cada div es asociado con uno de los elementos del nivel.
        // @/+ = jugador, # = pared, $/* = caja, . = meta, espacio = suelo
        let contenidoCelda = tablero[linea][celda];
        celdaDiv.innerText = contenidoCelda;

        let estiloCelda = ESTILO_SIMPLIFICADO ? "celda-texto" : "celda";
        celdaDiv.classList.add(estiloCelda);
        // Como queremos que cada celda tenga una imagen distinta según lo que es,
        // hacemos un switch que añade una clase a cada celda según su contenido.
        // Es decir, a las celdas que tienen "#" dentro le añadimos class="pared".
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
        } // Con appendChild, añadimos cada celda a la línea que le toca...
        lineaDiv.appendChild(celdaDiv);
      } // Al terminar de iterar en cada celda de una línea, ya podemos añadir la línea al 'tablero'
      tableroDiv.appendChild(lineaDiv);
    } // Al terminar de iterar en cada línea, el tablero ya está terminado.
    // Por fin lo añadimos al <body> del DOM/HTML, y será el resultado final que verá el usuario.
    document.body.appendChild(tableroDiv);
  }
  