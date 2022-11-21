const PATH = require("path");
const rfs = require("rotating-file-stream");

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: PATH.join(__dirname, "/../../log"),
});

module.exports = accessLogStream;
