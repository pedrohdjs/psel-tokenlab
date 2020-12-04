const sanitize = require('./sanitize');
const jwt = require('jsonwebtoken');
const { jwt_settings } = require('../config.json');

const debug = function (req, res, next){
    console.log(req.cookies)
    next();
}

//Validate passed email and password.
const validateCredentials = function (req, res, next) {
    req.body.email = sanitize(req.body.email);
    req.body.password = sanitize(req.body.password);
    if(!req.body.email || !req.body.password){
        return res.status(400).json({err:"Your credentials may contain unnalowed characters"}).end(); //400 bad request
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

//Sanitize, validate and check for request type on /events endpoint
const validateEventsGetRequest = function (req, res, next){
    req.query.day = Number(req.query.day);
    req.query.month = Number(req.query.month);
    req.query.year = Number(req.query.year);

    req.query.day = (req.query.day !== NaN) ? req.query.day : false;
    req.query.month = (req.query.month !== NaN) ? req.query.month : false;
    req.query.year = (req.query.year !== NaN) ? req.query.year : false;

    console.log(req.query);

    if(req.query.year && req.query.month && !req.query.day){
        req.type = 'month';
        next();
    }
    else if (req.query.year && req.query.month && req.query.day){
        req.type = 'day';
        next();
    }
    else {
        return res.status(400).json({err: "Invalid request body"}).end(); //400 bad request
    }
}


module.exports = {
    validateCredentials: validateCredentials,
    getCurrentUser: getCurrentUser,
    blockIfLoggedIn: blockIfLoggedIn,
    blockIfNotLoggedIn: blockIfNotLoggedIn,
    useJSONres: useJSONres,
    useCORSSettings: useCORSSettings,
    validateEventsGetRequest: validateEventsGetRequest,
    debug: debug
}