/** changePassord
 *
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class to generate a object for password changing
 */

import {getUrlParameter} from "./getUrlParameter";

    class UserToVerify {

        constructor(email, token) {

            this.email = email;
            this.token = token;

        }
    }

   async function sendUserDataToConfirm() {
        let email = getUrlParameter('email');
        let token = getUrlParameter('opt');

        const user = new UserToVerify(email, token);
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
    }



