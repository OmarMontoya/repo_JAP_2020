var autos = [];
var minPrecio = undefined;
var maxPrecio = undefined;
var buscar = undefined;
const DESCENDENTE = 'Desc';
const ASCENDENTE = 'Asc';
const ID_DESCENDENTE = 'Id_Desc';


function mostrarListaAutos(array){

    let contenidoNuevo = "";
    for(let i = 0; i < array.length; i++){
        let lista = array[i];

        /*Código para filtrar por cantidad, entre un mínimo y un máximo*/

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(lista.cost) >= minPrecio))
            && ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(lista.cost) <= maxPrecio))) {

        contenidoNuevo +=`
        <div class="main">
            <div class="caja-img">
                <img class="imagen" src="`+ lista.imgSrc +`" alt="">
            </div> 
            <div class="caja-text">
                <p>Nombre: `+ lista.name +`</p>
                <p>Descripción: `+ lista.description +`</p>
                <p>Costo: `+ lista.cost +`</p> 
                <p>Moneda: `+ lista.currency +`</p>
            </div>
            <div class="caja-sold">
                <small>Cantidad vendida: `+ lista.soldCount +`</small>
            </div>
        </div>
        `
        }

        document.getElementById("caja").innerHTML = contenidoNuevo;
    
    }
}

/*Código para filtrar por costo y cantidad de vendidos, en orden ascendente y descendente*/

function filtrarAutos(criterio, array) {
    
    let autosArray = [];

    if (criterio === DESCENDENTE) {
        autosArray = array.sort(function(a,b) {
            return b.cost-a.cost;
        });
    } else if (criterio === ASCENDENTE) {
        autosArray = array.sort(function(a,b) {
            return a.cost-b.cost;
        });
    } else if (criterio === ID_DESCENDENTE) {
        autosArray = array.sort(function(a,b) {
            return b.soldCount-a.soldCount;
        });
    }

    return autosArray;
}

/* Eventos de carga de página y click en botones de filtrado */

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autos = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarListaAutos(autos);
        }
    });

    document.getElementById("filtrar").addEventListener("click", function() {

        minPrecio = document.getElementById("minimo").value;
        maxPrecio = document.getElementById("maximo").value;

        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio) >= 0)) {
            minPrecio = parseInt(minPrecio);
        } else {
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio) >= 0)) {
            maxPrecio = parseInt(maxPrecio);
        } else {
            maxPrecio = undefined;
        }

        mostrarListaAutos(autos);
    })

    document.getElementById("limpiar").addEventListener("click", function() {

        document.getElementById("minimo").value = "";
        document.getElementById("maximo").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        mostrarListaAutos(autos);
    })

    document.getElementById('Pag-Desc').addEventListener('click', function() {

        autos = filtrarAutos(DESCENDENTE,autos);

        mostrarListaAutos(autos);   
    })

    document.getElementById('Pag-Asc').addEventListener('click', function() {

        autos = filtrarAutos(ASCENDENTE,autos);

        mostrarListaAutos(autos);   
    })

    document.getElementById('Id-Desc').addEventListener('click', function() {

        autos = filtrarAutos(ID_DESCENDENTE,autos);

        mostrarListaAutos(autos);   
    })

});