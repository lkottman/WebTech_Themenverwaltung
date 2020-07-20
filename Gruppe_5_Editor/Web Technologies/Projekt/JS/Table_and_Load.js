function createTable(tablename) {

    class Table {
        constructor(Tablename) {
            this.tablename = Tablename;
        }

        toString() {
            return this.tablename;
        }
    }

    table = new Table(
        tablename
    );

    console.log(table);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(table)
    };

    fetch("/createTable", options);
}

function loadTable() {

    // class Requirements {
    //
    //   constructor(ID, Name, ShortDesc) {
    //     this.id = ID;
    //     this.name = Name;
    //     this.shortdesc = ShortDesc;
    //   }
    //
    //   toString() {
    //     return this.id + " " + this.name + " " + this.shortdesc;
    //   }
    // }
    //
    // requirement = new Requirements(
    //     id,
    //     namefield,
    //     newTextarea.value
    // );

    let data;

    fetch("/loadtable")
        .then(response => response.json())
        .then(data = response)
        .then(console.log("ja"))
        .then(console.log(data))

    // let idfield = document.getElementById("id").value;
    // let namefield = document.getElementById("name").value;
    // let shortdescfield = document.getElementById("shortdesc").value;
    // let idprefield = document.getElementById("idpre").value;
    // let id = idprefield + idfield;
    //
    // if (idprefield === "M") {
    //   var tableRef = document.getElementById(tableID);
    //   var newRow = tableRef.insertRow(-1);
    //   newRow.className = "red1";
    // }
    //
    // if (idprefield === "S") {
    //   var tableRef = document.getElementById(tableID);
    //   var newRow = tableRef.insertRow(-1);
    //   newRow.className = "yellow2";
    // }
    //
    // if (idprefield === "N") {
    //   var tableRef = document.getElementById(tableID);
    //   var newRow = tableRef.insertRow(-1);
    //   newRow.className = "green3";
    // }

    // let newCell1 = newRow.insertCell(0);
    // let newCell2 = newRow.insertCell(1);
    // let newCell3 = newRow.insertCell(2);
    // let newCell4 = newRow.insertCell(3);
    // newCell4.className = "newcell";
    // let newCell5 = newRow.insertCell(4);
    // newCell5.className = "newcell";
    //
    // let newText11 = document.createTextNode(idprefield);
    // let newText1 = document.createTextNode(idfield);
    // let newText2 = document.createTextNode(namefield);
    //
    // let newTextarea = document.createElement("textarea");
    // newTextarea.className = "shortdesc";
    // newTextarea.innerHTML = shortdescfield;
    // newTextarea.readOnly = true;
    //
    // let newrewButton = document.createElement("button");
    // newrewButton.className = "rewbutton";
    // newrewButton.innerHTML = "<i  style=\"background-color: inherit\" class='fas fa-edit'></i>";
    // newrewButton.id = "editbtn";
    // newrewButton.onclick = function openupAdd() {
    //   check.checked = true;
    //
    //   this.id = "newButtID";
    //   fetch("/delReqData", options);
    //
    //   let row = newrewButton.parentNode.parentNode;
    //
    //   let col1 = row.children[0].innerHTML.trim().substring(1);
    //   let col2 = row.children[1].innerHTML;
    //   let col3 = row.children[2].textContent;
    //
    //   document.getElementById("editid").value = col1;
    //   document.getElementById("editname").value = col2;
    //   document.getElementById("editshortdesc").value = col3;
    // };
    //
    // let newdelButton = document.createElement("button");
    // newdelButton.className = "delbutton";
    // newdelButton.innerHTML = "<i  style=\"background-color: inherit\" class='fa fa-trash'></i>";
    // newdelButton.id = "delbtn";
    // newdelButton.onclick = function deleteRow() {
    //   let row = newdelButton.parentNode.parentNode;
    //   row.parentNode.removeChild(row);
    //
    //   fetch("/delReqData", options)
    // };
    //
    // requirement = new Requirements(
    //     id,
    //     namefield,
    //     newTextarea.value
    // );
    //
    // const options = {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify(requirement)
    // };
    //
    // fetch("/saveReqData", options)
    //     .then(response => response.json())
    //     .then(data => {
    //
    //       if (data.register === "") {
    //
    //       } else {
    //         alert(data.register);
    //         location.reload();
    //       }
    //     });
    //
    // newCell1.appendChild(newText11);
    // newCell1.appendChild(newText1);
    // newCell2.appendChild(newText2);
    // newCell3.appendChild(newTextarea);
    // newCell4.appendChild(newrewButton);
    // newCell5.appendChild(newdelButton);
    //
    // clearfields();

}