import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./scss/index.scss";

export default function Wrapper({ children }) {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
}
