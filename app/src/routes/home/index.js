"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./home.ctrl");

router.get("/", controller.output.home);
router.get("/login", controller.output.login);
router.get("/register", controller.output.register);

router.post("/login", controller.process.login);
router.post("/register", controller.process.register);

module.exports = router;
