const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
class UserToUpdate {

    constructor(email, token, password) {

        this.email = email;
        this.token = token;
        this.password = password;
    }

    getUserToUpdate(){
        let email = urlParams.get('email');
        let token    = urlParams.get('opt');
        let password  =  document.getElementById("password").value;
        return new UserToUpdate( email, token, password);
    }
}


function sendData() {
    var user = new UserToUpdate().getUserToUpdate();
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };


    fetch('/updatePassword', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
 };






