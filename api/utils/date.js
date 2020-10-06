const { utcToZonedTime, format } = require("date-fns-tz");

/**
 * Gets the current date & time in NYC and SFO
 * @returns {Object} - {nycDateFormat, sfoDateFormat}
 */
function getDates() {
  const baseUTCDate = new Date();
  const nycTimeZone = "America/New_York";
  const sfoTimeZone = "America/Los_Angeles";

  let nycDate = utcToZonedTime(baseUTCDate, nycTimeZone);
  let sfoDate = utcToZonedTime(baseUTCDate, sfoTimeZone);

  let nycDateFormat = format(nycDate, "p MMM d, yyyy", {
    timeZone: nycTimeZone,
  });
  let sfoDateFormat = format(sfoDate, "p MMM d, yyyy", {
    timeZone: sfoTimeZone,
  });

  console.log(`NYC Time: ${nycDateFormat}`);
  console.log(`SFO Time: ${sfoDateFormat}`);

  return { nycDateFormat, sfoDateFormat };
}

module.exports = getDates;