/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan & Sven Petersen
 * @class Server-Side from login
 */


const express = require('express')
const router = express.Router()
const {sendMail, getTextConfirmationEmail, getMailOptions} = require('../nodeMailer/nodeMailer.js');
const connection = require("../../../../getConnectionDatabase");
var q = require('q');



/**
 * @method
 * Checks if the email ends with "hs-osnabrueck.de"
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    return /^\"?[\w-_\.]*\"?@hs-osnabrueck\.de$/.test(email);
}

/**
 *@method
 * Processing POST register
 */
router.post("/register",  (request, response) => {

    if(validateEmail(request.body.email === false)){
        response.json({register: "Nur E-Mail Adressen mit der Endung '@hs-osnabrueck.de' sind zugelassen."});
    }

    let servertime = new Date();
    let randomtoken = Math.random().toString(36).substr(2, 6);


    var sqlToken = "SELECT * FROM TOKEN WHERE " + 'gentoken = "' + request.body.token + '"; ';
    var sqlEmail = "SELECT * FROM USER WHERE " + 'e_mail = "' + request.body.email + '";';
    var sqlInsert = "INSERT INTO USER(token,name,surname,"
            + "e_mail,password,confirm_token ,verified, authorization) VALUES("
            + '"' + request.body.token + '",'
            + '"' + request.body.name + '",'
            + '"' + request.body.surname + '",'
            + '"' + request.body.email + '",'
            + '"' + request.body.password + '",'
            + '"' + randomtoken + '",'
            + '' + "false" + ','
            + '"student"' + ');';

    var sqlStatement = sqlToken + sqlEmail;

    // Waits to executes sql statement and returns results
    function getData(){
        var defered = q.defer();
        connection.query(sqlStatement, defered.makeNodeResolver());
        return defered.promise;
    }

    function insertData (){
        connection.query(sqlInsert, function(error, results){
            response.json({register: "created"});
        });

    }

    if (request.body.tutorium === undefined) {
        if (request.body.email === undefined) {

        } else {

            q.all([getData()]).then(function (result) {

                let dbToken = result[0][0][0][0];
                let dbUser = result[0][0][1][0];

                //If there is no result finding an token in database
                if(dbToken === undefined){
                    response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
                } else {
                    let startTime = dbToken.start;
                    let endTime = dbToken.end;
                    let token = dbToken.gentoken;
                    let clientToken = request.body.token;

                    //checks if the found token is valid and is not expired
                    if (token === clientToken
                        && servertime >= startTime
                        && servertime <= endTime) {

                        //If there is no user, a new user can be created
                        if (dbUser === undefined){
                            insertData();
                            console.log("user created");
                        } else {
                            response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
                        }
                    } else {
                        response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
                    }
                }
            })//
        }
    } else {
    }

});

/**
 * @@method
 * Change information from a user
 */
router.post("/changeUser",  (request, response) => {

    var ID = request.body.id;
    var name = request.body.name;
    var surname = request.body.surname;
    var email = request.body.email;
    var password = request.body.password;
    var verified = request.body.verified;
    var course = request.body.course;
    var authorization = request.body.authorization;

    var sqlStatement = "UPDATE user "
        + 'SET name = "' + `${name}`  + '"'
        + ' ,  surname = "' + `${surname}` + '"'
        + ' ,  e_mail = "' +  `${email}` + '"'
        + ' ,  password = "' + `${password}` + '"'
        + ' ,  verified = ' + `${verified}` + ''
        + ' ,  course = "' + `${course}` + '"'
        + ' ,  authorization = "' + `${authorization}` + '"'
        + ' WHERE id = ' + `${ID}` + ";"

    connection.query(sqlStatement, function(err, result){
        console.log("SQL:   "+sqlStatement);
        if(err) {

            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });
});

/**
 * @method
 * Change information for the user who is logged in
 */
router.post("/changeMyUser",  (request, response) => {

    var ID = request.session.userId;
    var name = request.body.name;
    var surname = request.body.surname;
    var email = request.body.email;
    var password = request.body.password;
    var course = request.body.course;

    var sqlStatement = "UPDATE user "
        + 'SET name = "' + `${name}`  + '"'
        + ' ,  surname = "' + `${surname}` + '"'
        + ' ,  e_mail = "' +  `${email}` + '"'
        + ' ,  password = "' + `${password}` + '"'
        + ' ,  course = "' + `${course}` + '"'
        + ' WHERE id = ' + `${ID}` + ";"

    connection.query(sqlStatement, function(err, result){
        console.log("SQL:   "+sqlStatement);
        if(err) {

            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });
});


/**
 * @method
 * Adds a user from the adminpage
 */
router.post("/addUser",  (request, response) => {

    var name ="'"+ request.body.name+"'";
    var surname ="'"+ request.body.surname+"'";
    var email = "'"+request.body.email+"'";
    var password = "'"+request.body.password+"'";
    var verified ="'"+ request.body.verified+"'";
    var authorization = "'"+request.body.authorization+"'";

    var sqlStatement = "INSERT INTO `user`(`name`, `surname`, `e_mail`, `password`, `authorization`) VALUES "
        + '( ' + `${name}`  + ''
        + ' ,  ' + `${surname}` + ''
        + ' ,   ' +  `${email}` + ''
        + ' ,   ' + `${password}` + ''
        + ' ,   ' + `${authorization}` + ''
        +  ");"

    connection.query(sqlStatement, function(err, result){
        console.log(sqlStatement);
        if(err) {
            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });
});


//DELETE FROM `user` WHERE id =62

/**
 * @method
 * Deletes user
 */
router.post("/deleteUser",  (request, response) => {

    var ID = request.body.id;

    var sqlStatement = "DELETE FROM `user`"
     + ' WHERE id = ' + `${ID}` + ";"

    connection.query(sqlStatement, function(err, result){
        console.log(sqlStatement);
        if(err) {
            console.log(err);
            response.end();
        }
        response.contentType('application/json');
        response.json(result);
        return result;
    });
});


module.exports = router;

















//OLD
// connection.query(sqlStatement, function(error, result) {
//     if (error) {
//         throw error;
//     }
//     var startTime = result[0].start;
//     var endTime = result[0].end;
//     var token = result[0].gentoken;
//     var clientToken = request.body.token;
//
//     console.log(result[0]);
//     console.log(result[1]);
//
//
//     console.log(token);
//     console.log(clientToken);
//     console.log(startTime + " " + servertime + " " +  endTime);
//     console.log(result[0].token);
//
//     // console.log(servertime);
//     // console.log(request.body.token + " " + token)
//
//     resultEmail = result[1];
//
//     if ( resultToken[0] === ""){
//         response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
//     } else {
//         if (token == clientToken
//             && servertime >= startTime
//             && servertime <= endTime) {
//             if (resultEmail.length !== 0){
//                 response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
//             } else {
//                 insertData();
//                 response.json({register: ""});
//             }
//         } else {
//             response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
//         }
//     }
//
// });






//     var tokenBool = false;
//     var startTime = "";
//     var endTime = "";
//     var token = "";
//     var clientToken = request.body.token;
//
//     try{
//         await connection.query("SELECT gentoken, start, time, end FROM TOKEN WHERE " +
//             'gentoken = "' + request.body.token + '"',
//             function (err, result, fields) {
//                 if (err)
//                     throw err;
//                 else {
//                     tokenBool = true;
//                     startTime = result[0].start;
//                     endTime = result[0].end;
//                     token = result[0].gentoken;
//                     clientToken = request.body.token;
//                 }
//             });
//     } catch (error){
//         return next(error);
//     }
//
//
//     if(tokenBool === false){
//         response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
//     }
//
//     if (token === clientToken
//         && servertime >= startTime
//         && servertime <= endTime){
//         tokenBool = true
//     }
//
//     if(tokenBool === false){
//         response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
//     }
//
// try {
//     await connection.query("SELECT * FROM USER WHERE " + 'e_mail = "'
//         + request.body.email + '"',
//         function (err, result) {
//             if (err) {
//                 throw err;
//             } else {
//                 if (result.length === 0){
//                     tokenBool = true;
//                 }
//             }
//         })
// } catch (error) {
//         return next(error);
// }
//
//
//     if(tokenBool === false){
//         response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
//     }
//
//     try{
//         await connection.query("INSERT INTO USER(token,name,surname,"
//             + "e_mail,password,confirm_token ,verified, authorization) VALUES("
//             + '"' + request.body.token + '",'
//             + '"' + request.body.name + '",'
//             + '"' + request.body.surname + '",'
//             + '"' + request.body.email + '",'
//             + '"' + request.body.password + '",'
//             + '"' + randomtoken + '",'
//             + '' + "false" + ','
//             + '"student"' + ')',
//             function (err) {
//                 if (err)
//                     throw err;
//                 else {
//                     sendMail(getMailOptions(request.body.email,
//                         'E-Mail bestätigen!!',getTextConfirmationEmail(randomtoken,
//                             request.body.email, request.body.name)));
//                     console.log("User created");
//                     response.json({register: ""});
//                 };
//             });
//     } catch (error){
//         return next(Error);
//     }
//
//
//
//
//     console.log(request.body.tutorium);
//     console.log(request.body.email);
//
//     if (request.body.tutorium === undefined) {
//         if (request.body.email === undefined){
//             response.end()
//         } else {
//         console.log("register");
//
//         // Check if used token is valid
//         connection.query("SELECT gentoken, start, time, end FROM TOKEN WHERE " +
//             'gentoken = "' + request.body.token + '"',
//             function (err, result, fields) {
//                 if (err)
//                     throw err;
//                 else {
//                     if (result[0] != undefined) {
//                         let startTime = result[0].start;
//                         let endTime = result[0].end;
//                         let token = result[0].gentoken;
//                         let clientToken = request.body.token;
//
//                         if (token === clientToken
//                             && servertime >= startTime
//                             && servertime <= endTime) {
//                             connection.query("SELECT * FROM USER WHERE " + 'e_mail = "'
//                                 + request.body.email + '"',
//                                 function (err, result) {
//                                     if (err) {
//                                         throw err;
//                                     } else {
//                                         if (result.length === 0) {
//                                             connection.query("INSERT INTO USER(token,name,surname,"
//                                                 + "e_mail,password,confirm_token ,verified, authorization) VALUES("
//                                                 + '"' + request.body.token + '",'
//                                                 + '"' + request.body.name + '",'
//                                                 + '"' + request.body.surname + '",'
//                                                 + '"' + request.body.email + '",'
//                                                 + '"' + request.body.password + '",'
//                                                 + '"' + randomtoken + '",'
//                                                 + '' + "false" + ','
//                                                 + '"student"' + ')',
//                                                 function (err) {
//                                                     if (err)
//                                                         throw err;
//                                                     else {
//
//                                                         // sendMail(getMailOptions(request.body.email,
//                                                         //     'E-Mail bestätigen!!',getTextConfirmationEmail(randomtoken,
//                                                         //         request.body.email, request.body.name)));
//                                                         console.log("User created");
//                                                         response.json({register: ""});
//                                                     }
//                                                     ;
//                                                 });
//                                         } else {
//                                             response.json({register: "Fehlgeschlagen: Benutzer existiert bereits."});
//                                         }
//                                     }
//                                 });
//                         } else {
//                             response.json({register: "Fehlgeschlagen: Freischaltcode ist abgelaufen."});
//                         }
//                     } else {
//                         response.json({register: "Fehlgeschlagen: Freischaltcode existiert nicht."});
//                     }
//                 }
//             });
//         }
//     } else {
//         response.end();
//     }
//
