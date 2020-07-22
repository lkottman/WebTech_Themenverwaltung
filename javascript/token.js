class Token {
    constructor(start, end, token, time) {
        this.start = start;
        this.time = time;
        this.end = end;
        this.token = token;
    }
}

function getToken() {
    fetch('/getToken')
        .then(response => {
            return response.json();
        }).then(responseData => {
        console.log(responseData);
        renderHTML(responseData)
    })
};

function renderHTML(data) {
    var rowCounter = 1;
    for (i = 0; i < data.length; i++) {
        createTableContent("tokenList", rowCounter);
    }

    function createTableContent(id, counter) {
        var x = document.getElementById(id).insertRow(rowCounter);
        x.setAttribute("id", "row");
        x.setAttribute("class", "table-row");


        var column1 = x.insertCell(0);
        var column2 = x.insertCell(1);
        var column3 = x.insertCell(2);
        var column4 = x.insertCell(3);


        column1.innerHTML = data[i].gentoken;
        column2.innerHTML = data[i].start;
        column3.innerHTML = data[i].end;
        column4.innerHTML = data[i].user;

        rowCounter++;
    }
}


function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("userlist");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            console.log(x.innerHTML)
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}




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



function clearToken() {

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

        })
        .catch(error => console.error(error))
}


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


}

function postCreateToken(token){

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(token)
    }

    fetch('/createToken', options)
        .then(response => response.json())
        .then(data => {

            if (data.token === "success"){
            } else {
                location.reload();
            }


        })
        .catch(error => console.error(error));
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




function setMaxDate(){
    var maxDate = new Date();
    maxDate.setMinutes(maxDate.getMinutes()
        + parseInt(5256000));

    var month = maxDate.getUTCMonth() + 1;
    var day = maxDate.getUTCDate();
    var year = maxDate.getUTCFullYear();

    if(month < 10){
        month = "0" + month;
    }

    maxDate = year + "-" + month + "-" + day;
    document.getElementById("endCalender").max = maxDate + "T23:59";
    document.getElementById("startCalender").max = maxDate + "T23:58";
}


function diffMinutes(dt2, dt1)
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    return Math.abs(Math.round(diff));

}

function deleteMessage() {

    if(confirm("ACHTUNG!\nSie sind dabei einen Token zu löschen")){
        clearToken();
        location.reload();
    }else {
    }
}