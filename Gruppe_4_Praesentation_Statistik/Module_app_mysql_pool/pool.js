const con = require('mysql');

var pool  = con.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user: "root",
    password: "root",
    database: "webtech"
});

module.exports = pool;