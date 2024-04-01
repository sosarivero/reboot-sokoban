const NIVEL1 = `
#######
###.###
###$###
#.$@$.#
###$###
###.###
#######`;

const NIVEL2 = `
#######
#.   .#
#  $  #
# $@$ #
#  $  #
#.   .#
#######
`;

const NIVEL3 = `
#######
#.   .#
#.$$$.#
##$@$##
#.$$$.#
#.   .#
#######
`;

const NIVEL4 = `
#######
#.   .#
# $@$ #
# ### #
# $ $ #
#.   .#
#######
`;

const NIVEL5 = `
########
#.  $ .#
#.$$$$.#
#. @$ .#
########
`;

const NIVEL6 = `
#########
#.......#
#.$ $ $ #
#$ $ $ $#
# $ @ $ #
#$ $ $ $#
# $ $ $.#
#.......#
#########
`;

const NIVEL7 = `
#########
#.##.##.#
#   .   #
#$ $$$  #
#. $@$ .#
#  $$$ $#
#   .   #
#.##.##.#
#########
`;
const NIVELES = [NIVEL1, NIVEL2, NIVEL3, NIVEL4, NIVEL5, NIVEL6, NIVEL7];

const botonesNiveles = document.querySelectorAll(".nivel");

botonesNiveles.forEach((boton) => {
  boton.addEventListener("click", () => {
    let nivel = boton.getAttribute("data-value") - 1;
    cambiarNivel(nivel);
  });
});
