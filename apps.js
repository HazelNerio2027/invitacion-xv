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

document.addEventListener("click", function(e) {

    // 1. Botón "Abrir Invitación"
    const openBtn = e.target.closest("#openInvitation");
    if (openBtn) {
        const music = document.getElementById("bgMusic");
        const musicBtn = document.getElementById("musicButton");

        if (music && music.paused) {
            music.play().then(() => {
                if (musicBtn) musicBtn.innerHTML = "♫";
            }).catch((err) => {
                console.log("Error al iniciar audio:", err);
            });
        }

        const storyScene = document.querySelector(".story-scene");
        if (storyScene) {
            storyScene.scrollIntoView({ behavior: "smooth" });
        }

        if (typeof startStory === "function") {
            startStory();
        }
    }

    // 2. Botón flotante de Música (♪)
    const musicBtn = e.target.closest("#musicButton");
    if (musicBtn) {
        const music = document.getElementById("bgMusic");

        if (music) {
            if (music.paused) {
                music.play().then(() => {
                    musicBtn.innerHTML = "♫";
                }).catch((err) => {
                    console.log("Error al reproducir:", err);
                });
            } else {
                music.pause();
                musicBtn.innerHTML = "♪";
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
