const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();

// https://youtu.be/OH6Z0dJ_Huk?t=1466

let http = require("http");
let url = require("url");
let mysql = require("mysql");

let connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "maria",
        database: "webtech"
    }
);

const lifeTime = 1000 * 60 * 60 // 1 hour
const tokenLifeTime = 60 * 24 * 365 * 10 // 10 year
const fieldsQueryResult = 0;

const {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env

//imports
app.use(express.static('public'));
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

app.get("/successfullregistration", (request, response) => {
    response.sendFile('//public//successRegister.html', {root: __dirname});
});

app.get("/testmailer", (request, response) => {
    response.sendFile('//public//testmailer.html', {root: __dirname});
});

//Get without HTML
app.get("/cookie", (request, response) => {
    console.log(request.session)
    response.json(request.session);
});

// Post Methods
app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");
    }
    next();
    console.log("index");
});

//Takes E-Mail and passord from User and check if these matches if database
app.post("/login", redirectHome, (request, response) => {

    connection.query("SELECT id, name,verified, token, email, password, authorization from user where "
        + 'email = "' + request.body.email + '"'
        + ' AND password = "' + request.body.password + '"',
        function (err, result) {
            if (err)
                throw err;
            else {
                if (result.length == 0) {
                    //If there is no match login failed
                    console.log("login fehlgeschlafen (Falsche Daten oder nicht registriert)");
                    response.send({login: "Fehlgeschlagen: Falsche Informationen oder nicht registriert"});

                } else {
                    //Check if User is verified
                    if (result[0].verified == false) {
                        console.log("login fehlgeschlafen (nicht verifiziert)");
                        response.json({login: "Fehlgeschlagen: Nicht Verifiziert"});
                    } else {
                        console.log("login erfolgreich");
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

    let servertime = new Date();

    //Check if used token is valid
    connection.query("SELECT start, end, gentoken FROM TOKEN WHERE " +
        'gentoken = "' + request.body.token + '"',
        function (err, result, fields) {
            if (err)
                throw err
            else {
                if (result.length == 0) {
                    console.log(result);
                } else {
                    let startTime = result[0].start;
                    let endTime = result[0].end;
                    let token = result[0].gentoken;
                    let clientToken = request.body.token;

                    if (token == clientToken
                        && servertime >= startTime
                        && servertime <= endTime) {
                        connection.query("SELECT * FROM USER WHERE " + 'email = "'
                            + request.body.email + '"',
                            function (err, result) {
                                if (err) {
                                    throw err
                                } else {
                                    if (result.length == 0) {
                                        connection.query("INSERT INTO USER(TOKEN,NAME,SURNAME,"
                                            + "EMAIL,PASSWORD,VERIFIED) VALUES("
                                            + '"' + request.body.token + '",'
                                            + '"' + request.body.name + '",'
                                            + '"' + request.body.surname + '",'
                                            + '"' + request.body.email + '",'
                                            + '"' + request.body.password + '",'
                                            + request.body.verified + ')',
                                            function (err) {
                                                if (err)
                                                    throw err;
                                                else {
                                                    console.log("User created");

                                                }
                                            })
                                    } else {
                                        console.log("User already exists");
                                        response.json({register: "Fehlgeschlagen: Benutzer existiert bereits"});
                                    }
                                }
                            })
                    } else {
                        console.log("Token is expired");
                        response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
                    }
                }
            }
        })
    response.redirect("/successfullregistration");
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
                console.log(result.length)

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