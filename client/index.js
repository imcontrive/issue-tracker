import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "./../public/stylesheets/style.css";
import Wrapper from "./Wrapper";
import 'bulma-helpers/css/bulma-helpers.min.css';

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.getElementById("root")
);
