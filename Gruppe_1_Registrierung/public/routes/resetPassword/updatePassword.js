const express = require('express');
const {getTextForgotPassword,getMailOptions,sendMail} = require('../nodeMailer/nodeMailer.js');
const {checkInputForSQLInject} = require('../../javascript/sql_InjectionTester.js');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");




router.post("/updatePassword", (request, response) =>{

    let email = request.body.email;
    let tokenReset = request.body.token;
    let password = request.body.password;

    if (email === null || email === undefined ||
        tokenReset === null || tokenReset === undefined)
    {
        console.log("Error");
        response.redirect("/login");

    } else if (checkToken(tokenReset) === false)
    {
        console.log("token is invalid!");
        response.redirect("/login");
    }
    else {

        let sql = `UPDATE USER SET password = '${password}' WHERE e_mail = '${email}';`;

        connection.query(sql, function (err, result) {
            if (err) throw err;
            if (result) {
                console.log("Erfolgreich");
            }
        });
        response.redirect("/login");
    }
});

    function checkToken(token){

    if(token === "" || token === null || token === undefined)
    {
        console.log("where is the token");
        redirect("/login");
    }
    else
    {
        let sql =  `SELECT e_mail, used FROM PW_FORGOT_TOKEN 
                     WHERE current_timestamp < end
                     AND current_timestamp > start AND token ='${token}';`;

        connection.query(sql, function (err, result) {
            if(err)
                throw err;

            if (result.length !== 0){
                let email = result[0].e_mail;
                let used = result[0].used;

                if (used === 0)
                {
                    let changeUsed = `UPDATE PW_FORGOT_TOKEN SET used = true WHERE e_mail = '${email}';`;
                    console.log("password_token changed to: "+ changeUsed);

                    connection.query(changeUsed, function (err, result) {
                        if (err) throw err;

                        if (result.length !== 0){
                            return true;
                        }
                    });
                } else {
                    return false;
                }
            }
            else {
                console.log("something went wrong?!");
                return false;
            }
        });
    }};


function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}


module.exports = router;