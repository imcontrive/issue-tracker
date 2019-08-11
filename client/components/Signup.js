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

  loginHandler = e => {
    console.log("signup");
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
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));

    // console.log(body);
  };
  render() {
    return (
      <>
        <form>
          <input
            name="firstName"
            value={this.state.firstName}
            placeholder="firstName"
            onChange={this.changeHandler}
          />
          <input
            name="lastName"
            value={this.state.lastName}
            placeholder="lastName"
            onChange={this.changeHandler}
          />
          <input
            name="phonenumber"
            value={this.state.phonenumber}
            placeholder="phone number"
            onChange={this.changeHandler}
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="enter your email"
            onChange={this.changeHandler}
          />
          <input
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.changeHandler}
          />
          <button onClick={this.loginHandler}>Register</button>
        </form>
      </>
    );
  }
}

export default Signup;
