/*

Aquí se obtendrá la selección del usuario de cada campo.
De igual forma, se encuentra la función para mostrar las coordenadas cuando el usuario pasa el cursor sobre un campo.
También, se encuentra la función para mostrar la caja de volver a jugar cuando el usuario muera.

------------
@since 0.2
------------ 
Este juego ha sido creado por Christopher Coria Vásquez.
COPYRIGHT (C) 2016, Master Coria.
*/

// Esta función se encargará de obtener la selección del usuario en las coordenadas "X" e "Y".
function ActualizarSeleccion(x,y){
// Obtenemos los valores que el usuario nos dio al dar clic en la tabla.
 ComponenteEnX = x;
 ComponenteEnY = y; 
}


// Función para mostrar las coordenadas de los campos.
function MostrarCoordenadas(x,y){
  $("#MostrarLaCoordenada").html("<p style='text-align: center; color: red; font-size:2.5em;'>" + x + "," + y + "</p>");
}