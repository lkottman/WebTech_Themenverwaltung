const express = require('express');
const router = express.Router();

// const redirect = require("./routesRedirect");
const redirect = require("../../../../index");

const app = express();
const path = require("../../../../config/pathConfig.json");


app.use(express.static('../Gruppe_1_Registrierung/Login_etc_Dziersan/public/Sven_Louis/css'));


router.get("/login",  (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/Login_etc_Dziersan/public/login.html");
    }
});

router.get("/home", (request, response) => {
    console.log("home");
    response.sendFile(path.path + "/Gruppe_1_Registrierung/Login_etc_Dziersan/privat/home.html");
});

router.get("/register", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile(path.path + "/Gruppe_1_Registrierung/Login_etc_Dziersan/public/register.html");
    }
});

router.get("/admin", (request, response) => {
        response.sendFile(path.path + "Gruppe_1_Registrierung/Login_etc_Dziersan/public/Sven_Louis/html/adminView.html");
});

router.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/privat/token.html');
    } else {
        response.redirect("/login");
    }
});

router.get("/", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/index.html');
});

router.get("/agb", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/agb.html');
});

router.get("/successfullregistration", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/successRegister.html');
});

router.get("/testmailer", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/testmailer.html');
});

router.get("/resetpassword", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/Sven_Louis/tokenReset.html');
});

router.get("/changepassword", (request, response) => {
    response.sendFile(path.path + '/Gruppe_1_Registrierung/Login_etc_Dziersan/public/Sven_Louis/changePassword.html');
});

module.exports = router;

