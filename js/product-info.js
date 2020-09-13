var autoComentarios= [];

function mostrarInfoAutos(carInfo, carComm) {

    let autoContenido = '';
    let autoImagenes = '';
    let autoComm = '';
    
    autoContenido = `
                        <p><strong>Nombre: </strong>${carInfo.name}</p>
                        <p><strong>Descripción: </strong>${carInfo.description}</p>
                        <p><strong>Costo: </strong>${carInfo.cost}</p>
                        <p><strong>Moneda: </strong>${carInfo.currency}</p>
                        <p><strong>Cantidad de vendidos: </strong>${carInfo.soldCount}</p>
                        <p><strong>Categoría: </strong>${carInfo.category}</p>
                        
    `
    autoImagenes = `
                        <img class='imagen' src='${carInfo.images[0]}' alt='imagen 1 de auto'>
                        <img class='imagen' src='${carInfo.images[1]}' alt='imagen 2 de auto'>
                        <img class='imagen' src='${carInfo.images[2]}' alt='imagen 3 de auto'>
                        <img class='imagen' src='${carInfo.images[3]}' alt='imagen 4 de auto'>
                        <img class='imagen' src='${carInfo.images[4]}' alt='imagen 5 de auto'>
                        
    `
    
    for (let i = 0; i < carComm.length; i++) {

        let comm = carComm[i];
        let score = '';
        for (let i = 1; i <= comm.score; i++) {
            score += `<span class='fa fa-star checked'></span>`
        }
        for (let i = 1 + comm.score; i <= 5; i++) {
            score += `<span class='fa fa-star'></span>`
        }
        autoComm += `
                                <br>
                                <div>${score}</div>
                                <p><strong>Comentario: </strong>${comm.description}</p>
                                <p><strong>Usuario: </strong>${comm.user}</p>
                                <p><sub>${comm.dateTime}</sub></p>
                                <p><hr></p>
                                <br>
    `
    }
    
    document.getElementById('auto-info').innerHTML = autoContenido;
    document.getElementById('auto-img').innerHTML = autoImagenes;
    document.getElementById('auto-comm').innerHTML = autoComm;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autosInfo = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autoComentarios = resultObj.data;
            //Muestro la información del auto junto con los comentarios
            mostrarInfoAutos(autosInfo, autoComentarios);
        }
    });

    document.getElementById('sendComm').addEventListener('click', function(){

        let fechaHora = new Date();
        let fechaHoy = `${fechaHora.getFullYear()}-${fechaHora.getMonth()+1}-${fechaHora.getDate()}
                        ${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}
        `;
        
        let points = document.getElementById('puntaje').value;
        let nuevoComentario = {
                                score: parseInt(points),
                                description: document.getElementById('frameText').value,
                                user: JSON.parse(localStorage.getItem('regUser')).email,
                                dateTime: fechaHoy
        };
        autoComentarios.push(nuevoComentario);
        mostrarInfoAutos(autosInfo, autoComentarios);
    })
});