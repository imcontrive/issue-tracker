import React, { Component } from "react";
import { connect } from "react-redux";
import {Link } from 'react-router-dom';

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
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token",data.token)
        this.props.dispatch({type:'USER_LOGIN_SUCCESS',data})
        this.props.history.push("/")
        console.log(data)
      })
      .catch(error => console.error("Error:", error));

  };
  render() {
    return (
      <>
        <div class="isLoginWrapper">
					<div class="grid">
						<form class="form login">
							<div class="form__field">
								<label for="email">
									<svg class="icon">
										<span class="hidden">Email</span>
									</svg>
								</label>
								<input id="login__username" type="text" class="form__input" placeholder="Email" onChange={this.changeHandler} name='email' type="email"  value={this.state.email}  required />
							</div>

							<div class="form__field">
								<label for="password">
									<svg class="icon">
										<span class="hidden">Password</span>
									</svg>
								</label>
								<input id="login__password" type="password" name="password" class="form__input" placeholder="Password" name='password' onChange={this.changeHandler} type="password" value={ this.state.password } required />
							</div>

							<div class="form__field">
								<input type="submit" value="Sign In" onClick={this.loginHandler}/>
							</div>
						</form>
						<p class="text--center rg-link">Don't have an account?<Link to="/register" className="link-sn">Sign up now</Link></p>
				</div>
			</div>
      </>
    );
  }
}

export default connect()(Login);
