/**
 * G4-0700 / Übersicht der Module mit Präsentationen für die Studierenden
 */

//Modulimport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0700 = express.Router();

//Definition der Arrays
mid = [];
modul_bezeichnung = [];


/**
 * JS auf ejs laden und aufrufen
 */

    app.get('/G4-0700', function (request, result) {
        result.render("G4-0700.ejs");
    });



getValuesFromDb();





/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
function getValuesFromDb() {
    //alle Attribute aus Relation modul abfragen
    var sql = "SELECT * FROM G4_MODUL";
    con.query(sql, function (err, result) {

        if (err) throw err;
        //alle Attribute durchlaufen und in result laden
        for (var i = 0; i < result.length; i++) {
            mid[i] = result[i].mid;
            modul_bezeichnung[i] = result[i].modul_bezeichnung;
        }
    });
}


module.exports = G4_0700;

