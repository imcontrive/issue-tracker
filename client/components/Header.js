import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Header extends Component {
  logoutHandler = () => {
    localStorage.setItem("token", "");
    this.props.dispatch({ type: "LOG_OUT" });
    this.props.history.push("/login");
  };

  onClick = () => {
    let toggle = document.querySelector(".burger");
    let menu = document.querySelector(".navbar-menu");
    toggle.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  };

  render() {
    // console.log(this.props.state.currentUser.user);
    const { user } = this.props.state.currentUser;
    console.log(user, "check");
    return (
      <nav
        className="navbar has-shadow has-background-grey-lighter"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container is-black">
          <div className="navbar-brand">
            {user && user._id ? (
              <NavLink className="navbar-item" to="/">
                ALTConcerns
              </NavLink>
            ) : (
              <p className="navbar-item">ALTConcerns</p>
            )}
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              onClick={this.onClick}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                {user ? (
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

                    {user && !user.isAdmin ? null : (
                      <NavLink
                        to="/inviteUsers"
                        className="button"
                        activeClassName="is-primary"
                      >
                        <span className="icon">
                          <i className="fas fa-user-friends" />{" "}
                        </span>{" "}
                        <span>Invite</span>
                      </NavLink>
                    )}

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
                      to="/register"
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
                    {/* {
                      this.props.user.user && this.props.user.user.isAdmin ? 
                      <NavLink
                      to="/inviteUsers"
                      className="button"
                      activeClassName="is-primary"
                    >
                      <span className="icon">
                        <i className="fas fa-sign-in-alt" />{" "}
                      </span>{" "}
                      <span>inviteUsers</span>
                    </NavLink>: ""
                    } */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapPropsToState = state => {
  return { state };
};

export default withRouter(connect(mapPropsToState)(Header));
