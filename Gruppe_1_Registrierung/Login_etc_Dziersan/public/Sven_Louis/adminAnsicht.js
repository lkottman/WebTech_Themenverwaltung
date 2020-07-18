const connection = require('../../../.././getConnectionDatabase.js');



function getUsers(){

}



let sql = "SELECT name, surname, e_mail, password, course, authorization FROM USER;";
connection.query(sql,
    function (err, result)
    {
        if (err)
            throw err;
        console.log("succes");
    });


function changeFieldStatus(input) {
    var textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}