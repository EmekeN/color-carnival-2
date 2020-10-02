if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Require dependencies
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mockUsers = require("../utils/mockUsers");
const { generateGame } = require("../utils/game");
const getDates = require("../utils/date");

const app = express();

//Set up Middleware
app.use(express.static(path.join(__dirname + "/../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("common"));

//Set up server
app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

//Serve Static Files
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
  next();
});

/**
 * Route for login
 * @returns {JSON} {isAunthenticated: boolean, userID: Number}
 */
app.post("/", (req, res) => {
  try {
    console.log(`Request username: ${req.body.username}`);
    console.log(`Request pass ${req.body.userPass}`);

    let userName = req.body.username;
    let pass = req.body.userPass;
    let curUserIndex = mockUsers.findIndex(
      (user) => user.userName === userName
    );

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
});

/**
 * Logs user out
 * @returns {JSON} - {isAuthenticated: Boolean, userID: Number}
 */
app.post("/logout/:id", (req, res) => {
  try {
    let id = parseInt(req.params["id"]);
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
});

app.get("/game", (req, res, next) => {
  /**
   * Client must be authenticated view route
   * Redirect to "/" if not
   * Client handles auth for this route
   */
  res.redirect("/");
});

/**
 * Generates a game and returns the state
 * @returns {JSON} - {targetColor: Object, colors: Array}
 */
app.get("/game/state", (req, res) => {
  try {
    const gameState = generateGame();
    console.log(`Game State Generated: \n ${gameState}`);
    res.send(gameState);
  } catch (err) {
    console.error(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
});

/**
 * Updates users win/loss ratio and returns a new game
 * @returns {JSON} - {targetColor: Object, colors: Array}
 */
app.post("/game/state/:id", (req, res) => {
  try {
    console.log(`Request parameters: ${req.params["id"]}`);
    let id = parseInt(req.params["id"]);
    console.log(`Success body is : ${req.body.success}`);
    let success = req.body.success;
    let curUserIndex = mockUsers.findIndex((user) => user.id === id);

    if (curUserIndex !== -1) {
      success
        ? mockUsers[curUserIndex].wins++
        : mockUsers[curUserIndex].losses++;

      console.log(
        `User ${mockUsers[curUserIndex].userName} now has ${mockUsers[curUserIndex].wins} wins & ${mockUsers[curUserIndex].losses} losses`
      );

      let newGame = generateGame();
      res.send(newGame);
    } else {
      res.status(400).send("No Game State Doesn't Exist For User");
    }
  } catch (err) {
    console.log(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
});

/**
 * Get time in NYC & SFO
 * @returns {JSON} - {nycDateFormat: String, sfoDateFormat: String}
 */
app.get("/date", (req, res) => {
  try {
    let dates = getDates();
    res.send(dates);
  } catch (err) {
    console.error(`Server Caught exception ${err}`);
    res.status(500).send("Unexpected Server Exception");
  }
});

/**
 * Get user information
 * @returns {JSON} - {userName: String, wins: Number, losses:Number}
 */
app.get("/user/:id", (req, res) => {
  try {
    console.log(`Params are ${req.params["id"]}`);
    let id = parseInt(req.params["id"]);
    let curUser = mockUsers.find((user) => user.id === id);

    if (curUser !== undefined) {
      console.log(`Found User ${curUser.userName}`);
      res.send({
        userName: curUser.userName,
        wins: curUser.wins,
        losses: curUser.losses,
      });
    } else {
      res.status(400).send("User Does Not Exist");
    }
  } catch (err) {
    console.error(`Unexpected server error of ${err}`);
    res.status(404).send(`Error of ${err} not handled by server`);
  }
});

//Redirect to home if no other routes used
app.get("/*", (req, res) => {
  res.redirect("/");
});

module.exports = app;