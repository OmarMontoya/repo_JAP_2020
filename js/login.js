document.addEventListener("DOMContentLoaded", function(e){

  
        document.getElementById("enviar").document.addEventListener("click", function (e) {

            let correo = document.getElementById("email");
            let password = document.getElementById("password");
            let camposLlenos = true;
          
            if (correo.value === '') {
              camposLlenos = false;
            }

            if (password.value === '') {
              camposLlenos = false;
            }

            if(camposLlenos) {
              window.location = "inicio.html";
            }

          });
});