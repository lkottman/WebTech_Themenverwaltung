
/**
 * G4-0800 / Übersicht über Präsentationen in einem Modul für die Studierenden
 */

//Modulimport
var app = require('../app');
var con = require('../mysql');

const express = require('express');
const G4_0800 = express.Router();

//Definition der Arrays
anlass = [];
datum = [];
raum = [];
pid = [];

/**
 * JS auf ejs laden auf aufrufen
 */
G4_0800.get('/G4-0800',function (request,result) {
    result.render('G4-0800.ejs',
        {
            benutzername : "Test",
            Modulname : "WEB-TECH",

        });
});


/**
 * JS auf ejs laden und an /reihenfolge schicken
 */

G4_0800.post('/Reihenfolge', function (request,result) {
    var sqlStatement= "SELECT "
    result.render("G4-0800.ejs", {
        benutzername : "Test",
        Modulname : "WEB-TECHNEU",
        date :date,
        thema: thema,
        raum:raum,
    });
});

getValuesFromDb();
/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
function getValuesFromDb() {
    //Anlass
    var sql = "SELECT anlass FROM G4_PRAESENTATION /*,modul WHERE modul(von Tabelle praesentation) = mid(die mitgegeben wurde)*/ ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            anlass[i] = result[i].anlass;
        }
    });
    //Datum
    var sql1 = "SELECT datum FROM G4_PRAESENTATION /*,modul WHERE modul(von Tabelle praesentation) = mid(die mitgegeben wurde) */";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        //Attribute durchlaufen und in result laden
        for (var i = 0; i < result.length; i++) {
            datum[i] = result[i].datum;
        }
    });
    //Raum
    var sql2 = "SELECT raum FROM G4_PRAESENTATION /*,modul  WHERE modul(von Tabelle praesentation) = mid(die mitgegeben wurde) */";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            raum[i] = result[i].raum;
        }
    });
    var sql3 = "SELECT pid FROM G4_PRAESENTATION /*,modul  WHERE modul(von Tabelle praesentation) = mid(die mitgegeben wurde) */";
    con.query(sql3, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            pid[i] = result[i].pid;
        }
    });
}











module.exports = G4_0800;


