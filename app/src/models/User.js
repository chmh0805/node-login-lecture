"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const user = await UserStorage.getUserInfo(client.id);
      if (user) {
        if (user.pwd === client.pwd) {
          return { success: true };
        }
        return { success: false, msg: `password is incorrect.` };
      }
      return { success: false, msg: `${client.id} doesn't exist.` };
    } catch (err) {
      return { success: false, err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      return response;
    } catch (err) {
      return { success: false, err };
    }
  }
}

module.exports = User;
