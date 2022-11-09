"use strict";

class User {
  constructor(id, pwd) {
    this._id = id;
    this._pwd = pwd;
  }

  get id() {
    return this._id;
  }

  get pwd() {
    return this._pwd;
  }
}

const users = [
  new User("mh", "1234"),
  new User("dev", "1234"),
  new User("master", "123456"),
];

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
    const userId = req.body.id;
    const userPwd = req.body.pwd;

    for (let user of users) {
      if (userId === user.id && userPwd === user.pwd) {
        return res.json({
          success: true,
        });
      }
    }

    return res.json({
      success: false,
      msg: "Failed to Login.",
    });
  },
};

module.exports = {
  output,
  process,
};
