const express = require('express');
const router = express.Router();
const dbConnection = require("../modules/dbConnection.js");
const {validateCredentials, getCurrentUser, blockIfLoggedIn} = require("../modules/middlewares.js");

//Registration
router.post('/',getCurrentUser);
router.post('/',blockIfLoggedIn);
router.post('/',validateCredentials);
router.post('/',async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const connection = new dbConnection();
    const sql = `INSERT INTO Users (email,password) VALUES (${email},PASSWORD(${password}));`;

    const dbRes = await connection.query(sql);
    if(!dbRes){
        res.json({err: "This email has already been registered."}); 
        return res.status(409).end();//409 conflict
    }

    //Registration successful: log the user in
    const userJSON = {loggedIn: true, email: email, id: dbRes.insertId};
    req.session.user = userJSON;
    res.json(userJSON);
    return res.status(200).end(); //200 OK
})

module.exports = router;