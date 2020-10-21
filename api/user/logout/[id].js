const mockUsers = require("./../../../utils/game");
/**
 * Logs user out
 * @returns {Promise} - {isAuthenticated: Boolean, userID: Number}
 */

module.exports = async (req, res) => {
  const { promisify } = require("util");
  const { client } = require("./../../../utils/redisConfig");

  try {
    let userKey = req.query.member;
    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${userKey}`);
    console.log(`Current User is ${user.userName}`);

    if (user) {
      client.hmset(userKey, ["isAunthenticated", "false"]);
      console.log(`User ${userKey} is signed out`);
      res.send({ isAuthenticated: false, userID: "" });
    } else {
      res.status(400).send("User Does Not Exist");
    }
  } catch (err) {
    console.error(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
};
