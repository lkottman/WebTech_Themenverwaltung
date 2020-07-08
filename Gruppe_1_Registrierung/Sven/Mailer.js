require('dotenv').config();
const nodemailer = require('nodemailer');


// Step 1
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
   auth: {
       type: "OAuth2",
       user: 'sven.petersen911@gmail.com',
       pass:'SILoToRY',
       client_id: '875095101053-laa1f3ampourvaoce4u50enlq8ki8q3i.apps.googleusercontent.com',
       clientSecret: 'DCKJrP-6J5prpS1dZPur7wnB',
       refresh_token:'1//04zvJrRcXVYAECgYIARAAGAQSNwF-L9Irx44nr61eMlpz-bRlPew7vHG18uEkJQOlgBJ0D9cwrPi_ObXPy_DI37qtVodJAMTxAgM',
       accessToken: 'ya29.a0Ae4lvC0Bj-pkLzW5XlLHDezgKwdS84l9Q1VIzpe0gf_lc6zGOQH15_1fhvdrA3G7yr53NhTqExyB-yNheI87QdiYKboaZ2gE-GQk5wKneHytr8-RE2-urrwl4Xx8FtO0LoaBs7ih3WxTWaguqXIzI_k2VplBvraqQUQ',
   },
    tls:{
        rejectUnauthorized:false
    }
});

// Step 2
let mailOptions = {
    from: 'sven.petersen911@gmail.com',
    to: 'sven.petersen@hs-osnabrueck.de',
    subject: 'Testing and Testing',
    text: 'IT works'
};

// Step 3
transporter.sendMail(mailOptions, function (err, data) {
    if(err) {
        console.log('Error Occurs', err);
    }
    else {
        console.log('Email sent!!')
    }
})