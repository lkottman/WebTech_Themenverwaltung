const express = require('express');
const router = express.Router();
var path = require('path');
const redirect = require("./routesRedirect");
const app = express();


router.get("/login", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile("C:\\Users\\Dominik\\IdeaProjects\\WebTech_Themenverwaltung2\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\login.html");
    }
});

router.get("/home", redirect.redirectLogin, (request, response) => {
    console.log("home");
    response.sendFile("C:\\Users\\Dominik\\IdeaProjects\\WebTech_Themenverwaltung2\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\home.html");
});

router.get("/register", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile("C:\\Users\\Dominik\\IdeaProjects\\WebTech_Themenverwaltung2\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\register.html");
    }
});

router.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//privat//token.html', {root: __dirname});
    } else {
        response.redirect("/login");
    }
});

router.get("/", (request, response) => {
    response.sendFile('..//index.html', {root: __dirname});
});

router.get("/agb", (request, response) => {
    response.sendFile('..//agb.html', {root: __dirname});
});

router.get("/successfullregistration", (request, response) => {
    response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//public//successRegister.html', {root: __dirname});
});

router.get("/testmailer", (request, response) => {
    response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//public//testmailer.html', {root: __dirname});
});

router.get("/resetpassword", (request, response) => {
    response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//public//Sven_Louis//tokenReset.html', {root: __dirname});
});

router.get("/changepassword", (request, response) => {
    response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//public//Sven_Louis//changePassword.html', {root: __dirname});
});

module.exports = router;

