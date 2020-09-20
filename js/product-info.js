var autoComentarios = [];
var autosRelatedInfo = [];

function mostrarInfoAutos(carInfo, carComm, carRelated) {
  let autoContenido = "";
  let autoImagenes = "";
  let autoComm = "";
  let carContRelated = "";
  let autoRelated1 = carInfo.relatedProducts[0];
  let autoRelated2 = carInfo.relatedProducts[1];
  let usuario = localStorage.getItem("regUser");
  let showComm = document.getElementById("comm-ctrl");

  autoContenido = `
                        <p><strong>Nombre: </strong>${carInfo.name}</p>
                        <p><strong>Descripción: </strong>${carInfo.description}</p>
                        <p><strong>Costo: </strong>${carInfo.cost}</p>
                        <p><strong>Moneda: </strong>${carInfo.currency}</p>
                        <p><strong>Cantidad de vendidos: </strong>${carInfo.soldCount}</p>
                        <p><strong>Categoría: </strong>${carInfo.category}</p>
                        
    `;
  autoImagenes = `
                    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${carInfo.images[0]}" class="d-block w-100" alt="Imagen de auto 1">
                            </div>
                            <div class="carousel-item">
                                <img src="${carInfo.images[1]}" class="d-block w-100" alt="Imagen de auto 2">
                            </div>
                            <div class="carousel-item">
                                <img src="${carInfo.images[2]}" class="d-block w-100" alt="Imagen de auto 3">
                            </div>
                            <div class="carousel-item">
                                <img src="${carInfo.images[3]}" class="d-block w-100" alt="Imagen de auto 4">
                            </div>
                            <div class="carousel-item">
                                <img src="${carInfo.images[4]}" class="d-block w-100" alt="Imagen de auto 5">
                            </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>
                    </div>                      
    `;

  for (let i = 0; i < carComm.length; i++) {
    let comm = carComm[i];
    let score = "";
    for (let i = 1; i <= comm.score; i++) {
      score += `<span class='fa fa-star checked'></span>`;
    }
    for (let i = 1 + comm.score; i <= 5; i++) {
      score += `<span class='fa fa-star'></span>`;
    }
    autoComm += `
                                <br>
                                <div>${score}</div>
                                <p><strong>Comentario: </strong>${comm.description}</p>
                                <p><strong>Usuario: </strong>${comm.user}</p>
                                <p><sub>${comm.dateTime}</sub></p>
                                <p><hr></p>
                                <br>
    `;
  }

  if (usuario) {
    showComm.style = "display: block";
  }

  for (let i = 0; i < carRelated.length; i++) {
    let array = carRelated[i];
    if (autoRelated1 == i) {
      carContRelated += `
                                <div class='main'>
                                <div class='caja-img'>
                                    <img class='imagen' src='${array.imgSrc}'>
                                </div>
                                <div class='caja-text'>
                                    <p><strong>Nombre: </strong>${array.name}</p>
                                    <p><strong>Descripción: </strong>${array.description}</p>
                                    <p><strong>Precio: </strong>${array.cost}</p>
                                    <p><strong>Moneda: </strong>${array.currency}</p>
                                </div>
                                </div>
            `;
    }

    if (autoRelated2 == i) {
      carContRelated += `
                                <div class='main'>
                                <div class='caja-img'>
                                    <img class='imagen' src='${array.imgSrc}'>
                                </div>
                                <div class='caja-text'>
                                    <p><strong>Nombre: </strong>${array.name}</p>
                                    <p><strong>Descripción: </strong>${array.description}</p>
                                    <p><strong>Precio: </strong>${array.cost}</p>
                                    <p><strong>Moneda: </strong>${array.currency}</p>
                                </div>
                                </div>
            `;
    }
  }

  document.getElementById("auto-info").innerHTML = autoContenido;
  document.getElementById("auto-img").innerHTML = autoImagenes;
  document.getElementById("auto-comm").innerHTML = autoComm;
  document.getElementById("auto-related").innerHTML = carContRelated;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      autosInfo = resultObj.data;
    }
  });

  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      autosRelatedInfo = resultObj.data;
    }
  });

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      autoComentarios = resultObj.data;
      //Muestro la información del auto junto con los comentarios
      mostrarInfoAutos(autosInfo, autoComentarios, autosRelatedInfo);
    }
  });

  document.getElementById("sendComm").addEventListener("click", function () {
    let fechaHora = new Date();
    let fechaHoy = `${fechaHora.getFullYear()}-${
      fechaHora.getMonth() + 1
    }-${fechaHora.getDate()}
                        ${fechaHora.getHours()}:${fechaHora.getMinutes()}:${fechaHora.getSeconds()}
        `;

    let points = document.getElementById("puntaje").value;
    let nuevoComentario = {
      score: parseInt(points),
      description: document.getElementById("frameText").value,
      user: JSON.parse(localStorage.getItem("regUser")).email,
      dateTime: fechaHoy,
    };
    autoComentarios.push(nuevoComentario);
    mostrarInfoAutos(autosInfo, autoComentarios, autosRelatedInfo);
  });
});
