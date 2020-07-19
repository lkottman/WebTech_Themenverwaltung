/*
Author: Constantin Brans
 */

/**
 * Importieren der App und MySql-Module
 */
var app = require('../app');
var con = require('../mysql');

const express = require('express');
const G4_0200fs = express.Router();


/**
 * Arrays für die Speicherung der SQL-Abfragen
 */

 reihenfolge =[];
 gruppe=[];
 thema=[];
 mitglieder=[];
 startzeit=[];
 dauer=[];
 ende=[];
 raum=[];
 tag=[];
 anlass=[];
 modul=[];

/**
 * Aufruf der Seite G4-0200 für Studenten
 */
G4_0200fs.get('/G4-0200fS', function (request, result) {

    result.render("G4-0200forStudents.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",
        modulthema: anlass,
        datum: tag[0],
        raum1: raum[0],

    });

});



/**
 * Verbindungsaufbau zur DB
 */
getValuesfromDb();

/**
 * SQL-Abfragen aus DB
 */

function getValuesfromDb() {

    var sql = "SELECT * FROM praesentation_reihenfolge ";

    con.query(sql, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {
            reihenfolge[i] = result[i].Reihenfolge;
            gruppe[i] = result[i].GruppenNummer;
            thema[i] = result[i].Praesentationsthema;
            mitglieder[i] = result[i].Anzahl_Mitglieder;
            startzeit[i] = result[i].Startzeit;
            dauer[i] = result[i].Dauer;
            ende[i] = result[i].Endzeit;
            raum[i] = result[i].Raum;
            tag[i] = result[i].Tag;
            anlass = result[i].Anlass;
            modul = result[i].modul;
        }
    });
}


module.exports = G4_0200fs;