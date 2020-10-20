const { generateGame } = require("./../../../utils/game");
const mockUsers = require("../../../utils/createUsers");
/**
 * Updates users win/loss ratio and returns a new game
 * @returns {Object} - {targetColor: Object, colors: Array}
 */

module.exports = (req, res) => {
  // try {
  //   console.log(`Request parameters: ${req.query.id}`);
  //   let id = parseInt(req.query.id);
  //   console.log(`Success body is : ${req.body.success}`);
  //   let success = req.body.success;
  //   let curUserIndex = mockUsers.findIndex((user) => user.id === id);
  //   console.log(`Cur User index is ${curUserIndex}`);
    
  //   if (curUserIndex !== -1) {
  //     success
  //       ? mockUsers[curUserIndex].wins++
  //       : mockUsers[curUserIndex].losses++;

  //     console.log(
  //       `User ${mockUsers[curUserIndex].userName} now has ${mockUsers[curUserIndex].wins} wins & ${mockUsers[curUserIndex].losses} losses`
  //     );

  //     let newGame = generateGame();
  //     res.send(newGame);
  //   } else {
  //     res.status(400).send("No Game State Doesn't Exist For User");
  //   }
  // } catch (err) {
  //   console.log(`Unexpected server error of ${err}`);
  //   res.status(404).send(`Error of ${err} not handled by server`);
  // }
};
