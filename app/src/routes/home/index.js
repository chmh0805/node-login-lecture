"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./home.ctrl");

router.get("/", controller.output.home);
router.get("/login", controller.output.login);

router.post("/login", controller.process.login);

module.exports = router;
