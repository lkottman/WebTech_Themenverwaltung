const express = require('express');
const session = require("express-session");
const app = express();
const router = express.Router()
const connection = require("../../../../getConnectionDatabase");

var lifeTime = 1000 * 60 * 60 * 24;// 24 hour
var lifeTimeLong = 1000 * 60 * 60 * 24 * 365 * 10;  //1 Year
const tokenLifeTime = 60 * 24 * 366;// 10 + 1 day year

var {
    PORT = 3000,
    sessionLifetime = lifeTime,
    sessionName = "sid",
    secretSession = "test"
} = process.env;

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

router.post("/createToken",  (request, response) => {

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
router.post("/deleteToken", (request, response) => {

    console.log(request.session);
    if (request.session.userAuthorization === "admin"){
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
                        response.json({token: "Token gelöscht!"});
                    } else {
                        response.json({token: "Token nicht gefunden."});
                    }
                }
            })
    } else {
        response.json({token: "Keine Berechtigung zur Löschung von Freischaltcodes."});
    }
});


router.get("/getToken", (request, response) => {

    console.log(request.session.userId);

    var userId = request.session.userId;
    var authorization = request.session.userAuthorization;

    var sqlStatementAdmin       = "SELECT start, end, gentoken, user FROM token;";
    var sqlStatementLecturer    = "SELECT start, end, gentoken, user FROM token where user = " + userId + ";";

    console.log(request.session);
    if (authorization === "admin"){
        connection.query(sqlStatementAdmin,
            function (err, result) {
                if (err)
                    console.log(result);
                    response.json(result);
            });
    } else if (authorization === "lecturer"){
        connection.query(sqlStatementLecturer,
            function (err, result) {
                if (err)
                    console.log("result " + result);
                    response.json(result);
            });
    } else {
        response.json({token: "error"});
    }
});


module.exports = router;
