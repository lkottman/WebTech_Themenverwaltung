/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan & Sven Petersen
 * @class Mainpage from this project
 */

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


var confirmCookie = false;

window.onload = function() { cookieConsent(); };
console.log(getCookie("cookiesDismiss") + " Test1");

if (getCookie("cookiesDismiss") == 1){
    console.log("test2");
    cookiePopup();
}

/**
 * @method
 * Checks if the user already accept cookies and POST it
 */
function cookiePopup (){
    fetch('/cookie')
        .then(response => response.json())
        .then(data => {
                if (confirmCookie === true
                    || getCookie('cookiesDismiss') == 1) {

                    var enableCookie = {cookie: true};

                    const options = {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(enableCookie)
                    };

                    fetch('/enableCookie', options)
                        .then(response => response.json())
                        .then(data => {
                        })
                        .catch(error => console.error(error))

                } else {
                    // alert("Sie müssen Cookies akzeptieren, damit diese Seite funktioiert!")
                    cookieConsent()
                }
        })
        .catch(error => console.error(error))

}


var cookieTitle = "Cookies.";
var cookieDesc = "Diese Website benutzt Cookies. Um den Umfang dieser Seite nutzen zu können, müssen Sie Cookies akzeptieren.";
var cookieLink = '<a href="https://www.cookiebot.com/de/cookie-zustimmung/" target="_blank">Wieso?</a>';
var cookieButton = "Verstanden";
var cookieButton1 = "Ablehnen";
var cookieName = "cookiesDismiss";

/**
 * @method
 * Fade in for the Textbox
 * @param elem
 * @param display
 */
function pureFadeIn(elem, display){
    var el = document.getElementById(elem);
    el.style.opacity = 0;
    el.style.display = display || "block";

    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .02) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

/**
 * @method
 * Fade in for the Textbox
 * @param elem
 * @param display
 */
function pureFadeOut(elem){
    var el = document.getElementById(elem);
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .02) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

/**
 * @method
 * Creates cookie with given parameters
 * @param name
 * @param value
 * @param days
 */
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * @method Get Cookies
 * @param name
 * @returns {string|null}
 */
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/**
 * @method dismiss cookie
 * @param name
 * @returns {string|null}
 */
function cookieDismiss() {
    setCookie(cookieName,'1',7);
    pureFadeOut("cookieConsentContainer");
    confirmCookie = true;
    cookiePopup();
}

/**
 * @method
 * Sets cookie to an expired date, so it will be invalid
 */
function eraseCookie() {
    cookieDismiss();
    document.cookie = cookieName + ' =; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    confirmCookie = false;
    // cookiePopup();
}

/**
 * @methoc
 * HTML for the infobox with the declared informations
 */
function cookieConsent() {
    if (!getCookie(cookieName)) {
        document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer">' +
            '<div class="cookieTitle"><a>' + cookieTitle + '</a>' + '</div>' +
            '<div class="cookieDesc"><p>' + cookieDesc + ' ' + cookieLink + '</p></div>' +
            '<button class="button" onClick="cookieDismiss();"><span>' + cookieButton + '</span></button>' +
            '<button class="button" onClick="eraseCookie();"><span>' + cookieButton1 + '</span></button>';
        pureFadeIn("cookieConsentContainer");
    }
}


