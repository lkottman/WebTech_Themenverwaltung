
/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Created, refactored by group 1
 * @class Node.js server
 */

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
configDatabase = require("./config/datenbankConfig.json");


var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
var tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year


var {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

/**
 * @method
 * Express static imports for folders which are accessable from public
 */
app.use('/css',express.static('./Gruppe_1_Registrierung/public/css'));
app.use('/css',express.static('./css'));
app.use('/javascript',express.static('./javascript'));
app.use('/css',express.static('./Gruppe_1_Registrierung/private/css'));
app.use('/images',express.static('./Gruppe_1_Registrierung/public/images'));
app.use('/',express.static('./Gruppe_1_Registrierung/public/html'));
app.use('/javascript',express.static('./Gruppe_1_Registrierung/public/javascript'));
app.use('/javascript',express.static('./Gruppe_1_Registrierung/privat/javascript'));
app.use('/privat/images',express.static('./Gruppe_1_Registrierung/privat/images'));

app.use('/CSS',express.static('./Gruppe_5_Editor/Web Technologies/Projekt/CSS'));
app.use('/JS',express.static('./Gruppe_5_Editor/Web Technologies/Projekt/JS'));
app.use('/HTML',express.static('./Gruppe_5_Editor/Web Technologies/Projekt/HTML'));

//Limit sizes of json files of the server accepts
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.urlencoded({
    extended: true
}))

/**
 * @method
 * Configuration of the cookie
 */
app.use(session({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: secretSession,
    cookie: {
        maxAge: sessionLifetime,
        sameSite: true,
        secure: false    //in development in production :true
    }
}));

/**
 * AUTHOR: Dominik Dziersan
 * If the user didnt accept the cookie redirect him to the mainpage
 * @method redirectCookie
 * @param request
 * @param response
 * @param next
 */
const redirectCookie = (request, response, next) => {

    if (request.session.enabledCookies === false
    || request.session.enabledCookies === undefined) {
        response.redirect("/");
    } else {
        next();
    }
};

/**
 * AUTHOR: Dominik Dziersan
 * If a user is not logged in, redirect him to the login
 * @method redirectLogin
 * @param request
 * @param response
 * @param next
 */
const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        response.redirect("/login")
    } else {
        next();
    }
};
/**
 * AUTHOR: Dominik Dziersan
 * If a user is logged in, redirect him to home
 * @method redirect Home
 * @param request
 * @param response
 * @param next
 */
const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        response.redirect("/home");
    } else {
        next()
    }
};

/**
 * AUTHOR: Dominik Dziersan
 * For specific reasons the double request bugs some methods. Use this to prevent it.
 * @method ignoreFavicon
 * @param request
 * @param response
 * @param next
 */
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
        console.log("ignored");
    } else {
        console.log("next");
        next();
    }
};


/**
 * AUTHOR: Dominik Dziersan
 * Send all informations of a session to a user.
 * @method Send session every connection
 * @param request
 * @param response
 * @param next
 */
app.use((request, respond, next) => {
    const {userId} = request.session;

    respond.locals.enabledCookies = request.session.enabledCookies;


    if (userId) {
        respond.locals.userId = request.session.userId;
        respond.locals.userName = request.session.userName;
        respond.locals.userAuthorization = request.session.userAuthorization;
    }
    next();
});

/**
 * @method
 * GET Methods from routesGET.js
 */
router = require("./Gruppe_1_Registrierung/public/routes/routesGET.js");

app.get("/", router);
app.get("/login",redirectHome,redirectCookie, router);
app.get("/register",redirectHome, ignoreFavicon, redirectCookie, router);
app.get("/agb",redirectCookie, router);
app.get("/successfullregistration",redirectCookie, router);
app.get("/resetpassword", router);
app.get("/token",redirectLogin, router);
app.get("/home",redirectLogin, router);
app.get("/admin",redirectLogin, router);
app.get("/getUser",redirectLogin, router);
app.get("/confirmation", router);
app.get("/passwordforgot", router);
app.get("/register", router);
app.get("/changepassword", router);
app.get("/adminView",redirectLogin, router);
app.get("/impressum", router);
app.get("/userInfo",redirectLogin, router);
app.get("/presentation", router);
//Get without HTML|| email
app.get("/cookie", (request, response) => {
    response.json(request.session);
});


//-------------------------------------------
//Hier muss noch die routesGet angepasst werden
//-------------------------------------------
app.get("/myGroups", router);
app.get("/joinGroup", router);
app.get("/requirementsdefinition", router);

app.get("/favicon.ico", (request, response) => {
    response.writeHead(204, {'Content-Type': 'image/x-icon'} );
    response.end();
    console.log('favicon requested');
});
/**
 * @method
 * POST Methods
 */
routerConfirmation = require('./Gruppe_1_Registrierung/public/routes/register/confirmMail.js');
app.use(routerConfirmation);

routerPassword = require('./Gruppe_1_Registrierung/public/routes/resetPassword/sendMailToChangePassword.js');
app.use(routerPassword);

routerChangePassword = require('./Gruppe_1_Registrierung/public/routes/resetPassword/changePassword.js');
app.use(routerChangePassword);

routerLogin = require('./Gruppe_1_Registrierung/public/routes/login/routesLogin.js');
app.use(routerLogin);

routerRegister = require('./Gruppe_1_Registrierung/public/routes/register/routesRegister.js');
app.use(routerRegister);

routerToken = require("./Gruppe_1_Registrierung/public/routes/token/routesToken.js");
app.get("/getToken", routerToken);
app.use(routerToken);

//Gruppe 5 Editor
routerEdit = require("./Gruppe_5_Editor/Web Technologies/Projekt/routes/routesGetPostEditor.js");

app.get("/requirements",redirectLogin, routerEdit);
app.use(routerEdit);

app.post("/enableCookie", (request, response) => {
    request.session.enabledCookies = true;

    response.end();
});


app.post("/logout",  (request, respond) => {

    request.session.destroy(err => {
        if (err) {
            return respond.redirect("/home");
        }
        respond.clearCookie(sessionName);
        console.log("cookies deleted!")
        respond.redirect("/");
    })
});

// Post Methods
app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");
    }
    next();
});


const server = app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));


module.exports = {
    server: server,
    session: session,
    redirectLogin: redirectLogin,
    redirectHome: redirectHome,
    session: session
};