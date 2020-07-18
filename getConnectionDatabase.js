const fs = require('fs');
const path = require("./config/pathConfig.json");
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));

let connection = mysql.createConnection(
    {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
);

module.exports = connection;