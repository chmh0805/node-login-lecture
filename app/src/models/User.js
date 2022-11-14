"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const body = this.body;
    const { id, pwd } = UserStorage.getUserInfo(body.id);

    if (id) {
      if (pwd === body.pwd) {
        return { success: true };
      } else {
        return { success: false, msg: `password is incorrect.` };
      }
    } else {
      return { success: false, msg: `${body.id} doesn't exist.` };
    }
  }
}

module.exports = User;
