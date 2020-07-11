var mysql = require('mysql');

function getConnection() {
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "petersen",
        database: "webtech",
    });
    return connection;
}


/**
 *
 * @param id user to change data
 * @param columnName to update
 * @param entryChange new information
 */
function updateEntry(id, columnName ,entryChange){
    let con = getConnection();
    con.connect(function(err) {
        if (err) throw err;
        var sqlStatment = "UPDATE Student SET " + columnName  + " = " + entryChange +" WHERE = " + id +";";
        con.query(sqlStatment, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    });
}
function getStudentEntries() {

}