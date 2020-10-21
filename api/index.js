const path = require("path");

module.exports = (req, res) => {
  // set up cache

  // add mockusers
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
};
