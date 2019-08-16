import React, { Component } from "react";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
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
    const { firstName, lastName, email, phonenumber, password } = this.state;
    const body = { firstName, lastName, email, phonenumber, password };
    fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res,"cp")
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));

    // console.log(body);
  };
  render() {
    return (
      <>
        <section className="hero is-primary is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
            <p className="title">Sign Up</p>
              <div className="column is-half is-offset-one-quarter box">
                
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="firstName"
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
                      name="lastName"
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
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Signup;
