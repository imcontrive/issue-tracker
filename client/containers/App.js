import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../scss/index.scss";
import { getCurrentUser, noToken } from "../actions";

import HomePage from "../components/HomePage";
import Header from "../components/Header";
import Login from "../components/Login";
import Signup from "../components/Signup";
import createIssue from "../components/CreateIssue"

class App extends Component {
  state = {
    token: ""
  };

  componentDidMount() {
    var token = localStorage.getItem("authToken") || "";
    if (token) {
      this.setState({ token: token });
      this.props.dispatch(getCurrentUser());
    } else {
      this.props.dispatch(noToken());
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Route exact path="/" component={HomePage} />
          <Route  path="/Login" component={Login} />
          <Route  path="/Signup" component={Signup} />
          <Route  path="/createIssue" component={createIssue} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps)(App);
