const express = require('express');

const mysql = require('mysql');

const fs = require('fs');
const config = JSON.parse(fs.readFileSync("C:\\Users\\Dominik\\IdeaProjects\\WebTech_Themenverwaltung2\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\Sven_Louis\\datenbankConfig.json"));

const redirect = require("../routesRedirect");
const router = express.Router()

let connection = mysql.createConnection(
    {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
);

//Takes E-Mail and password from User and check if these matches if database
router.post("/login", redirect.redirectHome, (request, response) => {

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

                        if(request.body.checkboxLogin == true){
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

router.post("/logout", redirect.redirectLogin, (request, respond) => {

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

