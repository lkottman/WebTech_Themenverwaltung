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
 let datum = [];
raum = [];
anlass = [];
projekt_id = [];


/**
 * JS auf ejs laden und aufrufen
 */
G4_0050.get('/G4-0050', function (request, result) {
    result.render("G4-0050.ejs");
});


// Aufruf der Website G4-0100 (Übersicht von Präsentationen für Dozenten)

//app.get('/G4-0100', function (request, result) {
  //  result.render("G4-0100.ejs");
//});

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

    var sql = "SELECT mid FROM G4_Modul, G4_THEMA WHERE mid = modul_id ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        //durchläuft alle Zeilen und gibt diese Werte an result weiter
        for (var i = 0; i < result.length; i++) {

            modulid[i] = result[i].mid;
        }
    });
    //modul_bezeichnung
    var sql1 = "SELECT modul_bezeichnung FROM G4_MODUL, G4_Thema WHERE mid = modul_id";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {

            modul_bezeichnung[i] = result[i].modul_bezeichnung;
        }
    });
}
module.exports = G4_0050;
