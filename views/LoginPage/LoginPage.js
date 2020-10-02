import React, { useState, useEffect } from "react";
import "./LoginPage.scss";
import {  useHistory } from "react-router-dom";
import { useLocalStorage } from "./../hooks/useLocalStorage";

function LoginPage(props) {
  const API = props.API;
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const history = useHistory();
  const [sessionData, setSessionData] = useLocalStorage("authenticated", {
    isAuthenticated: false,
    userID: -1,
  });

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  let handleLoginAttempt = async (e) => {
    e.preventDefault();
    try {
      
      //validate input
      let userNameError = userName.length === 0 || userName.length > 80;
      let passError = pass.length === 0 || pass.length > 80;

      setUserNameError(userNameError);
      setPassError(passError);

      if (userNameError || passError) {
        return;
      }

      let response = await API.login({ userName, pass });
      setSessionData({ ...response });
      setLoginError(!response.isAuthenticated);

    } catch (err) {
      setLoginError(true);
      console.error(`Unexpected failure: ${err.message}`);
    }
  };

  // Authenticated users go right to game
  useEffect(() => {
    if (sessionData && sessionData.isAuthenticated) {
      history.push("/game");
    }
  }, [sessionData, setSessionData]);

  return (
    <div className="LoginPage">
      <h1>Welcome to Color Carnival</h1>
      <form onSubmit={handleLoginAttempt}>
        <div className="text-input">
          <label htmlFor="userName">First Name</label>
          <input
            className={`${userNameError ? "input-error-active" : ""}`}
            type="text"
            // required
            id="userName"
            name="userName"
            placeholder="Username"
            minLength={1}
            maxLength={80}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <p className={`error-msg ${userNameError ? "error-active" : ""}`}>
            First Name cannot be empty
          </p>
        </div>

        <div className="text-input">
          <label htmlFor="password">Password</label>
          <input
            className={`${passError ? "input-error-active" : ""}`}
            type="password"
            // required
            id="password"
            name="password"
            placeholder="Password"
            minLength={1}
            maxLength={80}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <p className={`error-msg ${passError ? "error-active" : ""}`}>
            Password cannot be empty
          </p>
        </div>

        <button
          className="button-button"
          type="submit"
          onClick={() => handleLoginAttempt}
        >
          Start Game
        </button>
        <p className={`login-error-msg ${loginError ? "error-active" : ""}`}>
          Incorrect username or password!
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
