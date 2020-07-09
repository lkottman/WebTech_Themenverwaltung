const bcrypt = require('bcrypt');

let password = "test";
bcrypt.hash(password, 10).then(
    hash => {
        console.log('Your hash: ', hash);
    },
    err => {
        console.log(err);
    }
);




function comparePasswordWithHash(password, hash)
{
    crypt.compare(password, hash).then(
        result => {
            console.log('Submitted password is correct');
        },
        err => {
            console.log(err);
        }
    );
}

