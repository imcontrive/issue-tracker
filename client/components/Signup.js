import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    password: "",
    cnfmPassword: ""
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
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));

    // console.log(body);
  };
  render() {
    const {
      firstName,
      lastName,
      phonenumber,
      email,
      password,
      cnfmPassword
    } = this.state;
    return (
      <>
        <div className="isLoginWrapper">
          <div className="grid">
            <h2 className="signup-title">Register</h2>
            <form className="form login">
              <div className="form__field">
                <label for="email">
                  <svg className="icon">
                    <span className="hidden">FirstName</span>
                  </svg>
                </label>
                <input
                  id="login__username"
                  type="text"
                  className="form__input"
                  name="firstName"
                  value={this.state.firstName}
                  placeholder="firstName"
                  onChange={this.changeHandler}
                  required
                />
              </div>
              <div className="form__field">
                <label for="email">
                  <svg className="icon">
                    <span className="hidden">LastName</span>
                  </svg>
                </label>
                <input
                  id="login__username"
                  type="text"
                  className="form__input"
                  name="lastName"
                  value={this.state.lastName}
                  placeholder="lastName"
                  onChange={this.changeHandler}
                  required
                />
              </div>
              <div className="form__field">
                <label for="email">
                  <svg className="icon">
                    <span className="hidden">phoneNumber</span>
                  </svg>
                </label>
                <input
                  id="login__username"
                  type="text"
                  className="form__input"
                  name="phonenumber"
                  value={this.state.phonenumber}
                  placeholder="phone number"
                  onChange={this.changeHandler}
                  required
                />
              </div>
              <div className="form__field">
                <label for="email">
                  <svg className="icon">
                    <span className="hidden">phoneNumber</span>
                  </svg>
                </label>
                <input
                  id="login__username"
                  type="text"
                  className="form__input"
                  placeholder="Email"
                  onChange={this.changeHandler}
                  name="email"
                  type="email"
                  value={this.state.email}
                  required
                />
              </div>

              <div className="form__field">
                <label for="password">
                  <svg className="icon">
                    <span className="hidden">Password</span>
                  </svg>
                </label>
                <input
                  id="login__password"
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  name="password"
                  onChange={this.changeHandler}
                  type="password"
                  value={this.state.password}
                  required
                />
              </div>
              <div className="form__field">
                <label for="password">
                  <svg className="icon">
                    <span className="hidden">Password</span>
                  </svg>
                </label>
                <input
                  id="login__password"
                  type="password"
                  name="cnfmPassword"
                  className="form__input"
                  placeholder=" Confirm Password"
                  onChange={this.changeHandler}
                  type="password"
                  value={this.state.cnfmPassword}
                  required
                />
              </div>

              <div className="form__field">
                {firstName &&
                lastName &&
                phonenumber &&
                email &&
                password &&
                cnfmPassword ? (
                  <input
                    type="submit"
                    value="REGISTER"
                    onClick={this.signupHandler}
                  />
                ) : (
                  <p style={{ color: "red", paddingLeft: "50px" }}>
                    Please Fill all the field
                  </p>
                )}
              </div>
            </form>
            <p className="text--center rg-link">
              Already have an account?
              <Link to="/login" className="link-sn">
                LOGIN NOW
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
