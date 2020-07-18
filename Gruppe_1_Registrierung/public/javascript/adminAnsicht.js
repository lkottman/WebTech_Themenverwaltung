const connection = require('../../../getConnectionDatabase.js');

function getUsers(){
    let sql = "SELECT name, surname, e_mail, password, course, authorization FROM USER;";
    connection.query(sql,
        function (err, result)
        {
            if (err)
                throw err;

            console.log(result);
        });
};


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


function changeFieldStatus(input) {
    let textarea = document.getElementById(input);
    textarea.readOnly = !textarea.readOnly;
}

function changeSelectStatus(input) {
    let dropDown = document.getElementById(input);
    dropDown.disabled = !dropDown.disabled;
}

function changeVisibility(input) {
    let passwordText = document.getElementById(input);
    if (passwordText.type === "password"){
        passwordText.type = "text";
    } else {
        passwordText.type = "password";
    }
}

function executeQuery(){

}

 fetch()

