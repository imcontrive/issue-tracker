import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

class Header extends Component {

  logoutHandler = () => {
    localStorage.setItem("token","")
    this.props.history.push("/")
  }

  render() {
      console.log(this.props.state.currentUser)
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink className="navbar-item" to="/">
              <h4>ALTConcerns</h4>
            </NavLink>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                {localStorage.token ? (
                  <div className="buttons">
                    <NavLink
                      to="/"
                      exact
                      className="button"
                      activeClassName="is-primary"
                    >
                      <strong>Home</strong>
                    </NavLink>
                    <NavLink
                      to="/createIssue"
                      className="button"
                      activeClassName="is-primary"
                    >
                      Raise An Issue
                    </NavLink>
                    <button onClick={this.logoutHandler}>
                      logout
                    </button>
                  </div>
                ) : (
                  <div className="buttons">
                    <NavLink
                      to="/signup"
                      className="button"
                      activeClassName="is-primary"
                    >
                      <strong>Sign Up</strong>
                    </NavLink>
                    <NavLink
                      to="/login"
                      className="button"
                      activeClassName="is-primary"
                    >
                      Log In
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapPropsToState = (state) => {
    return {state}
  }

export default withRouter(connect(mapPropsToState)(Header))