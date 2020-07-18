const fs = require('fs');
const path = require("./pathConfig.json");
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync(path.path + "\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\Sven_Louis\\datenbankConfig.json"));

let connection = mysql.createConnection(
    {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
);

module.exports = connection;