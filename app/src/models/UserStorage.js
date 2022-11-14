"use strict";

class UserStorage {
  static #users = {
    id: ["mh", "dev", "master"],
    pwd: ["1234", "1234", "123456"],
    name: ["Minhyuk", "devUser", "Master"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const ret = fields.reduce((temp, field) => {
      if (users.hasOwnProperty(field)) {
        temp[field] = users[field];
      }
      return temp;
    }, {});
    return ret;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userInfo = Object.keys(users).reduce((temp, field) => {
      temp[field] = users[field][idx];
      return temp;
    }, {});

    return userInfo;
  }
}

module.exports = UserStorage;
