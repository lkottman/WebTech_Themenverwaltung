const express = require('express');
const session = require("express-session");
const mysql = require('mysql');
const path = require("../../../../config/pathConfig.json");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));
const app = express();
const redirect = require("../routesRedirect");
const router = express.Router()

const connection = require("../../../../getConnectionDatabase");


var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
const tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year
const fieldsQueryResult = 0;

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


//Takes E-Mail and password from User and check if these matches if database
router.post("/login",  (request, response) => {

    console.log(request.body);

    connection.query("SELECT id, name,verified, token, e_mail, password, authorization from user where "
        + 'e_mail = "' + request.body.email + '"'
        + ' AND password = "' + request.body.password + '"',
        function (err, result) {
            if (err)
                throw err;
            else {
                if (result.length == 0) {
                    //If there is no match login failed
                    console.log("login fehlgeschlafen (Falsche Daten oder nicht registriert)");
                    response.json({login: "Fehlgeschlagen: Falsche Informationen oder nicht registriert"});

                } else {
                    //Check if User is verified
                    if (result[0].verified == false) {
                        console.log("login fehlgeschlafen (nicht verifiziert)");
                        response.json({login: "Fehlgeschlagen: Nicht Verifiziert"});
                    } else {
                        console.log("login erfolgreich");

                        if(request.body.checkboxLogin === true){
                            request.session.cookie.maxAge = lifeTimeLong;
                        }

                        request.session.userId = result[0].id;
                        request.session.userName = result[0].name;
                        request.session.userAuthorization = result[0].authorization;

                        response.redirect("/home");
                    }
                }
            }
        });
});

router.post("/logout",  (request, respond) => {

    request.session.destroy(err => {
        if (err) {
            return respond.redirect("/home");
        }
        respond.clearCookie(sessionName);
        console.log("cookies deleted!")
        respond.redirect("/login");
    })
});

module.exports = router;

