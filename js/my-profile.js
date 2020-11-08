document.addEventListener("DOMContentLoaded", function (e) {

    let profile = localStorage.getItem('profile');

    if(profile){

        profile = JSON.parse(profile);

        if(profile.urlImg != ''){

            document.getElementById('imgProfile').src = profile.urlImg;
        }
        document.getElementById('urlImg').value = profile.urlImg;
        document.getElementById('nombres').value = profile.nombres;
        document.getElementById('apellidos').value = profile.apellidos;
        document.getElementById('edad').value = profile.edad;
        document.getElementById('email').value = profile.email; 
        document.getElementById('telefono').value = profile.telefono;
    }

    document.getElementById('aceptar').addEventListener('click', function(){

        let validacion = true;
        let nombres = document.getElementById('nombres');
        let apellidos = document.getElementById('apellidos');
        let edad = document.getElementById('edad');
        let email = document.getElementById('email');
        let telefono = document.getElementById('telefono');

        if(nombres.value === ''){

            nombres.classList.add('is-invalid');
            validacion = false;
        } else {
            nombres.classList.remove('is-invalid');
        }

        if (apellidos.value === ''){

            apellidos.classList.add('is-invalid');
            validacion = false;
        } else {
            apellidos.classList.remove('is-invalid');
        }

        if(edad.value === ''){

            edad.classList.add('is-invalid');
            validacion = false;
        } else {
            edad.classList.remove('is-invalid');
        }

        if(email.value === ''){

            email.classList.add('is-invalid');
            validacion = false;
        } else {
            email.classList.remove('is-invalid');
        }

        if(telefono.value === ''){

            telefono.classList.add('is-invalid');
            validacion = false;
        } else {
            telefono.classList.remove('is-invalid');
        }

        if(validacion){

            localStorage.setItem('profile', JSON.stringify({

                urlImg: urlImg.value,
                nombres: nombres.value,
                apellidos: apellidos.value,
                edad: edad.value,
                email: email.value,
                telefono: telefono.value
            }));

            window.location = 'my-profile.html';
        }
    });

});