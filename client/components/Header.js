import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  render() {
      console.log(this.props.state.currentUser)
    return (
      <div style={{color: "red"}}>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink className="navbar-item" to="/">
              <h4>ALTConcerns</h4>
            </NavLink>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                {this.props.state.currentUser ? (
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

export default connect(mapPropsToState)(Header)