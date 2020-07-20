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
    document.getElementById("mhave").innerText = "Must-have";
    document.getElementById("shave").innerText = "Should-have";
    document.getElementById("nhave").innerText = "Nice-to-Have";
    document.getElementById("nhave").value = "N";
    document.getElementById("startid").innerText = "Start-time:";
    document.getElementById("endid").innerText = "End-time:";

    document.getElementById("header").innerText = "Edit Requirements"
    document.getElementById("p").innerText = "Priority"
    document.getElementById("shf").innerText = "Short Description:";
    document.getElementById("edm").innerText = "Must-have";
    document.getElementById("eds").innerText = "Should-have";
    document.getElementById("edn").innerText = "Nice-to-Have";
    document.getElementById("edn").value = "N";
    document.getElementById("editstartid").innerText = "Start-time:";
    document.getElementById("editendid").innerText = "End-time:";

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
    document.getElementById("tableshortdesc").innerHTML = "Short Description";
    document.getElementById("startendtable").innerText = "Start- / End-time";

}

function doGerman() {

    document.getElementById("pro").innerText = "Projekt";
    document.getElementById("mem").innerText = "Gruppenmitglieder";
    document.getElementById("sp").innerText = "Sprachen";
    document.getElementById("ger").innerText = "Deutsch";
    document.getElementById("eng").innerText = "Englisch";
    document.getElementById("con").innerText = "Kontakt";
    document.getElementById("mhave").innerText = "Muss-Anforderung";
    document.getElementById("shave").innerText = "Soll-Anforderung";
    document.getElementById("nhave").innerText = "Nett-zu-haben";
    document.getElementById("nhave").value = "N";
    document.getElementById("startid").innerText = "Anfangszeitpunkt:";
    document.getElementById("endid").innerText = "Endzeitpunkt:";

    document.getElementById("header").innerText = "Anforderungen bearbeiten"
    document.getElementById("p").innerText = "Priorität"
    document.getElementById("shf").innerText = "Kurzbeschreibung";
    document.getElementById("edm").innerText = "Muss-Anforderung";
    document.getElementById("eds").innerText = "Soll-Anforderung";
    document.getElementById("edn").innerText = "Nett-zu-haben";
    document.getElementById("edn").value = "N";
    document.getElementById("editstartid").innerText = "Anfangszeitpunkt:";
    document.getElementById("editendid").innerText = "Endzeitpunkt:";

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
    document.getElementById("startendtable").innerHTML = "Start- / Endzeitpunkt";
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