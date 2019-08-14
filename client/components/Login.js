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
    console.log("login");
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
      // .then(res => res.json())
      .then(res => {
        return res.status===200? res.json()
        // then(user => {
    //       // console.log(user)
    //       localStorage.setItem("user",JSON.stringify(user));
    //       this.setState({user})
    //       this.props.history.push({
    //         pathname: '/',
    //         state: { user }
    //       })
    //     }
    //       ):alert("something went wrong")
    // }
      .then(data => {
        localStorage.setItem("token",data.token)
        this.props.dispatch({type:'USER_LOGIN_SUCCESS',data})
        this.props.history.push("/")
        console.log(data)
      }):alert("invalid credentials")})
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
