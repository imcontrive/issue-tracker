import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";

export default class Public extends Component {
  render() {
    return (
    <>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} />
    </>
    );
  }
}
