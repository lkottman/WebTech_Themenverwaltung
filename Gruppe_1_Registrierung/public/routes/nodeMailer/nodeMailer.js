const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require("../../../../config/pathConfig");
configDataMailer = require("./config/config");
const configData = configDataMailer;
const config = JSON.parse(fs.readFileSync(path.path + "/Gruppe_1_Registrierung/public/routes/nodeMailer/config/config.json"));


const transporter = nodemailer.createTransport({
    host: configData.host,
    port: configData.port,

    auth: {
        user: configData.user,
        pass: configData.password,

    }
});



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

function getTextForgotPassword(resetToken, email){
    let link = `http://webtech-01.lin.hs-osnabrueck.de/changePassword?opt=${resetToken}&e_mail=${email}`;
    let text =  `Guten Tag, \n ` +
        `Um Ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule Osnabrück zurückzusetzen`+
        ` benötigen Sie den folgenden Link: \n` +
        ` ${link} \n` +
        ` Bite klicken Sie auf diesen Link um ihr Passwort für die Hausarbeitsthemenverwaltung der Hochschule Osnabrueck` +
        `zurückzusetzen. \n `;

    return text;
}

function getMailOptions(recipient, subject, text ) {
    let mailOptions = {
        from: config.e_mail,
        to: recipient,
        subject: subject,
        text: text
    };
    return mailOptions;
}

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