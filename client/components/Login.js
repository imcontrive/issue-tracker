import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMsg:""
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
      .then(res => {
        console.log(res,"shubham is here")
        return res.status === 200
          ? res.json().then(data => {

              localStorage.setItem("token", data.token);
              this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data });
              this.props.history.push("/");
            })
          : console.log(res, "errror from backend");
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <form>
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <p className="title has-text-centered">Login</p>
              <div className="column is-half is-offset-one-quarter box has-background-light">
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

                {this.state.email && this.state.password ? (
                  <div className="field is-grouped is-grouped-right">
                    <button
                      className="button is-primary"
                      onClick={this.loginHandler}
                    >
                      LOG IN
                    </button>
                  </div>
                ) : (
                  <p className="has-text-danger has-text-centered">
                    Plz fill all the filled
                  </p>
                )}

                <p className="has-text-centered">
                  <Link to="/register">Don't have an account? Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </form>
    );
  }
}

export default connect()(Login);
