function changeReadonly() {
    document.getElementById('vorname').setAttribute('readonly', 'true');
    document.getElementById('nachname').removeAttribute('readonly');
    document.getElementById('geburtsdatum').removeAttribute('readonly');
    document.getElementById('password').removeAttribute('readonly');
    document.getElementById('password').type = 'text';
    document.getElementById('e-Mail').removeAttribute('readonly');

}

function addReadonly() {
    document.getElementById("vorname").setAttribute("readOnly", 'true');
    document.getElementById("nachname").setAttribute("readOnly", 'true');
    document.getElementById("geburtsdatum").setAttribute("readOnly", 'true');
    document.getElementById("password").setAttribute("readOnly", 'true');
    document.getElementById('password').type = 'password';
    document.getElementById("Mail").setAttribute("readOnly", 'true');




}