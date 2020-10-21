/**
 * Route for login
 * @returns {Promise} {isAunthenticated: boolean, userID: Number}
 */
module.exports = async (req, res) => {
  const { promisify } = require("util");
  const { client } = require("../../utils/redisConfig");

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
  }
};
