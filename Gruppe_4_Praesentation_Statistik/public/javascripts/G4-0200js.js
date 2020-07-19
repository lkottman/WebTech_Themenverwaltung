var afterDragString = [];
function getAfterSortOrder() {
    for (var i = 0; i < 6; i++) {
        afterDragString[i] = document.getElementsByName("thema")[i].innerText;
    }
    var afterDrag = JSON.stringify(afterDragString);
    document.getElementById("AfterSortOrder").value = afterDrag;
    setTimeout(() => {  document.getElementById('idValues').submit() }, 1)
}

function printAlert() {
    alert("Speichern erfolgreich");
}
