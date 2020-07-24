/** sql_InjectionTester
 *
 *  Version 1
 *  Modification date: 22.07.2020
 *  Author: Sven Petersen
 *  @class for preventing sql-injections
 */

const lengthToBeValid = 60;
const metaCharactersToCheck = {
    escapeCharacterSingleQuote: "\'",
    escapeCharacterDoubleQuote: "\"",
    escapeCharacterDoubleQuote: "\\",
    escapeCharacterHashtag: "#",
};


/**
 * @method
 * This method checks a given string for illegal metacharacters to prevent SQL-Injections.
 * If the input contains illegal metacharacters a window will pop up with an error message.
 * @param input to be checked
 */
function checkInputForSQLInject(input)
{

    if (!checkLength(input))
        return false;

    let inputToCheck = splitInput(input);

    // illegal expression to prevent SQL-Injections
    for (let i = 0; i < inputToCheck.length; i++) {
        for (var prop in metaCharactersToCheck) {
            if (inputToCheck[i].toString() === metaCharactersToCheck[prop].toString() ) {

                return false;
            }
        }
    }
    return true;
}

/**
 * @method
 * This method splits a given String into an array of chars.
 * @param input to be split.
 * @returns [] an array with chars from given String.
 */
function splitInput(input) {

    let characterInput = [];

    for (let i = 0; i < input.length; i++) {
        characterInput[i] = input.charAt(i);
    }
    return characterInput;
;}

/**
 * @method
 * This method checks a given input length to prevent SQL-Injection.
 * If a given input is to long the result ist false
 * @param input to check for l
 */
function checkLength(input) {
    if (input.length  > lengthToBeValid ){
        return false;
    }
    else {
        return  true;
    }
};

module.exports = {checkInputForSQLInject}