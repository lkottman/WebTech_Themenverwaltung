const express = require('express');
const router = express.Router();

// const redirect = require("./routesRedirect");
const redirect = require("../../../index");

const app = express();
const path = require("../../../config/pathConfig.json");




router.get("/login",  (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/login.html");
    }
});

router.get("/home", (request, response) => {
    console.log("home");
    response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/home.html");
});

router.get("/register", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/register.html");
    }
});

router.get("/admin", (request, response) => {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/public/html/adminView.html");
});

router.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/token.html');
    } else {
        response.redirect("/login");
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

router.get("/testmailer", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/testmailer.html');
});

router.get("/resetpassword", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/tokenReset.html');
});

router.get("/changepassword", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/public/html/changePassword.html');
});

module.exports = router;

