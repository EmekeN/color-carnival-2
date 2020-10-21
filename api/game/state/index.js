const {generateGame} = require("./../../../utils/game");
/**
 * Generates a game and returns the state
 * @returns {Object} - {targetColor: Object, colors: Array}
 */

 module.exports = (req, res) => {
    try {
        const gameState = generateGame();
        console.log(`Game State Generated: \n ${gameState}`);
        res.send(gameState);
      } catch (err) {
        console.error(`Unexpected server error of ${err}`);
        res.status(404).send(`Error of ${err} not handled by server`);
      }
 }