const express = require('express')
const router = express.Router()
const {sendMail, getTextConfirmationEmail, getMailOptions} = require('../nodeMailer/nodeMailer.js');
const connection = require("../../../../getConnectionDatabase");

function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}

router.post("/register", (request, response) => {

    // if(request.method == "OPTIONS"){
    //     response.set('Access-Control-Allow-Origin', '*');
    //     response.set('Access-Control-Allow-Headers', 'Content-Type');
    //     response.status(204).send('');
    // }

    if(validateEmail(request.body.email === false)){
        response.json({register: "Nur E-Mail Adressen mit der Endung '@hs-osnabrueck.de' sind zugelassen."});
    }

    let servertime = new Date();
    let randomtoken = Math.random().toString(36).substr(2, 6);

    // var tokenBool = false;
    // var startTime = "";
    // var endTime = "";
    // var token = "";
    // var clientToken = request.body.token;
    //
    // connection.query("SELECT gentoken, start, time, end FROM TOKEN WHERE " +
    //     'gentoken = "' + request.body.token + '"',
    //     function (err, result, fields) {
    //         if (err)
    //             throw err;
    //         else {
    //             tokenBool = true;
    //             startTime = result[0].start;
    //             endTime = result[0].end;
    //             token = result[0].gentoken;
    //             clientToken = request.body.token;
    //         }
    //     });
    //
    // if(tokenBool === false){
    //     response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
    // }
    //
    // if (token === clientToken
    //     && servertime >= startTime
    //     && servertime <= endTime){
    //     tokenBool = true
    // }
    //
    // if(tokenBool === false){
    //     response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
    // }
    //
    // connection.query("SELECT * FROM USER WHERE " + 'e_mail = "'
    //     + request.body.email + '"',
    //     function (err, result) {
    //         if (err) {
    //             throw err;
    //         } else {
    //             if (result.length === 0){
    //                 tokenBool = true;
    //             }
    //         }
    //     })
    //
    // if(tokenBool === false){
    //     response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
    // }
    //
    // connection.query("INSERT INTO USER(token,name,surname,"
    //     + "e_mail,password,confirm_token ,verified, authorization) VALUES("
    //     + '"' + request.body.token + '",'
    //     + '"' + request.body.name + '",'
    //     + '"' + request.body.surname + '",'
    //     + '"' + request.body.email + '",'
    //     + '"' + request.body.password + '",'
    //     + '"' + randomtoken + '",'
    //     + '' + "false" + ','
    //     + '"student"' + ')',
    //     function (err) {
    //         if (err)
    //             throw err;
    //         else {
    //             sendMail(getMailOptions(request.body.email,
    //                 'E-Mail bestätigen!!',getTextConfirmationEmail(randomtoken,
    //                     request.body.email, request.body.name)));
    //             console.log("User created");
    //             response.json({register: ""});
    //         };
    //     });


    // Check if used token is valid
    connection.query("SELECT gentoken, start, time, end FROM TOKEN WHERE " +
        'gentoken = "' + request.body.token + '"',
        function (err, result, fields) {
            if (err)
                throw err;
            else {
                if (result[0] !== undefined) {
                    let startTime = result[0].start;
                    let endTime = result[0].end;
                    let token = result[0].gentoken;
                    let clientToken = request.body.token;

                    if (token === clientToken
                        && servertime >= startTime
                        && servertime <= endTime) {
                        connection.query("SELECT * FROM USER WHERE " + 'e_mail = "'
                            + request.body.email + '"',
                            function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    if (result.length === 0) {
                                        response.json({register: ""})
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
                                            function (err) {
                                                if (err)
                                                    throw err;
                                                else {
                                                    sendMail(getMailOptions(request.body.email,
                                                        'E-Mail bestätigen!!',getTextConfirmationEmail(randomtoken,
                                                            request.body.email, request.body.name)));
                                                    console.log("User created");
                                                };
                                            });
                                    } else {
                                        response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
                                    }
                                }
                            });
                    } else {
                        response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
                    }
                } else {
                    response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
                }
            }
        });
});


module.exports = router;