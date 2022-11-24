"use strict";

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require(__dirname + "/app/src/config/logger");
const morgan = require("morgan");

// env Setting
dotenv.config();

const app = express();
const home = require(__dirname + "/app/src/routes/home");

// log Setting

// App Setting
app.set("views", __dirname + "/app/src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/app/src/public`)); // register 'src/public' as static directory.
app.use(bodyParser.json());
/*
    extended: true
    Resolve Misrecognizing issues when request body contains korean words or spaces
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: logger.stream }));

app.use("/", home); // use -> Method to register Middleware.

module.exports = app;
