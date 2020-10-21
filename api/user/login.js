/**
 * Route for login
 * @returns {Promise} {isAunthenticated: boolean, userID: Number}
 */
module.exports = async (req, res) => {
  const redis = require("redis");
  const { promisify } = require("util");
  const { host, port, password } = require("./../../utils/config");
  const client = redis.createClient({
    host: host,
    port: port,
    password: password
  });

  client.on("connect", () => {
    console.log("Connected to Redis Server");
  });

  try {
    console.log(`Request username: ${req.body.username}`);
    console.log(`Request pass ${req.body.userpass}`);

    let userKey = `${req.body.username}${req.body.userpass}`;
    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${userKey}`);

    console.log(user);

    if (user) {
      client.hmset(userKey, ["isAuthenticated", "true"]);
      console.log(`User: ${user.userName} is logged in`)
      res.send({isAuthenticated: true, userID: userKey})
    } else {
      res.send({isAunthenticated: false, userID:""})
    }
  } catch (err) {
    console.log(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  } finally {
    client.quit();
  }
};
