const express = require('express');
const router = express.Router();
const dbConnection = require("../modules/dbConnection.js");
const {validateCredentials, blockIfLoggedIn, blockIfNotLoggedIn} = require("../modules/middlewares.js");

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
router.post('/',blockIfLoggedIn);
router.post('/',validateCredentials);
router.post('/',async function (req, res, next) {
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
router.delete('/',blockIfNotLoggedIn);
router.delete('/',function (req,res,next) {
    req.session.destroy();
    const resJSON = {loggedIn: false};
    res.json(resJSON);
    res.status(200).end()
})

module.exports = router;