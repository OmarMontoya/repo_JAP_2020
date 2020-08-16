var autos = [];

function mostrarListaAutos(array){

    let contenidoNuevo = "";
    for(let i = 0; i < array.length; i++){
        let lista = array[i];

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

        document.getElementById("caja").innerHTML = contenidoNuevo;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autos = resultObj.data;
            //Muestro las categorías ordenadas
            mostrarListaAutos(autos);
        }
    });
});