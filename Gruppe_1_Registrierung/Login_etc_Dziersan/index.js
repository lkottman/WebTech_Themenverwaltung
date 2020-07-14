const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("public/datenbankConfig.json"));
const app = express();

// https://youtu.be/OH6Z0dJ_Huk?t=1466

let http = require("http");
let url = require("url");
let mysql = require("mysql");


const configData = JSON.parse(fs.readFileSync("public/Sven_Louis/config.json"));

const nodemailer = require('nodemailer');

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

//imports
app.use(express.static('public'));
app.use(express.static('Sven_Louis'));
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
}))

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
        console.log("app.use " + respond.locals.userId + " " + respond.locals.userName + " "
            + respond.locals.userAuthorization);
    }
    next();
});

// Get Methods
app.get("/home", redirectLogin, (request, response) => {
    console.log("home");
    response.sendFile('//privat//home.html', {root: __dirname});
});

app.get("/register", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile('//public//register.html', {root: __dirname});
    }
});

app.get("/token", (request, response) => {
    if (request.session.userAuthorization === "lecturer"
        || request.session.userAuthorization === "admin") {
        response.sendFile('//privat//token.html', {root: __dirname});
    } else {
        response.redirect("/login");
    }
});

app.get("/login", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile('//public//login.html', {root: __dirname});
    }
});

app.get("/", (request, response) => {
    response.sendFile('//public//index.html', {root: __dirname});
});

app.get("/agb", (request, response) => {
    response.sendFile('//public//agb.html', {root: __dirname});
});

app.get("/successfullregistration", (request, response) => {
    response.sendFile('//public//successRegister.html', {root: __dirname});
});


app.get("/testmailer", (request, response) => {
    response.sendFile('//public//testmailer.html', {root: __dirname});
});

app.get("/resetpassword", (request, response) => {
    response.sendFile('//public//Sven_Louis//tokenReset.html', {root: __dirname});
});

app.get("/changepassword", (request, response) => {
    response.sendFile('//public//Sven_Louis//changePassword.html', {root: __dirname});
});

//change to user db later and ADD USER token
app.get("/confirmation", (request, response) => {
    response.sendFile('//public//Sven_Louis//confirmEmail.html', {root: __dirname});

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

app.post("/sendToken", (request, response) => {



});

// Post Methods
app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");

    }
    next();
    console.log("index");
});

//Takes E-Mail and password from User and check if these matches if database
app.post("/login", redirectHome, (request, response) => {

    console.log(request.body.checkbox);

    connection.query("SELECT id, name,verified, token, e_mail, password, authorization from user where "
        + 'e_mail = "' + request.body.email + '"'
        + ' AND password = "' + request.body.password + '"',
        function (err, result) {
            if (err)
                throw err;
            else {
                if (result.length == 0) {
                    //If there is no match login failed
                    console.log("login fehlgeschlafen (Falsche Daten oder nicht registriert)");
                    response.json({login: "Fehlgeschlagen: Falsche Informationen oder nicht registriert"});

                } else {
                    //Check if User is verified
                    if (result[0].verified == false) {
                        console.log("login fehlgeschlafen (nicht verifiziert)");
                        response.json({login: "Fehlgeschlagen: Nicht Verifiziert"});
                    } else {
                        console.log("login erfolgreich");

                        if(request.body.checkboxLogin == true){
                            request.session.cookie.maxAge = lifeTimeLong;
                        }

                        request.session.userId = result[0].id;
                        request.session.userName = result[0].name;
                        request.session.userAuthorization = result[0].authorization;
                        response.redirect("/home");
                    }
                }
            }
        });
});

//Takes information from form and creates user
app.post("/register", redirectHome, (request, response) => {

    if(request.method == "OPTIONS"){
        response.set('Access-Control-Allow-Origin', '*');
        response.set('Access-Control-Allow-Headers', 'Content-Type');
        response.status(204).send('');
    }

    console.log("Test " + request.body.token);

    let servertime = new Date();
    let randomtoken = Math.random().toString(36).substr(2, 6);

    //Check if used token is valid
    connection.query("SELECT * FROM TOKEN WHERE " +
        'gentoken = "' + request.body.token + '"',
        function (err, result, fields) {
            if (err)
                throw err;
            else {
                console.log(result);
                console.log(result.length);

                if (result.length !== 0) {
                    console.log("Token gefunden");
                    let startTime = result[0].start;
                    let endTime = result[0].end;
                    let token = result[0].gentoken;
                    let clientToken = request.body.token;

                    if (token === clientToken
                        && servertime >= startTime
                        && servertime <= endTime) {
                        connection.query("SELECT * FROM USER WHERE " + 'e_mail = "'
                            + request.body.email + '"',
                            function (err, result) {
                                if (err) {
                                    throw err;
                                } else {
                                    if (result.length === 0) {
                                        connection.query("INSERT INTO USER(token,name,surname,"
                                            + "e_mail,password,confirm_token ,verified, authorization) VALUES("
                                            + '"' + request.body.token + '",'
                                            + '"' + request.body.name + '",'
                                            + '"' + request.body.surname + '",'
                                            + '"' + request.body.email + '",'
                                            + '"' + request.body.password + '",'
                                            + '"' + randomtoken + '",'
                                            + '' + "false" + ','
                                            + '"student"' + ')',
                                            function (err) {
                                                if (err)
                                                    throw err;
                                                else {
                                                    console.log("User created");
                                                }
                                            });
                                    } else {
                                        response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
                                    }
                                }
                            });
                    } else {
                        response.json({register: "Freischaltcode ist abgelaufen."});
                    }
                } else {
                    response.json({register: "Freischaltcode existiert nicht."});
                }
            }
        });
});


app.post("/createToken", redirectLogin, (request, response) => {

    console.log(request.body.time);
    console.log(tokenLifeTime);

    if (request.body.time < tokenLifeTime) {

        connection.query("INSERT INTO TOKEN(START,TIME,END,GENTOKEN, USER) VALUES("
            + '"' + request.body.start + '",'
            + request.body.time + ','
            + '"' + request.body.end + '",'
            + '"' + request.body.token + '",'
            + '"' + request.session.userId + '")'),
            function (err) {
                if (err)
                    throw err;
                console.log("Inserted TOKEN")
            }

        response.json({token: "Freischaltcode wurde erstellt."})
    } else {
        response.json({token: "Fehler: Die Dauer vom Freischaltcode ist zu lang gewählt."})
    }
});

//Deletes token from Database
app.post("/deleteToken", redirectLogin, (request, response) => {

    console.log(request.body.token);

    connection.query("SELECT gentoken from token WHERE GENTOKEN = " + '"' + request.body.token + '";',
        function (err, result) {
            if (err)
                throw err;
            else {
                console.log(result.length);

                if (result.length > 0) {
                    connection.query("DELETE FROM token WHERE GENTOKEN = " + '"' + request.body.token + '";'),
                        function (err, result) {
                            if (err)
                                throw err;
                        }
                    console.log("token deleted")
                    response.json({token: "Token gelöscht!"});
                } else {
                    response.json({token: "Token nicht gefunden"});
                    console.log("token not found")
                }
            }
        })
});

app.post("/logout", redirectLogin, (request, respond) => {

    request.session.destroy(err => {
        if (err) {
            return respond.redirect("/home");
        }
        respond.clearCookie(sessionName);
        console.log("cookies deleted!")
        respond.redirect("/login");
    })
});



app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));