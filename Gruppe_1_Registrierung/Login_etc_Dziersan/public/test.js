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

const {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "testt"
} = process.env

app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({
    extended: true
}))

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

const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        console.log(request.session.userId + " redirectLogin");
        response.redirect("/login")
    } else {
        next();
    }
}

const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        console.log(request.session.userId + " redirectHome");
        response.redirect("/home");
    } else {
        next()
    }
}
app.use((request, respond, next) => {
    const {userId} = request.session;
    if (userId) {
        respond.locals.userId = request.session.userId;
        respond.locals.userName = request.session.userName;
        console.log("app.use " + respond.locals.userId + " " + respond.locals.userName);

    }
    next();
})

app.get("/home", redirectLogin, (request, response) => {
    console.log("home");
    response.sendFile('//privat//home.html', {root: __dirname});
})

app.get("/register", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile('//public//register.html', {root: __dirname});
    }
})

app.get("/token", (request, response) => {
    if (request.session.userId) {
        response.sendFile('//privat//token.html', {root: __dirname});
    } else {
        response.redirect("/login");
    }
})

app.get("/login", (request, response) => {
    if (request.session.userId) {
        response.redirect("/home");
    } else {
        response.sendFile('//public//index.html', {root: __dirname});
    }
})

app.get("/", (request, response) => {
    response.sendFile('//public//index.html', {root: __dirname});
})

app.post("/index.html", redirectLogin, (request, response, next) => {
    if (request.session.userId) {
        response.redirect("/home");
    }
    next();
    console.log("index");
})

app.post("/login", redirectHome, (request, response) => {

    connection.query("SELECT id, name,verified, token, email, password from user where "
        + 'email = "' + request.body.email + '"'
        + ' AND password = "' + request.body.password + '"',
        function (err, result) {
            if (err)
                throw err;
            else {
                if (result.length == 0) {
                    console.log("login fehlgeschlafen (Falsche Daten oder nicht registriert)");
                    // response.json({
                    //     status: "false"
                    // });
                } else {
                    if (result[0].verified == false) {
                        console.log("login fehlgeschlafen (nicht verifiziert)");
                        // response.json({
                        //     status: "false"
                        // });
                    } else {
                        console.log("login erfolgreich");
                        request.session.userId = result[0].id;
                        request.session.userName = result[0].name;
                        // response.json({
                        //     status: "true"
                        // });
                    }
                }
            }
            response.redirect("/home");
            // response.end();
        });
});

app.post("/register", redirectHome, (request, response) => {
    var responsetext = false;

    let servertime = new Date();
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
                            function (err, result, fields) {
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
                                            + request.body.verified + ')'),
                                            function (err, result) {
                                                if (err)
                                                    throw err;
                                            }
                                        console.log("User created");
                                        responsetext = true;
                                    } else {
                                        console.log("User already exists");
                                        responsetext = false;
                                    }

                                }
                            })

                    } else {
                        console.log("Token is expired");
                        responsetext = false;
                    }
                }
            }
        })
    response.redirect("/login");
    // response.end();
});

app.post("/token", redirectLogin, (request, response) => {
    console.log(request.body);
    connection.query("INSERT INTO TOKEN(START,TIME,END,GENTOKEN) VALUES("
        + '"' + request.body.start + '",'
        + request.body.time + ','
        + '"' + request.body.end + '",'
        + '"' + request.body.token + '")'),
        function (err, result) {
            if (err)
                throw err;
            console.log("Inserted TOKEN")
        }
    response.end();
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