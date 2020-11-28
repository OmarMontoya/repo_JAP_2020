//Variables globales con las que interactúan todas las funciones
var articArray = [];
var valorTotal = '';
var tasa1 = 1;
var tasa2 = 40;
var currency = '';
var modal = document.getElementById('confirmar');

function calculoTotal(){    //Se calcula el monto total de los artículos en el carrito

    let sub = document.getElementsByClassName('total');
    let suma = 0;
    for (let i = 0; i < sub.length; i++){

        suma += parseInt(sub[i].innerHTML);
    }
    valorTotal = suma;
    document.getElementById('total').innerHTML = suma;
    document.getElementById('costo').innerHTML = valorTotal;
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

                <td><button onclick='borrarProducto(${i})' class='btn btn-danger'>X</button></td>

            </tr>
            `

    document.getElementById('contenido').innerHTML = articCarrito;
        }

        if(articulo == array[1]){

            let producto = articulo.count * articulo.unitCost*tasa2;

            articCarrito +=`
            <tr>

                <td><img src='${articulo.src}' width=60px></td>

                <td style='text-align: center; font-weight: bold;'>${articulo.name}</td>

                <td><input type='number' class='number' id='cantidad${i}' value='${articulo.count}' min='1'
                onchange='calculoSubTotal(${articulo.unitCost*tasa2},${i})'></td>

                <td style="text-align: center;">${articulo.unitCost*tasa2}</td>

                <td style="text-align: center;"><span class='total' id='articuloResult${i}'>${producto}</span></td>

                <td><button onclick='borrarProducto(${i})' class='btn btn-danger'>X</button></td>

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
        document.getElementById('currency').innerHTML = 'Costo unitario en U$D'
    }

    if(moneda == 'pesos'){

        tasa1=1;
        tasa2=40;
        document.getElementById('currency').innerHTML = 'Costo unitario en $'
    }
    produCarrito(articArray);
    calculoTotal();
    tipoEnvio();
}

function mostrarEnvio(){ //se muestra en pantalla costo del envío a montevideo y el interior

    let zona = document.getElementById('listaEnvio').value;
    
    switch(zona){

        case 'montevideo':
            document.getElementById('lugar').innerHTML = 'Montevideo';
            break;

        case 'canelones':
            document.getElementById('lugar').innerHTML = 'Canelones';
            break;

        case 'sanJose':
            document.getElementById('lugar').innerHTML = 'San José';
            break;

        case 'maldonado':
            document.getElementById('lugar').innerHTML = 'Maldonado';
            break;

        case 'colonia':
            document.getElementById('lugar').innerHTML = 'Colonia';
            break;

        case 'rocha':
            document.getElementById('lugar').innerHTML = 'Rocha';
            break;
            
        case 'soriano':
            document.getElementById('lugar').innerHTML = 'Soriano';
            break;

        case 'flores':
            document.getElementById('lugar').innerHTML = 'Flores';
            break;

        case 'florida':
            document.getElementById('lugar').innerHTML = 'Florida';
            break;

        case 'lavalleja':
            document.getElementById('lugar').innerHTML = 'Lavalleja';
            break;

        case 'rioNegro':
            document.getElementById('lugar').innerHTML = 'Río Negro';
            break;

        case 'durazno':
            document.getElementById('lugar').innerHTML = 'Durazno';
            break;

        case 'tresTres':
            document.getElementById('lugar').innerHTML = 'Treinta y Tres';
            break;

        case 'paysandu':
            document.getElementById('lugar').innerHTML = 'Paysandú';
            break;

        case 'tacuarembo':
            document.getElementById('lugar').innerHTML = 'Tacuarembó';
            break;

        case 'cerroLargo':
            document.getElementById('lugar').innerHTML = 'Cerro Largo';
            break;

        case 'salto':
            document.getElementById('lugar').innerHTML = 'Salto';
            break;

        case 'rivera':
            document.getElementById('lugar').innerHTML = 'Rivera';
            break;

        case 'artigas':
            document.getElementById('lugar').innerHTML = 'Artigas';
            break;
    }
    
    calculoTotal();    
}

function tipoEnvio(envio){ //Calcula el tipo de envío
  
    if(envio=='premium'){
        document.getElementById('tiempo').innerHTML = '2-5';
        document.getElementById('costo').innerHTML = valorTotal*1.15;
    } if (envio=='express'){
        document.getElementById('tiempo').innerHTML = '5-8';
        document.getElementById('costo').innerHTML = valorTotal*1.07;
    } if(envio=='standar'){
        document.getElementById('tiempo').innerHTML = '12-15';
        document.getElementById('costo').innerHTML = valorTotal*1.05;
    }

}

function borrarProducto(i){

    if(articArray.length>1){
        articArray.splice(i,1);
        produCarrito(articArray);
    } else{
        document.getElementById('main-box').innerHTML =`
                                                        <h2 style="text-align: center;">No quedan artículos en el carrito</h2>
                                                        <h3 style="text-align: center;">Por favor recargue la página <a href="cart.html">acá</a></h3>
                                                        `
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

    modal.addEventListener('click', function(){

        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('telefono').value;
        let direccion = document.getElementById('direccion').value;
        let formaPago = document.getElementById('tipoPago').value;
        let anexo = '';

        anexo =`
                <br><hr>
                    <div class="container shadow-lg p-3 mb-5 bg-white rounded">
                        <h5>Los datos del cliente son:</h5>
                        <p><strong>Nombre:</strong> ${nombre}</p>
                        <p><strong>Apellido:</strong> ${apellido}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Teléfono:</strong> ${telefono}</p>
                        <p><strong>Dirección:</strong> ${direccion}</p>
                        <p><strong>Forma de pago:</strong> ${formaPago}</p>
                    </div>
                `

        document.getElementById('datos').innerHTML = anexo;
    })
});