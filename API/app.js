const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const config = require('./config.json');

const sessionRouter = require('./routes/session.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: config.api_secret,
    resave: false,
    saveUninitialized: false
}))


app.use('/session', sessionRouter);

module.exports = app;
