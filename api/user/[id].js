const mockUsers = require("../../utils/createUsers");
/**
 * Get user information
 * @returns {Object} - {userName: String, wins: Number, losses:Number}
 */
module.exports = (req, res) => {
  // try {
  //   console.log(`Params are ${req.query.id}`);
  //   let id = parseInt(req.query.id);
  //   let curUser = mockUsers.find((user) => user.id === id);
  //   console.log(`Current User is ${curUser}`);
  //   if (curUser !== undefined) {
  //     console.log(`Found User ${curUser.userName}`);
  //     res.send({
  //       userName: curUser.userName,
  //       wins: curUser.wins,
  //       losses: curUser.losses,
  //     });
  //   } else {
  //     res.status(400).send("User Does Not Exist");
  //   }
  // } catch (err) {
  //   console.error(`Unexpected server error of ${err}`);
  //   res.status(404).send(`Error of ${err} not handled by server`);
  // }
};

// const redis = require("redis");
// const {promisify} = require('util');

// module.exports = async(req, res) => {
//     const client = redis.createClient ({
//         url : "YOUR_REDIS_URL"
//     });
//     const incrAsync = promisify(client.incr).bind(client);
//     const count = await incrAsync("count")

//     client.quit()

//     res.json({
//         body: JSON.stringify(count)
//     })
// }
