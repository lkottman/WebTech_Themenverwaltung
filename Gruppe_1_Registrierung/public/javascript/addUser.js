class UserToAdd {
    // id?
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
        let e_mail  =  document.getElementById("e-Mail").value;
        let role     = document.getElementById("rolle").value;
        let course   = document.getElementById("studiengang").value;
        let password = document.getElementById("password").value;


        console.log(name);
        console.log(surname);
        console.log(e_mail);
        console.log(role);
        console.log(password);

        return new UserToUpdate( name, surname, e_mail, password, role);

    }
}

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