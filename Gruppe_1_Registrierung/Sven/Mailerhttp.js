require('dotenv').config();

const nodemailer = require('nodemailer');
const http = require('http');
const url = require('url');
const resetHTML = "http://localhost:8080/Webtech/Registrierung/resetpw.html?e_mail=";

// splits up the url to get params
var params=function(req){
    let q=req.url.split('?'),result={};
    if(q.length>=2){
        q[1].split('&').forEach((item)=>{
            try {
                result[item.split('=')[0]]=item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]]='';
            }
        })
    }
    return result;
}


//create a server object
http.createServer(function (req, res)
{
    res.write('hello world!');
    let query = url.parse(req.url,true);

        req.params=params(req); // calls the declared function above
        req.params=params(req);

// Step 1#

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:
                {
                type: 'OAuth2',
                user: 'teotestmailer@gmail.com',
                pass: 'tiDmer-qutwob-sarpu8',
                client_id: '95451542909-higumrard1ne5epseuj27uulgk87u0v6.apps.googleusercontent.com',
                clientSecret: 'IgLv_cMMoD2chlEEIS8AlEut',
                refresh_token: '1//04nm8mOHFn3HACgYIARAAGAQSNwF-L9IrFo1mhczQlKkYle2J0RBZ-iw3YTRxKtvk9_zHipdKZ4-ODd-tfDLMUSvmcW_2ODyx3wY',
                accessToken: 'ya29.a0AfH6SMC86BTdMIxSM_N1SgDCVvKh4HF0z-NfnYvcjH1hQ8cbftO5mtbE3vjFXByR1q00rDw1ymDm7bZZTFY7XyOfmeocfsYn7mgvN8gTAP3vXEKGx0g7RVsZ71NjUtLWZfGPs7twfnQcVuHfcCBFVtfx9cFyvCTU23Q',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Step 2

        let mailOptions = {
            from: 'sven.petersen911@gmail.com',
            to: req.params.mail,
            subject: 'Passwort zurücksetzen',
            text: 'Klick Sie auf den folgenden Link zum zurücksetzen ihres Passwortes:' +
                '"'  + resetHTML + req.params.mail
        };

        // Step 3
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent!!')
            }
        })

    res.end()
}).listen(9999)