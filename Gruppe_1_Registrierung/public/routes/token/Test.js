const bcrypt = require('bcrypt');



function genSalt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    salt: salt,
                    password: password
                });
            }
        });
    });
}

/**
 * This method hashes an given input string and adds salt for proper security.
 * @param input to be hashed.
 */
function genHash(salt, password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve({
                    salt: salt,
                    password: password,
                    hash: hash
                });

            }
        });
    });
}


genSalt(password)
    .then(function(result) {
        return genHash(result.salt, result.password);
    })
    .then(function(result) {
        console.log("store hash in user profile :", result);
        stored_hash = result.hash;
        var hashedP
    })
    .catch(function(err) {
        console.log(err);
    });

