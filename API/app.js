const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const config = require('./config.json');
const { useCORSSettings, useJSONres } = require('./modules/middlewares')

const sessionRouter = require('./routes/session.js');
const registerRouter = require('./routes/register.js');

const app = express();

//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({origin:true,credentials: true}));
app.use(useCORSSettings);
app.use(useJSONres);

//Routes
app.use('/session',sessionRouter);
app.use('/register',registerRouter);

module.exports = app;
