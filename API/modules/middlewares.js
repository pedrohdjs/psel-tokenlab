const sanitize = require('./sanitize');

//Validate passed email and password.
const validateCredentials = function (req, res, next) {
    req.body.email = sanitize(req.body.email);
    req.body.password = sanitize(req.body.password);
    if(!req.body.email || !req.body.password){
        res.status(400).end("Your credentials may contain unnalowed characters"); //400 bad request
    }
    else {
        next(); //Login authorized
    }
};

//Block the request flow if there is an active session
const blockIfLoggedIn = function (req, res, next) {
    if(req.session.user){
        res.status(401).end("User is already logged in."); //401 unauthorized
        return;
    }
    else{
        next();
    }
}

//Block the request flow if there isn't an active session
const blockIfNotLoggedIn = function (req, res, next) {
    if(!req.session.user){
        res.status(401).end("User is not logged in."); //401 unauthorized
    }
    else {
        next();
    }
};

module.exports = {
    validateCredentials: validateCredentials,
    blockIfLoggedIn: blockIfLoggedIn,
    blockIfNotLoggedIn: blockIfNotLoggedIn
}