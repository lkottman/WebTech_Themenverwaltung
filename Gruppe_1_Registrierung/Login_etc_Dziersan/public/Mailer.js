

/**
 * mailOptions = content of e-mail
 */

function sendMail(){
    const fs = require('fs');
    const config = JSON.parse(fs.readFileSync("config.json"));

    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,

        auth: {
            user: config.user,
            pass: config.password,

        }
    });

// settings for passwort reset
    let mailOptions = {
        from: config.e_mail,
        to: 'sven.petersen@hs-osnabrueck.de',
        subject: 'Passwort zurücksetzen',
        text: 'Guten Tag, Sie möchten Ihr Passwort an unserer Hausarbeitsthemenverwaltung zurücksetzen. \n' +
            'Dafür besuchen Sie bitte folgende URL. Dort können Sie ein neues Passwort wählen:  \n \n ' +
            'Mit freundlichen Grüßen \n' +
            'Ihre Hausarbeitsthemenverwaltung'
    };





    transporter.sendMail(mailOptions, function (err, data) {
        if(err) {
            console.log('Error Occurs', err);
        }
        else {
            console.log('Email sent!!');
            console.log(data);
        }
    });
}
