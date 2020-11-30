const express = require('express');
const router = express.Router();
const dbConnection = require("../modules/dbConnection.js");
const sanitize = require('../modules/sanitize.js');
const util = require('util');

//Check if there is an existing session
router.get('/',async function(req,res,next) {
    let resJSON;
    if(req.session.user){
        resJSON = {loggedIn: true, email: req.session.user.email, id: req.session.user.id};
    }
    else {
        resJSON = {loggedIn: false};
    }
    res.setHeader('Content-Type', 'application/json');
    res.json(resJSON);
    res.status(200).end(); //200 OK
});

//Login
//Middleware to authorize or block login
const authorizeLogin = (req, res, next) => {
    if(req.session.user){
        res.status(401).end("User is already logged in."); //401 unauthorized
        return;
    }
    req.body.email = sanitize(req.body.email);
    req.body.password = sanitize(req.body.password);

    if(!req.body.email || !req.body.password){
        res.status(400).end("Your credentials may contain unnalowed characters"); //400 bad request
    }
    else {
        next(); //Login authorized
    }
};

router.post('/',authorizeLogin, async function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const connection = new dbConnection();
    const sql = `SELECT id, email FROM Users WHERE email = ${email} AND password=PASSWORD(${password})`;

    const dbRes = await connection.query(sql);
    if(!dbRes){
        res.status(401).end("Incorrect username or password."); //401 unauthorized: user not found
        return;
    }

    const userJSON = {loggedIn: true, email: dbRes[0].email, id: dbRes[0].id};
    req.session.user = userJSON;
    res.setHeader('Content-Type', 'application/json');
    res.json(userJSON);
    res.status(200).end(); //200 OK
});


//Logout
const authorizeLogout = (req, res, next) => {
    if(!req.session.user){
        res.status(401).end("User is not logged in."); //401 unauthorized
    }
    else {
        next();
    }
};

router.delete('/', authorizeLogout, (req,res,next) => {
    req.session.destroy();
    const resJSON = {loggedIn: false};
    res.json(resJSON);
    res.status(200).end()
})

module.exports = router;