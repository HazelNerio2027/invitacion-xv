async function loadComponent(id, file) {

    const response = await fetch(file);
    const html = await response.text();

    document.getElementById(id).innerHTML = html;

    if (id === "loader") {
        iniciarLoader();
    }

}

loadComponent("loader", "components/loader.html");
loadComponent("navbar", "components/navbar.html");
loadComponent("hero", "components/hero.html");
loadComponent("welcome", "components/welcome.html");
loadComponent("countdown", "components/countdown.html");
loadComponent("story", "components/story.html");
loadComponent("gallery", "components/gallery.html");
loadComponent("timeline", "components/timeline.html");
loadComponent("dresscode", "components/dresscode.html");
loadComponent("location", "components/location.html");
loadComponent("rsvp", "components/rsvp.html");
loadComponent("footer", "components/footer.html");