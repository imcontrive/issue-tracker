import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class User extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.location.state.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({
          user: data.user
        });
      });
  }

  render() {
    // console.log(this.props.user._id===this.props.location.state.userId)
    return (
      <>
        <h1>{this.state.user.email}</h1>
        {this.props.user._id === this.props.location.state.userId ? (
          <Link
            to={{
              pathname: "/updateUser",
              state: { userId: this.props.location.state.userId }
            }}
          >
            <button>Update</button>
          </Link>
        ) : null}
      </>
    );
  }
}

export default connect(state => state.currentUser)(User);
