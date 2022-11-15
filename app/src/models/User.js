"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  login() {
    const client = this.body;
    const { id, pwd } = UserStorage.getUserInfo(client.id);

    if (id) {
      if (pwd === client.pwd) {
        return { success: true };
      } else {
        return { success: false, msg: `password is incorrect.` };
      }
    } else {
      return { success: false, msg: `${client.id} doesn't exist.` };
    }
  }

  register() {
    const client = this.body;
    UserStorage.save(client);
  }
}

module.exports = User;
