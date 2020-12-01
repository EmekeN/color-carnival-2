const path = require("path");

module.exports = (req, res) => {
  res.redirect(path.join(__dirname + "/../dist/index.html"));
};
