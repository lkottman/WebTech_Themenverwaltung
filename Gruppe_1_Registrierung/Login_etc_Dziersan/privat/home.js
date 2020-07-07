function showName() {
    alert("hello")
}


function showCookie() {
    fetch('/cookie')
        .then(response => response.json())
        .then(data => {

            console.log(data.login)
            alert(data.login)

        })
        .catch(error => console.error(error))
}
