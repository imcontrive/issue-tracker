import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../scss/index.scss";

import Header from "../components/Header";
import Login from "../components/Login";
import Signup from "../components/Signup";
import createIssue from "../components/CreateIssue";
import HomePage from "../components/HomePage";
import SingleIssue from "../components/SingleIssue";
import User from "../components/User"
import UpdateUser from"../components/UpdateUser"
import UpdateIssue from "../components/UpdateIssue";

class App extends Component {
  state = {
    token: ""
  };


  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "inside app");
        this.props.dispatch({ type: "USER_RELOAD", data });
      });
  }
  

  render() {
    return (
      <>
        <Router>
          <Header />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Signup} />
          <Route path="/createIssue" component={createIssue} />
          <Route path="/singleIssue" component={SingleIssue} />
          <Route path="/user" component={User} />
          <Route path ="/UpdateUser" component={UpdateUser} />
          <Route path="/UpdateIssue" component={UpdateIssue} />
        </Router>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps)(App);
