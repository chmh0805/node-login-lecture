"use strict";

const express = require("express");
const app = express();
const home = require("./routes/home");

// App Setting
app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/", home); // use -> Method to register Middleware.

app.listen(3000, () => {
  console.log("server start listening on port 3000");
});
