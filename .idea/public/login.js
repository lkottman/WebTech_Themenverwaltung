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
    window.location.replace("http://www.w3schools.com");
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    }

    fetch("/login", options).then(response => {

    });


}