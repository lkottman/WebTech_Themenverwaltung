/**
 * G4-0050 / Lehrkräfte können Agenda für Module erstellen
 */



//Modulimport
var app = require('../app');
var con = require('../mysql');

const express = require('express');
const G4_0050 = express.Router();

//Definition der Arrays
modulid = [];
modul_bezeichnung = [];

/**
 * JS auf ejs laden und aufrufen
 */
app.get('/G4-0050', function (request, result) {
    result.render("G4-0050.ejs");
});

getConnection();

/**
 * Verbindung zur Datenbank herstellen
 */
function getConnection() {
    con.connect(function (err) {

        if (err) throw err;



        getValuesfromDb0050();

    });
}

// Werte der Datenbank die wichtig für G4-0050 sind
/**
 * SQL-Abfragen für G4-0050
 */
function getValuesfromDb0050() {

    var sql = "SELECT modul_id FROM MODUL";
    con.query(sql, function (err, result) {
        if (err) throw err;
        //durchläuft alle Zeilen und gibt diese Werte an result weiter
        for (var i = 0; i < result.length; i++) {

            modulid[i] = result[i].modul_id;
        }
    });
    //modul_bezeichnung
    var sql1 = "SELECT beschreibung FROM MODUL";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {

            modul_bezeichnung[i] = result[i].beschreibung;
        }
    });
}
module.exports = G4_0050;
