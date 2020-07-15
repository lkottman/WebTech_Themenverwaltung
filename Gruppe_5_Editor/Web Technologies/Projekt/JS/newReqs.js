/**
 *
 * @returns {boolean}
 */
function checkInput() {
    let idfield = document.getElementById("id").value;
    let namefield = document.getElementById("name").value;
    let shortdescfield = document.getElementById("shortdesc").value;
    let idprefield = document.getElementById("idpre").value;
    let submitOK;

    submitOK = "true";

    if (idprefield.length === 0)
    {
        alert("Setzen Sie die Priorität!")
        submitOK = "false";
    }

    if (isNaN(idfield))
    {
        alert("Bitte geben Sie eine Nummer für die Anforderung ein!")
        submitOK = "false";
    }

    if (idfield.length === 0)
    {
        alert("Das ID Feld muss ausgefüllt sein.")
        submitOK = "false";
    }

    if (namefield.length > 20)
    {
        alert("Der Name der Anforderung ist zu lang!")
        submitOK = "false";
    }

    if (namefield.length === 0)
    {
        alert("Das Namensfeld muss ausgefüllt werden.")
        submitOK = "false";
    }

    if (shortdescfield.length > 255)
    {
        alert("Die Kurzbeschreibung ist zu lang!")
        submitOK = "false";
    }

    if (shortdescfield.length === 0)
    {
        alert("Kurzbeschreibung nicht ausgefüllt.")
        submitOK = "false";
    }

    if (submitOK === "false")
    {
        return false;
    } else
        {
            if (idprefield === "M")
            {
                addRow('mbody');
            } else if (idprefield === "S")
            {
                addRow('sbody');
            } else
                {
                    addRow('kbody')
                }

        }
}

/**
 *
 */
function clearfields() {
    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("shortdesc").value = '';
}

/**
 *
 * @param tableID
 */
function addRow(tableID) {

    class Requirements{

        constructor(ID, Name, ShortDesc) {
            this.id = ID;
            this.name = Name;
            this.shortdesc = ShortDesc;
        }

        toString() {
            return this.id + " " + this.name + " " + this.shortdesc;
        }
    }

    let idfield = document.getElementById("id").value;
    let namefield = document.getElementById("name").value;
    let shortdescfield = document.getElementById("shortdesc").value;
    let idprefield = document.getElementById("idpre").value;
    let id = idprefield+idfield;

    if (idprefield === "M") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "red1";
    }

    if (idprefield === "S") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "yellow2";
    }

    if (idprefield === "K") {
        var tableRef = document.getElementById(tableID);
        var newRow = tableRef.insertRow(-1);
        newRow.className = "green3";
    }

    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    let newCell3 = newRow.insertCell(2);
    let newCell4 = newRow.insertCell(3);
    newCell4.className = "newcell";
    let newCell5 = newRow.insertCell(4);
    newCell5.className = "newcell";

    let newText11 = document.createTextNode(idprefield);
    let newText1 = document.createTextNode(idfield);
    let newText2 = document.createTextNode(namefield);

    let newTextarea = document.createElement("textarea");
    newTextarea.className = "shortdesc";
    newTextarea.innerHTML = shortdescfield;

    let newrewButton = document.createElement("button");
    newrewButton.className = "rewbutton";
    newrewButton.innerHTML = "bearbeiten";
    newrewButton.onclick = function openupAdd() {

        window.open("/EditReqGer",
            "Anforderung erstellen", "height=500, width=600");
    }

    let newdelButton = document.createElement("button");
    newdelButton.className = "delbutton";
    newdelButton.innerHTML = "löschen";
    newdelButton.onclick = function deleteRow() {
        let row = newdelButton.parentNode.parentNode;
        row.parentNode.removeChild(row);
    };

    requirement = new Requirements(
        id,
        namefield,
        newTextarea.value
    )

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(requirement)
    };

    fetch("/saveReqData", options)
    .then(response => response.json())
    .then(data => {

        if (data.register === ""){
            fetch("/successfullregistration");
        } else {
            alert(data.register);
            location.reload();
        }
    });

    newCell1.appendChild(newText11);
    newCell1.appendChild(newText1);
    newCell2.appendChild(newText2);
    newCell3.appendChild(newTextarea);
    newCell4.appendChild(newrewButton)
    newCell5.appendChild(newdelButton);

    clearfields();
}

/**
 *
 */
function searchID() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchfield");
    filter = input.value.toUpperCase();
    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 *
 */
function searchName() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchfieldname");
    filter = input.value.toUpperCase();
    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++)
    {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

/**
 *
 */
function miniAll() {
    let table;
    let tr;
    let td;
    let i;
    let subs;
    let val;

    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    console.log(tr);
    for (i = 0; i < tr.length -1; i++)
    {
         td = tr[i+1].getElementsByTagName("td");
         subs = td[0].innerHTML.substr(1);
         val = parseFloat(subs);

            if (Number.isInteger(val) === true)
            {

            } else
                {
                    tr[i+1].style.visibility = "collapse";
                }

    }
}

/**
 *
 */
function maxAll() {
    let table;
    let tr;
    let td;
    let i;
    let val;

    table = document.getElementById("reqtable");
    tr = table.getElementsByTagName("tr");
    console.log(tr);
    for (i = 0; i < tr.length -1; i++)
    {
        td = tr[i+1].getElementsByTagName("td");
        val = parseFloat(td[0].innerHTML);

        if (Number.isInteger(val) === true)
        {

        } else
            {
                tr[i+1].style.visibility = "visible";
            }
    }
}