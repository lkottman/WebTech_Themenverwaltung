/** nodeMailer
 *  <p>
 *      Version 1
 *  </p>
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 */

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require("../../../../config/pathConfig");
configDataMailer = require("./config/config");
const configData = configDataMailer;
const config = JSON.parse(fs.readFileSync(path.path + "/Gruppe_1_Registrierung/public/routes/nodeMailer/config/config.json"));

/**
 * This method creates a connection to a smtp server which will handle the transfer of the mail.
 * Data for host, port and auth will be loaded form config.json for easier configuration.
 */
const transporter = nodemailer.createTransport({
    host: configData.host,
    port: configData.port,

    auth: {
        user: configData.user,
        pass: configData.password,

    }
});


/**
 * This method sends a mail via the smtp server.
 *
 * @param mailOptions contains information about receipting, subject and body.
 */
function sendMail(mailOptions){
    transporter.sendMail(mailOptions, function (err, data) {
        if(err) {
            console.log('Error Occurs', err);
        }
        else {
            console.log('Email sent!!');
            console.log(data);
        }
    })
}

/**
 * This method creates the body for reset password email.
 * @param resetToken to determine validity and identity of request
 * @param emailnto determine validity and identity of request
 * @returns {string} body for email.
 */
function getTextForgotPassword(resetToken, email){
    let link = `http://webtech-01.lin.hs-osnabrueck.de/changepassword?opt=${resetToken}&email=${email}`;
    let bodytext =  `Guten Tag, \n ` +
        `Um Ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule Osnabrück zurückzusetzen`+
        ` benötigen Sie den folgenden Link: \n` +
        ` ${link} \n` +
        ` Bite klicken Sie auf diesen Link um ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule Osnabrueck` +
        `zurückzusetzen. \n `;

    console.log(bodytext);

    return bodytext;
}

/**
 * This method returns the metadata for email. *
 * @param recipient to whom
 * @param subject is the topic of the mail
 * @param text actual body of mail
 * @returns {{subject: *, from: *, to: *, text: *}}
 */
function getMailOptions(recipient, subject, text ) {
    let mailOptions = {
        from: config.e_mail,
        to: recipient,
        subject: subject,
        text: text
    };
    return mailOptions;
}

/**
 * This method returns the body for a confirmation mail.
 * @param randomtoken to determine the right entry in database later on
 * @param e_mail to determine person to search for in database
 * @param name to greet
 * @returns {string} body for email
 */
function getTextConfirmationEmail(randomtoken, e_mail, name) {

    let url = `http://webtech-01.lin.hs-osnabrueck.de/confirmation?opt=${randomtoken}&email=${e_mail}`;
    let bodyText = `Guten Tag Herr ${name}, Um Ihr E-Mail zu bestaetigen`+
        `klicken Sie bitte auf folgenden Link. Der Link verliert nach 3 Stunden seine Gültigkeit!"\n ` +
        `${url} \n Mit freundlichen Grüßen \n Ihre Hausarbeitsthemenverwaltung`;

    console.log(bodyText);
    return bodyText;
}
// kommt noch
function getTextPersonalData(e_mail, name) {

}

module.exports = {
    sendMail,
    getTextConfirmationEmail,
    getTextForgotPassword,
    getMailOptions
}