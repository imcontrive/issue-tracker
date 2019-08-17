import React, { Component } from "react";
import { Route } from "react-router-dom";

import createIssue from "./CreateIssue";
import HomePage from "./HomePage";
import SingleIssue from "./SingleIssue";
import User from "./User";
import UpdateUser from "./UpdateUser";
import UpdateIssue from "./UpdateIssue";

export default class Protected extends Component {
  render() {
    return (
      <>
        <Route exact path="/" component={HomePage} />
        <Route path="/createIssue" component={createIssue} />
        <Route path="/singleIssue" component={SingleIssue} />
        <Route path="/user" component={User} />
        <Route path="/UpdateUser" component={UpdateUser} />
        <Route path="/UpdateIssue" component={UpdateIssue} />
      </>
    );
  }
}
