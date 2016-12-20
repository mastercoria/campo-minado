/*

Este archivo es el que tiene todo el algoritmo del juego: todas las ejeciciones y decisiones del juego se realizarán aquí; de igual modo, todos los
procesos matemáticos, etc.

------------
Este juego ha sido creado por Christopher Coria Vásquez.
COPYRIGHT (C) 2016 - 2017, Master Coria.
*/

// Esta es la función que se encargará de inicializar todo el proceso del juego; se imprimirá en "index.html", ejecutando toda la función una vez que las peticiones lleguen con éxito de "js/ajax.js".
function IniciarJuego(){          
          // Variables de los for's.
          var i, j;

          // Variable de inicialización de variables.
          var IniciarVariables;

          // Función que se encargará de generar un campo.  
          function GenerarCampo(){
          // Variable para designar el campo.
          this.AsignarValorCampo = [24];

          // Campo global, es un Array tipo matriz.
          this.campo = [4];
          for(i=0;i<=4;i++){
             this.campo[i] = [4];
           }
          }
          
          /* 
          SI la variable "VecesDelJuego" es igual a 0; esto es, que sea su primer partida, entonces creará un nuevo campo y lo guardará en la variable "GenCampo".
          Generamos otra variable (GenCampo2) para después saber si el usuario eligió su mismo punto o no y de ser cierto, decirle que ya había estado en ese mismo punto.
          */
          if(VecesDelJuego == 0){
            GenCampo = new GenerarCampo();
            GenCampo2 = new GenerarCampo();
          }
		  
          // Variables que aloja la inversa de X.
          var InversaX = [4, 3, 2, 1, 0];

          // Variables que aloja la extensa de Y.
          var ExtensaY = [1, 2, 3, 4, 5];

          // Variable que aloja la ecuacion para calcular la posición del usuario.
          var ecuacion;

          // Variable que asigna la posición que el usuario eligió.
          var posicion;

          // Variable que usaremos para meter los valores obtenidos en la matriz "campo".
          var suma = 0;

          //////////////////////////////////////////////////////////////////////////////////////////////////////
          //
          // Es a partir de abajo cuando ya inicia el proceso del juego, para determinar la posición, campos y saber si perdió o puede continuar jugando.
          // TODO LO DE ARRIBA, son variables generales del juego, las que no tienen mucha importancia, ya que las que tienen importancia son las declaradas en el "index.html" (esto es: que las que no tienen importancia son las que no importa que se vuelvan a inicializar en 0 en cada petición [ya que si el usuario gana una o varias veces, se quiere conservar el campo, fases, números de veces que ha sobrevivido, etc.]).
          //
          //////////////////////////////////////////////////////////////////////////////////////////////////////

          // SI fase no es igual a 1, ejecutará el proceso del juego; esto es, que si aún no ha perdido. 0: No ha perdido. 1: Ya perdió.
          if(fase!=1){

          // Le ponemos un sonido de fondo que imite la posición que el usuario eligió.
          setTimeout(function(){
            document.getElementById('SonidoLocalizacionReproductor').play();
          }, 1000);

          /* 
          Ahora, detectamos en qué punto es donde el usuario eligió estar y se lo mostramos.
          Usamos la fórmula que he desarrollado para sacar su posición, que es: (Y*4) - ([X^-1] -1): La extensa de Y, multuplicada por 4, a eso le restamos la inversa de x y le restamos a ese producto "1".
          */
          setTimeout(function(){
            ecuacion = ((ExtensaY[ComponenteEnY]*5) - InversaX[ComponenteEnX]) - 1;
            posicion = document.getElementById("campo" + ecuacion).innerHTML = "*";
            // Mensaje de elección de coordenadas.
            document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>Elejiste campo[" + ComponenteEnX + "][" + ComponenteEnY + "].</p>";
            // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
            $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);           
          }, 1000);

          // Sólo generará 1 campo, como mencionamos antes, si el usuario gana, se conservará el mismo campo.
          if(NoGenerarCampos == 0){
            // Generamos un número aleatorio, los parámetros de la función recibirán los números máximos y mínimos a generar (estos los declararemos un poco más abajo).
            function aleatorio(minimo, maximo){
            var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
            // Usamos return para retornar el resultado a la función y así como quien dice "tener listo el resultado para asignarlo a una variable".
            return numero;
            }

            // Asignamos un valor aleatorio entre "0" y "1" y lo guartamos en un Array tipo Vector.
            for (i = 0; i <= 24; i++) {
            	GenCampo.AsignarValorCampo[i] = aleatorio(0,1);
            }

            // Pasamos el valor a un Array tipo Matriz, en las coordenadas correspondientes a los for's y variable.
            for (i = 0; i <= 4; i++) {
            	for (j = 0; j <= 4; j++) {
            		GenCampo.campo[i][j] = GenCampo.AsignarValorCampo[suma];
                // Usamos la variable suma, debido a que en el anterior for se generaron de corrido 16 veces, entonces, usamos suma para no perder ese conteo y llegar de 0 a 15 (como se guardó en el anterior for).
                suma++;
            	}
             }

            // Ya que el proceso se haya terminado, entonces aumentará en uno a "NoGenerarCampos", de esta manera, si el usuario juega más de una vez, se conservará el mismo campo. 
            NoGenerarCampos++;  
          }

          // SI el valor de campo en la posición de sus componentes es "uno", entonces perderá (recuerda que los valores aleatorios se guardaron en el anterior for).  
          /*
             La razón por la cual volteamos las componentes de "x,y" a "y,x" es por los vectores tipo "Matriz".
          */
          if(GenCampo.campo[ComponenteEnY][ComponenteEnX] == 1){
            setTimeout(function(){

            /* 
            Ahora, detectamos el valor aleatorio de "GenCampo.AsignarValorCampo" en la posición de "i", y si es "0", lo coloreamos como verde; si es "1", lo coloreamos como rojo.
            Hacemos esto debido a que como ya perdió, pues le mostramos los campos que eran buenos y malos, de todos modos, cuando vuelva a jugar, se generará un campo diferente a ese.
            */
            for (i = 0; i <= 24; i++) { 
              if(GenCampo.AsignarValorCampo[i] == 0){
              // Pintamos de verde la celda correspondiente.  
              document.getElementById("campo" + i).style.background = "green";
              } else {
              // Pintamos de rojo la celda correspondiente.  
              document.getElementById("campo" + i).style.background = "red";
              }
            }
            // Ahora, le producirá un sonido que configuramos para cuando pierda.
            document.getElementById("SonidoPerderReproductor").play();
            // Pondrá en el id "ResultadoCampo" un mensaje en rojo y en h1 y centrado: ¡Te moriste!
            $('#ResultadoCampo').html("<h1 style='color: red; text-align: center;'>¡Te moriste!</h1>");  

            // Mensaje que se muestra cuando perdió el juego.
            document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>Fin del juego.</p>";
            // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
            $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight); 
            
            // Le mostramos un mensaje 3 segundos después para animar al usuario a volver a jugar.
            setTimeout(function(){
              document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Venga! Te invito a jugar otra vez.</p>";
              // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
              $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);             
            }, 3000);            

            // Pondrá en el id "MensajePuntajeUsuario" el pasado del verbo "Sobrevivir", con un h2 y centrado.
            $("#MensajePuntajeUsuario").html("<h2 style='text-align: center;'>Sobreviviste: </h2>");
            // Pondrá en el id "PuntajeUsuario" un párrafo en color rojo y centrado que diga las veces que ha sobrevivido.
            $("#PuntajeUsuario").html("<p style='text-align: center; color: red; font-size:2.5em;'>" + NumVecesSobrevivir + "</p>"); 
            // SI sobrevivió sólo una vez, entonces pondrá en singular el mensaje "vez" (Singular: vez) en el id "VecesSobrevivir".
            if(NumVecesSobrevivir == 1){
            $("#VecesSobrevivir").html("<h2 style='text-align: center;'>vez.</h2>");
            // SI sobrevivió más de una vez, entonces pondrá en plural el mensaje "vez" (Plural: veces) en el id "VecesSobrevivir".
            } else if (NumVecesSobrevivir > 1){
            $("#VecesSobrevivir").html("<h2 style='text-align: center;'>veces.</h2>");
            } 
            // Como perdió, entonces le mostramos el botón para volver a jugar ...
            $("#MostrarVolverJugar").html("<input type='button' onclick='window.location.reload();'' value='Volver a jugar' />");
            // Como mencionamos, "fase" es la variable que detectará si el usuario ha perdido o no; como ya perdió, pues la aumentamos en uno para indicar que ya ha perdido. 
            fase++;
            }, 3000);
            
           // DE LO CONTRARIO, SI la posición en las respectivas coordenadas es 0, entonces entrará acá. 
           } else {
            // De las anteriores variables (GenCampo2.campo), si el usuario ya ha pisado ese lugar, entonces le dirá que no sea tramposo.
            if(GenCampo2.campo[ComponenteEnY][ComponenteEnX] == 1){
                setTimeout(function(){
                  // Le mostramos un mensaje abajo del campo de minas diciéndole al usuario que no puede elegir la misma posición.
                  document.getElementById("ResultadoCampo").innerHTML = "<p style='color: black; text-align: center;'>Mmm ... ya habías pisado aquí. Elije otra ...</p>";  

                  // Reprodicimos el sonido que configuramos para cuando suceda lo de arriba.
                  document.getElementById("SonidoErrorReproductor").play();

                  // Mensaje de información para impedir misma elección.
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>No puedes elegir el mismo campo.</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                }, 3000);
            // De lo contrario, si no es uno, entonces sí vale y no es trampa.    
            } else { 
                setTimeout(function(){
                // Como sólo queremos mostrarle la parte buena y no todo el campo, sólo coloreamos el campo de verde en la posición que eligió.  
                document.getElementById("campo" + ecuacion).style.background = "green";
                // Reprodicimos el sonido que configuramos para cuando gane.
                document.getElementById("SonidoGanarReproductor").play();
                // Le mostramos un mensaje en el id "ResultadoCampo".
                document.getElementById("ResultadoCampo").innerHTML = "<p style='color: green; text-align: center;'>¡Uy! ¡Qué suerte tienes! En campo[" + ComponenteEnY + "]["+ ComponenteEnX +"] no hay bomba. <br />¡Puedes seguir jugando!</p>";

                // Aumentamos en uno la variable "NumVecesSobrevivir", para detectar que ha sobrevivido una vez más.
                NumVecesSobrevivir++;

                // Le mostramos un mensaje de continuación de juego, dependiendo de las veces que ha sobrevivido. 
                if(NumVecesSobrevivir == 1){          
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Sobreviviste! Veamos si resistes otra ronda ...</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir == 2){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Sí sobreviviste! Muy bien, ¿podrás otra más?</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir == 3){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡WOW, ya van 3 rondas! ¿Vas por la 4ta?</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir == 4){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Sorprendes! Eres todo un genio, ¡vamos por más!</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir == 5){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Has sobrevivido 5 veces! ¡Eres una leyenda!</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir == 6){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>Está bien, 6 veces es mucho, pero veamos si puedes más ...</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                 
                } else if(NumVecesSobrevivir >= 7){
                  document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>¡Por Dios, " + NumVecesSobrevivir + " rondas! ¡Eres todo un crack!</p>";
                  // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
                  $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);                
                }

                // Ahora, imprimimos un párrafo de color rojo y centrado las veces que actualmente ha sobrevivido el usuario.
                $("#PuntajeUsuario").html("<p style='text-align: center; color: red; font-size:2.5em;'>" + NumVecesSobrevivir + "</p>");
                // SI sobrevivió sólo una vez, entonces pondrá en singular el mensaje "vez" (Singular: vez) en el id "VecesSobrevivir". 
                if(NumVecesSobrevivir == 1){
                $("#VecesSobrevivir").html("<h2 style='text-align: center;'>vez.</h2>");
                // SI sobrevivió más de una vez, entonces pondrá en plural el mensaje "vez" (Plural: veces) en el id "VecesSobrevivir".
                } else if(NumVecesSobrevivir > 1){
                $("#VecesSobrevivir").html("<h2 style='text-align: center;'>veces.</h2>");
                }    
                }, 3000);
                // Le ponemos al Array tipo Matriz en las coordenadas que el usuario nos dijo, que ese campo ya ha sido ocupado (ya ha pisado ahí, y por lo tanto no volverá a contar en otra partida como punto de vida).
                GenCampo2.campo[ComponenteEnY][ComponenteEnX] = 1; 
            }
          }
          
          } else {
            document.getElementById("MensajesDelJuego").innerHTML += "<p style='text-align:center;'>El juego ha acabado. Haz clic en Volver a jugar para reiniciar el juego.</p>";
            // Si aparece el scroll del sistema de mensajes del juego, entonces mandará hasta abajo de los mensajes.
            $('#MensajesDelJuego').scrollTop($('#MensajesDelJuego')[0].scrollHeight);           
          }
          // Aumentamos la variable "VecesDelJuego" para detectar que se ha jugado una vez más.
          VecesDelJuego++;

          // La función "setTimeout()" es para darle un tiempo de espera al código que está por dentro de éste antes de que se ejecute. Sus parámetros de tiempo se miden en milésimas de segudno (ej: 1000ms = 1seg).
}