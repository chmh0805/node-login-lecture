"use strict";

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const accessLogStream = require(__dirname + "/src/config/log");

// env Setting
dotenv.config();

const app = express();
const home = require("./src/routes/home");

// log Setting

// App Setting
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`)); // register 'src/public' as static directory.
app.use(bodyParser.json());
/*
    extended: true
    Resolve Misrecognizing issues when request body contains korean words or spaces
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(morgan("common", { stream: accessLogStream }));
app.use("/", home); // use -> Method to register Middleware.

module.exports = app;
