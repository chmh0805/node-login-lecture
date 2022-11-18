"use strict";

const database = require(__dirname + "/../config/db");

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

  static getUsers(isAll, ...fields) {}

  static async getUserInfo(id) {
    try {
      const data = await database.find({ id: id }).exec();
      console.log(data);
      return data[0];
    } catch (err) {
      throw err;
    }
  }

  static async save(userInfo) {}
}

module.exports = UserStorage;
