/**
 * G4-0300 / Manuelle Definition der Gruppenreihenfolge, Raumbelefung und Zeiträumen für die Präsentationen und Pausenslots
 */

//ModulImport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0300 = express.Router();

pid = [];
/**
 * JS auf ejs laden und aufrufen
 */

G4_0300.get('/G4-0300', function (request, result) {
    result.render("G4-0300.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
    });
});



G4_0300.post('/generatePresentation', function (request) {


    var sqlInsert1;


    sqlInsert1 = "INSERT INTO G4_PRAESENTATION (datum, tagstart, tagende, raum, anlass) VALUES ('" + request.body.date + "', '" + request.body.start + "', '" + request.body.end + "', '" + request.body.room + "', '" + request.body.anlass + "');";

    con.query(sqlInsert1, function (err) {
        if (err) throw err
    });

})
/**
 * Übermittlung des neuangelegten Präsentationstermins an die Datenbank
 * Speichern der Präsentationsreihenfolge in Datenbank
 */
// function submitPraesentationReihenfolge() {
G4_0300.post('/submit', function (request) {
    var test = JSON.parse(request.body.submitter);
    var sqlInsert2 = [];

// Holen der Präsi ID um genau einer Präsentation zuzuordnen
    sqlpid = "SELECT pid FROM G4_PRAESENTATION WHERE datum = '" + request.body.dateAgenda + "';";
    con.query(sqlpid, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            pid[i] = result[i].pid;
        }
    });

    setTimeout(() => {
        for (var i = 0; i < test.length; i++) {
            //Insert in Datenbank
            sqlInsert2[i] = "INSERT INTO AGENDA(gruppennummer, pid, datum,  thema,anzahl_mitglieder,start_vortrag,dauer_vortrag, ende_vortrag) VALUES("
                + test[i].groupNumber + ", '" + pid[0] + "', '" + request.body.dateAgenda + "', '" + test[i].theme + "'," + test[i].number + ",'"
                + test[i].startTime + "','" + test[i].duration + "', '" + test[i].endTime + "');";


            //Ausführung der SQL statements
            con.query(sqlInsert2[i], function (err) {
                if (err) throw err

            });

        }
    }, 10);
});






module.exports = G4_0300;