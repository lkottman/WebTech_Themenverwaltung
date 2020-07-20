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
anlass = [];




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
    var sql0100 = "SELECT datum FROM G4_PRAESENTATION ";
    con.query(sql0100, function (err, result) {
        if (err) throw err;
        //durchläuft alle Zeilen und gibt diese Werte an result weiter
        for (var i = 0; i < result.length; i++) {
            console.log(result);
            datum[i] = result[i].datum;
        }
    });
    //Raum
    var sql0101 = "SELECT raum FROM G4_PRAESENTATION ";
    con.query(sql0101, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            raum[i] = result[i].raum;
        }
    });
    //Anlass
    var sql0102 = "SELECT anlass FROM G4_PRAESENTATION";
    con.query(sql0102, function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            anlass[i] = result[i].anlass;
        }
    });
}

module.exports = G4_0100;


