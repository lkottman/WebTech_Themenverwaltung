/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 * @class Client side from login
 */


/**
 * @method
 * Gets information from input fields, creates an object and POST it to /login
 */
function login() {

    class LoginUser {

        constructor(email, password, checkboxLogin) {
            this.email = email;
            this.password = password;
            this.checkboxLogin = checkboxLogin;
        }
    }

    var checkBox = document.getElementById("saveLogin");

    if (checkBox.checked === true){
        var checked = true;
    } else {
        var checked = false;
    }

    user = new LoginUser(
        document.getElementById("email").value,
        document.getElementById("password").value,
        checked);


    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    fetch('/login', options)
        .then(response => response.json())
        .then(data => {

            if (data.login === "success"){
                window.location.replace("/home");
            } else {
                alert(data.register);
                location.reload();
            }
            // alert(data.login)

        })
        .catch(error => console.error(error))
}
