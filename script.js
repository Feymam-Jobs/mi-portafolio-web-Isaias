let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}

function descargarPDF() {
    const elemento = document.getElementById(descargarPDF());
    html2pdf()
        .set({
            margin: 10,
            filename: '2FORMATO HOJA DE VIDA PARA PRACTICAS_SENA.pdf',
            image: { type: 'pdf', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(elemento)
        .save();
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
}

//Ventana de confirmación del formulario de contacto
var ICONO_OK = '<svg viewBox="0 0 52 52"><path d="M14 27 L23 36 L39 17"/></svg>';
var ICONO_ERROR = '<svg viewBox="0 0 52 52"><path d="M16 16 L36 36 M36 16 L16 36"/></svg>';
var temporizadorModal = null;

function cerrarModal(){
    var fondo = document.getElementById("modalMensaje");
    fondo.classList.remove("activo");
    fondo.setAttribute("aria-hidden", "true");
    clearTimeout(temporizadorModal);
}

function mostrarModal(opciones){
    var fondo = document.getElementById("modalMensaje");
    var caja = document.getElementById("modalCaja");
    var barra = document.querySelector("#modalBarra span");
    var boton = document.getElementById("modalBoton");
    clearTimeout(temporizadorModal);
    caja.classList.toggle("error", opciones.tipo === "error");
    document.getElementById("modalIcono").innerHTML = opciones.tipo === "error" ? ICONO_ERROR : ICONO_OK;
    document.getElementById("modalTitulo").textContent = opciones.titulo;
    document.getElementById("modalTexto").textContent = opciones.texto;
    boton.textContent = opciones.boton;
    boton.onclick = opciones.alCerrar;
    fondo.classList.add("activo");
    fondo.setAttribute("aria-hidden", "false");
    boton.focus();
    if(opciones.autoCerrarMs){
        // barra de progreso que se vacía hasta ejecutar la acción
        barra.style.transition = "none";
        barra.style.transform = "scaleX(1)";
        void barra.offsetWidth;
        barra.style.transition = "transform " + opciones.autoCerrarMs + "ms linear";
        barra.style.transform = "scaleX(0)";
        temporizadorModal = setTimeout(opciones.alCerrar, opciones.autoCerrarMs);
    }
}

document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && document.getElementById("modalMensaje").classList.contains("activo")){
        document.getElementById("modalBoton").click();
    }
});

//Envío del formulario de contacto: al enviarse, la página se recarga en el portafolio
(function(){
    var form = document.getElementById("miFormulario");
    if(!form) return;
    function recargarPortafolio(){
        window.location.href = window.location.pathname;
    }
    form.addEventListener("submit", function(e){
        e.preventDefault();
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        }).then(function(respuesta){
            if(respuesta.ok){
                form.reset();
                mostrarModal({
                    tipo: "ok",
                    titulo: "¡Mensaje enviado!",
                    texto: "Gracias por contactarme. Te responderé lo antes posible.",
                    boton: "Volver al portafolio",
                    alCerrar: recargarPortafolio,
                    autoCerrarMs: 4000
                });
            }else{
                mostrarModal({
                    tipo: "error",
                    titulo: "No se pudo enviar",
                    texto: "Ocurrió un problema al enviar tu mensaje. Intenta de nuevo.",
                    boton: "Entendido",
                    alCerrar: cerrarModal
                });
            }
        }).catch(function(){
            mostrarModal({
                tipo: "error",
                titulo: "Sin conexión",
                texto: "Revisa tu conexión a internet e intenta de nuevo.",
                boton: "Entendido",
                alCerrar: cerrarModal
            });
        });
    });
})();
