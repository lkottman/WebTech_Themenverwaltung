/** changePassword
 *
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class to change the password of a user stores it in the database.
 */


const express = require('express');
const {getTextForgotPassword,getMailOptions,sendMail} = require('../nodeMailer/nodeMailer.js');
const {checkInputForSQLInject} = require('../../javascript/sql_InjectionTester.js');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");



/**
 * @method
 * This router updates the password of an user.
 */
router.post("/updatePassword", (request, response) =>{

    let email = request.body.email;
    let tokenReset = request.body.token;
    let password = request.body.password;

    if ( email === undefined  || email === null ||
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
                console.log("password changed!");

        });
        response.redirect("/login");
    }
});

/**
 * @method
 * This method checks if a given token is valid or not otherwise it returns false
 */
   async function checkToken(token){
    if(token === "" || token === null || token === undefined)
    {
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
                    let changeUsed = `UPDATE PW_FORGOT_TOKEN SET used = 1 WHERE e_mail = '${email}';`;
                    

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
                return false;
            }
        });
    }};

/*
async function checkForValid(token, e_mail) {

    let now = new Date();
    now.setHours(now.getHours() + 2);
    now = now.toISOString().slice(0, 19).replace('T', ' ');

    let sql = `SELECT start, end, used FROM PW_FORGOT_TOKEN WHERE e_mail = '${e_mail}' AND token = '${token}';`;

    connection.query(sql, function (err, result) {
        if (err){
            throw err;
            return false;
        }
        if (result[0].used == 1)
        {
            console.log("e-mail already registiered");
            return false;
        } else if (result[0].start >= now && now >= result[0].end) {
            console.log(("e-mail verification link is over "));
            return false;
        }
        else {
            console.log("e-mail isnt't verified and token not used");

            let sql = `UPDATE PW_FORGOT_TOKEN SET used = 1 WHERE e_mail = '${e_mail}' AND token = '${token}';`;

            connection.query(sql, function (err, result) {
                if (err) throw err;
                if (result)
                    console.log('token status successful changed');
            });
            return true;
        }
    });
};
*/

module.exports = router;