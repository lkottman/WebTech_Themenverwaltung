const express = require('express');
const session = require("express-session");
const mysql = require('mysql');
const path = require("../../../../../config/pathConfig.json");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));
const app = express();
const redirect = require("../routesRedirect");
const router = express.Router()

const connection = require("../../../../../getConnectionDatabase");

var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
const tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year

var {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

app.use(session({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: secretSession,
    cookie: {
        maxAge: sessionLifetime,
        sameSite: true,
        secure: false    //in development in production :true
    }
}));

// const path = require("../../../../pathConfig.json");
// const config = JSON.parse(fs.readFileSync(path.path + "\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\Sven_Louis\\datenbankConfig.json"));
// const redirect = require("../../../../../index");
// const redirect = require("../routesRedirect");


router.post("/createToken",  (request, response) => {

    console.log(request.body.time);

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
router.post("/deleteToken", (request, response) => {

    console.log(request.session);
    if (request.session.userAuthorization === "admin"){
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
                        response.json({token: "Token nicht gefunden."});
                    }
                }
            })
    } else {
        response.json({token: "Keine Berechtigung zur Löschung von Freischaltcodes."});
    }
});

module.exports = router;
