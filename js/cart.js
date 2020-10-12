//Variables globales con las que interactúan todas las funciones
var articArray = [];
var valorTotal = '';
var tasa1 = 1;
var tasa2 = 40;
var currency = '';

function calculoTotal(){    //Se calcula el monto total de los artículos en el carrito

    let sub = document.getElementsByClassName('total');
    let suma = 0;
    for (let i = 0; i < sub.length; i++){

        suma += parseInt(sub[i].innerHTML);
    }
    valorTotal = suma;
    document.getElementById('total').innerHTML = suma;
}

function calculoSubTotal(costoUnit, i){ //Se calcula el subtotal de cada artículo

    let cantidad = parseInt(document.getElementById(`cantidad${i}`).value)
    let subTotal = cantidad * costoUnit;
    document.getElementById(`articuloResult${i}`).innerHTML = subTotal;
    calculoTotal();
    mostrarEnvio();
}

function produCarrito(array){ //Se muestra en pantalla la interfaz del carrito de compras y los artículos seleccionados

    let articCarrito = '';
        
    for(let i = 0; i < array.length; i++){

        let articulo = array[i];
        
        if(articulo == array[0]){

            let producto = articulo.count * articulo.unitCost * tasa1;

            articCarrito +=`
            <tr>

                <td><img src='${articulo.src}' width=60px></td>

                <td style='text-align: center; font-weight: bold;'>${articulo.name}</td>

                <td><input type='number' class='number' id='cantidad${i}' value='${articulo.count}' min='1'
                onchange='calculoSubTotal(${articulo.unitCost*tasa1},${i})'></td>

                <td style="text-align: center;">${articulo.unitCost*tasa1}</td>

                <td style="text-align: center;"><span class='total' id='articuloResult${i}'>${producto}</span></td>

            </tr>
            `

    document.getElementById('contenido').innerHTML = articCarrito;
        }

        if(articulo == array[1]){

            //let tasa = 40;
            let producto = articulo.count * articulo.unitCost*tasa2;

            articCarrito +=`
            <tr>

                <td><img src='${articulo.src}' width=60px></td>

                <td style='text-align: center; font-weight: bold;'>${articulo.name}</td>

                <td><input type='number' class='number' id='cantidad${i}' value='${articulo.count}' min='1'
                onchange='calculoSubTotal(${articulo.unitCost*tasa2},${i})'></td>

                <td style="text-align: center;">${articulo.unitCost*tasa2}</td>

                <td style="text-align: center;"><span class='total' id='articuloResult${i}'>${producto}</span></td>

            </tr>
            `

    document.getElementById('contenido').innerHTML = articCarrito;
        }
  
    }
    calculoTotal();
    mostrarEnvio();
}

function conversion(moneda){ //Permite la conversión de moneda entre pesos y dólares

    if(moneda == 'dolar'){

        tasa1=0.025;
        tasa2=1;
        document.getElementById('currency').innerHTML = 'Costo unitario en USD'
    }

    if(moneda == 'pesos'){

        tasa1=1;
        tasa2=40;
        document.getElementById('currency').innerHTML = 'Costo unitario en $'
    }
    produCarrito(articArray);
}

function mostrarEnvio(){ //se muestra en pantalla costo del envío a montevideo y el interior

    let zona = document.getElementById('listaEnvio').value;
    
    if(zona == 'montevideo'){

        document.getElementById('lugar').innerHTML = 'Montevideo';
        document.getElementById('tiempo').innerHTML = 2;
        document.getElementById('costo').innerHTML = valorTotal*1.1;
    }

    if(zona == 'surDzno'){

        document.getElementById('lugar').innerHTML = 'Sur de Durazno';
        document.getElementById('tiempo').innerHTML = 4;
        document.getElementById('costo').innerHTML = valorTotal*1.2;
    }

    if(zona == 'norDzno'){

        document.getElementById('lugar').innerHTML = 'Norte de Durazno';
        document.getElementById('tiempo').innerHTML = 6;
        document.getElementById('costo').innerHTML = valorTotal*1.25;
    }
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function (resultObj) { //función que almacena los datos del json (backend) en un array
        if (resultObj.status === "ok") {
            articArray = resultObj.data.articles;
            produCarrito(articArray);
            mostrarEnvio();
        }
    })
});