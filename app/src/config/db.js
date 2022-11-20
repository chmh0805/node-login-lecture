"use strict";

const mongoose = require("mongoose");
const mongodb_url = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@login-lecture.dgb30v2.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("debug", true);

const connect = () => {
  mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_DATABASE,
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
