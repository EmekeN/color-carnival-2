const path = require("path");
module.exports = (req, res) => {
  /**
   * Client must be authenticated view route
   * Redirect to "/" if not
   * Client handles auth for this route
   */
  console.log("Inside game");
  res.sendFile(path.join(__dirname + "/../../dist/index.html"));
};
