const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const fs = require('fs');
const session = require("express-session");
const bodyParser = require("body-parser");
const config = JSON.parse(fs.readFileSync("C:\\Users\\Dominik\\IdeaProjects\\WebTech_Themenverwaltung2\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\Sven_Louis\\datenbankConfig.json"));

const redirect = require("../routesRedirect");

router.post("/createToken", redirect.redirectLogin, (request, response) => {

    console.log(request.body.time);
    console.log(tokenLifeTime);

    if (request.body.time < tokenLifeTime) {

        connection.query("INSERT INTO TOKEN(START,TIME,END,GENTOKEN, USER) VALUES("
            + '"' + request.body.start + '",'
            + request.body.time + ','
            + '"' + request.body.end + '",'
            + '"' + request.body.token + '",'
            + '"' + request.session.userId + '")'),
            function (err) {
                if (err)
                    throw err;
                console.log("Inserted TOKEN")
            }

        response.json({token: "Freischaltcode wurde erstellt."})
    } else {
        response.json({token: "Fehler: Die Dauer vom Freischaltcode ist zu lang gewählt."})
    }
});

//Deletes token from Database
router.post("/deleteToken", redirect.redirectLogin, (request, response) => {

    if (request.session.authorization === "admin"){
        connection.query("SELECT gentoken from token WHERE GENTOKEN = " + '"' + request.body.token + '";',
            function (err, result) {
                if (err)
                    throw err;
                else {
                    console.log(result.length);

                    if (result.length > 0) {
                        connection.query("DELETE FROM token WHERE GENTOKEN = " + '"' + request.body.token + '";'),
                            function (err, result) {
                                if (err)
                                    throw err;
                            }
                        response.json({token: "Token gelöscht!"});
                    } else {
                        response.json({token: "Token nicht gefunden"});
                    }
                }
            })
    } else {
        response.json({token: "Keine Berechtigung zur Löschung von Freischaltcodes"});
    }
});

module.exports = router;
