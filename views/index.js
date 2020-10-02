import React from "react";
import ReactDom from "react-dom";
import { hot } from "react-hot-loader";
import App from "./App";
import "normalize.css";

ReactDom.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
