/*var mysql = require('mysql');


let modulName = document.getElementById('modulName').value;
let modulBeginn = document.getElementById('modulBeginn').value;
let modulEnde = document.getElementById('modulEnde').value;
function writeName() {
    console.log(modulName);
}

function getConnection() {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "testuser",
        password: "55555",
        database: "testdb",

    });
    console.log('Läuft');
    return connection;
}
*/

function newModul() {

    class Modul {
        constructor(name, beginn, ende) {
            this.name = name;
            this.beginn = beginn;
            this.ende = ende;
        }

        toString() {
            return this.name + " " + this.beginn + " " + this.ende;
        }
    }

    modul = new Modul(document.getElementById("modulName").value,
        document.getElementById("modulBeginn").value,
        document.getElementById("modulEnde").value
    );
    console.log(modul);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(modul)

    }
    fetch("/NewModul", options)
        .then(response => response.json())
        .then(data => {

            alert(data.newModul);

        });

    //insertNewModul();                         <-- Wieso ist das rauskommentiert?

}
function insertNewModul(){
    let con = getConnection();
    con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO modul (Name, Beginn, Ende ) VALUES ('"+ modul.name +"', '"+ beginn + "', '" + ende+"');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });

}