import React, { Component } from "react";

class Login extends Component {
  state = {
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
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <>
        <form>
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
          <button onClick={this.loginHandler}>login</button>
        </form>
      </>
    );
  }
}

export default Login;
