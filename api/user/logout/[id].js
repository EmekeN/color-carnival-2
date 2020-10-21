const mockUsers = require("./../../../utils/game");
/**
 * Logs user out
 * @returns {Promise} - {isAuthenticated: Boolean, userID: Number}
 */

module.exports = async (req, res) => {
  const redis = require("redis");
  const { promisify } = require("util");
  const { host, port, password } = require("./../../../utils/config");
  const client = redis.createClient({
    host: host,
    port: port,
    password: password,
  });

  client.on("connect", () => {
    console.log("Connected to Redis Server");
  });

  try {
    let userKey = req.query.member;
    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${userKey}`);
    console.log(`Current User is ${user.userName}`);

    if (user) {
      client.hmset(userKey, ["isAunthenticated", "false"]);
      console.log(`User ${user.userName} is signed out`);
      res.send({ isAuthenticated: false, userID: "" });
    } else {
      res.status(400).send("User Does Not Exist");
    }
  } catch (err) {
    console.error(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  } finally {
    client.quit();
  }
};
