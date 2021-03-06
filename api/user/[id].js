/**
 * Get user information
 * @returns {Promise} - {userName: String, wins: Number, losses:Number}
 */
module.exports = async (req, res) => {
  const { promisify } = require("util");
  const { client} = require("../../utils/redisConfig");

  try {
    console.log(`Params are ${req.query.id}`);
    let userKey = req.query.id;
    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${userKey}`);
    console.log(`Current User is ${user.userName}`);
    if (user) {
      res.send({
        userName: user.userName,
        wins: user.wins,
        losses: user.losses,
      });
    } else {
      res.status(400).send("User Does Not Exist");
    }
  } catch (err) {
    console.error(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
};