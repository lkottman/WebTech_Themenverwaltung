/**
 * Version 1.0
 * 24.07.2020
 * AUTHOR: Louis Kottmann
 */

let cookieID = ""
fetch('/cookie')
    .then(response => response.json())
    .then(data => {
     cookieID = data.userId
        console.log(data.userId);
    })
    .catch(error => console.error(error))



    fetch('/getOneUser')

        .then(response => response.json())
        .then(data => {


            document.getElementById("vorname").value = data[0].name;
            document.getElementById("nachname").value = data[0].surname;
            document.getElementById("e-Mail").value = data[0].e_mail;
            document.getElementById("studiengang").value = data[0].course;
            document.getElementById("password").value = data[0].password;
            document.getElementById("semester").value = data[0].semester;


            console.log(data);

        })
        .catch(error => console.error(error))

/**
 * @method
 * This function changes the attribute of the input fields to readonly, so that it is possible to write to the fields.
 */
function changeReadonly() {
    document.getElementById('vorname').removeAttribute('readonly');
    document.getElementById('nachname').removeAttribute('readonly');
    document.getElementById('semester').removeAttribute('readonly');
    document.getElementById('password').removeAttribute('readonly');
    document.getElementById('password').type = 'text';
    document.getElementById('e-Mail').removeAttribute('readonly');
    document.getElementById("studiengang").removeAttribute("disabled");
}

/**
 * @method
 * This function changes the attribute of the input fields to readonly, so that it is no longer possible to write into the fields.
 */
function addReadonly() {
    document.getElementById("vorname").setAttribute("readOnly", 'true');
    document.getElementById("nachname").setAttribute("readOnly", 'true');
    document.getElementById("semester").setAttribute("readOnly", 'true');
    document.getElementById("password").setAttribute("readOnly", 'true');
    document.getElementById('password').type = 'password';
    document.getElementById("e-Mail").setAttribute("readOnly", 'true');
    document.getElementById("studiengang").setAttribute("disabled", "disabled");
}

/**
 * @method
 * This function opens an alert window, if confirmed, an instance of the class UserToUpdate is created.
 * The data is parsed into a JSON file. Afterwards the fetch /deleteUser is called and all data of the user is deleted from the database.
 * If it is rejected, the window closes and the function ends.
 */
function deleteMyUserMessage() {
    if(confirm("ACHTUNG!\nSie sind dabei Ihren Account zu löschen!")){


        let user = new UserToUpdate().getSelectUser();
        console.log(user);
        console.log("t_: "+JSON.stringify(user))


        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        };

        fetch('/deleteUser', options)
            .then(response => response.json())
            .then(data => {
            })



        fetch('/logout', options)
            .then(response => response.json())
            .then(data => {

            })

    }
}


class UserToUpdate {
    constructor(name, surname,email, password, course, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.course = course;
        this.id = id;
    }

    getSelectUser(){
        let name    =  document.getElementById("vorname").value;
        let surname =  document.getElementById("nachname").value;
        let e_mail  =  document.getElementById("e-Mail").value;
        let password = document.getElementById("password").value;
        let course   = document.getElementById("studiengang").value;
        let id = cookieID

        console.log(name);
        console.log(surname);
        console.log(e_mail);
        console.log(course);
        console.log(password);
        console.log(cookieID)

        return new UserToUpdate( name, surname, e_mail, password,course,id);

    }
}

/**
 * @method
 * This function creates a new instance of the UserToUpdate class and parse the data into a JSON file.
 * Then the fetch /changeMyUser is called and the JSON file is written to the database.
 */
function sendMyData(){
    let user = new UserToUpdate().getSelectUser();
console.log(JSON.stringify(user))

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };

    fetch('/changeMyUser', options)
        .then(response => response.json())
        .then(data => {
        })
}