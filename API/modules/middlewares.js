const sanitize = require('./sanitize');
const jwt = require('jsonwebtoken');
const { jwt_settings } = require('../config.json');

//Validate passed email and password.
const validateCredentials = function (req, res, next) {
    req.body.email = sanitize(req.body.email);
    req.body.password = sanitize(req.body.password);
    if(!req.body.email || !req.body.password){
        res.status(400).json({err:"Your credentials may contain unnalowed characters"}); //400 bad request
    }
    else {
        next(); //Login authorized
    }
};

const getCurrentUser = function (req,res,next){
    const token = req.cookies.jwt;
    jwt.verify(token,jwt_settings.secret,(err, decoded) => {
        if (err){
            req.user = false;
        }
        else {
            req.user = decoded;
        }
        next();
    })
}

//Block the request flow if there is an active session
const blockIfLoggedIn = function (req, res, next) {
    if (req.user){
        return res.status(401).json({err: "User is already logged in."}).end(); //401 unauthorized
    }
    else {
        next();
    }
    
}

//Block the request flow if there isn't an active session
const blockIfNotLoggedIn = function (req, res, next) {
    if (!req.user){
        return res.status(401).json({err: "User is not logged in."}).end(); //401 unauthorized
    }
    else {
        next();
    }
};

//Set response's Content-Type header as "application/json"
const useJSONres = function (req, res, next){
    res.setHeader('Content-Type', 'application/json');
    next();
};


//Use CORS settings on the response
const useCORSSettings = function (req, res, next){
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', "*");
    res.header('Access-Control-Allow-Headers', "*");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
}


module.exports = {
    validateCredentials: validateCredentials,
    getCurrentUser: getCurrentUser,
    blockIfLoggedIn: blockIfLoggedIn,
    blockIfNotLoggedIn: blockIfNotLoggedIn,
    useJSONres: useJSONres,
    useCORSSettings: useCORSSettings
}