/*

Este archivo es el que ejecutará en tiempo real las peticones del juego. Cada juego que se haga, éste procesará los datos y los enviará en tiempo real
para su posterior ejecución en "js/campo.js".

Cuando haya tenido éxito, entonces las funciones del archivo "js/campo.js" se imprimirán en la etiqueta script con el id "ContenedorScript" y así es
como el proceso se realizará de forma efectiva.

------------
Este juego ha sido creado por Christopher Coria Vásquez.
COPYRIGHT (C) 2016 - 2017, Master Coria.
*/

// Cuando el documento esté listo (todos los elementos del DOM), se ejecutará todo entre los corchetes.
$(document).ready(function(){
 // Seleccionamos la etiqueta HTML "form" y cuando el usuario le de clic en "Jugar!", ejecutará todo entre los corchetes.
 $('.campo').click(function(e){
 // Usamos el parámetro de la función anónima que actuará sobre el form para impedir que se recargue la página.	
 e.preventDefault();

 /* 
 Inicializamos el método "$.ajax()", lo que está dentro de los corchetes es lo que ejecutará en tiempo real. Sus parámetros son los siguientes:
 url: la URL de destino a enviar los datos.
 type: el tipo de envío.
 beforeSend: mostrar algo antes de enviar los datos (en nuestro caso, mostramos un loader).
 success: mostrará algo en caso que haya tenido éxito el envío (en nuestro caso, insertamos en el script con el id "ContenedorScript" la inicialización de la función "IniciarJuego()" del archivo "js/campo.js").
 */
 $.ajax({
 url: 'js/campo.js',	
 type: 'post',
 beforeSend: function(){
 $('#loader').html('<i class="fa fa-refresh fa-spin fa-6x"></i>');
 },
 success: function(){
 document.getElementById("ContenedorScript").innerHTML += IniciarJuego();	
 }
})
 
 /*
 Punteros de "$.ajax()", tienen la siguiente función: 
 $.ajax().always(): Mostrará algo todas las veces que se realice una petición (en nuestro caso, imprimimos un mensaje en la consola JavaScript).
 $.ajax().fail(): Mostrará un error en caso de que no se haya completado el envío de la petición (en nuestro caso, imprimimos en el id "MostrarError" un mensaje). 
 $.ajax().done(): Mostrará algo en caso de que se haya concluído la petición (en nuestro caso, imprimimos un mensaje en la consola JavaScript).
 */
 .always(function(){
 setTimeout(function(){	
 console.log("Las operaciones están en proceso ...");
 $("#loader").html("");
 }, 2000);	
 })
 .fail(function(){
 setTimeout(function(){
 console.log("ERROR: Las operaciones no se pudieron realizar.");
 $("#MostrarError").show();
 $("#MostrarError").html("<br /><span style='color: red; align: center;'>Error: ha ocurrido algo inesperado. Por favor, int&eacute;telo de nuevo m&aacute;s tarde.</span>");
 $("#MensajesDelJuego").html("<span style='color: red; align: center;'>Ocurrió un error.</span>");
 // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
 $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);
 }, 2000);	
 })
 .done(function(){
 setTimeout(function(){	
 console.log("Éxito: las operaciones se han hecho correctamente.");
 }, 2000);	
 });
 });
});