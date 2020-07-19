const express = require('express');
const {getTextForgotPassword,getMailOptions,sendMail} = require('../nodeMailer/nodeMailer.js');
const {checkInputForSQLInject} = require('../../javascript/sql_InjectionTester.js');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();

const router = express.Router();


app.post("/changePassword", (request, response) =>{

    let tokenReset = request.query.opt;
    let email = request.query.email;

    if (email === null || email === undefined ||
        tokenReset === null || tokenReset === undefined){
        console.log("Error");
        response.redirect("/login");
    }
    else {
    console.log(email);

        let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + tokenReset  +
            "' AND e_mail = '" + email + "';";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            if (result){
                console.log("Erfolgreich");
            }
        });
        response.redirect("/login");
    }
});




    let email = "sven.petersen@hs-osnabrueck.de";
    let newpassword = request.body.password;

    let sql = `UPDATE USER SET password = '${newpassword}' WHERE e_mail = '${email}'; `;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    })

});


    function checkToken(){
    let resetToken = request.body.resetToken;

    if(resetToken == "")
    {
        console.log("test");
        response.redirect("/login");
    }
    else
    {

        let sql =  `SELECT e_mail, used FROM PW_FORGOT_TOKEN 
                     WHERE current_timestamp < end
                     AND current_timestamp > start AND token ='${resetToken}';`;


        connection.query(sql, function (err, result) {
            if(err)
                throw err;

            if (result.length != 0){
                let email = result[0].e_mail;
                let used = result[0].used;

                if (used == 0) {
                    let changeUsed = `UPDATE PW_FORGOT_TOKEN SET used = true WHERE e_mail = '${email}';`;
                    console.log(changeUsed);
                    connection.query(changeUsed, function (err, result) {
                        if (err) throw err;

                        if (result.length != 0){
                            response.redirect("/passwort")
                        }
                    });
                }
            }
        });
    }};

function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}



module.exports = router;