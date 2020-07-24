const fs = require('fs');
const path = require("./config/pathConfig.json");
const mysql = require('mysql');
const config = JSON.parse(fs.readFileSync(path.path + "/config/datenbankConfig.json"));

/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 */

/**
 * Connects to Databse with givin credentials from datenbankConfig.json
 * @returns {Connection}
 */
function getConnection(){

   return  mysql.createConnection(
        {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            multipleStatements: true
        }

    );

};

module.exports = getConnection();