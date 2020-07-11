function checkInputForSQLInject(input)
{
    let inputToCheck = splitInput(input);

    // illegal expression to prevent SQL-Injections
    let metaCharacterstoCheck = {
        escapeCharacterSingleQuote: "\'",
        escapeCharacterDoubleQuote: "\"",
        escapeCharacterDoubleQuote: "\\",
        escapeCharacterHashtag: "#",
        escapeCharacterComment: "-"
    };

    for (let i = 0; i < inputToCheck.length; i++) {
        for (var prop in metaCharacterstoCheck) {
            if (inputToCheck[i].toString() === metaCharacterstoCheck[prop].toString() )
                window.alert("Sie verwenden einen nicht zulässigen Ausdruck! Folgende Ausdruck sind nicht zulässig: \' \" \\ - -- @ ");
        }
    }
}

/**
 *
 * @param input
 * @returns {[]}
 */
function splitInput(input) {

    let characterInput = [];

    for (let i = 0; i < input.length; i++) {
        characterInput[i] = input.charAt(i);
    }
    return characterInput;
}