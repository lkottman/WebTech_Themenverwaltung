const express = require('express')
const router = express.Router()

// Redirect to Login if there are no cookies. No Access to the private sites
const redirectLogin = (request, response, next) => {

    if (!request.session.userId) {
        console.log(request.index.session.userId + " redirectLogin");
        response.redirect("/login")
    } else {
        next();
    }
};

// Redirect to Home if User is logged in. There is no need to go to the login/registration Site if
// logged in
const redirectHome = (request, response, next) => {

    if (request.session.userId) {
        console.log(request.index.session.userId + " redirectHome");
        response.redirect("/home");
    } else {
        next()
    }
};


module.exports = {
    redirectHome: redirectHome,
    redirectLogin: redirectLogin,
    router: router
}

