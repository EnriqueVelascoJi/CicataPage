// Variables

//Formularios
const formulario1P = document.getElementById("formulario1");
const formulario2P = document.getElementById("formulario2");
const formulario4P = document.getElementById("formulario4");
const formulario5P = document.getElementById("formulario5");
    
const crearCuentaEvent = document.querySelector(".contenedor1");
const crearCuenta = document.querySelector(".registro");

const inicioSesion = document.querySelector(".inicio-sesion");

const siguiente = document.querySelector(".siguiente");
const crearCuenta2 = document.querySelector(".registro2");

const anterior = document.querySelector(".anterior");

const recuperarPasswordEvent = document.querySelector(".contenedor2");
const recuperarPasswordP = document.querySelector(".recuperar");


const tipoUsuario = document.getElementById("tipoUsuario");
const campoDocente = document.querySelector(".campo21");

const campoAlumno1 = document.querySelector(".campo22");
const campoAlumno2 = document.querySelector(".campo23");
const campoAlumno3 = document.querySelector(".campo24");
const campoAlumno4 = document.querySelector(".campo25");


const principalContainer = document.querySelector("#principal .container");
const campos = document.querySelectorAll("#formulario4 .campo, #formulario4 button");


eventListeners();
function eventListeners(){
    
    crearCuentaEvent.addEventListener("click", crearNuevaCuenta);
    crearCuenta.addEventListener("click", regresarInicioSesion);
    siguiente.addEventListener("click", avanzarFormulario);
    anterior.addEventListener("click", retrasarFormulario);
    recuperarPasswordEvent.addEventListener("click", recuperar);
    recuperarPasswordP.addEventListener("click", regresarInicioSesion);
    tipoUsuario.addEventListener("change", desplegarOpciones);
}

let alumno;
function crearNuevaCuenta(e) {
    e.preventDefault();
    if(e.target.classList.contains("CrearCuentaEvent")) {
        crearCuenta.style.display = "flex";
        inicioSesion.style.display = "none";
        formulario1P.reset();
        
    }
}

function regresarInicioSesion(e) {
    e.preventDefault();
    if(e.target.classList.contains("volverInicio")) {
        crearCuenta.style.display = "none";
        inicioSesion.style.display = "flex";
        recuperarPasswordP.style.display = "none";
        formulario5P.reset();
        formulario4P.reset();
        formulario2P.reset();
    }
}
function regresarInicioSesionRecuperado() {
    crearCuenta.style.display = "none";
    inicioSesion.style.display = "flex";
    recuperarPasswordP.style.display = "none";
    formulario5P.reset();
    formulario4P.reset();
    formulario2P.reset();
}

function avanzarFormulario() {
    crearCuenta.style.display = "none";
    crearCuenta2.style.display = "flex";
    if(alumno === "Alumno") {
        principalContainer.style.height = "60vh";
    }
}
function retrasarFormulario() {
    crearCuenta.style.display = "flex";
    crearCuenta2.style.display = "none";
    principalContainer.style.height = "50vh";
}
function recuperar(e) {
    e.preventDefault();
    if(e.target.classList.contains("recuperarContraseñaEvent")) {
        recuperarPasswordP.style.display = "flex";
        inicioSesion.style.display = "none";
        formulario1P.reset();
    }
}

function desplegarOpciones(e) {
    
    console.log(e.target.value);
    alumno = e.target.value;
    if(alumno === "Docente") {
        campoDocente.style.display = "block";
        campoAlumno1.style.display = "none";
        campoAlumno2.style.display = "none";
        campoAlumno3.style.display = "none";
        campoAlumno4.style.display = "none";
        principalContainer.style.height = "50vh";
        campos.forEach(element => {
            console.log(element);
            element.style.height = "20%";
        });
    }
    else if(alumno=== "Alumno") {
        campoDocente.style.display = "none";
        campoAlumno1.style.display = "block";
        campoAlumno2.style.display = "block";
        campoAlumno3.style.display = "block";
        campoAlumno4.style.display = "block";
        principalContainer.style.height = "60vh";
        campos.forEach(element => {
            element.style.height = "15%";
        });
    }
    else {
        campoDocente.style.display = "none";
        campoAlumno1.style.display = "none";
        campoAlumno2.style.display = "none";
        campoAlumno3.style.display = "none";
        campoAlumno4.style.display = "none";
        principalContainer.style.height = "50vh";
        campos.forEach(element => {
            element.style.height = "20%";
        });

    }
}

