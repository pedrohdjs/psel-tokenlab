const express = require('express');
const DbConnection = require('../modules/DbConnection.js');
const jwt = require('jsonwebtoken');
const { jwt_settings } = require('../config.json');
const { validateCredentials, getCurrentUser, blockIfLoggedIn } = require("../modules/middlewares.js");

const router = express.Router();

//Current session info
router.get('/',getCurrentUser);
router.get('/',async function(req,res) {
    let resJSON;
    if(req.user){
        resJSON = {loggedIn: true, email: req.user.email, id: req.user.id};
    }
    else {
        resJSON = {loggedIn: false};
    }
    res.json(resJSON);
    return res.status(200).end(); //200 OK
});

//Login
router.post('/',getCurrentUser);
router.post('/',blockIfLoggedIn);
router.post('/',validateCredentials);
router.post('/',async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const connection = new DbConnection();
    const sql = `SELECT id, email FROM Users WHERE email = ${email} AND password=PASSWORD(${password})`;

    const dbRes = await connection.query(sql);
    if(!dbRes){
        res.json({loggedIn: false, err: "Incorrect username or password."});
        return res.status(401).end(); //401 unauthorized: user not found
    }

    //Successful login
    const userJSON = {email: dbRes[0].email, id: dbRes[0].id};
    const token = jwt.sign(userJSON,jwt_settings.secret,jwt_settings.options);
    let inTwoHours = new Date();
    inTwoHours.setTime(inTwoHours.getTime() + 1000 * jwt_settings.options.expiresIn);
    res.header("Set-Cookie",`jwt=${token}; path=/;expires=${inTwoHours.toUTCString()}`);
    res.json({loggedIn: true});
    return res.status(200).end(); //200 OK
});

module.exports = router;