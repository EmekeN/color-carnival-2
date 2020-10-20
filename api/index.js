const path = require("path");
const redis = require("redis");
const port = "3000";
const host = "127.0.0.1";
// const client = redis.createClient(port, host);
module.exports = (req, res) => {
  // set up cache

  // add mockusers
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
};
