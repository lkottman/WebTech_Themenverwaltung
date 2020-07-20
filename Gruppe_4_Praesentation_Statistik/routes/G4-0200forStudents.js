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

        modulname: modul,
        modulthema: anlass,
        datum: tag,
        raum1: raum,

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

    var sql = "SELECT * FROM agenda WHERE pid = '57'";

    con.query(sql, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {
            reihenfolge[i] = result[i].reihenfolge;
            gruppe[i] = result[i].gruppenNummer;
            thema[i] = result[i].thema;
            mitglieder[i] = result[i].anzahl_mitglieder;
            startzeit[i] = result[i].start_vortrag;
            dauer[i] = result[i].dauer_vortrag;
            ende[i] = result[i].ende_vortrag;

        }
    });
    var sql1 = "SELECT raum, anlass, datum, modul FROM praesentation WHERE pid = '57' ";

    con.query(sql1, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {

            raum[i] = result[i].raum;
            tag[i] = result[i].datum;
            anlass = result[i].anlass;
            modul = result[i].modul;
        }
    });
}


module.exports = G4_0200fs;