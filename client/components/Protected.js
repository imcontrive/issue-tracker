import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import createIssue from "./CreateIssue";
import HomePage from "./HomePage";
import SingleIssue from "./SingleIssue";
import User from "./User";
import UpdateUser from "./UpdateUser";
import UpdateIssue from "./UpdateIssue";
import InviteUser from "./InviteUser";
import { Error } from "./Error";

export default class Protected extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/createIssue" component={createIssue} />
        <Route path="/singleIssue" component={SingleIssue} />
        <Route path="/user" component={User} />
        <Route path="/UpdateUser" component={UpdateUser} />
        <Route path="/UpdateIssue" component={UpdateIssue} />
        <Route path="/inviteUsers" component={InviteUser} />
        <Route path="*" component={Error} />
      </Switch>
    );
  }
}
