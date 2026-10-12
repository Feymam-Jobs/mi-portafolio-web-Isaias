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

//Envío del formulario de contacto: al enviarse, la página se recarga en el portafolio
; (function(){
    var form = document.getElementById("miFormulario");
    if(!form) return;
    form.addEventListener("submit", function(e){
        e.preventDefault();
        fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { "Accept": "application/json" }
        }).then(function(respuesta){
            if(respuesta.ok){
                form.reset();
                alert("¡Mensaje enviado! Gracias por contactarme.");
                // recarga el portafolio desde el inicio
                window.location.href = window.location.pathname;
            }else{
                alert("No se pudo enviar el mensaje. Intenta de nuevo.");
            }
        }).catch(function(){
            alert("No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.");
        });
    });
})();
