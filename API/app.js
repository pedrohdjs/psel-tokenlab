const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser')
const { useCORSSettings, useJSONres, debug } = require('./modules/middlewares')

const sessionRouter = require('./routes/session.js');
const registerRouter = require('./routes/register.js');

const app = express();

//Middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(debug);
app.use(express.urlencoded({extended: false}));
app.use(cors({origin:true,credentials: true}));
app.use(useCORSSettings);
app.use(useJSONres);

//Routes
app.use('/session',sessionRouter);
app.use('/register',registerRouter);

module.exports = app;
