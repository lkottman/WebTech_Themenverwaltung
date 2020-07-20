function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


class UserToUpdate {

    constructor(email, token, password) {

        this.email = email;
        this.token = token;
        this.password = password;
    }

    getUserToUpdate(){
        let email = getUrlParameter("email");
        let token    = getUrlParameter("opt");
        let password  =  document.getElementById("password").value;
        return new UserToUpdate( email, token, password);
    }
}




async function sendData() {
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






