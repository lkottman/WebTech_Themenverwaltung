const connection = require('../../../.././getConnectionDatabase.js');



function getUsers(){
    let sql = "SELECT name, surname, e_mail, password, course, authorization FROM USER;";
    connection.query(sql,
        function (err, result)
        {
            if (err)
                throw err;

            console.log("succes");
        });
}


function changeFieldStatus(input) {
    var textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeEntries() {
    let sql = "UPDATE USER SET name = '', surname = '', e_mail = '', password ='', course='', authorization='' " +
        "WHERE e_mail = ''";
    connection.query(sql,
        function (err, result) {
            if (err) throw err;
            if (result)
                console.log("Erfolgreich")
        })
}