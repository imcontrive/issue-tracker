import React, { Component } from "react";
import {Link} from 'react-router-dom';
import queryString from 'query-string';



class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: "",
    cnfmPassword:"",
  };

  // Invitation handling in CDM 
  componentDidMount(){
    const refCode = queryString.parse(location.search).ref;
    console.log(refCode, 'ref')
    fetch(`http://localhost:3000/api/v1/invites/${refCode}`)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        this.setState({
          email: data.user.email
        })
      }
    })
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  signupHandler = e => {
    e.preventDefault();
    const { firstname, lastname, email, phonenumber, password } = this.state;
    const body = { firstname, lastname, email, phonenumber, password };
    fetch("http://localhost:3000/api/v1/users/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
      .then(data => {
        console.log(data, "cp");
        this.props.history.push("/Login");
      })
      .catch(error => console.error("Error:", error));
  };

  

  render() {
    const {firstname,lastname,phonenumber,email,password} = this.state;
    return (
      <React.Fragment>
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container">
              <p className="title has-text-centered">Sign Up</p>
              <div className="column is-half is-offset-one-quarter box has-background-light">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="firstname"
                      value={this.state.firstName}
                      placeholder="firstName"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="lastname"
                      value={this.state.lastName}
                      placeholder="lastName"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="phonenumber"
                      value={this.state.phonenumber}
                      placeholder="phone number"
                      onChange={this.changeHandler}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-mobile" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                      // readOnly={true}
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
                    firstname && lastname && phonenumber && email && password ?
                    <button 
                    className="button is-primary"
                    onClick={this.signupHandler}
                    >
                    SIGN UP
                    </button>
                   : <p className="has-text-center has-text-danger">Please Fill all the field</p>
                  }
                </div>
                <p className="has-text-centered">
                  <Link to="/login">Already have an account? LogIn</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Signup;
