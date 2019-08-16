import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: ""
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  signupHandler = e => {
    // console.log("signup");
    e.preventDefault();
    const { firstname, lastname, email, phonenumber, password } = this.state;
    const body = { firstname, lastname, email, phonenumber, password };
    fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res, "cp");
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));

    // console.log(body);
  };
  render() {
    return (
      <>
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <p className="title">Sign Up</p>
              <div className="column is-half is-offset-one-quarter box has-background-light">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="firstname"
                      value={this.state.firstName}
                      placeholder="firstName"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="lastname"
                      value={this.state.lastName}
                      placeholder="lastName"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="phonenumber"
                      value={this.state.phonenumber}
                      placeholder="phone number"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-mobile" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                </div>
                <div className="field is-grouped is-grouped-right">
                  <button
                    className="button is-primary"
                    onClick={this.signupHandler}
                  >
                    Sign Up
                  </button>
                </div>
                <Link to="/login">Already have an account? LogIn</Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Signup;
