
const express = require('express');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();
const router = express.Router();



router.post("/verify", (request, response) => {

    let token = request.body.token;
    let e_mail = request.body.email;

    if (token === null ||  token === undefined
        ||e_mail === null || e_mail === undefined )
    {
        console.log("url is not completed");
        response.redirect("/login");
    }
    else {
        let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + token  +
        "' AND e_mail = '" + e_mail + "';";

        connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result){
                     console.log("account is verified!");
                     response.redirect("/login");
                 }
             });
    }
});

module.exports = router;
