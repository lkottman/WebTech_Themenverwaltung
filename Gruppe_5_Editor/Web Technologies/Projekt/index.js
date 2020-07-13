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

app.use(express.static('CSS'));
app.use(express.static('JS'));
app.use(express.json({limit: "1mb"}));
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/req", (require, response) => {
  response.sendFile('//MainPageGer.html', {root: __dirname})
});

app.get("/", (request, response) => {
  response.sendFile('//MainPageGer.html', {root: __dirname});
});

app.listen(PORT, () => console.log(
    "listening on: " +
    `http://localhost:${PORT}`
));