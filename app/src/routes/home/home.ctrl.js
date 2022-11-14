"use strict";

const User = require("../../models/User");

// for GET Requests.
const output = {
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },
};

// for POST Requests.
const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    console.log(response);
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
