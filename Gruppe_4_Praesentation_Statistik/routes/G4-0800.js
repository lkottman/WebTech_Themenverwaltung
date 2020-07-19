/*
Author: Constantin Brans
 */

/**
 * G4-0800 / Übersicht über Präsentationen in einem Modul für die Studierenden
 */

//Modulimport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0800 = express.Router();

//Definition der Arrays
let date = [];
let thema = [];
let raum = [];


/**
 * JS auf ejs laden auf aufrufen
 */
    G4_0800.get('/G4-0800',function (request,result) {
        result.render('G4-0800.ejs',
            {
                benutzername : "Test",
                Modulname : "WEB-TECH",
                date :date,
                thema: thema,
                raum:raum,
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


/**
 * SQL-Abfragen für die jeweiligen Spalten
 */
function getValuesFromDb() {
    /*//Deadline
    var sql = "SELECT deadline FROM projekt";
    con.query(sql, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            date[i] = result[i].deadline;
        }
    }); */
    //Bezeichnung
    // DIESE ZEILE WAR URSPRÜNGLICH GEDACHT. WAS IST DAMIT GEMEINT? var sql1 = "SELECT Bezeichnung FROM agenda";
    var sql1 = "SELECT anlass FROM praesentation";
    con.query(sql1, function (err, result) {
        if (err) throw err;
        //Attribute durchlaufen und in result laden
        for (var i = 0; i < result.length; i++) {
            thema[i] = result[i].anlass;
        }
    });
    //Raum
   /* var sql2 = "SELECT Raum FROM G4_PRAESENTATION,projekt WHERE G4_PRAESENTATION.Datum = projekt.deadline";
    con.query(sql2, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            raum[i] = result[i].Raum;
        }
    }); */
}






//TODO Modulnamen und Benutzer aus DB

module.exports = G4_0800;



