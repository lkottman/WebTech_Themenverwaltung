const http = require("http");
const mysql = require("mysql");
const fs = require('fs');
const config = JSON.parse(fs.readdirSync(/../))

console.log('verbindungsaufbau');

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password",
    database: "testdb"
});

con.connect(function (err) {
    if(err) throw err;
    console.log('Connected!');
});