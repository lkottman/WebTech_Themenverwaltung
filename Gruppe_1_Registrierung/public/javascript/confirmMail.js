/** confirmMail
 *
 *  <p>
 *      Version 1
 *  </p>
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 */

import {getUrlParameter} from "./getUrlParameter";


/**
 * This class creates an object from the given URL-Parameter which was sent to the user after the registration took place.
 * After that it send the object with a post to router which than handles the verification.
 */
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



