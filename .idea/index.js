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
        secure: false //in development
    }
}))

const redirectLogin = (request, response, next) => {
    if (!request.session.userId){
        response.redirect("/")
    } else {
        next()
    }
}

const redirectHome = (request, response, next) => {
    if (request.session.userId){
        response.redirect("/home")
    } else {
        next()
    }
}

app.get("/home", redirectLogin, (request, response)=>{
    console.log(request.session);

    response.sendFile('//privat//home.html', {root: __dirname })
})

app.get("/register", (request, response)=>{
    console.log(request.session);
    response.sendFile('//public//register.html', {root: __dirname })
})

app.post("/login", redirectHome, (request, response) => {

    connection.query("SELECT email, password from user where "
        + 'email = "' + request.body.email + '"'
        + ' AND password = "' + request.body.password + '"',
        function (err, result) {
            if (err)
                throw err;
            else {
                if (result.length == 0) {
                    response.json({
                        status: "false"
                    });
                } else {
                    response.json({
                        status: "true"
                    });
                }
            }
            response.end();
        });
});

app.post("/register",redirectHome, (request, response) => {
    var responsetext = false;

    let servertime = new Date();
    connection.query("SELECT start, end, gentoken FROM TOKEN WHERE " +
        'gentoken = "' + request.body.token + '"',
        function (err, result, fields) {
            if (err)
                throw err
            else {
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
        })
    response.end();
});

app.post("/token", (request, response) => {
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

app.post("/logout"), redirectLogin, (request, respond) =>{

};


app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));