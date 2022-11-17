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

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUsers(isAll, ...fields) {
    return fs
      .readFile(__dirname + "/../database/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs
      .readFile(__dirname + "/../database/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true);
    if (users.id.indexOf(userInfo.id) > -1) {
      throw `${userInfo.id} already exists.`;
    }
    users.id.push(userInfo.id);
    users.pwd.push(userInfo.pwd);
    users.name.push(userInfo.name);
    fs.writeFile(__dirname + "/../database/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
