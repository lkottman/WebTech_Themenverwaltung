function openOsca() {
    window.open("https://osca.hs-osnabrueck.de/NavPages/portal.aspx", "OSCA");
}

function openMail() {
    window.open("https://my.hs-osnabrueck.de/owa/#path=/mail", "E-Mail");
}

function dropdownTheButton() {
    document.getElementById("drops").classList.toggle("show");
}

function doEnglish() {

    document.getElementById("pro").innerText = "Project";
    document.getElementById("mem").innerText = "Group members";
    document.getElementById("sp").innerText = "Languages";
    document.getElementById("ger").innerText = "German";
    document.getElementById("eng").innerText = "English";
    document.getElementById("con").innerText = "Contact";

    document.getElementById("header").innerText = "Edit Requirements"
    document.getElementById("shf").innerText = "Short Description";

    document.getElementById("addreq").innerText = "Add Requirements";
    document.getElementById("prio").innerText = "Priority";
    document.getElementById("addsh").innerText = "Short Description";
    document.getElementById("addbtn").innerText = "Add Requirement";

    document.getElementById("searchreq").innerText = "Search for Requirements";
    document.getElementById("searchreqfield").innerText = "Search request (ID / Name)";
    document.getElementById("searchfield").placeholder = "Search for ID..";
    document.getElementById("searchfieldname").placeholder = "Search for Name..";
    document.getElementById("allin").innerText = "Collapse all";
    document.getElementById("allout").innerText = "Expand all";

    document.getElementById("reqs").innerText = "Requirements";
    document.getElementById("tableshortdesc").innerText = "Short Description";

}

function doGerman() {

    document.getElementById("pro").innerText = "Projekt";
    document.getElementById("mem").innerText = "Gruppenmitglieder";
    document.getElementById("sp").innerText = "Sprachen";
    document.getElementById("ger").innerText = "Deutsch";
    document.getElementById("eng").innerText = "Englisch";
    document.getElementById("con").innerText = "Kontakt";

    document.getElementById("header").innerText = "Anforderungen bearbeiten"
    document.getElementById("shf").innerText = "Kurzbeschreibung";

    document.getElementById("addreq").innerText = "Anlegen einer Anforderung";
    document.getElementById("prio").innerText = "Priorität";
    document.getElementById("addsh").innerText = "Kurzbeschreibung";
    document.getElementById("addbtn").innerText = "anlegen";

    document.getElementById("searchreq").innerText = "Suchen einer Anforderung";
    document.getElementById("searchreqfield").innerText = "Gesuchte Anforderung (ID / Name)";
    document.getElementById("searchfield").placeholder = "Nach ID suchen..";
    document.getElementById("searchfieldname").placeholder = "Nach Namen suchen..";
    document.getElementById("allin").innerText = "Alle einklappen";
    document.getElementById("allout").innerText = "Alle ausklappen";

    document.getElementById("reqs").innerText = "Anforderungen";
    document.getElementById("tableshortdesc").innerText = "Kurzbeschreibung";

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