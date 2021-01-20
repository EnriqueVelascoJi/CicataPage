//Variables

    
    //Formularios
    const formulario1 = document.getElementById("formulario1");
    const formulario2 = document.getElementById("formulario2");
    const formulario4 = document.getElementById("formulario4");
    const formulario5 = document.getElementById("formulario5");
    
    
    //Formulario de Inicio de sesión
    const btnIngresar = document.querySelector(".btnIngresar");
    const campoUsuario = document.querySelector("#usuario");
    const campoPassword = document.querySelector("#password");

    //Fomulario de Recuperar contraseña
    const btnRecuperar = document.querySelector(".btnRecuperar");
    const btnComprobarUsuario = document.querySelector(".comprobarUsuario");
    const campoUsuarioR = document.querySelector("#usuarioR");
    const campoPregunta1R = document.querySelector("#pregunta1R");
    const campoPregunta2R = document.querySelector("#pregunta2R");
    const campoRespuesta1R = document.querySelector("#respuesta1R");
    const campoRespuesta2R = document.querySelector("#respuesta2R");


    //Formulario de Crear una nueva cuenta
    const btnRegistrarse = document.querySelector("#formulario4 .btnRegistrarse");
    const campoNombre = document.querySelector("#nombre");
    const campoRFC = document.querySelector("#rfc");
    const campoCURP = document.querySelector("#curp");
    const campoProgramaPosgrado = document.querySelector("#programaPosgrado");
    const campoEmail = document.querySelector("#email");
    const campoPasswordC = document.querySelector("#password1");
    const campoPasswordConfirm = document.querySelector("#confirmPassword");

    //Formulario 2 parte
    const campoTipoUsuario = document.querySelector("#tipoUsuario");
    const campoPregunta1 = document.querySelector("#pregunta1");
    const campoPregunta2 = document.querySelector("#pregunta2");
    const campoRespuesta1 = document.querySelector("#respuesta1");
    const campoRespuesta2 = document.querySelector("#respuesta2");
    const campoTipoDocente = document.querySelector("#tipoDocente");
    const campoFechaIngreso = document.querySelector("#fechaIngreso");
    const campoTemaTesis = document.querySelector("#temaTesis");
    const campoAsesor1 = document.querySelector("#asesor1");
    const campoAsesor2 = document.querySelector("#asesor2");


    eventListeners();
    function eventListeners() {

        btnIngresar.addEventListener("click", ()=> loguearUsuario(campoUsuario.value, campoPassword.value));
        btnRecuperar.addEventListener("click", recuperarPassword);
        btnComprobarUsuario.addEventListener("click", encontrarUsuario);
        btnRegistrarse.addEventListener("click", crearNuevaCuenta);
    }

    
    //Función para encontar el usario y que pueda responder a las preguntas
    let respuesta1Recuperada;
    let respuesta2Recuperada;
    let passwordRecuperada; 
    async function encontrarUsuario() {

        const usuarioR = campoUsuarioR.value;
        

        const url= "http://localhost:4000/usuarios";
        let bandera = false;
        try {
            const resultado = await fetch(url);
            const usuarios = await resultado.json();

            usuarios.forEach( usuario => {
                const { email, pregunta1, pregunta2, respuesta1, respuesta2, passwordC} = usuario;
                if( usuarioR === email) {
                    bandera = true;
                    console.log(pregunta1);
                    campoPregunta1R.value = pregunta1;
                    campoPregunta2R.value = pregunta2;
                    respuesta1Recuperada = respuesta1;
                    passwordRecuperada = passwordC;
                    respuesta2Recuperada = respuesta2;
                }

            });
            if(!bandera) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Usuario no válido',
                    confirmButtonText: 'Cambiar',
                    text: '¿Seguro qué éste es tu usuario?',
                })
                
            } 
        } catch (error) {
            console.log(error);
        }

        
    }

    //Función para recuperar la contraseña
    function recuperarPassword() {

        if(campoRespuesta1R.value === respuesta1Recuperada && campoRespuesta2R.value === respuesta2Recuperada) {
            Swal.queue([{
                icon: 'success',
                title: 'Has respondido correctamente',
                confirmButtonText: 'Ver mi contraseña',
                text:
                  'A continuación se te mostrará tu contraseña ' +
                  'Asegurate de guardarla y recordarla',
                preConfirm: () => {
                    Swal.insertQueueStep({
                    title: passwordRecuperada
                    })
                }
              }]);
              formulario5.reset();
              regresarInicioSesionRecuperado();
              
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Incorrecto!!',
                confirmButtonText: 'Corregir',
                text: 'Una o ambas incorrectas',
            })
        }
    }

    //Función que crea una nueva cuenta
    function crearNuevaCuenta(e) {
        e.preventDefault();
        const pilaValidacion = {
            nombre: campoNombre.value,
            rfc: campoRFC.value,
            curp: campoCURP.value,
            programaPosgrado: campoProgramaPosgrado.value,
            email: campoEmail.value,
            passwordC: campoPasswordC.value,
            passwordConfirm: campoPasswordConfirm.value,
            tipoUsuario: campoTipoUsuario.value,
            pregunta1: campoPregunta1.value,
            pregunta2: campoPregunta2.value,
            respuesta1: campoRespuesta1.value,
            respuesta2: campoRespuesta2.value,
            tipoDocente: campoTipoDocente.value,
            fechaIngreso: campoFechaIngreso.value,
            temaTesis: campoTemaTesis.value,
            asesor1: campoAsesor1.value,
            asesor2: campoAsesor2.value
        }

        console.log( pilaValidacion);

        validarFormularioNuevaCuenta( pilaValidacion);
  

    }


    function validarFormularioNuevaCuenta(pilaValidacion) {

        let passwordCorrecta = "";
        let bandera1 = false;
        let bandera2 = false;
        let bandera3 = false;
        let bandera4 = false;
        let bandera5 = false;
        let bandera6 = false;
        let bandera7 = false;
        let bandera8 = false;
        let bandera9 = true;
        let bandera10 = false;
        let bandera11 = false;
        let bandera12 = false;

        
        
        //Validación del nombre
        if(pilaValidacion.nombre=="") {
            campoNombre.classList.add("no-validate");
        } else {
            campoNombre.classList.remove("no-validate");
            bandera5 = true;
        }

        //Validación de la contraseña
        if(pilaValidacion.passwordC.length > 8) {
            let mayuscula = false;
            let minuscula = false;
            let numero = false;
    
            for (let i = 0; i < pilaValidacion.passwordC.length; i++) {
                if (pilaValidacion.passwordC.charCodeAt(i) >= 65 && pilaValidacion.passwordC.charCodeAt(i) <= 90) {
                    mayuscula = true;
                } else if (pilaValidacion.passwordC.charCodeAt(i) >= 97 && pilaValidacion.passwordC.charCodeAt(i) <= 122) {
                    minuscula = true;
                } else if (pilaValidacion.passwordC.charCodeAt(i) >= 48 && pilaValidacion.passwordC.charCodeAt(i) <= 57) {
                    numero = true;
                }
            }
            if (!mayuscula || !minuscula || !numero) {
                campoPasswordC.classList.add("no-validate");
                campoPasswordConfirm.classList.add("no-validate");
            }
            else {
                campoPasswordC.classList.remove("no-validate");
                passwordCorrecta = pilaValidacion.passwordC;
                bandera1 = true;
                
            }
            

        } else {
            campoPasswordC.classList.add("no-validate");
        }

        //Validación de ambas contraseñas
        if(passwordCorrecta !== pilaValidacion.passwordConfirm) {
            campoPasswordConfirm.classList.add("no-validate");
        }
        else {
            campoPasswordConfirm.classList.remove("no-validate");
            bandera2 = true;
        }

        //Validacion del rfc
        const reRFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))$/;
        let validadoRFC = pilaValidacion.rfc.match(reRFC);

        if (!validadoRFC) {
            campoRFC.classList.add("no-validate");
        } else {
            campoRFC.classList.remove("no-validate");
            bandera3 = true;
        }



        //Validacion del CURP
        const reCURP = "^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][\\d])|[3][01])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][\\d])|[3][0])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][\\d])([A-Z0-9]{3}))|" +
        "(([A-ZÑ&]{3})([0-9]{2})[0][2]([0][1-9]|[1][0-9]|[2][0-8])([A-Z0-9]{3}))$";
        let validadoCURP = pilaValidacion.curp.match(reCURP);

        if (!validadoCURP) {
            campoCURP.classList.add("no-validate");
        } else {
            campoCURP.classList.remove("no-validate");
            bandera4 = true;
        }


        //Validación del email
        bandera6 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(pilaValidacion.email);
        if(bandera6) {
            campoEmail.classList.remove("no-validate");
            bandera10 = true;
        } else {
            campoEmail.classList.add("no-validate");
        }
        //Validación del campo posgrado
        if(pilaValidacion.programaPosgrado === "Maestria" || pilaValidacion.programaPosgrado === "Doctorado") {
            campoProgramaPosgrado.classList.remove("no-validate");
            bandera7 = true;
        } else {
            campoProgramaPosgrado.classList.add("no-validate");
        }

        //Validacion del tipo usuario
        if(pilaValidacion.tipoUsuario === "Aspirante" || pilaValidacion.tipoUsuario === "Alumno" || pilaValidacion.tipoUsuario === "Docente") {
            campoTipoUsuario.classList.remove("no-validate");
            bandera8 = true;
            if( pilaValidacion.tipoUsuario === "Docente") {
                if(pilaValidacion.tipoDocente === "Interno" || pilaValidacion.tipoDocente === "Externo" || pilaValidacion.tipoDocente === "Invitado") {
                    campoTipoDocente.classList.remove("no-validate");
                    bandera9 = true;
                } else {
                    campoTipoDocente.classList.add("no-validate");
                    bandera9 = false;
                }
            }
        } else {
            campoTipoUsuario.classList.add("no-validate");
        }
        
        //Validación de los campos de preguntas
        if(pilaValidacion.pregunta1 === "") {
            campoPregunta1.classList.add("no-validate");
        } else {
            campoPregunta1.classList.remove("no-validate");
            bandera11 = true;
        }
        if(pilaValidacion.pregunta2 === "") {
            campoPregunta2.classList.add("no-validate");
        } else {
            campoPregunta2.classList.remove("no-validate");
            bandera12 = true;
        }

        //Una vez validado los compas se procede a registrarlo en el archivo .json
        if(bandera1 && bandera2 && bandera3 && bandera4 && bandera5 && bandera6 && bandera7 && bandera8 && bandera9 && bandera10 && bandera11 && bandera12) {
            formulario2.reset();
            formulario4.reset();
            
            const nuevoUsuario = pilaValidacion;
            agregarNuevoUsario(nuevoUsuario);
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Error(es) en el formulario',
                text: 
                'Revise una vez más el formulario',
                confirmButtonText: 'Corregir'
              })
        }
    }
    

    //Agregar un nuevo usuario
    async function agregarNuevoUsario(nuevoUsuario) {
        console.log(nuevoUsuario);
        const url= "http://localhost:4000/usuarios";

        try{
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(nuevoUsuario),
                headers: {
                    'Content-Type': "application/json"
                }
            });
            Swal.fire(
                'Usuario Creado correctamente!'
              )
            
        }catch (error) {
            console.log(error);
        }
        
    }

    //Funcióin que permite ingresar al usuario al sistema
    async function loguearUsuario(usuarioL, passwordL) {
          
        const url= "http://localhost:4000/usuarios";
        let bandera = false;
        try {
            const resultado = await fetch(url);
            const usuarios = await resultado.json();

            usuarios.forEach( usuario => {
                const {email, passwordC} = usuario;
                if( usuarioL === email && passwordL=== passwordC) {
                    bandera = true;
                    
                }

            });
            if(bandera) {
                
                
                formulario1.reset();
                window.location.href = "inicio.html";
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error :(',
                    text: 
                    'Credenciales Erróneas',
                    confirmButtonText: 'Corregir'
                  })
            }
        } catch (error) {
            console.log(error);
        }
    }
    
     

    //Bootstrap
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();   
    });
    
