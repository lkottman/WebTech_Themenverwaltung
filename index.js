const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const nodemailer = require('nodemailer');

configDatabase = require("./config/datenbankConfig.json");
configDataMailer = require("./Gruppe_1_Registrierung/public/config/config.json");
const configData = configDataMailer;
const config = configDatabase;

// https://youtu.be/OH6Z0dJ_Huk?t=1466

let http = require("http");
let url = require("url");
let mysql = require("mysql");


let transporter = nodemailer.createTransport({
    host: configData.host,
    port: configData.port,

    auth: {
        user: configData.user,
        pass: configData.password,

    }
});

let connection = mysql.createConnection(
    {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
);

var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
const tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year
const fieldsQueryResult = 0;

var {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

let staticOptions = {

}
//imports
app.use(express.static(__dirname));
console.log(__dirname);
app.use(express.static('Gruppe_1_Registrierung/Login_etc_Dziersan/public/Sven_Louis/routes'));
app.use(express.static('Gruppe_1_Registrierung/Login_etc_Dziersan/privat'));

app.use(express.static('images'));
app.use(express.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({
    extended: true
}))

//Configuration Cookies
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

// Redirect to Login if there are no cookies. No Access to the private sites
const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        console.log(request.session.userId + " redirectLogin");
        response.redirect("/login")
    } else {
        next();
    }
};

// Redirect to Home if User is logged in. There is no need to go to the login/registration Site if
// logged in
const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        console.log(request.session.userId + " redirectHome");
        response.redirect("/home");
    } else {
        next()
    }
};

//Every connection with Server this will be executed
app.use((request, respond, next) => {
    const {userId} = request.session;
    if (userId) {
        respond.locals.userId = request.session.userId;
        respond.locals.userName = request.session.userName;
        respond.locals.userAuthorization = request.session.userAuthorization;
    }
    next();
});

router = require("./Gruppe_1_Registrierung/public/routes/routesGET.js");

app.get("/", router);
app.get("/login", router);
app.get("/agb", router);
app.get("/successfullregistration", router);
app.get("/testmailer", router);
app.get("/resetpassword", router);
app.get("/token", router);
app.get("/home", router);
app.get("/admin", router);

routerLogin = require("./Gruppe_1_Registrierung/public/routes/login/routesLogin.js")
app.use(routerLogin);

routerRegister = require("./Gruppe_1_Registrierung/public/routes/register/routesRegister.js")
app.use(routerRegister);



//change to user db later and ADD USER token
app.get("/confirmation", (request, response) => {
    response.sendFile('//Gruppe_1_Registrierung//Login_etc_Dziersan//public//Sven_Louis//confirmEmail.html', {root: __dirname});

    let tokenReset = request.query.opt;
    let email = request.query.email;

    console.log(email);
    if (tokenReset === null ||  tokenReset === undefined
        ||email === null || email === undefined )
    {
        console.log("Error");
        response.redirect("/login");
    }   else {
        let sql = "UPDATE USER SET verified = 1 WHERE confirm_token = '" + tokenReset  +
            "' AND e_mail = '" + email + "';";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            if (result){
                console.log("Erfolgreich");
            }
        });
        response.redirect("/login");
    }
});


//Get without HTML|| email
app.get("/cookie", (request, response) => {
    console.log(request.session)
    response.json(request.session);
});

/*+
    checks for given entry in user with given e-mail  and creates entry in PASSWORT_RESET TOKEN
 */
app.post("/pwforgo.html", (request, response) => {
    let email = request.body.email;
    console.log(email);

    // error message ausgeben
    if(email === null || email === undefined )
    {
        response.redirect("/login");
    } else {

        let checkEntry = "SELECT EXISTS(SELECT * FROM USER WHERE e_mail = '" + email +  "') AS test" + ";";
        console.log(checkEntry);

        connection.query(checkEntry, function (err, result, fields) {
            if(err) throw err;

            // checks if entry exists
            let check = result[0].test;
            console.log(check);
            if (check === 1){


                let startDate = new Date();
                startDate.setHours(startDate.getHours() + 2);
                console.log(startDate);

                //generate endDate and add 1 hour for limited reset
                let endDate = new Date();
                endDate.setHours(startDate.getHours() + 3);
                console.log(endDate);

                let resetToken = Math.random().toString(36).substr(2, 6);
                console.log(resetToken);

                // cuts off unnecessary information
                startDate = startDate.toISOString().slice(0, 19).replace('T', ' ');
                endDate = endDate.toISOString().slice(0, 19).replace('T', ' ');

                // use of gravis for easier insertString
                let insertToken = `INSERT INTO pw_forgot_token(e_mail, start, end, token, used) VALUES ('${email}', 
                    '${startDate}','${endDate}', '${resetToken}', false )`;
                console.log(insertToken);


                connection.query(insertToken, function (err, result) {
                    if(err) throw err;
                    console.log("1 record inserted");
                })
                // hier muss nodemailer noch eingebunden werden
                response.redirect("/login");
            } else
            {
                console.log("Error");
                //response.json({register: "Fehlgeschlagen: Benutzer existiert bereits"});
            }
        })
    }
});

app.post("/changePassword", redirectLogin, (request, response) =>{
    let email = "sven.petersen@hs-osnabrueck.de";
    let newpassword = request.body.password;

    let sql = `UPDATE USER SET password = '${newpassword}' WHERE e_mail = '${email}'; `;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    })

});

app.post("/checkResetToken", (request, response) =>{

    let resetToken = request.body.resetToken;

    if(resetToken == "")
    {
            console.log("test");
        response.redirect("/login");
    }
    else
    {

        let sql =  `SELECT e_mail, used FROM PW_FORGOT_TOKEN 
                     WHERE current_timestamp < end
                     AND current_timestamp > start AND token ='${resetToken}';`;


        connection.query(sql, function (err, result) {
            if(err)
                throw err;

            if (result.length != 0){
                let email = result[0].e_mail;
                let used = result[0].used;

                if (used == 0) {
                    let changeUsed = `UPDATE PW_FORGOT_TOKEN SET used = true WHERE e_mail = '${email}';`;
                    console.log(changeUsed);
                    connection.query(changeUsed, function (err, result) {
                        if (err) throw err;

                        if (result.length != 0){
                            response.redirect("/passwort")
                        }
                    });
                }
            }
        });
    }
});



app.post("/logout",  (request, respond) => {

    request.session.destroy(err => {
        if (err) {
            return respond.redirect("/home");
        }
        respond.clearCookie(sessionName);
        console.log("cookies deleted!")
        respond.redirect("/login");
    })
});

app.post("/sendToken", (request, response) => {

});

// Post Methods
app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");
    }
    next();
});

const routerToken = require("./Gruppe_1_Registrierung/public/routes/token/routesToken");
app.use("/createToken", routerToken);
app.use("/deleteToken", routerToken);



// app.post("/createToken", redirectLogin, (request, response) => {
//
//     console.log(request.body.time);
//     console.log(tokenLifeTime);
//
//     if (request.body.time < tokenLifeTime) {
//
//         connection.query("INSERT INTO TOKEN(START,TIME,END,GENTOKEN, USER) VALUES("
//             + '"' + request.body.start + '",'
//             + request.body.time + ','
//             + '"' + request.body.end + '",'
//             + '"' + request.body.token + '",'
//             + '"' + request.session.userId + '")'),
//             function (err) {
//                 if (err)
//                     throw err;
//                 console.log("Inserted TOKEN")
//             }
//
//         response.json({token: "Freischaltcode wurde erstellt."})
//     } else {
//         response.json({token: "Fehler: Die Dauer vom Freischaltcode ist zu lang gewählt."})
//     }
// });
//
// //Deletes token from Database
// app.post("/deleteToken", redirectLogin, (request, response) => {
//
//     if (request.session.authorization === "admin"){
//         connection.query("SELECT gentoken from token WHERE GENTOKEN = " + '"' + request.body.token + '";',
//             function (err, result) {
//                 if (err)
//                     throw err;
//                 else {
//                     console.log(result.length);
//
//                     if (result.length > 0) {
//                         connection.query("DELETE FROM token WHERE GENTOKEN = " + '"' + request.body.token + '";'),
//                             function (err, result) {
//                                 if (err)
//                                     throw err;
//                             }
//                         response.json({token: "Token gelöscht!"});
//                     } else {
//                         response.json({token: "Token nicht gefunden"});
//                     }
//                 }
//             })
//     } else {
//         response.json({token: "Keine Berechtigung zur Löschung von Freischaltcodes"});
//     }
// });
//

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