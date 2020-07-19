const express = require('express');
const mysql = require('mysql');
const fs = require('fs');
const path = require("../../../../config/pathConfig.json");
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));
const {validateEmail} = require('../../javascript/register.js');
const {getTextForgotPassword,getMailOptions,sendMail} = require('../nodeMailer/nodeMailer.js');
const {checkInputForSQLInject} = require('../../javascript/sql_InjectionTester.js');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();


const router = express.Router();


router.post("/pwforgot", (request, response) => {

    let email = request.body.email;

    if(email === null || email === undefined )
    {
        alert("Bitte geben Sie eine gültige E-Mail der Hochschule Osnabrueck an ");
        response.end();
    }
    else if (!checkInputForSQLInject(email)){
        response.end();
    }
    else if (!validateEmail(email)){
        alert("Bitte geben Sie eine gültige E-Mail der Hochschule Osnabrueck an ");
        response.end();
    }
    else {
        // checks if an email with given string exits
        let checkEntry = "SELECT EXISTS(SELECT * FROM USER WHERE e_mail = '" + email +  "') AS test" + ";";

        connection.query(checkEntry, function (err, result, fields) {
            if(err) throw err;

            // checks if entry exists
            if (result[0].test === 1){

                let startDate = new Date();
                startDate.setHours(startDate.getHours() + 2);
                console.log(startDate);

                //generate endDate and add 1 hour for limited reset
                let endDate = new Date();
                endDate.setHours(startDate.getHours() + 3);
                console.log(endDate);

                let resetToken = Math.random().toString(36).substr(2, 6);
                console.log(resetToken);

                // cuts off unnecessary information
                startDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
                endDate = endDate.toISOString().slice(0, 19).replace('T', ' ');



                // use of gravis for easier insertString
                let sqlInsertToken = `INSERT INTO PW_FORGOT_TOKEN(e_mail, start, end, token, used) VALUES ('${email}', 
                    '${startDate}','${endDate}', '${resetToken}', false )`;

                console.log(sqlInsertToken);

                connection.query(sqlInsertToken, function (err, result) {
                    if(err) throw err;

                    sendMail(getMailOptions(email,'Passwort zurücksetzen',getTextForgotPassword(resetToken)));
                    console.log("E-Mail versendet.")
                });
                response.redirect("/login");
            }
        })
    }
});

module.exports = router;