const metaCharactersToCheck = {
    escapeCharacterSingleQuote: "\'",
    escapeCharacterDoubleQuote: "\"",
    escapeCharacterDoubleQuote: "\\",
    escapeCharacterHashtag: "#",
    escapeCharacterComment: "-"
};

const lengthToBeValid = 45;


/**
 * This method checks a given string for illegal metacharacters to prevent SQL-Injections.
 * If the input contains illegal metacharacters a window will pop up with an error message.
 * @param input to be checked
 */
function checkInputForSQLInject(input)
{
    checkLength(input);
    let inputToCheck = splitInput(input);

    // illegal expression to prevent SQL-Injections
    for (let i = 0; i < inputToCheck.length; i++) {
        for (var prop in metaCharactersToCheck) {
            if (inputToCheck[i].toString() === metaCharactersToCheck[prop].toString() )
                window.alert("Sie verwenden einen nicht zulässigen Ausdruck! \n Folgende Ausdruck sind nicht zulässig: \' \" \\ - -- @ ");
        }
    }
}

/**
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
}

/**
 * This method checks a given input length to prevent SQL-Injection.
 * If a given input is to long a window will pop up with an error message
 * @param input to check for l
 */
function checkLength(input) {
    if (input.length > lengthToBeValid )
    {
        window.alert("Die maximale Zeichenlänge ist begrenzt auf 45 Zeichen")
    }
}