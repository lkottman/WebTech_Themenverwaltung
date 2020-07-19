const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

class UserToAuthenticate {

    constructor(email, token) {
        this.email = email;
        this.token = token;
    }

    getUserToUpdate(){
        let email = urlParams.get('email');
        let token    = urlParams.get('opt');
        return new UserToAuthenticate( email, token);
    }
}


function sendData() {
    var userToVerify = new UserToAuthenticate().getUserToUpdate();
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userToVerify)
    };


    fetch("/verify", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
};




