/* 

Coderhouse - Curso javascript
Preentrega 3
Elian andrenacci

*/


/*
    En esta entrega se agrega una interfaz visual donde el usuario es capaz de interactuar de 
    una forma bastante amigable y facil. Se sabe que esta visual no es atractiva, sino que es
    funcional. En el inicio se pueden seleccionar una de las distintas maquinas para ver sus 
    datos. Todos las maquinas muestran los mismos datos, no es un error, sino que se omite
    esto ya que se debe agregar mas codigo que no va a aportar para la entrega. Una mejora 
    sustancial del programa es que ahora los datos son cargados desde una base de datos
    alojada en el archivo baseDatos.js en un array en formato de JSON, al tocar los botones
    de la interfaz se van haciendo consultas a esta base y luego se guardan en el almacenamiento
    de la sesion (sessionStorange).

*/ 





const NUM_ITEM_MENU_REG_EST = 0;
const NUM_ITEM_MENU_TMP_CCL = 1;
const NUM_ITEM_MENU_REG_PRD = 2;
const NUM_ITEM_MENU_EST_SNS = 3;
const NUM_ITEM_MENU_REG_EVN = 4;
const NUM_ITEM_MENU_IMP_DTS = 5;

const NUM_ESTADO_MAQUINA_APAGADA        = 0;
const NUM_ESTADO_MAQUINA_DETENIDA       = 1;
const NUM_ESTADO_MAQUINA_PRODUCIENDO    = 2;


// Variables globales
let ultMenuItem = 0;
let elemCreadoPadre = [];



function CargarMenuInicio() {

    let listaMaquinas = new ListaMaquinas(); 

    listaMaquinas.IngresoDatosJSON(BASE_DE_DATOS_LISTA_MAQUINAS);

    sessionStorage.setItem("listaMaquinas", JSON.stringify(listaMaquinas));


    let cantMaq = listaMaquinas.GetCantMaquinas();

    let cntndor_gral = document.getElementById("contenedorInicio");

    for(let i = 0; i < cantMaq; i++) {


        let cntndor_carta = document.createElement("DIV");
        cntndor_gral.appendChild(cntndor_carta);
        cntndor_carta.id = "ContenedorMaquinaEstado"+i.toString();
        cntndor_carta.title = i;
        cntndor_carta.style = "border: 1px solid black; margin: 5px; width: 50%; margin-left: 25%; padding: 10px;";

        cntndor_carta.innerHTML = `
            <div style="text-align: center;">
                <h5 style="height: 20%; margin-bottom: 0px;">${listaMaquinas.GetNombre()[i]} Num: ${listaMaquinas.GetNumero()[i]}</h5>
                <p style="height: 20%; margin-bottom: 20px;"></p>
                <button style="position: relative; height: fit-content;" onclick="CargaDatosMaquina_PostInicio(${i})">Ver detalles</button>
            </div>
        `;
        
        elemCreadoPadre.push(cntndor_carta);
        
    }
}



function CargaDatosMaquina_PostInicio(idMaq) {

    sessionStorage.setItem("IdMaq", idMaq);

    EliminarElemCreados();

    // Se esconde el inicio
    document.getElementById("contenedorInicio").classList.add("hidden");
    
    // Se muestra el menu
    document.getElementById("contenedorMenu").classList.remove("hidden");

    // Se carga el header de la maquina elegida
    CargarDatosHeaderEstadoMaquina();

    // Se carga la pestaña de registro de estado
    CargarDatosRegistroEstado(idMaq);

}






function ItemMenu_Click(numItem){


    array_visualData = [];

    array_visualData.push(document.getElementsByClassName("div-reg-est"));
    array_visualData.push(document.getElementsByClassName("div-tmp-ccl"));
    array_visualData.push(document.getElementsByClassName("div-reg-prd"));
    array_visualData.push(document.getElementsByClassName("div-est-sns"));
    array_visualData.push(document.getElementsByClassName("div-reg-evn"));
    array_visualData.push(document.getElementsByClassName("div-imp-dts"));

    // El item previamente seleccionado

    switch(ultMenuItem) {
        case NUM_ITEM_MENU_REG_EST:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_EST]) {
                val.classList.add("hidden");
            }
        break;
        case NUM_ITEM_MENU_TMP_CCL:
            for(let val of array_visualData[NUM_ITEM_MENU_TMP_CCL]) {
                val.classList.add("hidden");
            }
        break;
        case NUM_ITEM_MENU_REG_PRD:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_PRD]) {
                val.classList.add("hidden");
            }
        break;
        case NUM_ITEM_MENU_EST_SNS:
            for(let val of array_visualData[NUM_ITEM_MENU_EST_SNS]) {
                val.classList.add("hidden");
            }
        break;
        case NUM_ITEM_MENU_REG_EVN:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_EVN]) {
                val.classList.add("hidden");
            }
        break;
        case NUM_ITEM_MENU_IMP_DTS:
            for(let val of array_visualData[NUM_ITEM_MENU_IMP_DTS]) {
                val.classList.add("hidden");
            }
        break;
    }


    ultMenuItem = numItem;

    // El item seleccionado

    switch(numItem) {
        case NUM_ITEM_MENU_REG_EST:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_EST]) {
                val.classList.remove("hidden");
            }
            CargarDatosRegistroEstado();
        break;
        case NUM_ITEM_MENU_TMP_CCL:
            for(let val of array_visualData[NUM_ITEM_MENU_TMP_CCL]) {
                val.classList.remove("hidden");
            }
            CargarDatosTiemposCiclo();
        break;
        case NUM_ITEM_MENU_REG_PRD:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_PRD]) {
                val.classList.remove("hidden");
            }
            CargarDatosRegistroProduccion();
        break;
        case NUM_ITEM_MENU_EST_SNS:
            for(let val of array_visualData[NUM_ITEM_MENU_EST_SNS]) {
                val.classList.remove("hidden");
            }
        break;
        case NUM_ITEM_MENU_REG_EVN:
            for(let val of array_visualData[NUM_ITEM_MENU_REG_EVN]) {
                val.classList.remove("hidden");
            }
        break;
        case NUM_ITEM_MENU_IMP_DTS:
            for(let val of array_visualData[NUM_ITEM_MENU_IMP_DTS]) {
                val.classList.remove("hidden");
            }
        break;
    }

        
}

function CargarDatosHeaderEstadoMaquina() {

    let idMaq = sessionStorage.getItem("IdMaq");

    let listaMaquinas = new ListaMaquinas();

    let strJSON = sessionStorage.getItem("listaMaquinas");
    listaMaquinas.IngresoDatosJSON(strJSON);


    let nombreMaq = listaMaquinas.GetNombre()[idMaq];
    let numeroMaq = listaMaquinas.GetNumero()[idMaq];
    let estadoMaq = ParseoEstado(listaMaquinas.GetEstado()[idMaq]);

    // Actualizacion del header
    document.getElementById("header-titulo").textContent = "Maquina: "+nombreMaq+" Num: "+numeroMaq;
    let header_estado = document.getElementById("header-estado");
    header_estado.textContent = estadoMaq;
    
}

function CargarDatosRegistroEstado() {


    EliminarElemCreados();
   


    /// Carga de datos registro estados

    let tablaRegEstado = new TablaRegEstado();
    tablaRegEstado.IngresoDatosJSON(BASE_DE_DATOS_REGISTROS_ESTADOS);
    sessionStorage.setItem("tablaRegEstado", BASE_DE_DATOS_REGISTROS_ESTADOS);


    let cantElem = tablaRegEstado.GetCantElem();

    for(var i = 0; i < cantElem; i++) {

        let contenedorFila = document.createElement("TR");
        document.getElementById("tbdy_tabla_reg_est").appendChild(contenedorFila);
        elemCreadoPadre.push(contenedorFila);

        contenedorFila.innerHTML = `
            <td>${tablaRegEstado.GetGolpe(i)}</td>
            <td>${tablaRegEstado.GetEstado(i)}</td>
            <td>${tablaRegEstado.GetTInicio(i)}</td>
            <td>${tablaRegEstado.GetDuracionParseada(i)}</td>
        `;
    }


}


function CargarDatosTiemposCiclo() {

    EliminarElemCreados();

    /// Cargar datos tiempo ciclo

    let tablaTiempoCiclo = new TablaTiempoCiclo();

    tablaTiempoCiclo.IngresoDatosJSON(BASE_DE_DATOS_TIEMPOS_CICLO);
    sessionStorage.setItem("tablaTiempoCiclo", BASE_DE_DATOS_TIEMPOS_CICLO);
  
    
    let cantElem_tablaCiclo = tablaTiempoCiclo.GetCantElem();

    let datosTablaTC = tablaTiempoCiclo.GetDatosTabla();

    for(var i = 0; i < cantElem_tablaCiclo; i++) {

        let contenedorFila = document.createElement("TR");
        document.getElementById("tbdy_tabla_tmp_cclo").appendChild(contenedorFila);
        elemCreadoPadre.push(contenedorFila);

        contenedorFila.innerHTML = `
            <td>${datosTablaTC[0][i]}</td>
            <td>${datosTablaTC[1][i]}</td>
            <td>${datosTablaTC[2][i]}</td>
            <td>${datosTablaTC[3][i]}</td>
            <td>${datosTablaTC[4][i]}</td>
            <td>${datosTablaTC[5][i]}</td>
            <td>${datosTablaTC[6][i]}</td>
        `;
    }
}


function CargarDatosRegistroProduccion() {

    EliminarElemCreados();

    let tablaRegProd = new ClassRegProd();

    tablaRegProd.IngresoDatosJSON(BASE_DE_DATOS_REGISTROS_PRODUCCION);
    sessionStorage.setItem("tablaRegProd", BASE_DE_DATOS_REGISTROS_PRODUCCION);
    

    let cantElem_tablaRegProd = tablaRegProd.GetCantTurnos();
    let datosTablaRP = tablaRegProd.GetDatosTabla();

    for(var i = 0; i < cantElem_tablaRegProd; i++) {

        let contenedorFila = document.createElement("TR");
        document.getElementById("tbdy_tabla_reg_prod").appendChild(contenedorFila);
        elemCreadoPadre.push(contenedorFila);

        contenedorFila.innerHTML = `
            <td>${datosTablaRP[0][i]}</td>
            <td>${datosTablaRP[1][i]}</td>
            <td>${datosTablaRP[2][i]}</td>
        `;
    }

}


function ItemHeader_Inicio() {


    EliminarElemCreados();

    // Se esconde el inicio
    document.getElementById("contenedorMenu").classList.add("hidden");
    
    // Se muestra el menu
    document.getElementById("contenedorInicio").classList.remove("hidden");

    // Se carga el inicio
    CargarMenuInicio();

}



function EliminarElemCreados() {


    for(let val of elemCreadoPadre) {
        val.remove();
    }

    elemCreadoPadre = [];
    elemCreadoPadre.splice(0, elemCreadoPadre.length);
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


function ParseoEstado(numEstado) {
    switch(numEstado){
        case NUM_ESTADO_MAQUINA_APAGADA:
            return "Apagada";
            break;
        case NUM_ESTADO_MAQUINA_DETENIDA:
            return "Detenida";
            break;
        case NUM_ESTADO_MAQUINA_PRODUCIENDO:
            return "Produciendo";
            break;
        default:
            return "none";
            break;
    }
}