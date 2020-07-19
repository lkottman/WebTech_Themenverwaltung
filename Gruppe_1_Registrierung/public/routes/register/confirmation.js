const express = require('express');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();
const router = express.Router();



router.post("/verify", (request, response) => {

    let tokenReset = request.query.opt;
    let e_mail = request.query.e_mail;

    if (tokenReset === null ||  tokenReset === undefined
        ||email === null || email === undefined )
    {
        console.log("url is not completed");
        response.redirect("/login");
    }   else {

         if(checkForValid(tokenReset, e_mail)) {
             let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + tokenReset  +
                 "' AND e_mail = '" + e_mail + "';";

             connection.query(sql, function (err, result) {
                 if (err) throw err;
                 if (result){
                     console.log("account is verified!");
                     response.redirect("/login");
                 }
             });
         }
    }
});

function checkForValid(token, email) {

    let now = new Date();
    now.setHours(now.getHours() + 2);
    console.log(now);

    now = now.toISOString().slice(0, 19).replace('T', ' ');

 let sql = `SELECT start, end, used FROM PW_FORGOT_TOKEN WHERE e_mail = ${email} AND token= ${token};`;

    connection.query(sql, function (err, result) {
        if (err){
            throw err;
            return false;
        }
        if (result[0].used = 1)
        {
            console.log("e-mail already registiered")
            return false;
        } else if (result[0].start >= now && now >= result[0].end) {
            console.log(("e-mail verification link is over "));
            return false;
        }
        else {
            console.log("e-mail isnt't verified and token not used");

            let sql = `UPDATE PW_FORGOT_TOKEN SET used = 1 WHERE e_mail = ${email} AND token = ${token};`;

            connection.query(sql, function (err, result) {
                if (err) throw err;
                if (result)
                    console.log('token status successful changed');
            });
            return true;
        }
    });
};

module.exports = router;