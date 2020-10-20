/**
 * Route for login
 * @returns {Promise} {isAunthenticated: boolean, userID: Number}
 */
module.exports = async (req, res) => {
  const redis = require("redis");
  const { promisify } = require("util");
  const client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  client.on("connect", () => {
    console.log("Connected to Redis Server");
  });

  try {
    console.log(`Request username: ${req.body.username}`);
    console.log(`Request pass ${req.body.userpass}`);
    let username = req.body.username;
    let pass = req.body.userpass;

    const getUserAsync = promisify(client.hgetall).bind(client);
    let user = await getUserAsync(`${username}${pass}`);
    console.log(user);
  } catch (err) {
    console.log(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }

  // let curUserIndex = mockUsers.findIndex(
  //   (user) => user.userName === username
  // );

  //   console.log(curUserIndex);

  //   if (curUserIndex !== -1 && mockUsers[curUserIndex].pass === pass) {
  //     mockUsers[curUserIndex].isAuthenticated = true;
  //     console.log(`User ${mockUsers[curUserIndex].userName} is logged in`);
  //     res.send({ isAuthenticated: true, userID: mockUsers[curUserIndex].id });
  //   } else if (curUserIndex !== -1 && mockUsers[curUserIndex].pass !== pass) {
  //     res.send({ isAuthenticated: false, userID: -1 });
  //   }
  // } catch (err) {
  //   console.log(`Unexpected server error of ${err}`);
  //   res.status(404).send(`Error of ${err} not handled by server`);
  // }
};
