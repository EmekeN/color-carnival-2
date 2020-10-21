/**
 * Updates users win/loss ratio and returns a new game
 * @returns {Promise} - {targetColor: Object, colors: Array}
 */

module.exports = async (req, res) => {
  const { generateGame } = require("./../../../utils/game");
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
    console.log(`Request parameters: ${req.query.id}`);
    let userKey = req.query.id;
    console.log(`Success body is : ${req.body.success}`);
    let success = req.body.success;
    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${userKey}`);
    console.log(`Current User is ${user.userName}`);

    if (user) {
      let wins = parseInt(user.wins), losses = parseInt(user.losses);
      success ? wins++ : losses++;

      client.hmset(userKey, ["wins", wins.toString(), "losses", losses.toString()]);
      console.log(
        `User ${user.userName} now has ${user.wins} wins & ${user.losses} losses`
      );

      let newGame = generateGame();
      res.send(newGame);
    } else {
      res.status(400).send("No Game State Doesn't Exist For User");
    }
  } catch (err) {
    console.log(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  } finally {
    client.quit();
  }
};
