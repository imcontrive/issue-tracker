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
    // console.log(this.props.location,"check point..............");
    // console.log(this.props.user._id===this.props.location.state.userId)
    return (
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{this.state.user.email}</h1>
            <div className="field is-grouped is-grouped-right">
              {this.props.user._id === this.props.location.state.userId ? (
                <Link
                  to={{
                    pathname: "/updateUser",
                    state: { userId: this.props.location.state.userId }
                  }}
                >
                  <button className="button">Update</button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default connect(state => state.currentUser)(User);
