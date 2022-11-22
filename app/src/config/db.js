"use strict";

const mongoose = require("mongoose");
const logger = require("./logger");
const mongodb_url = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@login-lecture.dgb30v2.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("debug", (collectionName, method, query, doc) => {
  logger.info(
    `${collectionName}.${method} - ${JSON.stringify(query)} - ${JSON.stringify(
      doc
    )}`
  );
});

const connect = () => {
  mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_DATABASE,
  });
};
connect();

mongoose.connection.on("error", (err) => {
  logger.error("mongodb connection Error : " + err);
});
mongoose.connection.on("disconnected", () => {
  logger.error("mongodb disconnected! Try to connect again");
  connect();
});

const usersSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    name: { type: String, required: true },
    in_date: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);
const users = mongoose.model("User", usersSchema, "users");

module.exports = users;
