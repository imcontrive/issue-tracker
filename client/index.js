import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "./scss/index.scss";
import "./../public/stylesheets/style.css";
import Wrapper from "./Wrapper";

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById("root")
);
