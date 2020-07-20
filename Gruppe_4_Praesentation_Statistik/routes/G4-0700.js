/**
 * G4-0700 / Übersicht der Module mit Präsentationen für die Studierenden
 */

//Modulimport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0700 = express.Router();

//Definition der Arrays
modul_id = [];
modul_bezeichnung = [];


/**
 * JS auf ejs laden und aufrufen
 */

G4_0700.get('/G4-0700', function (request, result) {
    result.render("G4-0700.ejs");
});

/**
 * Verbindung zur Datenbank herstellen
 */
getValuesFromDb();


/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
function getValuesFromDb() {
    //alle Attribute aus Relation modul abfragen
    var sql = "SELECT * FROM MODUL /* da muss noch ne Abfrage für den speziellen USER hinzugefügt werden */";
    con.query(sql, function (err, result) {

        if(err) throw err;
        //alle Attribute durchlaufen und in result laden
        for (var i = 0; i < result.length; i++) {
            modul_id[i] = result[i].modul_id;
            modul_bezeichnung[i] = result[i].beschreibung;
        }
    });
}

/**
 * G4-0900 aufrufen
 */

G4_0700.get('/G4-0900', function (request, response) {
    console.log("G4-0900 wurde geladen");
    response.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});




module.exports = G4_0700;
