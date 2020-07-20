const express = require("express")
const bodyParser = require("body-parser")
const http = require("http");
const mysql = require("mysql");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("Connection.json"));
const app = express();

console.log('verbindungsaufbau');

var con = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

con.connect(function (err) {
    if(err) throw err;
    console.log('Connected!');
});

app.post("/NewModul", (request, response) => {
    con.query("INSERT INTO MODUL(Name,Beginn,Ende) VALUES("
        + '"' + request.body.name + '",'
        + '"' + request.body.beginn + '",'
        + '"' + request.body.ende,
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Modul created");
            }
        })
})

app.post("/CreateNewTopic", (request, response) => {
    connection.query("INSERT INTO THEMA(Title,Description,MaxParticipants,BeginRegistration,EndRegistration VALUES("
        + '"' + request.body.titel + '",'
        + '"' + request.body.beschreibung + '",'
        + '"' + request.body.maxMembers + '",'
        + '"' + request.body.BeginAnmeldung + '",'
        + '"' + request.body.EndAnmeldung,
        function (err) {
            if (err)
                throw err;
            else {
                console.log("Topic created");
            }

        }
    )

})

app.post("/GroupOverview", (request, response) => {
    connection.query("SELECT Modulname, Thementitel, Mitgliederanzahl, MaximaleMitglieder from Themen where"
        + '"' + request.body.Modulname + '",'
        + '"' + request.body.Thementitel + '",'
        + '"' + request.body.Mitgliederanzahl + '",'
        + '"' + request.body.MaximaleMitglieder,
        function (err) {
            if (err)
                throw err;
            else {
                //console.log("Modul created");
                //
                // Muss hier was hin?
            }
        })
})

app.post("/Home", (request, response) => {
    connection.query("SELECT Modulname, GruppenID, Betreff from Benachichtigungen where"
        + '"' + request.body.Modulname + '",'
        + '"' + request.body.GruppenID + '",'
        + '"' + request.body.Betreff,
        function (err) {
            if (err)
                throw err;
            else {
              //  console.log("Modul created");
            }
        })
})

app.post("/GroupView", (request, response) => {
    connection.query("SELECT Thementitel, Beschreibung, Mitglieder, Links, Meilensteine from Themen where"
        + '"' + request.body.Themenname + '",'
        + '"' + request.body.Beschreibung + '",'
        + '"' + request.body.Mitglieder + '",'
        + '"' + request.body.Links + '",'
        + '"' + request.body.Meilensteine,
        function (err) {
            if (err)
                throw err;
            else {
                //console.log("Modul created");
            }
        })
})

app.post("/ThemeOverview", (request, response) => {
    connection.query("SELECT Modulname, Thementitel, Mitgliederanzahl, MaximaleMitglieder from Themen where"
        + '"' + request.body.Modulname + '",'
        + '"' + request.body.Thementitel + '",'
        + '"' + request.body.Mitgliederanzahl + '",'
        + '"' + request.body.MaximaleMitglieder,
        function (err) {
            if (err)
                throw err;
            else {
               // console.log("Modul created");
            }
        })
})