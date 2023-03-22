/* 

Coderhouse - Curso javascript
Preentrega 1
Elian andrenacci

*/


/*
    Este script recibe los nombres de las maquinas y el el mensaje de su ultimo estado.
    valor posible de estado: produciendo, detenida, pagada.
    El problema aparece cuando la maquina se apaga, y con esta lo hace el dispositivo que traquea la maquina. 
    Al apagarse el dispositivo, ya no vamos a poder obtener la notificacion de que la maquina se apagó.
    Para resolver esto, lo que es el principal objetivo de este script, todos los mensajes se envian 
    con timestamp, al no recibir por 5 min un mensaje de estado, se asume que esta esta apagada.

    El timestamp se pasa como una cadena con el siguente formato
    hora minuto (1030) equivalente a 10:30
    1205    12:05
    135     01:35
    formato 24h





*/ 

const tiempoDesconexion = 5;        // valor en minutos
let tiempoActual;                   // Esta variable se carga desde una API

let nmbreMaq_1, nmbreMaq_2, nmbreMaq_3;
let estdMaq_1, estdMaq_2, estdMaq_3;
let tiempoMaq_1, tiempoMaq_2, tiempoMaq_3;

// Se cargan solo los datos de los nombres de las maquinas
nmbreMaq_1 = prompt("Ingresar nombre maquina 1 o dejar vacio para autocompletado", "maq1");
nmbreMaq_2 = prompt("Ingresar nombre maquina 2 o dejar vacio para autocompletado", "maq2");
nmbreMaq_3 = prompt("Ingresar nombre maquina 3 o dejar vacio para autocompletado", "maq3");


if(nmbreMaq_1 == "" || nmbreMaq_1 == null) nmbreMaq_1 = "maq1";
if(nmbreMaq_2 == "" || nmbreMaq_2 == null) nmbreMaq_2 = "maq2";
if(nmbreMaq_3 == "" || nmbreMaq_3 == null) nmbreMaq_3 = "maq3";


///                         Inicio de datos hardcodeados                         /////////////////
// Se hardcodea para no ser pesado con los prompt  
estdMaq_1 = "Produciendo";
estdMaq_2 = "Detenida";
estdMaq_3 = "Produciendo";


// Se asumen que los datos son todos del mismo dia
tiempoMaq_1 = "1158";        // 11:58
tiempoMaq_2 = "1156";        // 11:56
tiempoMaq_3 = "1000";        // 10:00

tiempoActual = "1200";

///                         Fin de datos hardcodeados                              /////////////////




let tiempo1 = ParseTimestamp_to_Minutos(tiempoMaq_1);
let tiempo2 = ParseTimestamp_to_Minutos(tiempoMaq_2);
let tiempo3 = ParseTimestamp_to_Minutos(tiempoMaq_3);

let tiempoMinActual = ParseTimestamp_to_Minutos(tiempoActual);



if(tiempo1 + tiempoDesconexion <  tiempoMinActual) {
    estdMaq_1 = "Apagada";
}

if(tiempo2 + tiempoDesconexion <  tiempoMinActual) {
    estdMaq_2 = "Apagada";
}

if(tiempo3 + tiempoDesconexion <  tiempoMinActual) {
    estdMaq_3 = "Apagada";
}


//                          Impresion de datos



console.log("Nombres:\nMaquina 1: " + nmbreMaq_1+"\nMaquina 2: "+ nmbreMaq_2 +
            "\nMaquina 3: "+ nmbreMaq_3);

console.log("Tiempo actual: 12:00");

console.log(
    "Tiempos:\nMaquina 1: " + ParseTimestamp_to_HoraMin(tiempoMaq_1) +
    "\nMaquina 2: "+ ParseTimestamp_to_HoraMin(tiempoMaq_2) + 
    "\nMaquina 3: "+ ParseTimestamp_to_HoraMin(tiempoMaq_3)
);

console.log("Estados:\nMaquina 1: " + estdMaq_1+
            "\nMaquina 2: "+ estdMaq_2 + "\nMaquina 3: "+ estdMaq_3);






alert("Datos impresos en consola");



// Funciones complementarias


function ParseTimestamp_to_HoraMin(strTimestamp) {

    //      Sin usar for loop
    //let min = strTimestamp.substr(-2, 2);
    //let hora = strTimestamp.slice(0, -2);


    //      Usando for loop
    let min, hora;

    min = "";
    hora = "";

    // Recoge los 2 ultimos caracteres de la cadena
    for(let i = strTimestamp.length - 2; i < strTimestamp.length; i++) {
        min += strTimestamp.charAt(i);
    }

    // Recoge el o los caracteres de la hora
    for(let i = 0; i < strTimestamp.length - 2; i++) {
        hora += strTimestamp.charAt(i);
    }

    return hora + ":" + min;
}

function ParseTimestamp_to_Minutos(strHoraMin) {

    let min, hora;

    min = "";
    hora = "";

    // Recoge los 2 ultimos caracteres de la cadena
    for(let i = strHoraMin.length - 2; i < strHoraMin.length; i++) {
        min += strHoraMin.charAt(i);
    }

    // Recoge el o los caracteres de la hora
    for(let i = 0; i < strHoraMin.length - 2; i++) {
        hora += strHoraMin.charAt(i);
    }

    min = parseInt(min);
    hora = parseInt(hora);

    return min + hora * 60;
}
