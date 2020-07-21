window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


var confirmCookie = false;

window.onload = function() { cookieConsent(); };
console.log(getCookie("cookieDismiss") + " Test1");

if (getCookie("cookieDismiss") == 1){
    console.log("test2");
    cookiePopup();
}

function cookiePopup (){
    fetch('/cookie')
        .then(response => response.json())
        .then(data => {

            if (data.enabledCookies === false
                || data.enabledCookies === undefined){

                if (confirmCookie === true
                    || getCookie('cookieDismiss') == 1) {

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
                    alert("Sie müssen Cookies akzeptieren, damit diese Seite funktioiert!")
                    // window.location.replace("/");
                }
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

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

function cookieDismiss() {
    setCookie('cookieDismiss','1',7);
    pureFadeOut("cookieConsentContainer");
    confirmCookie = true;
    cookiePopup();
}

function eraseCookie() {
    cookieDismiss();
    document.cookie = 'cookieDismiss =; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    confirmCookie = false;
    // cookiePopup();
}

function cookieConsent() {
    if (!getCookie('cookieDismiss')) {
        document.body.innerHTML += '<div class="cookieConsentContainer" id="cookieConsentContainer">' +
            '<div class="cookieTitle"><a>' + cookieTitle + '</a>' + '</div>' +
            '<div class="cookieDesc"><p>' + cookieDesc + ' ' + cookieLink + '</p></div>' +
            '<button class="button" onClick="cookieDismiss();"><span>' + cookieButton + '</span></button>' +
            '<button class="button" onClick="eraseCookie();"><span>' + cookieButton1 + '</span></button>';
        pureFadeIn("cookieConsentContainer");
    }
}


