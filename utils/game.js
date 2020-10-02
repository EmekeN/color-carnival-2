
/**
 * Generates the target color and colors to use for the game
 * @returns {Object} {targetColor: Object, colors: Array}
 */
function generateGame() {
  let targetColor = getColor();
  let colors = [];
  colors.push(targetColor);

  //generate array
  for (let i = 0; i < 5; i++) colors.push(getColor());

  //shuffle array
  for (let i = colors.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = colors[i];
    colors[i] = colors[j];
    colors[j] = temp;
  }

  return {
      targetColor: targetColor,
      colors: colors
  }
}

function getColor() {
  return {
    red: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
  };
}

module.exports = {
  generateGame: generateGame,
};
