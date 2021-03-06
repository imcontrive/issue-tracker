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
    fetch(`http://localhost:4000/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({ type: "USER_RELOAD", data });
      });
  }

  render() {
    return (

      <React.Fragment>
        <Header />
        {this.props.currentUser && this.props.currentUser._id ? (
          <Protected />
        ) : (
          <Public />
        )}
      </React.Fragment>

    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(mapStateToProps)(App);
