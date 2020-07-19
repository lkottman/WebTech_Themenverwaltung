//const connection = require('../../../getConnectionDatabase.js');



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

class UserToUpdate {
    // id?
    constructor(name, surname,email, password, authorization, course) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.password = authorization;
        this.course = course;
    }

     getSelectedUser(){
        let surname =  document.getElementById("vorname").value;
        let name    =  document.getElementById("nachname").value;
        let e_mail  =  document.getElementById("e-Mail").value;
        let course   = document.getElementById("studiengang").value;
        let role     = document.getElementById("rolle").value;
        let password = document.getElementById("password").value;
        return new UserToUpdate( name, surname, e_mail, course, role, password);
    }
}

function sendData(){


    let user = new UserToUpdate().getSelectedUser();
    console.log(user);
}

function getUser() {
    fetch('/getUser').then(response => {
        return response.json();
    }).then(responseData => {
        console.log(responseData);
    });
};




