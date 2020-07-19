/**
 * G4-0100 / Eine Übersicht für die Lehrkräfte in welchen Modulen ein Präsentationstermin bevorsteht
 */


//Modulimport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0100 = express.Router();

//Definition der Arrays
datum = [];
raum = [];
thema = [];
vorlseung_bezeichnung = [];


/**
 * JS auf ejs laden und aufrufen
 */

    G4_0100.get('/G4-0100', function (request, result) {
        result.render("G4-0100.ejs", {
        });
    });


getValuesfromDb0100()



    function getValuesfromDb0100() {
    //Datum
    var sql0100 = "SELECT datum,raum,anlass FROM G4_PRAESENTATION";
    con.query(sql0100, function (err, result) {
        if (err) throw err;
        //durchläuft alle Zeilen und gibt diese Werte an result weiter
        for (var i = 0; i < result.length; i++) {
            console.log(result);
            datum[i] = result[i].datum;
            raum[i] = result[i].raum;
            anlass[i] = result[i].anlass;
        }
    });
}

module.exports = G4_0100;


