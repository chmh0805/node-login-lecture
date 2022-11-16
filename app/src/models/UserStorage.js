"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const userInfo = Object.keys(users).reduce((temp, field) => {
      temp[field] = users[field][idx];
      return temp;
    }, {});

    return userInfo;
  }

  static getUsers(...fields) {
    // const users = this.#users;
    // const ret = fields.reduce((temp, field) => {
    //   if (users.hasOwnProperty(field)) {
    //     temp[field] = users[field];
    //   }
    //   return temp;
    // }, {});
    // return ret;
  }

  static getUserInfo(id) {
    return fs
      .readFile(__dirname + "/../database/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static save(userInfo) {
    // const users = this.#users;
    // users.id.push(userInfo.id);
    // users.pwd.push(userInfo.pwd);
    // users.name.push(userInfo.name);
    // return { success: true };
  }
}

module.exports = UserStorage;
