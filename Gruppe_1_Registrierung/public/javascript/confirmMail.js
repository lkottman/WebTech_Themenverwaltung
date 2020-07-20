class UserToVerify {

    constructor(email, token) {

        this.email = email;
        this.token = token;
    }

    getUserToVerify(){
        let email = getQueryParams("email");
        let token    = getQueryParams("opt");
        return new UserToVerify(email, token);
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
}


function sendUserDataToConfirm() {
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
