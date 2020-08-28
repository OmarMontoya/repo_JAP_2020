document.addEventListener("DOMContentLoaded", function(e){

  document.getElementById("enviar").addEventListener("click", function() {

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
              
                localStorage.setItem("regUser", JSON.stringify({email: correo.value}));
                window.location = 'inicio.html';
                    
            } else {
              alert('Debes ingresar los datos!');
            }

          });

});