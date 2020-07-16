fetch('/cookie')
    .then(response => response.json())
    .then(data => {

        document.getElementById("name").innerHTML = "Hallo " + data.userName;
        console.log(data);

    })
    .catch(error => console.error(error))

