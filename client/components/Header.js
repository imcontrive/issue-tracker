import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Header extends Component {
  logoutHandler = () => {
    localStorage.setItem("token", "");
    this.props.history.push("/Login");
  };

  render() {
    // console.log(this.props.state.currentUser)
    return (
      <div>
        <nav
          className="navbar has-shadow has-background-grey-lighter"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="container is-black">
            <div className="navbar-brand">
              <NavLink className="navbar-item" to="/">
                ALTConcerns
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
                        {" "}
                        <span className="icon">
                          <i className="fas fa-home" />
                        </span>
                        <span>Home</span>
                      </NavLink>
                      <NavLink
                        to="/createIssue"
                        className="button"
                        activeClassName="is-primary"
                      >
                        <span className="icon">
                          <i className="fas fa-plus" />{" "}
                        </span>{" "}
                        <span>Raise An Issue</span>
                      </NavLink>
                      <button className="button" onClick={this.logoutHandler}>
                        <span className="icon">
                          <i className="fas fa-sign-out-alt" />{" "}
                        </span>{" "}
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="buttons">
                      <NavLink
                        to="/signup"
                        className="button"
                        activeClassName="is-primary"
                      >
                        <span className="icon">
                          <i className="fas fa-user-plus" />{" "}
                        </span>{" "}
                        <div>Sign Up</div>
                      </NavLink>
                      <NavLink
                        to="/login"
                        className="button"
                        activeClassName="is-primary"
                      >
                        <span className="icon">
                          <i className="fas fa-sign-in-alt" />{" "}
                        </span>{" "}
                        <span>Log in</span>
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return { state };
};

export default withRouter(connect(mapPropsToState)(Header));
