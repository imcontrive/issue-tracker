import React, { Component } from "react";
import {Link} from 'react-router-dom';

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    password: "",
    cnfmPassword:"",
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  loginHandler = e => {
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
    const {firstName,lastName,phonenumber,email,password,cnfmPassword} = this.state;
    return (
      <>
        <div class="isLoginWrapper">
					<div class="grid">
            <h2 className="signup-title">Register</h2>
						<form class="form login">
							<div class="form__field">
								<label for="email">
									<svg class="icon">
										<span class="hidden">FirstName</span>
									</svg>
								</label>
								<input id="login__username" type="text" class="form__input" name="firstName"
                value={this.state.firstName}
                placeholder="firstName"
                onChange={this.changeHandler}  required />
							</div>
              <div class="form__field">
								<label for="email">
									<svg class="icon">
										<span class="hidden">LastName</span>
									</svg>
								</label>
								<input id="login__username" type="text" class="form__input" name="lastName" value={this.state.lastName}
            placeholder="lastName"
            onChange={this.changeHandler}  required />
							</div>
              <div class="form__field">
								<label for="email">
									<svg class="icon">
										<span class="hidden">phoneNumber</span>
									</svg>
								</label>
								<input id="login__username" type="text" class="form__input" name="phonenumber"
            value={this.state.phonenumber}
            placeholder="phone number"
            onChange={this.changeHandler}  required />
							</div>
              <div class="form__field">
								<label for="email">
									<svg class="icon">
										<span class="hidden">phoneNumber</span>
									</svg>
								</label>
								<input id="login__username" type="text" class="form__input" placeholder="Email" onChange={this.changeHandler} name='email' type="email" value={this.state.email}  required />
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
								<label for="password">
									<svg class="icon">
										<span class="hidden">Password</span>
									</svg>
								</label>
								<input id="login__password" type="password" name="cnfmPassword" class="form__input" placeholder=" Confirm Password"  onChange={this.changeHandler} type="password" value={ this.state.cnfmPassword } required />
							</div>

							<div class="form__field">
              {
                firstName && lastName && phonenumber && email && password && cnfmPassword ?
                  <input type="submit" value="REGISTER" onClick={this.loginHandler}/> : <p style={{color:"red",paddingLeft:"50px"}}>Please Fill all the field</p>
              }
							</div>
						</form>
						<p class="text--center rg-link">Already have an account?<Link to="/login" className="link-sn">LOGIN NOW</Link>
</p>
				</div>
			</div>
      </>
    );
  }
}

export default Signup;
