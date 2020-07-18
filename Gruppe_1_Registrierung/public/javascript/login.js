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

            console.log(data.login);
            alert(data.login)

        })
        .catch(error => console.error(error))
}
