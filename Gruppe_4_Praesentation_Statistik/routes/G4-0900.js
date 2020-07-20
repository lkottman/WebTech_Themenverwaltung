

/**
 * G4-0900 / Anfrage Dozenten für Hilfe und/oder Terminänderung
 */

//Modulimport
var app = require('../app');
var con = require('../mysql');
const express = require('express');
const G4_0900 = express.Router();



app.get('/G4-0900', function (request, response) {
    console.log("G4-0900 wurde geladen");
    response.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});


/**
 * Werte aus dem Formular in die Relation Nachrichten einfügen
 */
// CALL OF the form sendMessage

app.post('/sendMessage', function (request, result) {
    var sql = "INSERT INTO Nachrichten(Nachricht,Datum,Anfrage_art) VALUES('"+
        request.body.message + "','" + request.body.date + "','"
        + request.body.dateRequestQuestion + "');";
    con.query(sql, function (err) {
        if (err) throw err;
    });
    //JS auf ejs laden und aufrufen
    result.render("G4-0900.ejs", {
        benutzername: "Test",
        Gruppennummer: "2",
    });
});


/**
 * Listening auf Server
 */
