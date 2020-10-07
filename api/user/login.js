const mockUsers = require("../../utils/mockUsers");

/**
 * Route for login
 * @returns {Object} {isAunthenticated: boolean, userID: Number}
 */
module.exports = (req, res) => {
  try {
    console.log(`Request username: ${req.body.username}`);
    console.log(`Request pass ${req.body.userpass}`);
    let username = req.body.username;
    let pass = req.body.userpass;
    let curUserIndex = mockUsers.findIndex(
      (user) => user.userName === username
    );

    console.log(curUserIndex);

    if (curUserIndex !== -1 && mockUsers[curUserIndex].pass === pass) {
      mockUsers[curUserIndex].isAuthenticated = true;
      console.log(`User ${mockUsers[curUserIndex].userName} is logged in`);
      res.send({ isAuthenticated: true, userID: mockUsers[curUserIndex].id });
    } else if (curUserIndex !== -1 && mockUsers[curUserIndex].pass !== pass) {
      res.send({ isAuthenticated: false, userID: -1 });
    }
  } catch (err) {
    console.log(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
};