function login(){

    class LoginUser{

        constructor(email, password) {
            this.email = email;
            this.password = password;

        }
    }

    user = new LoginUser(
        document.getElementById("email").value,
        document.getElementById("password").value)

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    }

    fetch('/login', options)
        .then(response => response.json())
        .then(data => {

            console.log(data.login)
            alert(data.login)
            // document.getElementById("info").innerHTML = data.login;

        })
        .catch(error => console.error(error))

}
