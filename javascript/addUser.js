class UserToAdd {
    constructor(name, surname,email, password, authorization, course, verified, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.authorization = authorization;

    }

    getSelectedUser(){
        let name    =  document.getElementById("vorname").value;
        let surname =  document.getElementById("nachname").value;
        let e_mail  =  document.getElementById("email").value;
        let role     = document.getElementById("role").value;
        let password = document.getElementById("password").value;


        console.log(name);
        console.log(surname);
        console.log(e_mail);
        console.log(role);
        console.log(password);

        return new UserToAdd( name, surname, e_mail, password, role);

    }
}
/**
 * @method
 * This function creates a new instance of the UserToUpdate class and parse the data into a JSON file.
 * Then the fetch /addUser is called and the JSON file is written to the database.
 */
function sendAddUser(){
    let user = new UserToAdd().getSelectedUser();
    console.log(user);
    console.log(JSON.stringify(user))


    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    fetch('/addUser', options)
        .then(response => response.json())

}

/**
 * @method
 * Manipulates the background color of the input field if the second password doesnt match
 */
function checkPassword() {
    let password = document.getElementById("password").value;
    let password1 = document.getElementById("passwordConf").value;

    passwordBackground = document.getElementById("passwordConf");

    if (password != password1 || password.length > 255) {
        passwordBackground.style.borderColor = "red";
        passwordBackground.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px red";
        passwordBackground.style.outline = "none";
        return false;
    } else {
        passwordBackground.style.borderColor = "rgba(126, 239, 104, 0.8)";
        passwordBackground.style.boxShadow = "0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(126, 239, 104, 0.8)";
        passwordBackground.style.outline = "none";
        return true;
    }
}