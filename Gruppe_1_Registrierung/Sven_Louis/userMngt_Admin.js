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

window.addEventListener('load', function () {
    var table = document.getElementById('userlist');
    for(var i = 1; i < table.rows.length; i++) {

        table.rows[i].addEventListener('click', function() {
            var msg = '';
            for(var j = 0; j < this.cells.length; j++) {
                msg += this.cells[j].innerHTML + ' ';
                console.log(msg)
                switch (j) {
                    case 0:
                        document.getElementById("vorname").value = this.cells[j].innerHTML;
                    case 1:
                        document.getElementById("nachname").value = this.cells[j].innerHTML;
                    case 2:
                        document.getElementById("e-Mail").value = this.cells[j].innerHTML;
                    case 3:
                        document.getElementById("studiengang").value = this.cells[j].innerHTML;
                    case 4:
                        document.getElementById("Rolle").value = this.cells[j].innerHTML;
                }
            }
            console.log(msg)
        });
    }
})


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("userlist");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            console.log(x.innerHTML)
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function changeReadonly() {
    document.getElementById('vorname').setAttribute('readonly', 'true');
    document.getElementById('nachname').removeAttribute('readonly');
    document.getElementById('studiengang').removeAttribute('readonly');
    document.getElementById('rolle').removeAttribute('readonly');
    document.getElementById('e-Mail').removeAttribute('readonly');

}

function addReadonly() {
    document.getElementById("vorname").setAttribute("readOnly", 'true');
    document.getElementById("nachname").setAttribute("readOnly", 'true');
    document.getElementById("studiengang").setAttribute("readOnly", 'true');
    document.getElementById("rolle").setAttribute("readOnly", 'true');
    document.getElementById("Mail").setAttribute("readOnly", 'true');
}








