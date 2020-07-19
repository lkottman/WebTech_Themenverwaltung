class Token {
    constructor(start, end, token, time) {
        this.start = start;
        this.time = time;
        this.end = end;
        this.token = token;
    }
}

function createToken() {


    let start = new Date();
    let end = new Date();
    end.setMinutes(start.getMinutes()
        + parseInt(document.getElementById("token").value));
    let genToken = Math.random().toString(36).substr(2, 6);
    let time = parseInt(document.getElementById("token").value);

    start = start.toISOString().slice(0, 19).replace('T', ' ');
    end = end.toISOString().slice(0, 19).replace('T', ' ');

    console.log(start);
console.log(end);

    token = new Token(start, end, genToken, time);

    document.getElementById("demo").innerHTML = start;
    document.getElementById("demo1").innerHTML = end;
    document.getElementById("demo2").innerHTML = genToken;
    document.getElementById("demo3").innerHTML = JSON.stringify(token);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(token)
    }

    fetch('/createToken', options)
        .then(response => response.json())
        .then(data => {

            alert(data.token)

        })
        .catch(error => console.error(error));
}

function deleteToken() {

    let tokenDelete = document.getElementById("deleteToken").value;

    token = new Token(0, 0, tokenDelete, 0);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(token)
    }

    fetch('/deleteToken', options)
        .then(response => response.json())
        .then(data => {

            alert(data.token);
            

        })
        .catch(error => console.error(error))
}

function validate(evt) {
    var theEvent = evt || window.event;

    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
