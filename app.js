"use strict";

const express = require("express");
const app = express();
const home = require("./routes/home");

// App Setting
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use -> Method to register Middleware.

module.exports = app;
