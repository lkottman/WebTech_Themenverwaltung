const mysql = require('mysql');
const fs = require('fs');
const databaseConfig = JSON.parse(fs.readFileSync("datenbankConfig.json"));

var connection = mysql.createConnection(
    {
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.database
    })

connection.connect();

connection.query('SELECT * FROM Student', function (err, rows, fields) {
    if (err) throw err
    console.log("Succes: ", rows)

})

