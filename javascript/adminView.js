/**
 * Version 1.0
 * 24.07.2020
 * AUTHOR: Louis Kottmann
 */

const connection = require('../getConnectionDatabase.js');


connection.query(sql,
    function (err, result)
    {
        if (err)
            throw err;

        console.log("Row inserted:  Passwort:" + query.password + ", E-Mail: sven.petersen@hs-osnabrueck.de");

    });


function getUser() {
    fetch('/getUser')
        .then(response => {
            return response.json();
        }).then(responseData => {
console.log(responseData);
        renderHTML(responseData)
    })
};



/**
 * @method
 * This function creates the table rows and loads the data from a JSON file.
 * @param data
 */
function renderHTML(data) {
    var rowCounter = 0;
    for (i = 0; i < data.length; i++) {
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
        var column6 = x.insertCell(5);
        var column7 = x.insertCell(6);
        var column8 = x.insertCell(7);

        column1.innerHTML = data[i].name;
        column2.innerHTML = data[i].surname;
        column3.innerHTML = data[i].e_mail;
        column4.innerHTML = data[i].course;
        column5.innerHTML = data[i].authorization;
        column6.innerHTML = data[i].verified;
        column7.innerHTML = data[i].id;
        column8.innerHTML = data[i].password;

        rowCounter++;
    }
}


/**
 * @method
 * This function iterates through the tables and sorts by either ASC or DESC, of the selected heading of the table column.
 * @param n
 */
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
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/**
 * @method
 *  This eventlistener checks if a tablefield has been clicked and then calls a function.
 *  This function writes the data of the clicked table rows into the input boxes of the user information.
 */

window.addEventListener('click', function () {
    var table = document.getElementById('userlist');
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].addEventListener('click', function () {

            for (var j = 0; j < this.cells.length; j++) {
                var msg = '';
                msg += this.cells[j].innerHTML + ' ';
                console.log("i: "+i+"  j:"+ j +"  value: "+msg)
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
                        document.getElementById("rolle").value = this.cells[j].innerHTML;
                    case 5:
                        document.getElementById("verified").value = this.cells[j].innerHTML;
                    case 6:
                        document.getElementById("userID").value = this.cells[j].innerHTML;
                    case 7:
                       document.getElementById("password").value = this.cells[j].innerHTML;
                }
            }
            console.log(msg)
        });
    }
})



function changeEntries() {
    let sql = "UPDATE USER SET name = '', surname = '', e_mail = '', password ='', course='', authorization='' " +
        "WHERE e_mail = ''";
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            if (result)
                console.log("Erfolgreich")
        })
}


/**
 * @method
 * This function changes the status of an input field from readonly to editable or from editable to readonly
 * @param input
 */
function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

/**
 * @method
 * This function changes the status of a dropdown field to disabled or removes this status
 * @param input
 */
function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}

/**
 * @method
 * This function changes the type of a field to a normal text type or to a password type.
 * @param input
 */
function changeVisibility(input) {
    let passwordText = document.getElementById(input);
    if (passwordText.type === "password"){
        passwordText.type = "text";
    } else {
        passwordText.type = "password";
    }
}


class UserToUpdate {
    constructor(name, surname,email, password, authorization, course, verified, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.authorization = authorization;
        this.course = course;
        this.verified = verified;
        this.id = id;
    }

    getSelectedUser() {
        let name = document.getElementById("vorname").value;
        let surname = document.getElementById("nachname").value;
        let e_mail = document.getElementById("e-Mail").value;
        let role = document.getElementById("rolle").value;
        let course = document.getElementById("studiengang").value;
        console.log(document.getElementById("studiengang").value);
        let password = document.getElementById("password").value;
        let verified = document.getElementById("verified").value;
        let userID = document.getElementById("userID").value;
    }
}