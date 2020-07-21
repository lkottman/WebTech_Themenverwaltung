function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


class UserToVerify {

    constructor(email, token) {

        this.email = email;
        this.token = token;
    }

    getUserToVerify(){
        let email = getUrlParameter("email");
        let token    = getUrlParameter("opt");
        return new UserToVerify(email, token);
    }
}



async function sendUserDataToConfirm() {
    var user = new UserToVerify().getUserToVerify();
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };


    fetch('/verify', options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
};
