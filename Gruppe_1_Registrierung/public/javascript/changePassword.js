/** changePassord
 *
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class to generate a object for password changing
 */

import {getUrlParameter} from "./getUrlParameter";

/**
 * This class creates an object from the user data which is entered and return its.
 */
class UserToUpdate {

    constructor(email, token, password) {

        this.email = email;
        this.token = token;
        this.password = password;
    }

    getUserToUpdate(){
        let email = getUrlParameter("email");
        let token    = getUrlParameter("opt");
        let password  =  document.getElementById("password").value;
        return new UserToUpdate( email, token, password);
    }
}

/**
 * @method
 * This method send data which is entered by the user to change the password.
 */
async function sendData() {
    var user = new UserToUpdate().getUserToUpdate();
    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    };


    fetch("/updatePassword", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
 }






