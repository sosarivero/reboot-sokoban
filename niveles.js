const NIVEL1 =
`#######
###.###
###$###
#.$@$.#
###$###
###.###
#######`

const NIVEL2 =
`#######
#     #
#     #
#. #  #
#. $$ #
#.$$  #
#.#  @#
#######`

const NIVEL3 =
`############
#..  #     ###
#..  # $  $  #
#..  #$####  #
#..    @ ##  #
#..  # #  $ ##
###### ##$ $ #
  # $  $ $ $ #
  #    #     #
  ############`


const NIVELES = [NIVEL1, NIVEL2, NIVEL3]

function cambiarNivel(tableroActual, nuevoNivel) {
  document.body.removeChild(tableroActual);

  return stringDeNivelATablero(nuevoNivel);
}