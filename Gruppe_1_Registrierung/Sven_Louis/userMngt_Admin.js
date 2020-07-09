var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'userList.json', true);
ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    } else {
        console.log("We connected to the server, but it returned an error. \nError " + ourRequest.status)
    }
};
ourRequest.onerror = function () {
    console.log("Connection")
}
ourRequest.send();

function renderHTML(data) {
    var rowCounter = 0;

    for (i = 0; i < data.benutzer.length; i++) {
        createTableContent("userListContent", rowCounter);

    }

    function createTableContent(id, counter) {
        var x = document.getElementById(id).insertRow(rowCounter);
        x.setAttribute("id", "row");
        x.setAttribute("class", "table-row");

        var column1 = x.insertCell(0);
        var column2 = x.insertCell(1);
        var column3 = x.insertCell(2);
        var column4 = x.insertCell(3);
        var column5 = x.insertCell(4);


        column1.innerHTML = data.benutzer[i].Nname;
        column2.innerHTML = data.benutzer[i].Vorname;
        column3.innerHTML = data.benutzer[i].EMail;
        column4.innerHTML = data.benutzer[i].Studiengang
        column5.innerHTML = data.benutzer[i].Rechte;

        rowCounter++;
    }
}











