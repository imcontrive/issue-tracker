import React, { Component } from "react";
import { connect } from "react-redux"

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
    const { email, password } = this.state;
    const body = { email, password };

    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token",data.token)
        this.props.dispatch({type:'USER_LOGIN_SUCCESS',data})
        this.props.history.push("/")
      })
      .catch(error => console.error("Error:", error));

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

export default connect()(Login);
