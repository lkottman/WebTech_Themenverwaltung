const express = require('express');
const mysql = require('mysql');
const path = require("../../../../config/pathConfig.json");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));
const app = express();
const redirect = require("../routesRedirect");
const router = express.Router()

app.post("/pwforgot", (request, response) => {
    let email = request.body.email;
    console.log(email);

    // error message ausgeben
    if(email === null || email === undefined )
    {
        response.redirect("/login");
    } else {

        let checkEntry = "SELECT EXISTS(SELECT * FROM USER WHERE e_mail = '" + email +  "') AS test" + ";";
        console.log(checkEntry);

        connection.query(checkEntry, function (err, result, fields) {
            if(err) throw err;

            // checks if entry exists
            let check = result[0].test;
            console.log(check);
            if (check === 1){


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
                let insertToken = `INSERT INTO PW_FORGOT_TOKEN(e_mail, start, end, token, used) VALUES ('${email}', 
                    '${startDate}','${endDate}', '${resetToken}', false )`;
                console.log(insertToken);




                connection.query(insertToken, function (err, result) {
                    if(err) throw err;

                    let link = `http://webtech-01.lin.hs-osnabrueck.de/changePassword`;
                    link = `Guten Tag, \n ` +
                        `Um Ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule Osnabrück zurückzusetzen`+
                        ` benötigen Sie den folgenden Token: \n` +
                        `${resetToken} \n` +
                        ` Bite klicken Sie auf diesen Link um ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule` +
                        `zurückzusetzen. \n ${link}`;
                    let mailOptions = {
                        to: email,
                        from: config.e_mail,
                        subject: 'Passwort zurücksetzen',
                        text: link

                    };

                    transporter.sendMail(mailOptions, function (err, data) {
                        if (err) {
                            console.log('Error Occurs', err);
                        } else {
                            console.log('Email sent!!')
                        }
                    });

                });
                response.redirect("/login");

            } else
            {
                console.log("Error");
                //response.json({register: "Fehlgeschlagen: Benutzer existiert bereits"});
            }
        })
    }
});