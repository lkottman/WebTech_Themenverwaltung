function openOsca() {
    window.open("https://osca.hs-osnabrueck.de/NavPages/portal.aspx", "OSCA");
}

function openMail() {
    window.open("https://my.hs-osnabrueck.de/owa/#path=/mail", "E-Mail");
}

function dropdownTheButton() {
    document.getElementById("drops").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}