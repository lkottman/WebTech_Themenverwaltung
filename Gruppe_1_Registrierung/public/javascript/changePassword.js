
class UserToUpdate {

    constructor(email, token, password) {

        this.email = email;
        this.token = token;
        this.password = password;
    }

    getUserToUpdate(){
        let email = getQueryParams("email");
        let token    = getQueryParams("opt");
        let password  =  document.getElementById("password").value;
        return new UserToUpdate( email, token, password);
    }
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
};



function sendData() {
    var user = new UserToUpdate().getUserToUpdate();
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };


    fetch("/updatePassword", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
 }






