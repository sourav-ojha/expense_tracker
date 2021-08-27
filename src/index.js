import React from "react";
import ReactDom from "react-dom";
import { Provider } from "./context/context";
import App from "./App";
import "./App.css";

ReactDom.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
