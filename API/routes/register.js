const express = require('express');
const router = express.Router();
const dbConnection = require("../modules/dbConnection.js");
const {validateCredentials, blockIfLoggedIn} = require("../modules/middlewares.js");

//Registration
router.post("/",blockIfLoggedIn);
router.post("/",validateCredentials);
router.post("/",async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const connection = new dbConnection();
    const sql = `INSERT INTO Users (email,password) VALUES (${email},PASSWORD(${password}));`;

    const dbRes = await connection.query(sql);
    if(!dbRes){
        res.status(409).end("This email has already been registered."); //409 conflict
        return;
    }

    //Registration successful: log the user in
    const userJSON = {loggedIn: true, email: email, id: dbRes.insertId};
    req.session.user = userJSON;
    res.setHeader('Content-Type', 'application/json');
    res.json(userJSON);
    res.status(200).end(); //200 OK
})

module.exports = router;