
function changeReadonly() {
    document.getElementById('vorname').removeAttribute('readonly');
    document.getElementById('nachname').removeAttribute('readonly');
    document.getElementById('semester').removeAttribute('readonly');
    document.getElementById('password').removeAttribute('readonly');
    document.getElementById('password').type = 'text';
    document.getElementById('e-Mail').removeAttribute('readonly');
    document.getElementById("studiengang").removeAttribute("disabled");
}

function addReadonly() {
    document.getElementById("vorname").setAttribute("readOnly", 'true');
    document.getElementById("nachname").setAttribute("readOnly", 'true');
    document.getElementById("semester").setAttribute("readOnly", 'true');
    document.getElementById("password").setAttribute("readOnly", 'true');
    document.getElementById('password').type = 'password';
    document.getElementById("e-Mail").setAttribute("readOnly", 'true');
    document.getElementById("studiengang").setAttribute("disabled", "disabled");
}

function confirmMessage() {
    confirm("ACHTUNG!\nSie sind dabei alle persönlichen Daten zu löschen");
}