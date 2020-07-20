const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const fs = require('fs');
const session = require("express-session");
const bodyParser = require("body-parser");
const config = JSON.parse(fs.readFileSync("/Users/svenpetersen/IdeaProjects/WebTech_Themenverwaltung_Closly_Finished/config/datenbankConfig.json"));
const {sendMail, getTextConfirmationEmail, getMailOptions} = require('../nodeMailer/nodeMailer.js');

const redirect = require("../routesRedirect");

let connection = mysql.createConnection(
    {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
);

function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}

router.post("/register", redirect.redirectHome, (request, response) => {

    console.log(request.body);

    if(request.method == "OPTIONS"){
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    if(validateEmail(request.body.email === false)){
        response.json({register: "Nur E-Mail Adressen mit der Endung '@hs-osnabrueck.de' sind zugelassen."});
    }

    let servertime = new Date();
    let randomtoken = Math.random().toString(36).substr(2, 6);

    //Check if used token is valid
    connection.query("SELECT * FROM TOKEN WHERE " +
        'gentoken = "' + request.body.token + '"',
        function (err, result, fields)
        {
            if (err)
                throw err;
            else
                {
                if (result.length !== 0)
                {
                    let startTime = result[0].start;
                    let endTime = result[0].end;
                    let token = result[0].gentoken;
                    let clientToken = request.body.token;

                    if (token === clientToken
                        && servertime >= startTime
                        && servertime <= endTime)
                    {
                        connection.query("SELECT * FROM USER WHERE " + " e_mail = '"
                            + request.body.email + "';",
                            function (err, result)
                            {
                                if (err)
                                {
                                    throw err;
                                } else
                                    {
                                    if (result.length === 0)
                                    {
                                        connection.query("INSERT INTO USER(token,name,surname,"
                                            + "e_mail,password,confirm_token ,verified, authorization) VALUES("
                                            + '"' + request.body.token + '",'
                                            + '"' + request.body.name + '",'
                                            + '"' + request.body.surname + '",'
                                            + '"' + request.body.email + '",'
                                            + '"' + request.body.password + '",'
                                            + '"' + randomtoken + '",'
                                            + '' + "false" + ','
                                            + '"student"' + ')',
                                            function (err)
                                            {
                                                if (err)
                                                    throw err;
                                                else
                                                    {
                                                    console.log("User created");
                                                    sendMail(getMailOptions(request.body.email,
                                                        'E-Mail bestätigen!!',getTextConfirmationEmail(randomtoken,
                                                            request.body.email, request.body.name)))
                                                     }
                                                 });
                                            } else

                                        response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
                                        }
                                    }
                                });
                            }
                        else
                        {
                        response.json({register: "Freischaltcode ist abgelaufen."});
                        }

                else
                    {
                        response.json({register: "Freischaltcode existiert nicht."});
                    }
                }
            })
        }
    );


module.exports = router;