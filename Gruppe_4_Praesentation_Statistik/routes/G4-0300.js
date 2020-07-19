/**
* G4-0300 / Manuelle Definition der Gruppenreihenfolge, Raumbelefung und Zeiträumen für die Präsentationen und Pausenslots
*/

//ModulImport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0300 = express.Router();

sqlpidreal = [];

/**
 * JS auf ejs laden und aufrufen
 */
// const get = function() {
app.get('/G4-0300', function (request, result) {
    result.render("G4-0300.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",
    });
});
//}


app.post('/generatePresentation', function (request) {


    var Statamentz;


    Statamentz = "INSERT INTO praesentation (datum, tagstart, tagende, raum, anlass) VALUES ('" + request.body.date + "', '" + request.body.start + "', '" + request.body.end + "', '" + request.body.room + "', '" + request.body.anlass + "');";

    con.query(Statamentz, function (err) {
        if (err) throw err
    });

})
/**
 * Übermittlung des neuangelegten Präsentationstermins an die Datenbank
 * Speichern der Präsentationsreihenfolge in Datenbank
 */
// function submitPraesentationReihenfolge() {
app.post('/submit', function (request) {
    var test = JSON.parse(request.body.submitter);
    var sqlStatements = [];

// Holen der Präsi ID um genau einer Präsentation zuzuordnen
    sqlpid = "SELECT pid FROM praesentation WHERE datum = '" + request.body.dateAgenda + "';";
    con.query(sqlpid, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log(result);
            sqlpidreal[i] = result[i].pid;
        }
    });
    setTimeout(() => {
        console.log(sqlpidreal[0]);
    }, 10);
    setTimeout(() => {
        for (var i = 0; i < test.length; i++) {
            //Insert in Datenbank
            sqlStatements[i] = "INSERT INTO agenda(gruppennummer, pid, datum,  thema,anzahl_mitglieder,start_vortrag,dauer_vortrag) VALUES("
                + test[i].groupNumber + ", '" + sqlpidreal[0] + "', '" + request.body.dateAgenda + "', '" + test[i].theme + "'," + test[i].number + ",'"
                + test[i].startTime + "','" + test[i].duration + "');";

            //Berechnung der Endzeit

            sqlStatement = "UPDATE agenda SET ende_vortrag = CAST(start_vortrag + dauer_vortrag AS TIME) WHERE datum = '" + request.body.dateAgenda + "';";
            console.log(sqlStatement);


            //Ausführung der SQL statements
            con.query(sqlStatements[i], function (err) {
                if (err) throw err

            });


            con.query(sqlStatement, function (err) {
                if (err) throw err
            });


        }
    }, 10);
});



/**
 * Listening auf Server
 */
//const listen = function() {




module.exports = G4_0300;
// export { submitPraesentationReihenfolge, get, listen };