/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 * @class client side from token
 */

const tokenMaxLife = 5256000; //10 Years


class Token {
    constructor(start, end, token, time) {
        this.start = start;
        this.time = time;
        this.end = end;
        this.token = token;
    }
}

/**
 * @method
 * Creates token object from input field, brings the data in the right format and uses
 * postCreateToken
 */
function createToken() {


    let start = new Date();
    let end = new Date();

    let tokenTime = document.getElementById("token").value;

    if (tokenTime === ""){
        tokenTime = 0
    }

    end.setMinutes(start.getMinutes()
        + parseInt(tokenTime));
    let genToken = Math.random().toString(36).substr(2, 6);
    let time = parseInt(document.getElementById("token").value);

    start = start.toISOString().slice(0, 19).replace('T', ' ');
    end = end.toISOString().slice(0, 19).replace('T', ' ');



    token = new Token(start, end, genToken, time);

    postCreateToken(token);
}

/**
 * @method
 * Gets information from input field and send an POST delete request to /deleteToken
 */
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


/**
 * @method
 * Creates token object from datetime-local fields, brings the data in the right format and
 * uses postCreateToken
 */
function createTokenCalender(){
    startCalender = document.getElementById("startCalender").value;
    endCalender = document.getElementById("endCalender").value;

    let genToken = Math.random().toString(36).substr(2, 6);

    var testDate = new Date(startCalender);
    var testDate1 = new Date(endCalender);
    var time = diffMinutes(testDate, testDate1)

    let token = new Token(startCalender, endCalender, genToken, time );

    if(startCalender === ""
    || endCalender === ""){
        alert("Token konnte nicht erstellt werden");
    } else {
        postCreateToken(token);
    }

    document.getElementById("demo").innerHTML = startCalender;
    document.getElementById("demo1").innerHTML = endCalender;
    document.getElementById("demo2").innerHTML = genToken;
    document.getElementById("demo3").innerHTML = JSON.stringify(token);

}

/**
 * @method
 *  POSTs givin token to /createToken
 * @param token
 */
function postCreateToken(token){

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


/**
 * @method
 * Onkeypress event to avoid any chars instead of numbers
 * @param evt
 */
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


window.onload = function() {
    setMaxDate();
};

/**
 * @method
 * Limit the datetime-locals to a maximum of 10 years
 */
function setMaxDate(){
    var maxDate = new Date();
    maxDate.setMinutes(maxDate.getMinutes()
        + parseInt(tokenMaxLife));

    var month = maxDate.getUTCMonth() + 1;
    var day = maxDate.getUTCDate();
    var year = maxDate.getUTCFullYear();

    if(month < 10){
        month = "0" + month;
    }

    maxDate = year + "-" + month + "-" + day;
    document.getElementById("endCalender").max = maxDate + "T23:59";
    document.getElementById("startCalender").max = maxDate + "T23:59";
}


function diffMinutes(dt2, dt1)
{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

/**
 * @method
 * Gets token
 */
function getToken(){

    fetch('/getToken')
        .then(response => response.json())
        .then(data => {

            if (data.token === "error"){
                alert("Es konnte nichts gefunden werden.")
            } else {
                console.log(data)
            }
        })
        .catch(error => console.error(error))
}

