"use strict";

const YAML = require("yaml");
const fs = require("fs");
const mongoose = require("mongoose");
const mongo_config = YAML.parse(
  fs.readFileSync(__dirname + "/mongo_config.yml", "utf-8")
);
const mongodb_url = `mongodb+srv://${
  mongo_config.connection.user
}:${encodeURIComponent(
  mongo_config.connection.password
)}@login-lecture.dgb30v2.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("debug", true);

const connect = () => {
  mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "login_lecture",
  });
};
connect();

mongoose.connection.on("error", (err) => {
  console.log("mongodb connection Error : " + err);
});
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected! Try to connect again");
  connect();
});

const usersSchema = new mongoose.Schema({
  id: { type: String, required: true },
  pwd: { type: String, required: true },
  name: { type: String, required: true },
  in_date: { type: Date, default: () => new Date() },
});
const users = mongoose.model("User", usersSchema, "users");

module.exports = users;
