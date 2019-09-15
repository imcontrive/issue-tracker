import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Sidebar from "./Sidebar";
import issueAction from "../actions/issue.action";
const socket = io();

class HomePage extends Component {
  state = {
    issues: [],
    category: ["all"],
    isResolved: "all",
    isUrgent: "all"
  };

  handleFilter = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleCategoryFilter = (name, value) => {
    this.setState({ [name]: new Array(value) });
  };
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/issues", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())

      .then(data => this.setState({ issues: data }));
    this.props.dispatch(issueAction.getNotifications(socket));
  }

  render() {
    const issues = this.state.issues.Issues;
    const filteredIssues =
      issues &&
      issues
        .filter(elm =>
          this.state.category[0] === "all"
            ? true
            : this.state.category[0] === elm.category[0]
        )
        .filter(elm =>
          this.state.isResolved === "all"
            ? true
            : Boolean(this.state.isResolved) === elm.isResolved
        )
        .filter(elm =>
          this.state.isUrgent === "all"
            ? true
            : this.state.isUrgent === elm.isUrgent
        );

    return (
      <div className="container">
        <div className="columns hero-body">
          <Sidebar
            user={this.props.user}
            handleFilter={this.handleFilter}
            handleCategoryFilter={this.handleCategoryFilter}
          />
          <div className="column is-9">
            {filteredIssues && filteredIssues.length > 0 ? (
              filteredIssues.map((elm, index) => {
                let createdAt = new Date(elm.createdAt);
                return (
                  <div key={index} className="card has-margin-bottom-25">
                    <div className="has-background-light">
                      <header className="card-header-title justify-space-between ">
                        <div>
                          <Link
                            to={{
                              pathname: `/singleIssue/${elm._id}`,
                              state: {
                                IssueId: elm._id,
                                userId: elm.createdBy[0]._id
                              }
                            }}
                          >
                            <p className="content title is-4">{elm.title}</p>
                          </Link>
                          <small>{createdAt.toDateString()}</small>
                        </div>

                        <div>
                          <Link
                            to={{
                              pathname: "/user",
                              state: { userId: elm.createdBy[0]._id }
                            }}
                          >
                            <span>{elm.createdBy[0].firstname}</span>
                          </Link>{" "}
                          <span>
                            {elm.isUrgent != undefined ? elm.isUrgent : null}
                          </span>
                        </div>
                      </header>

                      <div className="card-content">
                        <div className="content">{elm.description}</div>
                      </div>

                      <footer className="card-footer">
                        <p className="card-footer-item">
                          <span>
                            {elm.isResolved ? (
                              <span className="has-text-success">Resolved</span>
                            ) : (
                              <span className="has-text-danger">
                                Unresolved
                              </span>
                            )}
                          </span>
                        </p>

                        <p className="card-footer-item">
                          <span>{elm.category}</span>
                        </p>
                      </footer>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="has-text-centered">
                nothing to see here, go back to where you came from
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return { user: state.currentUser };
};

export default connect(mapPropsToState)(HomePage);
