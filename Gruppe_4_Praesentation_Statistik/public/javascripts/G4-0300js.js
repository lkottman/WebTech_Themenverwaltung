/**
 * JS für G4-0300
 */

let groups = [];

/**
 * Gruppen hinzufügen
 */
function addGroup() {
    //Array für Gruppe mit Werten füllen
    let group = {};
    group.groupNumber = document.getElementById("enterGroupNumber").value;
    group.theme = document.getElementById("enterTheme").value;
    group.number = document.getElementById("enterNumber").value;
    group.startTime = document.getElementById("enterStartTime").value;
    group.duration = document.getElementById("enterDuration").value;
  //group.room = document.getElementById("enterRoom").value;
    groups[groups.length] = group;

    let table = document.getElementById("groupTable");
    let n = table.rows.length;
    //Zellen in den Zeilen mit Werten füllen
    let row = table.insertRow(n);
    row.insertCell(0).innerHTML = n;
    row.insertCell(1).innerHTML = group.groupNumber;
    row.insertCell(2).innerHTML = group.theme;
    row.insertCell(3).innerHTML = group.number;
    row.insertCell(4).innerHTML = group.startTime;
    row.insertCell(5).innerHTML = group.duration;
   // row.insertCell(6).innerHTML = group.room;
    //Button zum Löschen
    row.insertCell(6).innerHTML =
        "<input type=\"button\" value=\"löschen\" onclick=\"deleteGroup(" + (n) + ")\">";
    //Input des letzten Elements hidden setzen
    let lastElement = groups.length - 1;
    appendHiddenInput(lastElement, "groupNumber", groups[lastElement].groupNumber);
    appendHiddenInput(lastElement, "theme", groups[lastElement].theme);
    appendHiddenInput(lastElement, "number", groups[lastElement].number);
    appendHiddenInput(lastElement, "startTime",
        groups[lastElement].startTime);
    appendHiddenInput(lastElement, "duration", groups[lastElement].duration);
 //   appendHiddenInput(lastElement, "room",
   //     groups[lastElement].room);
}


/**
 * nicht sehbaren Input anhängen
 * @param number    Anzahl der Inputs
 * @param member    Element des Inputs
 * @param value     Wert des Inputs
 */
function appendHiddenInput(number, member, value) {
    let container = document.getElementById("GroupOrder");
    if (container) {
        let newHiddenInput = document.createElement("input");
        newHiddenInput.setAttribute("type", "hidden");
        newHiddenInput.setAttribute("member", "groups[group" + number + "][" +
            member + "]");
        newHiddenInput.setAttribute("value", value);
        //hidden input dem container zuordnen
        container.appendChild(newHiddenInput);
    }
}


/**
 * Gruppe löschen
 * @param n Gruppennummer
 */
function deleteGroup(n) {
    groups.splice(n, 1);
    //aus Tabelle die ausgewählte Zeile löschen
    let table = document.getElementById("groupTable");
    table.deleteRow(n);

    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.cells;
        cells[0].innerHTML = i;
        //Button zum Löschen
        cells[7].innerHTML =
            "<input type=\"button\" value=\"löschen\" onclick=\"deleteGroup(" + (i) + ")\">";

    }
}


/**
 * Gruppen für JSON konvertieren
 */
function getGroups() {
    document.getElementById("submitter").value = JSON.stringify(groups);
}


/**
 * Tag der Präsentation setzen
 */
function setPresentationDay()
{
    document.getElementById("date").value = document.getElementById("enterDate").value;
    document.getElementById("start").value = document.getElementById("enterDayStart").value;
    document.getElementById("end").value = document.getElementById("enterDayEnd").value;
    document.getElementById("room").value = document.getElementById("enterRoom").value;
    document.getElementById("anlass").value = document.getElementById("enterAnlass").value;

}
