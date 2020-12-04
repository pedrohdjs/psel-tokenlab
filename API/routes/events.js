const express = require('express');
const jwt = require('jsonwebtoken');
const DbConnection = require("../modules/DbConnection.js");
const nextDay = require("../modules/nextDay.js");
const { validateEventsGetRequest, getCurrentUser, blockIfNotLoggedIn } = require("../modules/middlewares.js");

const router = express.Router();

router.get('/',getCurrentUser);
router.get('/',blockIfNotLoggedIn);
router.get('/',validateEventsGetRequest);
router.get('/',async (req,res) => {
    const day = req.query.day;
    const month = req.query.month;
    const year = req.query.year;
    const userId = 1;//req.user.id;
    let sql;
    if (req.type === "day"){
        const [nextYear,nextMonth,nextDate] = nextDay(year,month,day);
        const lowerBound = `${year}-${month}-${day} 00:00:00`;
        const upperBound = `${nextYear}-${nextMonth}-${nextDate} 00:00:00`;
        sql = `SELECT description, start, end FROM Events WHERE userId=${userId} AND start >='${lowerBound}' AND start < '${upperBound}'`;
    }
    else{ //if req.type === "month"
        const [nextYear,nextMonth] = nextDay(year,month,31);
        const lowerBound = `${year}-${month}-${1} 00:00:00`;
        const upperBound = `${nextYear}-${nextMonth}-${1} 00:00:00`;
        sql = `SELECT description, start, end FROM Events WHERE userId=${userId} AND start >='${lowerBound}' AND start < '${upperBound}'`;
    }
    const connection = new DbConnection();
    const dbRes = await connection.query(sql);
    const jsonRes = (dbRes) ? {events: dbRes} : {events: []};
    res.json(jsonRes);
    return res.status(200).end();

});

module.exports = router;