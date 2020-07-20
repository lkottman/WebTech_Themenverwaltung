window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


    // var txt;
    //
    // var r = confirm("Press a button!");
    // if (r == true) {
    //     txt = "You pressed OK!";
    // } else {
    //     txt = "You pressed Cancel!";
    // }

fetch('/cookie')
    .then(response => response.json())
    .then(data => {

        if (data.enabledCookies === false
        || data.enabledCookies === undefined){
            var r = confirm("Auf dieser Seite werden Cookies angelegt. Wenn Sie einverstanden sind drücken Sie ja.");
            if (r == true) {

                var enableCookie = {cookie: true};

                const options = {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(enableCookie)
                };

                fetch('/enableCookie', options)
                    .then(response => response.json())
                    .then(data => {

                    })
                    .catch(error => console.error(error))

            } else {
                alert("Sie müssen Cookies akzeptieren, damit diese Seite funktioiert!")
                window.location.replace("/");
            }
        }


    })
    .catch(error => console.error(error))

