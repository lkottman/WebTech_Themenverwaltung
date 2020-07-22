
const express = require('express');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();
const router = express.Router();



router.post("/verify", (request, response) => {

    let token = request.body.token;
    let e_mail = request.body.email;

    if (token === null || token === undefined
        || e_mail === null || e_mail === undefined) {
        console.log("url is not completed");
        response.redirect("/login");
    } else {
        updateUser(e_mail, token );
        console.log("Success");
    }

});

async function updateUser(e_mail, token)
{
    let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + token +
        "' AND e_mail = '" + e_mail + "';";

    connection.query(sql, function (err) {
        if (err) throw err;

    });
}

module.exports = router;
