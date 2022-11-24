"use strict";

const app = require(__dirname + "/../../app");
const PORT = process.env.PORT || 3000;
const logger = require(__dirname + "/../src/config/logger");

app.listen(PORT, () => {
  logger.info("server start listening on port 3000");
});
