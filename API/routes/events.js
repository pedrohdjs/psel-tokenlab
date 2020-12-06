const express = require('express');
const DbConnection = require("../modules/DbConnection.js");
const nextDay = require("../modules/nextDay.js");
const { getCurrentUser, blockIfNotLoggedIn } = require("../modules/middlewares.js");
const { validateEventsPutRequest, validateEventsDeleteRequest} = require("../modules/middlewares.js");
const { validateEventsGetRequest, validateEventsPostRequest } = require("../modules/middlewares.js");

const router = express.Router();

router.get('/',getCurrentUser);
router.get('/',blockIfNotLoggedIn);
router.get('/',validateEventsGetRequest);
router.get('/',async (req,res) => {
    const day = req.query.day;
    const month = req.query.month;
    const year = req.query.year;
    const userId = req.user.id;
    let sql;
    if (req.type === "day"){
        const [nextYear,nextMonth,nextDate] = nextDay(year,month,day);
        const lowerBound = `${year}-${month}-${day} 00:00:00`;
        const upperBound = `${nextYear}-${nextMonth}-${nextDate} 00:00:00`;
        sql = `SELECT id, description, DATE_FORMAT(start,'%H:%i') AS start, DATE_FORMAT(end,'%H:%i') AS end FROM Events WHERE userId=${userId} AND start >='${lowerBound}' AND start < '${upperBound}'`;
    }
    else{ //if req.type === "month"
        const [nextYear,nextMonth] = nextDay(year,month,31);
        const lowerBound = `${year}-${month}-${1} 00:00:00`;
        const upperBound = `${nextYear}-${nextMonth}-${1} 00:00:00`;
        sql = `SELECT description, DATE_FORMAT(start,'%d') as date FROM Events WHERE userId=${userId} AND start >='${lowerBound}' AND start < '${upperBound}'`;
    }
    const connection = new DbConnection();
    const dbRes = await connection.query(sql);
    const jsonRes = (dbRes) ? {events: dbRes} : {events: []};
    res.json(jsonRes);
    return res.status(200).end();

});

router.post('/',getCurrentUser);
router.post('/',blockIfNotLoggedIn);
router.post('/',validateEventsPostRequest);
router.post('/',async (req,res) => {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const start = req.body.start;
    const end = req.body.end;
    const description = req.body.description;
    const userId = req.user.id;

    const startDate = `'${year}-${month}-${day} ${start}:00'`;
    const endDate = `'${year}-${month}-${day} ${end}:00'`;

    const sql = `INSERT INTO Events (userId, description, start, end) VALUES (${userId},${description},${startDate},${endDate})`;
    const connection = new DbConnection();
    const dbRes = await connection.query(sql);

    if (dbRes){
        res.json({start: start, end:end, description: description, id: dbRes.insertId});
        return res.status(200).end(); //200 ok
    }
    else{
        res.json({err: "Database insertion failed."});
        return res.status(409).end(); //409 conflict
    }
});

router.put('/',getCurrentUser);
router.put('/',blockIfNotLoggedIn);
router.put('/',validateEventsPutRequest);
router.put('/',async (req,res) => {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const start = req.body.start;
    const end = req.body.end;
    const description = req.body.description;
    const userId = req.user.id;
    const eventId = req.body.id;

    const startDate = `'${year}-${month}-${day} ${start}:00'`;
    const endDate = `'${year}-${month}-${day} ${end}:00'`;

    const sql = `UPDATE Events SET userId=${userId},description=${description}, start=${startDate}, end=${endDate} WHERE id=${eventId} AND userId=${userId};`
    const connection = new DbConnection();
    const dbRes = await connection.query(sql);

    if (dbRes){
        res.json({start: start, end:end, description: description, id: eventId});
        return res.status(200).end(); //200 ok
    }
    else{
        res.json({err: "Database update failed."});
        return res.status(404).end(); //404 not found
    }
});


router.delete('/',getCurrentUser);
router.delete('/',blockIfNotLoggedIn);
router.delete('/',validateEventsDeleteRequest);
router.delete('/',async (req,res) => {
    const userId = req.user.id;
    const eventId = req.body.id;
    const sql = `DELETE FROM Events WHERE id=${eventId} AND userId=${userId};`;
    const connection = new DbConnection();
    const dbRes = await connection.query(sql);
    if(dbRes){
        res.json({deleted: true});
        return res.status(200).end();
    }
    else{
        res.json({deleted: false, err: "Event not found on database."});
        return res.status(404).end(); //404 not found
    }
});



module.exports = router;