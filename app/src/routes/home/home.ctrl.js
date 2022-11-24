"use strict";

const User = require(__dirname + "/../../models/User");
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
    const respBody = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 200,
    };
    log(response, respBody);
    return res.status(respBody.status).json(response);
  },

  register: async (req, res) => {
    logger.info(`request: ${JSON.stringify(req.body)}`);
    const user = new User(req.body);
    const response = await user.register();

    const respBody = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 201,
    };
    log(response, respBody);
    return res.status(respBody.status).json(response);
  },
};

const log = (response, respBody) => {
  if (response.err) {
    logger.error(
      `${respBody.method} / ${respBody.status} "${respBody.path}" Response: ${response.success}, msg: ${response.err}`
    );
  } else {
    logger.info(
      `${respBody.method} / ${respBody.status} "${respBody.path}" Response: ${
        response.success
      }, msg: ${response.msg || ""}`
    );
  }
};

module.exports = {
  output,
  process,
};
