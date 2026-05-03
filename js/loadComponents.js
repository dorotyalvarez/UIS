function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

loadComponent("header", "/components/header.html", () => {
    const script = document.createElement('script');
    script.src = '/js/globalSearch.js';
    document.body.appendChild(script);
});

loadComponent("emergency", "/components/emergency-bar.html");
loadComponent("footer", "/components/footer.html");