/** var modulname = document.getElementById("Modul").value;
var titel = document.getElementById("Titel").value;
var beschreibung = document.getElementById("Beschreibung").value;
var maxMembers = document.getElementById("maxMembers").value;
var beginAnmeldung = document.getElementById("BeginAnmeldung").value;
var endAnmeldung = document.getElementById("EndAnmeldung").value;

// Insert Data into Database
let sqlQuery = ("INSERT INTO THEMA") */

function newTopic() {

    class Topic {
        constructor (titel, beschreibung, maxMembers, beginAnmeldung, endAnmeldung) {
            this.titel = titel;
            this.beschreibung = beschreibung;
            this.maxMembers = maxMembers;
            this.beginAnmeldung = beginAnmeldung;
            this.endAnmeldung = endAnmeldung;
        }
        // toString?
    }

    topic = new Topic(
        document.getElementById("titel").value,
        document.getElementById("beschreibung").value,
        document.getElementById("maxMembers").value,
        document.getElementById("beginAnmeldung").value,
        document.getElementById("endAnmeldung").value,
    );

    console.log(topic);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(topic)
    }

    fetch("/CreateNewTopic", options)
        .then(response => response.json())
        .then(data => {

            alert(data.NewModul);

        });
}


function insertNewTopic() {
    let con = getConnection();
    con.connect(function(err) {
        if (err) throw err;

        var sql = "INSERT INTO THEMA (Name, Beginn, Ende ) VALUES ('"
            + titel +"', '"
            + beschreibung + "', '"
            + maxMembers+"');";
        //var sql = "INSERT INTO modul (Name, Beginn, Ende ) VALUES ('Es', 'funktioniert', 'Juhu');";
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^ Anpassen, ist das so richtig?

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });

}
// ^^^^ Nur weil etwas in die DB eingetragen werden muss? Muss das auch bei den anderen rein wo nur Select ist?