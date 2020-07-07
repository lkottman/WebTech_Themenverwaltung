function register() {

    class Person {
        constructor(token, name, surname, email, password, verified) {
            this.token = token;
            this.name = name;
            this.surname = surname;
            this.email = email;
            this.password = password;
            this.verified = verified;
        }

        toString() {
            return this.token + " " + this.name + " " + this.surname + " " + this.email + " " + this.password;
        }
    }

    person = new Person(document.getElementById("token").value,
        document.getElementById("name").value,
        document.getElementById("surname").value,
        document.getElementById("email").value,
        document.getElementById("password").value,
        false
    );

//TODO Serverseitig abprüfen
    if (validateEmail(document.getElementById("email").value) == true
        && checkPasswords() == true
        && document.getElementById("checkAgb").checked == true) {
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(person)
        }

        fetch("/register", options)
            .then(response => response.json())
            .then(data => {
                alert(data.register);
            });
    } else {
        alert("Nur E-Mail Adressen mit der Endung '@hs-osnabrueck.de' sind zugelassen.")
    }
}

function checkPasswordRequirements() {
    let strengh = 0;
    var strenghbar = document.getElementById("strengh");
    let password = document.getElementById("password").value;
    let password1 = document.getElementById("password1").value;

    if (password.match(/[!§@§%&()=?`²³{[]}\<>|]/)) ;
    {
        strengh += 1;
    }
    if (password.match(/[a-z]/)) {
        strengh += 1;
    }
    if (password.match(/[0-9]/)) {
        strengh += 1;
    }
    if (password.match(/[A-Z]/)) {
        strengh += 1;
    }
    if (password.length >= 8) {
        strengh += 1;
    }
    switch (strengh) {
        case 0:
            strenghbar.value = 0;
            break
        case 1:
            strenghbar.value = 20;
            break
        case 2:
            strenghbar.value = 40;
            break
        case 3:
            strenghbar.value = 60;
            break
        case 4:
            strenghbar.value = 80;
            break
        case 5:
            strenghbar.value = 100;
            break
    }

}

function checkPasswords() {
    let password = document.getElementById("password").value;
    let password1 = document.getElementById("password1").value;

    passwordBackground = document.getElementById("password1");

    if (password != password1 || password.length > 255) {
        passwordBackground.style.background = "red";
        return false;
    } else {
        passwordBackground.style.background = "";
        return true;
    }
}


function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}