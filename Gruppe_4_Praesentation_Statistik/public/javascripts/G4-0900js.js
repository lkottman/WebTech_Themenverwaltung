/**
 * JS für G4-0900
 */

/**
 * Eintrag des Datums senden
 */
function noDateEntry()
{
    if (!document.getElementById('date').value) {
        document.getElementById('date').value = '0001-01-01';
    }
    setTimeout(() => {
        document.getElementById('sendMessage').submit()
    }, 1);
}


/**
 * Nachricht zeigen
 */
function showMessage()
{
    document.getElementById('message').style.display='block';
}


/**
 * Nachricht ausblenden
 */
function hideMessage() {
    document.getElementById('message').style.display='none';

}
