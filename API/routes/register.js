const express = require('express');
const jwt = require('jsonwebtoken');
const { jwt_settings } = require('../config.json');
const DbConnection = require("../modules/DbConnection.js");
const {validateCredentials, getCurrentUser, blockIfLoggedIn} = require("../modules/middlewares.js");

const router = express.Router();

//Registration
router.post('/',getCurrentUser);
router.post('/',blockIfLoggedIn);
router.post('/',validateCredentials);
router.post('/',async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const connection = new DbConnection();
    const sql = `INSERT INTO Users (email,password) VALUES (${email},PASSWORD(${password}));`;

    const dbRes = await connection.query(sql);
    if(!dbRes){
        res.json({loggedIn: false, err: "This email has already been registered."}); 
        return res.status(409).end();//409 conflict
    }

    //Register successfull, log user in
    const userJSON = {email: email.replace("'","").replace("'",""), id: dbRes.insertId};
    const token = jwt.sign(userJSON,jwt_settings.secret,jwt_settings.options);
    let inTwoHours = new Date();
    inTwoHours.setTime(inTwoHours.getTime() + 1000 * jwt_settings.options.expiresIn);
    res.header("Set-Cookie",`jwt=${token}; expires=${inTwoHours.toUTCString()}`);
    res.json({loggedIn: true});
    return res.status(200).end(); //200 OK
})

module.exports = router;