import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import ColorGame from "./ColorGame/ColorGame";
import API from "./API";
import "./App.scss";
import "./base.scss";

const App = () => {
  const clientAPI = new API();
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <LoginPage {...props} API={clientAPI} />}
          />

          <Route
            exact
            path="/game"
            render={(props) => <ColorGame {...props} API={clientAPI} />}
          />

          <Route path="/*" component={LoginPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
