"use strict";

const database = require(__dirname + "/../config/db");
const logger = require(__dirname + "/../config/logger");

class UserStorage {
  static async getUsers(isAll, ...fields) {
    try {
      let data;
      if (isAll) {
        data = await database.find();
      } else {
        const findObj = {};
        fields.forEach((field) => {
          findObj[field] = true;
        });
        data = await database.find({}, findObj).exec();
      }
      logger.info(data);
      return data[0];
    } catch (err) {
      throw err;
    }
  }

  static async getUserInfo(id) {
    try {
      const data = await database.find({ id: id }).exec();
      if (data) {
        logger.info(data[0]);
        return data[0];
      } else {
        return undefined;
      }
    } catch (err) {
      throw err.toString();
    }
  }

  static async save(userInfo) {
    try {
      const result = await new database(userInfo).save();
      logger.info(result);
      return { success: true };
    } catch (err) {
      throw err.toString();
    }
  }
}

module.exports = UserStorage;
