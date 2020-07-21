fetch('/cookie')
    .then(response => response.json())
    .then(data => {

        var greeting = "Willkommen zurück " + data.userName;

        document.getElementById("name").innerHTML = greeting;


    })
    .catch(error => console.error(error))

