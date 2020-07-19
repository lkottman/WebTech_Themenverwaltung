const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * This method hashes an given input string and adds an salt for proper security.
 * @param input to be hashed.
 */
function hashPassword(input){
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            throw err
        } else {
            bcrypt.hash(input, salt, function(err, hash) {
                if (err) {
                    throw err
                } else {
                    console.log(hash);
                    return hash;
                }
            })
        }
    });
};

/**
 *  * This method compares an given input string with an hashed + salt generated password.
 * @param input string from user to compare with hash
 * @param hash string from database to check for.
 */
function compareHashedPassword(input, hash) {
    bcrypt.compare(input, hash, function (err, isMatch) {
        if (err) {
            throw err
        } else if (!isMatch) {
            console.log("Password doesn't match!")
            return false;
        } else {
            console.log("Password matches!");
            return true;
        }
    });
};

module.exports = {
    hashPassword,
    compareHashedPassword
};