import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "../scss/index.scss";
import { getCurrentUser, noToken } from "../actions";

import Home from "../components/Home";
import Header from "../components/Header";
import Login from "../components/Login";
import Signup from "../components/Signup";
import createIssue from "../components/CreateIssue"

class App extends Component {
  state = {
    token: ""
  };


  componentDidMount() {
    var token = localStorage.getItem("token") || "";
    if (token) {
      this.setState({ token: token });
      this.props.dispatch(getCurrentUser());
    } else {
      this.props.dispatch(noToken());
    }
  }
  

  render() {
    return (
      <>
        <Router>
        <Header/>
          <Route exact path="/" component={Home} />
          <Route  path="/login" component={Login} />
          <Route  path="/register" component={Signup} />
          <Route  path="/createIssue" component={createIssue} />
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
