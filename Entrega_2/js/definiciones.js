/*

Coderhouse - Curso javascript
Preentrega 2
Elian andrenacci


En este script se generan las clases para guardar los datos



*/





//  --------        INICIO      -------------------------

class ItemTablaRegEstado {

    constructor(nroGolpe, estdo, tIncio, duracion) {
        this.nroGolpe = nroGolpe;
        this.estdo = estdo;
        this.tIncio = tIncio;
        this.duracion = duracion;
    }


    
}


class TablaRegEstado {
    
    constructor() {
        this.ArrayItemTablaRegEstado = [];
    }

    AgregarElemento(nroGolpe, estdo, tIncio, duracion) {
        this.ArrayItemTablaRegEstado.push(new ItemTablaRegEstado(nroGolpe, estdo, tIncio, duracion)); 
    }

    GetGolpe(nElem) {
        return this.ArrayItemTablaRegEstado[nElem].nroGolpe;
    }

    GetEstado(nElem) {
        return this.ArrayItemTablaRegEstado[nElem].estdo;
    }

    GetTInicio(nElem) {
        return this.ArrayItemTablaRegEstado[nElem].tIncio;
    }

    GetDuracion(nElem) {
        return this.ArrayItemTablaRegEstado[nElem].duracion;
    }

    GetDuracionParseada(nElem) {
        return ParseHoraMin(this.ArrayItemTablaRegEstado[nElem].duracion);
    }


    GetCantElem() {
        return this.ArrayItemTablaRegEstado.length;
    }

    ImprimirDatosSalida(metodoSalida) {
        this.ArrayItemTablaRegEstado.forEach(elem => {
            metodoSalida("Nro golpe: "+elem.nroGolpe+"\nEstado: "+elem.estdo+"\ntInicio: "+elem.tIncio+"\nDuracion: "+elem.duracion);
        });
    }

}

//  ----------       FIN         --------------------







//  --------        INICIO      ---------------------

class ItemTablaTiempoCiclo {
    constructor(nroGolpe, inyc, carg, succ, mldCrdo, mldAbrto, tmpCiclo) {
        this.nroGolpe = nroGolpe;
        this.inyc = inyc;
        this.carg = carg;
        this.succ = succ;
        this.mldCrdo = mldCrdo;
        this.mldAbrto = mldAbrto;
        this.tmpCiclo = tmpCiclo;
    }
}


class TablaTiempoCiclo {
    
    constructor() {
        this.ArrayItemTablaTiempoCiclo = [];
    }

    AgregarElemento(nroGolpe, inyc, carg, succ, mldCrdo, mldAbrto, tmpCiclo) {
        this.ArrayItemTablaTiempoCiclo.push(new ItemTablaTiempoCiclo(nroGolpe, inyc, carg, succ, mldCrdo, mldAbrto, tmpCiclo)); 
    }

    GetGolpe(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].nroGolpe;
    }

    GetTInyeccion(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].inyc;
    }

    GetTCarga(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].carg;
    }

    GetTSuccion(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].succ;
    }

    GetTMoldeCerrado(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].mldCrdo;
    }

    GetTMoldeAbierto(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].mldAbrto;
    }

    GetTMoldeAbierto(nElem) {
        return this.ArrayItemTablaTiempoCiclo[nElem].mldAbrto;
    }

    
    GetDatosTabla() {
        let arraySalida = [
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.nroGolpe),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.inyc),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.carg),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.succ),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.mldCrdo),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.mldAbrto),
            this.ArrayItemTablaTiempoCiclo.map(elem => elem.tmpCiclo)
        ];

        return arraySalida;
    }


    GetCantElem() {
        return this.ArrayItemTablaTiempoCiclo.length;
    }

    ImprimirItems() {
        this.ArrayItemTablaTiempoCiclo.forEach(elem => {
            elem.ImprimirEnConsola();
        });
    }

    ImprimirDatosSalida(metodoSalida) {
        this.ArrayItemTablaTiempoCiclo.forEach(elem => {
            metodoSalida("Nro golpe: "+elem.nroGolpe+"\nT.Inyec: "+elem.inyc+
            "\nT.Carga: "+elem.carg+"\nT.Succion: "+elem.succ+"\nT.Molde cerrado: "+elem.mldCrdo+
            "\nT.Molde abierto: "+elem.mldAbrto+"\nT.Ciclo: "+elem.tmpCiclo);
        });
    }
}

//  ----------       FIN         --------------------








//  --------        INICIO      ---------------------

class ItemRegProdDato {
    constructor(id, hora, prodAcum) {
        this.id = id;
        this.hora = hora;
        this.prodAcum = prodAcum;
    }
}

class ItemRegProdDatoTurno {
    constructor(id, fecha, idTurno, cantProd) {
        this.id = id;
        this.fecha = fecha;
        this.idTurno = idTurno;
        this.cantProd = cantProd;
    }
}

class ItemRegProdNombreTurno {
    constructor(idTurno, nombreTurno) {
        this.idTurno = idTurno;
        this.nombreTurno = nombreTurno;
    }
}

class ClassRegProd {
    constructor() {
        this.arrayRegProdP = [];
        this.arrayRegProdTG = [];
        this.arrayRegProdNT = [];
    }

    AgregarElemDato(id, hora, prodAcum) {
        this.arrayRegProdP.push(new ItemRegProdDato(id, hora, prodAcum)); 
    }
    AgregarElemDatoTurno(id, fecha, idTurno, cantProd) {
        this.arrayRegProdTG.push(new ItemRegProdDatoTurno(id, fecha, idTurno, cantProd)); 
    }
    AgregarElemNombreTurno(idTurno, nombreTurno) {
        this.arrayRegProdNT.push(new ItemRegProdNombreTurno(idTurno, nombreTurno)); 
    }

    GetFechayNombreTurnoActual(nroTurno) {
        return this.GetFecha()[nroTurno] + " " + this.GetNombreTurnos()[nroTurno];
    }

    GetDatosHora(id) {
        let arraySalida = [];

        for(let val of this.arrayRegProdP){
            if(val.id == id) {
                arraySalida.push(ParseHora(val.hora));
            }
        }

        return arraySalida;
    }

    GetDatosProdAcum(id) {
        let arraySalida = [];

        for(let val of this.arrayRegProdP){
            if(val.id == id) {
                arraySalida.push(val.prodAcum);
            }
        }

        return arraySalida;
    }

    GetCantDatosTurnos() {
        return this.arrayRegProdTG.length;
    }


    GetNombreTurnos() {
        let arrayNbresSalida = [];

        for(let listTurnos of this.arrayRegProdTG) {
            for(let listNomTrns of this.arrayRegProdNT) {
                if(listTurnos.idTurno == listNomTrns.idTurno) {
                    arrayNbresSalida.push(listNomTrns.nombreTurno);
                    break;
                }
            }
        }
        
        return arrayNbresSalida;
    }

    GetIdTurnos() {
        return this.arrayRegProdTG.map(elem => elem.id);
    }

    GetFecha() {
        return this.arrayRegProdTG.map(elem => ParseFecha(elem.fecha));
    }

    GetCantProd() {
        return this.arrayRegProdTG.map(elem => elem.cantProd);
    }

    GetDatosTabla() {
        let arraySalida = [];

        arraySalida.push(this.GetFecha());
        arraySalida.push(this.GetNombreTurnos());
        arraySalida.push(this.GetCantProd());

        return arraySalida;
    }

    ExisteTurnoId(idTurno) {
        if(this.GetIdTurnos().includes(idTurno)) {
            return true;
        }
        return false;
    }


    ImprimirDatosTurnosSalida(metodoSalida) {

        let cantTurnos = this.GetCantDatosTurnos();

        for(let i = 0; i < cantTurnos; i++) {
            metodoSalida("Id turno: "+this.arrayRegProdTG[i].id+"\nFecha: "+this.arrayRegProdTG[i].fecha+
            "\nTurno: "+this.GetNombreTurnos()[i]+"\nCant prod: "+this.arrayRegProdTG[i].cantProd);
        } 
        
    }


    ImprimirDatosTurnoEspecificoSalida(metodoSalida, idTurno) {
        
        let arrayHora = this.GetDatosHora(idTurno);
        let arrayProdAcum = this.GetDatosProdAcum(idTurno);
        
        let cantTurnos = arrayHora.length;
        
        for(let i = 0; i < cantTurnos; i++) {
            metodoSalida("Hora: "+arrayHora[i]+"\nProd: "+arrayProdAcum[i]);
        }
    }

}

//  ----------       FIN         --------------------






//  --------        INICIO      ---------------------

class ItemMaquina {
    constructor(id, numero, nombre, estado) {
        this.id = id;
        this.numero = numero;
        this.nombre = nombre;
        this.estado = estado;
    }
}

class ListaMaquinas {
    constructor() {
        this.arrayMaquinas = [];
    }

    AgregarElem(id, numero, nombre, estado) {
        this.arrayMaquinas.push(new ItemMaquina(id, numero, nombre, estado)); 
    }

    GetId() {
        return this.arrayMaquinas.map(elem => elem.id);
    }

    GetNumero() {
        return this.arrayMaquinas.map(elem => elem.numero);
    }

    GetNombre() {
        return this.arrayMaquinas.map(elem => elem.nombre);
    }

    GetEstado() {
        return this.arrayMaquinas.map(elem => elem.estado);
    }

    GetCantMaquinas() {
        return this.arrayMaquinas.length;
    }

    GetDatosMaquinas() {
        let arraySalida = [];

        arraySalida.push(this.GetId());
        arraySalida.push(this.GetNumero());
        arraySalida.push(this.GetNombre());
        arraySalida.push(this.GetEstado());

        return arraySalida;
    }

    ExisteMaqId(idMaq) {
        if(this.GetId().includes(idMaq)) {
            return true;
        }
        return false;
    }

    ImprimirDatosMaquina(metodoSalida) {
        for(let elem of this.arrayMaquinas) {
            metodoSalida("Id: "+elem.id+" Num: "+elem.numero+" Nmbre: "+elem.nombre+" Estd: "+ParseEstado(elem.estado));
        }
    }

    ImprimirDatosMaquinaEspecifica(metodoSalida, numMaq) {
        const elem = this.arrayMaquinas.find(element => element.id == numMaq);
        if(elem == undefined) {return;}
        metodoSalida("Id: "+elem.id+" Num: "+elem.numero+" Nmbre: "+elem.nombre+" Estd: "+ParseEstado(elem.estado));
    }
}
