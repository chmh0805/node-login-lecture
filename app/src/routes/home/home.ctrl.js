"use strict";

const User = require("../../models/User");
const logger = require(__dirname + "/../../config/logger");

// for GET Requests.
const output = {
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },

  register: (req, res) => {
    res.render("home/register");
  },
};

// for POST Requests.
const process = {
  login: async (req, res) => {
    logger.info(`request: ${JSON.stringify(req.body)}`);
    const user = new User(req.body);
    const response = await user.login();
    if (response.err)
      logger.error(
        `POST / 200 "/login" success: ${response.success}, msg: ${response.err}`
      );
    else
      logger.info(
        `POST / 200 "/login" success: ${response.success}, msg: ${response.msg}`
      );
    return res.json(response);
  },

  register: async (req, res) => {
    logger.info(`request: ${JSON.stringify(req.body)}`);
    const user = new User(req.body);
    const response = await user.register();
    if (response.err)
      logger.error(
        `POST / 200 "/register" success: ${response.success}, msg: ${response.err}`
      );
    else
      logger.info(
        `POST / 200 "/register" success: ${response.success}, msg: ${response.msg}`
      );
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
