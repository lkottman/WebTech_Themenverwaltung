/** confirmMailNode
 *
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class
 */
const express = require('express');
const connection = require('../../../../getConnectionDatabase.js');
const redirect = require("../routesRedirect");
const app = express();
const router = express.Router();


/**
 * @method
 * This router handles the verification of user http request.
 */
router.post("/verify", (request, response) => {

    let token = request.body.token;
    let e_mail = request.body.email;

    if (token === undefined||  token === null
        || e_mail === undefined || e_mail === null) {
        console.log("url is not completed");
        response.redirect("/login");
    } else {

    }
    response.redirect("/login");
});

/**
 * @method
 * This method changes the status of mail verified to true.
 * @param e_mail to determine entry in database
 * @param token to determine entry in database
 * @returns {Promise<void>}
 */
async function updateUser(e_mail, token)
{
    let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + token +
        "' AND e_mail = '" + e_mail + "';";

    connection.query(sql, function (err) {
        if (err) throw err;

    });
    return true;
}

module.exports = router;
