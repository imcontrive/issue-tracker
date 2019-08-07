import React, { Component } from "react";

class Login extends Component {
  state = {
    firstName:"",
    lastName:"",
    phone:"",
    email: "",
    password: "",

  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  loginHandler = e => {
    e.preventDefault();
    console.log(this.state);
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
            name="phone"
            value={this.state.phone}
            placeholder="phone"
            onChange={this.changeHandler}
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="email"
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

export default Login;
