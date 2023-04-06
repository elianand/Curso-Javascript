/* 

Coderhouse - Curso javascript
Preentrega 2
Elian andrenacci

*/


/*
    Se cambia el entorno en general y se orienta a la muestra de datos a partir de un menu
    interactivo, a partir del prompt. La informacion esta organizada a partir de IDs lo 
    cual no es muy amigable con el usuario, pero ya que esto es una etapa previa a desarrollar 
    la interfaz (HMI) se lo usa solo en esta entrega. Por otro lado, no se pretende mostrar datos 
    que sean deducibles (para el que testee el codigo) por dos motivos, como antes mencionado 
    esta es una etapa intermedia de desarrollo y por otro lado los datos mostrados son de maquinas 
    inyectoras. En resumen, no se busca que se juzgue la forma de organizar los datos ni los tipos
    de datos utilizados (apunta al uso del objeto Date). De todas formas las correcciones son
    bienvenidas, me encantaria si me comentan alguna buena practicas de programacion que pudo 
    haber sido implementada.

*/ 




const NUM_ESTADO_MAQUINA_APAGADA        = 0;
const NUM_ESTADO_MAQUINA_DETENIDA       = 1;
const NUM_ESTADO_MAQUINA_PRODUCIENDO    = 2;


const NUM_ESTADO_MENU_STANDBY                   = 0;
const NUM_ESTADO_LISTA_MAQUINAS                 = 1;
const NUM_ESTADO_REGISTRO_ESTADOS               = 2;
const NUM_ESTADO_TIEMPO_CICLO                   = 3;
const NUM_ESTADO_PRODUCCION_TURNO_MENU          = 4;
const NUM_ESTADO_SALIR_MENU                     = 5;
const NUM_ESTADO_MENU_MAQUINA                   = 6;
const NUM_ESTADO_PRODUCCION_TURNO_ESPECIFICO    = 7;
const NUM_ESTADO_LIMPIAR_CONSOLA                = 8;


let ultMenuItem = 0;


let idMaq;
let tablaRegEstado;
let tablaTiempoCiclo;
let tablaRegProd;

let listaMaquinas;






Inicio();


function CicloConsultas() {

    let estado = 0;

    alert("Datos impresos en consola");

    let num = prompt("Menu de SCADA\nIngresa 1 para ver Maquinas"+"\nIngresa 5 para salir");

    if(num == "" || num == null) {
        num = 0;
    }else{
        num = parseInt(num);
    }

    do {
        
        
        switch(estado) {
            case NUM_ESTADO_MENU_STANDBY:
                if(num == NUM_ESTADO_LISTA_MAQUINAS || num == NUM_ESTADO_SALIR_MENU) {
                    estado = num;
                }
                break;
            case NUM_ESTADO_LISTA_MAQUINAS:
                listaMaquinas.ImprimirDatosMaquina(console.log);
                let ingreso = prompt("Ingresar id de maquina para ver datos", 0);
                if(ingreso == "" || ingreso == null) ingreso = "0";

                ingreso = parseInt(ingreso, 0);

                if(listaMaquinas.ExisteMaqId(ingreso)) {
                    console.clear();
                    CargarDatosMaquina(ingreso);
                    estado = NUM_ESTADO_MENU_MAQUINA;
                }else {
                    alert("No existe maquina con el ID seleccionado");
                }
                
                break;
            case NUM_ESTADO_MENU_MAQUINA:
                let numMenu = prompt("Ingresa 1 para volver al inicio"+
                "\nIngresa 2 para ver Registro estado\nIngresa 3 para ver Tiempo ciclo"+
                "\nIngresa 4 para ver Produccion por turno"+"\nIngresa 5 para salir"+
                "\nIngresa 8 para limpiar consola", 0);
                numMenu = parseInt(numMenu);

                switch(numMenu) {
                    case NUM_ESTADO_LISTA_MAQUINAS:
                        estado = NUM_ESTADO_LISTA_MAQUINAS;
                        break;
                    case NUM_ESTADO_REGISTRO_ESTADOS:
                        estado = NUM_ESTADO_REGISTRO_ESTADOS
                        break;
                    case NUM_ESTADO_TIEMPO_CICLO:
                        estado = NUM_ESTADO_TIEMPO_CICLO;
                        break;
                    case NUM_ESTADO_PRODUCCION_TURNO_MENU:
                        estado = NUM_ESTADO_PRODUCCION_TURNO_MENU;
                        break;
                    case NUM_ESTADO_SALIR_MENU:
                        estado = NUM_ESTADO_SALIR_MENU;
                        break;
                    case NUM_ESTADO_LIMPIAR_CONSOLA:
                        estado = NUM_ESTADO_LIMPIAR_CONSOLA;
                    break;
                }
                break;
            case NUM_ESTADO_REGISTRO_ESTADOS:
                console.clear();
                ImpresionDatosRegistroEstado();
                estado = NUM_ESTADO_MENU_MAQUINA;
                break;
            case NUM_ESTADO_TIEMPO_CICLO:
                console.clear();
                ImpresionDatosTiempoCiclo();
                estado = NUM_ESTADO_MENU_MAQUINA;
                break;
            case NUM_ESTADO_PRODUCCION_TURNO_MENU:
                console.clear();
                ImpresionDatosTurnos();
                let turnosMenu = prompt("Ingresar id de turno para ver datos", 0);
                if(turnosMenu == "" || turnosMenu == null) turnosMenu = "0";

                turnosMenu = parseInt(turnosMenu, 0);

                if(tablaRegProd.ExisteTurnoId(turnosMenu)) {
                    console.clear();
                    ImpresionDatosTurnoRegProd(turnosMenu);
                    estado = NUM_ESTADO_MENU_MAQUINA;
                }else {
                    alert("No existe turno con el ID seleccionado");
                }




                estado = NUM_ESTADO_MENU_MAQUINA;
                break;
            case NUM_ESTADO_PRODUCCION_TURNO_ESPECIFICO:
                
                estado = NUM_ESTADO_MENU_MAQUINA;
                break;
            case NUM_ESTADO_SALIR_MENU:
                estado = NUM_ESTADO_SALIR_MENU;
                break;
            case NUM_ESTADO_LIMPIAR_CONSOLA:
                console.clear();
                estado = NUM_ESTADO_MENU_MAQUINA;
                break;
            default:
                // No hace nada
                break;
        }
    }while(estado != NUM_ESTADO_SALIR_MENU);
}


function Inicio() {

    listaMaquinas = new ListaMaquinas();

    // id, numero, nombre, estado
    listaMaquinas.AgregarElem(0 ,  1, "R-180",              0);
    listaMaquinas.AgregarElem(1 ,  2, "FluidMec - 800",     1);
    listaMaquinas.AgregarElem(2 ,  3, "FluidMec - 870",     2);
    listaMaquinas.AgregarElem(3 ,  4, "F-870-870ta",        2);
    listaMaquinas.AgregarElem(4 ,  5, "R-280",              1);
    listaMaquinas.AgregarElem(5 ,  6, "FluidMec - 100",     0);
    listaMaquinas.AgregarElem(6 ,  7, "F-570",              2);
    listaMaquinas.AgregarElem(7 ,  8, "Techmation-1500",    2);
    listaMaquinas.AgregarElem(8 ,  9, "Techmation-980",     1);
    listaMaquinas.AgregarElem(9 , 10, "Techmation-150",     0);
    listaMaquinas.AgregarElem(10, 11, "Techmation-760",     2);
    

    
    CicloConsultas();

}


function CargarDatosMaquina(idMaq) {

    console.log("Se muestran los datos de la maquina Id: "+idMaq);

    listaMaquinas.ImprimirDatosMaquinaEspecifica(console.log, idMaq);

    //// Carga de datos de manera harcodeada

    /// Carga de datos registro estados

    tablaRegEstado = new TablaRegEstado();

    tablaRegEstado.AgregarElemento(1 , "Apagada"   , "7:00" , 5);
    tablaRegEstado.AgregarElemento(2 , "Automatico", "7:05" , 60);
    tablaRegEstado.AgregarElemento(3 , "Manual"    , "8:05" , 5);
    tablaRegEstado.AgregarElemento(4 , "Automatico", "8:10" , 15);
    tablaRegEstado.AgregarElemento(5 , "Manual"    , "8:25" , 5);
    tablaRegEstado.AgregarElemento(6 , "Automatico", "8:30" , 90);
    tablaRegEstado.AgregarElemento(7 , "Manual"    , "10:00", 5);
    tablaRegEstado.AgregarElemento(8 , "Automatico", "10:05", 30);
    tablaRegEstado.AgregarElemento(9 , "Manual"    , "10:35", 5);
    tablaRegEstado.AgregarElemento(10, "Automatico", "10:40", 5);
    tablaRegEstado.AgregarElemento(11, "Manual"    , "10:45", 15);
    tablaRegEstado.AgregarElemento(12, "Automatico", "11:00", 55);
    tablaRegEstado.AgregarElemento(13, "Manual"    , "11:55", 5);


    /// Cargar datos tiempo ciclo

    tablaTiempoCiclo = new TablaTiempoCiclo();

    tablaTiempoCiclo.AgregarElemento(10 , 10, 15, 5, 89, 45, 135);
    tablaTiempoCiclo.AgregarElemento(11 , 9,  14, 6, 90, 44, 134);
    tablaTiempoCiclo.AgregarElemento(12 , 11, 15, 5, 90, 45, 135);
    tablaTiempoCiclo.AgregarElemento(13 , 8,  15, 5, 90, 46, 133);
    tablaTiempoCiclo.AgregarElemento(14 , 12, 16, 7, 91, 45, 136);



    // Datos de produccion por turno
    tablaRegProd = new ClassRegProd();


    /// Primero se cargan los datos del turno actual
    tablaRegProd.AgregarElemDato(0, 800 , 0);
    tablaRegProd.AgregarElemDato(0, 830 , 20);
    tablaRegProd.AgregarElemDato(0, 900 , 40);
    tablaRegProd.AgregarElemDato(0, 945 , 65);
    tablaRegProd.AgregarElemDato(0, 1015, 65);
    tablaRegProd.AgregarElemDato(0, 1030, 70);
    tablaRegProd.AgregarElemDato(0, 1100, 80);
    tablaRegProd.AgregarElemDato(0, 1200, 120);

    
    tablaRegProd.AgregarElemDato(1, 800 , 0);
    tablaRegProd.AgregarElemDato(1, 810 , 30);
    tablaRegProd.AgregarElemDato(1, 900 , 45);
    tablaRegProd.AgregarElemDato(1, 935 , 85);
    tablaRegProd.AgregarElemDato(1, 1000, 95);
    tablaRegProd.AgregarElemDato(1, 1010, 95);
    tablaRegProd.AgregarElemDato(1, 1030, 100);
    tablaRegProd.AgregarElemDato(1, 1200, 250);

    tablaRegProd.AgregarElemDato(2, 800 , 0);
    tablaRegProd.AgregarElemDato(2, 900 , 80);
    tablaRegProd.AgregarElemDato(2, 1000, 160);
    tablaRegProd.AgregarElemDato(2, 1100, 240);
    tablaRegProd.AgregarElemDato(2, 1200, 320);

    tablaRegProd.AgregarElemDato(3, 800 , 0);
    tablaRegProd.AgregarElemDato(3, 810 , 2);
    tablaRegProd.AgregarElemDato(3, 820 , 4);
    tablaRegProd.AgregarElemDato(3, 830 , 6);
    tablaRegProd.AgregarElemDato(3, 840 , 8);
    tablaRegProd.AgregarElemDato(3, 850 , 10);
    tablaRegProd.AgregarElemDato(3, 860 , 12);
    tablaRegProd.AgregarElemDato(3, 870 , 14);
    tablaRegProd.AgregarElemDato(3, 880 , 16);
    tablaRegProd.AgregarElemDato(3, 890 , 18);
    tablaRegProd.AgregarElemDato(3, 900 , 20);
    tablaRegProd.AgregarElemDato(3, 910 , 22);
    tablaRegProd.AgregarElemDato(3, 920 , 24);
    tablaRegProd.AgregarElemDato(3, 930 , 26);
    tablaRegProd.AgregarElemDato(3, 940 , 28);
    tablaRegProd.AgregarElemDato(3, 950 , 30);
    tablaRegProd.AgregarElemDato(3, 960 , 32);
    tablaRegProd.AgregarElemDato(3, 970 , 34);
    tablaRegProd.AgregarElemDato(3, 980 , 36);
    tablaRegProd.AgregarElemDato(3, 990 , 38);
    tablaRegProd.AgregarElemDato(3, 1000, 40);
    tablaRegProd.AgregarElemDato(3, 1010, 42);
    tablaRegProd.AgregarElemDato(3, 1020, 44);
    tablaRegProd.AgregarElemDato(3, 1030, 46);
    tablaRegProd.AgregarElemDato(3, 1040, 48);
    tablaRegProd.AgregarElemDato(3, 1050, 50);
    tablaRegProd.AgregarElemDato(3, 1060, 52);
    tablaRegProd.AgregarElemDato(3, 1070, 54);
    tablaRegProd.AgregarElemDato(3, 1080, 56);
    tablaRegProd.AgregarElemDato(3, 1090, 58);
    tablaRegProd.AgregarElemDato(3, 1100, 60);
    tablaRegProd.AgregarElemDato(3, 1110, 62);
    tablaRegProd.AgregarElemDato(3, 1120, 64);
    tablaRegProd.AgregarElemDato(3, 1130, 66);
    tablaRegProd.AgregarElemDato(3, 1140, 68);
    tablaRegProd.AgregarElemDato(3, 1150, 70);
    tablaRegProd.AgregarElemDato(3, 1160, 72);
    tablaRegProd.AgregarElemDato(3, 1170, 74);
    tablaRegProd.AgregarElemDato(3, 1180, 76);
    tablaRegProd.AgregarElemDato(3, 1190, 78);
    tablaRegProd.AgregarElemDato(3, 1200, 80);

    tablaRegProd.AgregarElemDato(4, 800 , 00);
    tablaRegProd.AgregarElemDato(4, 810 , 20);
    tablaRegProd.AgregarElemDato(4, 820 , 40);
    tablaRegProd.AgregarElemDato(4, 830 , 60);
    tablaRegProd.AgregarElemDato(4, 840 , 80);
    tablaRegProd.AgregarElemDato(4, 850 , 100);
    tablaRegProd.AgregarElemDato(4, 860 , 120);
    tablaRegProd.AgregarElemDato(4, 870 , 140);
    tablaRegProd.AgregarElemDato(4, 880 , 160);
    tablaRegProd.AgregarElemDato(4, 890 , 180);
    tablaRegProd.AgregarElemDato(4, 900 , 200);
    tablaRegProd.AgregarElemDato(4, 910 , 220);
    tablaRegProd.AgregarElemDato(4, 920 , 240);
    tablaRegProd.AgregarElemDato(4, 930 , 260);
    tablaRegProd.AgregarElemDato(4, 940 , 280);
    tablaRegProd.AgregarElemDato(4, 950 , 300);
    tablaRegProd.AgregarElemDato(4, 960 , 320);
    tablaRegProd.AgregarElemDato(4, 970 , 340);
    tablaRegProd.AgregarElemDato(4, 980 , 360);
    tablaRegProd.AgregarElemDato(4, 990 , 380);
    tablaRegProd.AgregarElemDato(4, 1000, 400);
    tablaRegProd.AgregarElemDato(4, 1010, 420);
    tablaRegProd.AgregarElemDato(4, 1020, 440);
    tablaRegProd.AgregarElemDato(4, 1030, 460);
    tablaRegProd.AgregarElemDato(4, 1040, 480);
    tablaRegProd.AgregarElemDato(4, 1050, 500);
    tablaRegProd.AgregarElemDato(4, 1060, 520);
    tablaRegProd.AgregarElemDato(4, 1070, 540);
    tablaRegProd.AgregarElemDato(4, 1080, 560);
    tablaRegProd.AgregarElemDato(4, 1090, 580);
    tablaRegProd.AgregarElemDato(4, 1100, 600);
    tablaRegProd.AgregarElemDato(4, 1110, 620);
    tablaRegProd.AgregarElemDato(4, 1120, 640);
    tablaRegProd.AgregarElemDato(4, 1130, 660);
    tablaRegProd.AgregarElemDato(4, 1140, 680);
    tablaRegProd.AgregarElemDato(4, 1150, 700);
    tablaRegProd.AgregarElemDato(4, 1160, 720);
    tablaRegProd.AgregarElemDato(4, 1170, 740);
    tablaRegProd.AgregarElemDato(4, 1180, 760);
    tablaRegProd.AgregarElemDato(4, 1190, 780);
    tablaRegProd.AgregarElemDato(4, 1200, 800);
    
    

    tablaRegProd.AgregarElemDatoTurno(0, 2802 , 1, 240);
    tablaRegProd.AgregarElemDatoTurno(1, 2802 , 0, 1500);
    tablaRegProd.AgregarElemDatoTurno(2, 2702 , 1, 2000);
    tablaRegProd.AgregarElemDatoTurno(3, 2702 , 0, 50);
    tablaRegProd.AgregarElemDatoTurno(4, 102  , 1, 800);

    tablaRegProd.AgregarElemNombreTurno(0, "Manaña");
    tablaRegProd.AgregarElemNombreTurno(1, "Tarde");


}

function ImpresionDatosRegistroEstado() {
    tablaRegEstado.ImprimirDatosSalida(console.log);
}

function ImpresionDatosTiempoCiclo() {
    tablaTiempoCiclo.ImprimirDatosSalida(console.log);
}

function ImpresionDatosTurnos() {
    tablaRegProd.ImprimirDatosTurnosSalida(console.log);
}

function ImpresionDatosTurnoRegProd(idTurno) {
    tablaRegProd.ImprimirDatosTurnoEspecificoSalida(console.log, idTurno);
}






function ParseHoraMin(duracion) {
    if (duracion < 60) {
        duracion = duracion + " m";
    }else{
        let hora = parseInt(duracion/60);
        let min = duracion % 60;

        if(min == 0) {
            duracion = hora + "h";
        }else{
            duracion = hora + "h " + min + "m";
        }
    }
    return duracion;
}




function ParseFecha(fecha) {

    let strFecha = fecha.toString();

    let mes = strFecha.substr(-2, 2);
    let dia = strFecha.slice(0, -2);
    
    return dia + "/" + mes;
}



function ParseHora(horaNum) {

    let strHora = horaNum.toString();

    let min = strHora.substr(-2, 2);
    let hora = strHora.slice(0, -2);

    return hora + ":" + min;
}


function ParseEstado(num) {
    switch(num) {
        case NUM_ESTADO_MAQUINA_APAGADA:
            return "Apagada";
        case NUM_ESTADO_MAQUINA_DETENIDA:
            return "Detenida";
        case NUM_ESTADO_MAQUINA_PRODUCIENDO:
            return "Produciendo";
        default:
            return "Sin definir"
    };
}


