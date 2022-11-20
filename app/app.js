"use strict";

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

// env Setting
dotenv.config();

const app = express();
const home = require("./src/routes/home");

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
app.use("/", home); // use -> Method to register Middleware.

module.exports = app;
