// Fecha del evento: 21 de Noviembre de 2026 a las 18:00 hrs
const eventDate = new Date(2026, 10, 21, 18, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElem = document.getElementById("days");
        const hoursElem = document.getElementById("hours");
        const minutesElem = document.getElementById("minutes");
        const secondsElem = document.getElementById("seconds");

        if (daysElem) daysElem.textContent = days < 10 ? "0" + days : days;
        if (hoursElem) hoursElem.textContent = hours < 10 ? "0" + hours : hours;
        if (minutesElem) minutesElem.textContent = minutes < 10 ? "0" + minutes : minutes;
        if (secondsElem) secondsElem.textContent = seconds < 10 ? "0" + seconds : seconds;
    }
}

// Iniciar el temporizador
setInterval(updateCountdown, 1000);
updateCountdown();