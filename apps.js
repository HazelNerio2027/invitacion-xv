// Variable global para control de estado de música
let playing = false;

// 1. Ocultar pantalla de carga (Loader)
function iniciarLoader() {
    setTimeout(() => {
        const loader = document.querySelector(".loader-screen") || document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.remove();
            }, 800);
        }
    }, 3000);
}

// Ejecutar loader al cargar la página
document.addEventListener("DOMContentLoaded", iniciarLoader);

// 2. Control de la animación de la historia
function startStory() {
    const lines = document.querySelectorAll(".story-line");
    let index = 0;

    function next() {
        if (index > 0 && lines[index - 1]) {
            lines[index - 1].classList.remove("active");
            lines[index - 1].classList.add("hide");
        }

        if (index < lines.length && lines[index]) {
            lines[index].classList.add("active");
            index++;
            setTimeout(next, 2600);
        }
    }

    next();
}

// 3. Manejador de eventos de clic (Botones, Música y Lightbox)
document.addEventListener("click", function (e) {

    // --- A. Botón "Abrir Invitación" ---
    const openBtn = e.target.closest("#openInvitation");
    if (openBtn) {
        const music = document.getElementById("bgMusic");
        const musicBtn = document.getElementById("musicButton");

        if (music && music.paused) {
            music.play().then(() => {
                playing = true;
                if (musicBtn) musicBtn.innerHTML = "♫";
            }).catch(err => console.log("Error al reproducir audio:", err));
        }

        const storyScene = document.querySelector(".story-scene") || document.querySelector("#story");
        if (storyScene) {
            storyScene.scrollIntoView({ behavior: "smooth" });
        }

        if (typeof startStory === "function") {
            startStory();
        }
    }

    // --- B. Botón flotante de Música (♪) ---
    const musicBtn = e.target.closest("#musicButton");
    if (musicBtn) {
        const music = document.getElementById("bgMusic");

        if (music) {
            if (music.paused) {
                music.play().then(() => {
                    playing = true;
                    musicBtn.innerHTML = "♫";
                }).catch(err => console.log("Error al reproducir:", err));
            } else {
                music.pause();
                playing = false;
                musicBtn.innerHTML = "♪";
            }
        }
    }

    // --- C. Galería / Lightbox ---
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

// 4. Formulario de confirmación (RSVP)
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "rsvpForm") {
        e.preventDefault();

        const form = e.target;
        const statusText = document.getElementById("rsvpStatus");
        const submitBtn = document.getElementById("btnSubmit");

        const scriptURL = "https://script.google.com/macros/s/AKfycbzUtxgXgTAe7LPtCqQUTcjvqTMTdbRBjTHY8_2-thIGjUYDlMrWvx7wegvNbK_Ym_YrAg/exec";

        if (submitBtn) submitBtn.disabled = true;
        if (statusText) {
            statusText.textContent = "Enviando confirmación...";
            statusText.style.color = "#D4AF37";
        }

        const formData = new FormData(form);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                if (statusText) {
                    statusText.textContent = "¡Gracias! Tu asistencia ha sido registrada ✨";
                    statusText.style.color = "#4CAF50";
                }
                form.reset();
                if (submitBtn) submitBtn.disabled = false;
            })
            .catch(error => {
                if (statusText) {
                    statusText.textContent = "Hubo un error al enviar. Inténtalo de nuevo.";
                    statusText.style.color = "#F44336";
                }
                if (submitBtn) submitBtn.disabled = false;
            });
    }
});
