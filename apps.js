function iniciarLoader() {
    setTimeout(() => {
        const loader = document.querySelector(".loader-screen");
        if(loader){
            loader.style.opacity="0";
            setTimeout(()=>{
                loader.remove();
            },800);
        }
    }, 3000);
}

// Variable para controlar si la música está sonando o no
var isPlaying = false;
document.addEventListener("click", function(e){

    // 1. Al hacer clic en "Abrir Invitación"
    if(e.target.id === "openInvitation"){
        const music = document.getElementById("bgMusic");

        if(music){
            music.play().then(() => {
                playing = true;
                const musicBtn = document.getElementById("musicButton");
                if(musicBtn) musicBtn.innerHTML = "♫";
            }).catch((err) => {
                console.log("El navegador bloqueó el audio o no encontró la ruta:", err);
            });
        }

        document.querySelector(".story-scene").scrollIntoView({
            behavior:"smooth"
        });

        startStory();
    }

    // 2. Al hacer clic en el botón flotante de la música (♪)
    if(e.target.id === "musicButton"){
        const music = document.getElementById("bgMusic");
        const musicBtn = document.getElementById("musicButton");

        if(music){
            if(!playing){
                music.play().then(() => {
                    playing = true;
                    if(musicBtn) musicBtn.innerHTML = "♫";
                }).catch(err => console.log(err));
            } else {
                music.pause();
                playing = false;
                if(musicBtn) musicBtn.innerHTML = "♪";
            }
        }
    }

});

function startStory(){
    const lines = document.querySelectorAll(".story-line");
    let index = 0;

    function next(){
        if(index > 0){
            lines[index-1].classList.remove("active");
            lines[index-1].classList.add("hide");
        }

        if(index < lines.length){
            lines[index].classList.add("active");
            index++;
            setTimeout(next, 2600);
        }
    }

    next();
}
// Abrir imágenes en pantalla completa (Lightbox)
document.addEventListener("click", function(e) {
    const card = e.target.closest(".gallery-card");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = e.target.closest(".lightbox-close");

    if (card) {
        const img = card.querySelector("img");
        if (img && lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.style.display = "flex";
        }
    }

    if (closeBtn || (lightbox && e.target === lightbox)) {
        lightbox.style.display = "none";
    }
});

document.addEventListener("submit", function(e) {
    if (e.target && e.target.id === "rsvpForm") {
        e.preventDefault();

        const form = e.target;
        const statusText = document.getElementById("rsvpStatus");
        const submitBtn = document.getElementById("btnSubmit");

        const scriptURL = "https://script.google.com/macros/s/AKfycbzUtxgXgTAe7LPtCqQUTcjvqTMTdbRBjTHY8_2-thIGjUYDlMrWvx7wegvNbK_Ym_YrAg/exec"; 

        submitBtn.disabled = true;
        statusText.textContent = "Enviando confirmación...";
        statusText.style.color = "#D4AF37";

        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                statusText.textContent = "¡Gracias! Tu asistencia ha sido registrada ✨";
                statusText.style.color = "#4CAF50";
                form.reset();
                submitBtn.disabled = false;
            })
            .catch(error => {
                statusText.textContent = "Hubo un error al enviar. Inténtalo de nuevo.";
                statusText.style.color = "#F44336";
                submitBtn.disabled = false;
            });
    }
});
