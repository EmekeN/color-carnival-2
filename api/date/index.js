const getDates = require("./../../utils/date");

/**
 * Get time in NYC & SFO
 * @returns {Object} - {nycDateFormat: String, sfoDateFormat: String}
 */
module.exports = (req, res) => {
  try {
    let dates = getDates();
    res.send(dates);
  } catch (err) {
    console.error(`Server Caught exception ${err}`);
    res.status(500).send("Unexpected Server Exception");
  }
};
