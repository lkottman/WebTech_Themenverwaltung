const express = require('express');
const router = express.Router();
const connection = require('../../../getConnectionDatabase.js');

// const redirect = require("./routesRedirect");
const redirect = require("../../../index");
const app = express();
const path = require("../../../config/pathConfig.json");




router.get("/login",  (request, response) => {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/login.html");
});

router.get("/home", (request, response) => {
    response.sendFile(path.path + "/Gruppe_1_Registrierung/privat/html/home.html");
});

router.get("/register", (request, response) => {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/register.html");
});



let url = 'https://example.com';


/**
 *  This method provides a json object with all registerd users.
 */

router.get("/getUser", (request, response) => {

    let sql = "SELECT id, name, surname, e_mail, password, course, authorization, verified FROM USER;";

    connection.query(sql,(err, result, )  => {
        if(err) {
            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });

});

/**
 * This method allows the user and admin to change their personal data.
 */
router.get("/updateUser", (request, response) => {

    let sql = "SELECT id, name, surname, e_mail, password, course, authorization FROM USER;";

    connection.query(sql,(err, result, )  => {
        if(err) {
            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });

});




router.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/privat/html/token.html');
    } else {
        response.redirect("/login");
    }
});

router.get("/showUsers", (request, response) => {
    if (request.session.userAuthorization === "lecturer") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/privat/html/showUsersLexturer.html');
    } else if(request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/privat/html/showUsersAdmin.html');
    } else {
        response.redirect("/profil");
    }
});

router.get("/", (request, response) => {

    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/index.html');

});

router.get("/agb", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/agb.html');
});

router.get("/successfullregistration", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/successRegister.html');
});

router.get("/changepassword", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/changePassword.html');
});

router.get("/confirmation", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/confirmEmail.html");
});

router.get("/passwordforgot", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/passwordForgot.html");

});


router.get("/impressum", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/impressum.html");

});

router.get("/userInfo", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/privat/html/userView.html");

});

router.get("/admin", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/privat/html/adminView.html");

});

router.get("/lecturerView", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/privat/html/lecturerView.html");

});

router.get("/addUser", (request, response) => {

    response.sendFile(path.path + "/Gruppe_1_Registrierung/privat/html/addUser.html");

});

router.get("/showUsers", (request, response) => {
    if (request.session.userAuthorization === "lecturer") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/privat/html/lecturerView.html');
    } else if(request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/privat/html/adminView.html');
    } else {
        response.redirect("/profil");
    }
});

module.exports = router;

