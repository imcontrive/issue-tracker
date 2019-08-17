import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    console.log(body);

    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      // .then(res => res.json())
      .then(res => {
        return res.status === 200
          ? res
              .json()
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
                localStorage.setItem("token", data.token);
                this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data });
                this.props.history.push("/");
                console.log(data);
              })
          : console.log(res,"errror from backend")
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
                <div className="field is-grouped is-grouped-right">
                  {
                    this.state.email && this.state.password ?
                  <button
                    className="button is-primary"
                    onClick={this.loginHandler}
                  >
                    Log in
                  </button> : <p className="has-text-danger has-text-center">Plz fill all the filled</p>
                  }
                </div>
                <p className="has-text-centered">
                  <Link to="/signup">Don't have an account? Sign Up</Link>
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
