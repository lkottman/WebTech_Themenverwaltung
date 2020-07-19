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
 tag=[];
 agendaid=[];
 praesentationid=[];

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

    var sql = "SELECT * FROM AGENDA ";

    con.query(sql, function (err,result) {
        if (err) throw err;


        for (var i = 0; i < result.length; i++) {
            agendaid[i] = result[i].aid;
            praesentationid[i] = result[i].pid;
            reihenfolge[i] = result[i].Reihenfolge;
            gruppe[i] = result[i].GruppenNummer;
            thema[i] = result[i].thema;
            mitglieder[i] = result[i].Anzahl_Mitglieder;
            startzeit[i] = result[i].start_vortrag;
            dauer[i] = result[i].dauer_vortrag;
            ende[i] = result[i].ende_vortrag;
            tag[i] = result[i].datum;

        }
    });
}


module.exports = G4_0200fs;