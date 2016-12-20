/*

Aquí se encuentran la función que ayudará a mostrar y ocultar la caja de información.
Con ayuda de una variable llamada "mostrar", es que podremos saber si la debemos mostrar u ocultar.

------------
Este juego ha sido creado por Christopher Coria Vásquez.
COPYRIGHT (C) 2016 - 2017, Master Coria.
*/

// Función para mostrar la caja de información.
function MostrarInformacion(){
  // 0: Mostrar inforamción.
  if(mostrar == 0){
  	$("#Informacion").show();
  	document.getElementById("BotonMostrarInformacion").value = "Ocultar";
  	mostrar++;
  // 1: No mostrar inforamción.	
  } else {
  	$("#Informacion").hide();
    document.getElementById("BotonMostrarInformacion").value = "Mostrar Información";
    mostrar--;
  }
}
