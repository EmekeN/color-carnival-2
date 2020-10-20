const mockUsers = require("./../../../utils/game");
/**
 * Logs user out
 * @returns {Object} - {isAuthenticated: Boolean, userID: Number}
 */

 module.exports = (req, res) => {
    try {
        let id = parseInt(req.query.member);
        let curUserIndex = mockUsers.findIndex((user) => user.id === id);
    
        if (curUserIndex !== -1) {
          mockUsers[curUserIndex].isAuthenticated = false;
          console.log(`User ${mockUsers[curUserIndex].userName} is signed out`);
          res.send({ isAuthenticated: false, userID: -1 });
        } else {
          res.status(400).send("User Does Not Exist");
        }
      } catch (err) {
        console.error(`Unexpected server error of ${err}`);
        res.status(404).send(`Error of ${err} not handled by server`);
      }
 }
