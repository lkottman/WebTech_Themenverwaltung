fetch('/cookie')
    .then(response => response.json())
    .then(data => {

        document.getElementById("name").innerHTML = "Hallo " + data.userName;

    })
    .catch(error => console.error(error))

