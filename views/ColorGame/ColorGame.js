import React, { useEffect, useState } from "react";
import "./ColorGame.scss";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";

function ColorGame(props) {
  const [userName, setUserName] = useState("");
  const [winLoss, setWinLoss] = useState({
    wins: 0,
    losses: 0,
  });
  const [gameState, setGameState] = useState({
    targetColor: { red: 0, green: 0, blue: 0 },
    colors: [],
  });
  const [dates, setDates] = useState({ sfoDateFormat: "", nycDateFormat: "" });
  const history = useHistory();
  const [sessionData, setSessionData] = useLocalStorage("authenticated", {
    isAuthenticated: false,
    userID: -1,
  });

  let API = props.API;

  useEffect(() => {
    const loadDefaultState = async () => {
      //redirect if user isn't signed in
      if (!sessionData || !sessionData.isAuthenticated) {
        history.push("/");
      }

      try {
        let userID = sessionData.userID;
        // fetch game state
        let gameState = await API.getGameState();
        setGameState(gameState);

        // fetch time strings
        let timeData = await API.getDate();
        setDates({ ...timeData });

        // fetch header info
        let { userName, wins, losses } = await API.getUser(userID);
        setUserName(userName);
        setWinLoss({ wins, losses });
      } catch (err) {
        console.error(`Something went wrong with logout: ${err}`);
      }
    };
    loadDefaultState();
  }, []);

  let handleColorSelected = async (color) => {
    try {
      let isCorrect =
        gameState.targetColor.red === color.red &&
        gameState.targetColor.green === color.green &&
        gameState.targetColor.blue === color.blue;

      let userID = sessionData.userID;

      // update game state
      let newGame = await API.postGameChoice(userID, isCorrect);
      setGameState(newGame);

      // update current time
      let dates = await API.getDate();
      setDates(dates);

      //update win/losses
      let { userName, wins, losses } = await API.getUser(userID);
      setUserName(userName);
      setWinLoss({ wins, losses });
    } catch (err) {
      console.error(`Something went wrong with selecting color: ${err}`);
    }
  };

  let handleLogout = async () => {
    try {
      let userID = sessionData.userID;
      let res = await API.logout(userID);

      setSessionData({ ...res });
      history.push("/");
    } catch (err) {
      console.error(`Something went wrong with logout: ${err}`);
    }
  };

  return (
    <div className="ColorGame">
      <div className="container">
        <div className="header">
          <h1 className="user">
            <span className="user">{`${userName}'s Color Grid `}</span>
            {"("}
            <span className="wins">{`${winLoss.wins} wins `}</span>
            {", "}
            <span className="losses">{`${winLoss.losses} losses`}</span>
            {")"}
          </h1>
        </div>

        <div className="color-grid">
          {gameState && gameState.colors.length > 0
            ? gameState.colors.map((color, idx) => {
                return (
                  <div
                    key={
                      idx *
                      (color.red + color.green + color.blue) *
                      Math.random()
                    }
                    className="color"
                    onClick={() => handleColorSelected({ ...color })}
                    style={{
                      backgroundColor: `rgb(${color.red}, ${color.green},${color.blue} )`,
                    }}
                  />
                );
              })
            : "Loading..."}
          <div className="color solution">
            <p>Find this color!</p>
            <p>
              {`rgb(${gameState.targetColor.red},${gameState.targetColor.green},${gameState.targetColor.blue})`}
            </p>
          </div>
        </div>

        <div className="footer">
          <button onClick={handleLogout}>Sign Out?</button>
          <div className="dates">
            <p className="date">{`San Francisco Time ${
              dates.sfoDateFormat ? dates.sfoDateFormat : ""
            }`}</p>
            <p className="date">{`New York Time ${
              dates.nycDateFormat ? dates.nycDateFormat : ""
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorGame;
