import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Components/Router";
import { Provider } from "react-redux";
import configureStore from "./Container/Store/configureStore";

let store = configureStore(); /djfbdj

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
