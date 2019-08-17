import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Public from "../components/public";
import Protected from "../components/Protected";

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
        // console.log(data, "inside app");
        this.props.dispatch({ type: "USER_RELOAD", data });
      });
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          {this.props.currentUser && this.props.currentUser._id ? (
            <Protected />
          ) : (
            <Public />
          )}
        </Switch>
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
