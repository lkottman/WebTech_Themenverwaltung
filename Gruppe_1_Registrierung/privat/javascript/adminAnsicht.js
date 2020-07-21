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
    constructor(name, surname,email, password, authorization, course, verified, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.authorization = authorization;
        this.course = course;
        this.verified = verified;
        this.id = id;
    }

     getSelectedUser(){
         let name    =  document.getElementById("vorname").value;
        let surname =  document.getElementById("nachname").value;
        let e_mail  =  document.getElementById("e-Mail").value;
        let role     = document.getElementById("rolle").value;
         let course   = document.getElementById("studiengang").value;
        let password = document.getElementById("password").value;
         let verified   = document.getElementById("verified").value;
         let userID   = document.getElementById("userID").value;

         console.log(name);
         console.log(surname);
         console.log(e_mail);
         console.log(role);
         console.log(course);
         console.log(password);
         console.log(verified);
         console.log(userID);

        return new UserToUpdate( name, surname, e_mail, password, role,course, verified, userID );

    }
}

function sendData(){
    let user = new UserToUpdate().getSelectedUser();
    console.log(user);
    console.log(JSON.stringify(user))


    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    fetch('/changeUser', options)
            .then(response => response.json())
        .then(data => {

            if (data.login === "success"){
                alert("Geht!");
            } else {
                alert("Nope");
            }
        })
}






