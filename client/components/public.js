import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";

export default class Public extends Component {
  render() {
    return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Signup} />
      <Route render={() => <h1>Hello</h1>} />
    </Switch>
    );
  }
}
