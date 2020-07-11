const bcrypt = require('bcrypt');

let password = "test";

function hashPassword( input){
    bcrypt.hash(input, 10).then(
        hash => {
            console.log('Your hash: ', hash);
        },
        err => {
            console.log(err);
        });
}

function comparePasswordWithHash(password, hash)
{
    bcrypt.compare(password, hash).then(
        result => {
            console.log('Submitted password is correct');
        },
        err => {
            console.log(err);
        }
    );
}

