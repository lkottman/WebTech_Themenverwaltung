const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("datenbankenConfig.json"));
const app = express();

// https://youtu.be/OH6Z0dJ_Huk?t=1466

let http = require("http");
let url = require("url");
let mysql = require("mysql");

let connection = mysql.createConnection(
    {
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database
    }
);

const lifeTime = 1000 * 60 * 60;// 1 hour
const tokenLifeTime = 60 * 24 * 365 * 10;// 10 year
const fieldsQueryResult = 0;

const {
  PORT = 3000,
  sessionLifetime = lifeTime,
  sessionName = "sid",
  secretSession = "test"
} = process.env;

app.use(express.static(__dirname + '/projekt'));
app.use(express.static(__dirname + '/css'))
app.use(express.static('/js'));
app.use(express.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/RequirementsEditGer", (require, response) => {
  response.sendFile('//Projekt//MainPage.html', {root: __dirname})
});

app.get("/RequirementsEditEng", (require, response) => {
  response.sendFile('//Projekt//MainPageEng.html', {root: __dirname})
});

app.get("/EditReqGer", (require, response) => {
  response.sendFile('//Projekt//EditRequirementGer.html', {root: __dirname})
});

app.get("/EditReqEng", (require, response) => {
  response.sendFile('//Projekt//EditRequirementEng.html', {root: __dirname})
});

app.get("/", (request, response) => {
  response.sendFile('//Projekt//Test.html', {root: __dirname});
});

app.post("/createTable", (request, response) => {

  if(request.method === "OPTIONS"){
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("CREATE TABLE IF NOT EXISTS "+ request.body.tablename +"requirement "
      + "(ID VARCHAR(50), "
      + "Name VARCHAR(50), "
      + "Shortdesc LONGTEXT)",
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Table created");
        }
      });
  response.end();
});

app.post("/saveReqData", (request, response) => {

  if(request.method === "OPTIONS"){
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("INSERT INTO Anforderungen(id,name,shortdesc) VALUES("
      + '"' + request.body.id + '",'
      + '"' + request.body.name + '",'
      + '"' + request.body.shortdesc + '")',
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Requirement created");
        }
      });
  response.end();
});

app.post("/delReqData", (request, response) => {
  if(request.method === "OPTIONS"){
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("DELETE" + " FROM " + "Anforderungen " + "WHERE("
      + 'id="' + request.body.id + '")',
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Requirement deleted");
        }
      });
  response.end();
});

app.post("/loadtable", (request, response) => {

  connection.query("SELECT * FROM ANFORDERUNGEN", function (err, result, fields) {
    if (err)
      throw err;
    else {
      console.log(result);
    }
  })
});

app.post("/editReq", (request, response) => {

  if(request.method === "OPTIONS"){
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("SELECT * FROM ANFORDERUNGEN WHERE("
      + 'id="' + request.body.editID + '")',
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Requirement deleted");
        }
      });
  response.end();
});

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));