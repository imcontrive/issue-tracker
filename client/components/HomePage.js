import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    issues: [],
    category: ["all"],
    isResolved: "all",
    isUrgent:"all"
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
  }

  render() {
    const issues = this.state.issues.Issues;
    return (
      <div className="container">
        <div className="columns hero-body">
          <div className="column">
            <div className="box has-background-light">
              <h2 className=" title is-4 has-text-centered">Filter</h2>
              <ul>
                {this.props.user.user && this.props.user.user.isAdmin ? (
                  <li>
                    Urgency
                    <div className="field">
                      <div className="control">
                        <div className="select">
                          <select
                            name="isUrgent"
                            onChange={e => {
                              this.handleFilter(e.target.name, e.target.value);
                            }}
                          >
                            <option value="all">All</option>
                            <option value="veryUrgent">Very Urgent</option>
                            <option value="urgent">Urgent</option>
                            <option value="notUrgent">Not Urgent</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ) : null}
                <li>
                  Categories
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          name="category"
                          onChange={e => {
                            this.handleCategoryFilter(
                              e.target.name,
                              e.target.value
                            );
                          }}
                        >
                          <option value="all">All</option>
                          <option value="electricity">electricity</option>
                          <option value="water">water</option>
                          <option value="food">food</option>
                          <option value="others">others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  Resolved
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          name="isResolved"
                          onChange={e => {
                            this.handleFilter(e.target.name, e.target.value);
                          }}
                        >
                          <option value="all">All</option>
                          <option value=" "> Resolved</option>
                          <option value="">Unresolved</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="column is-9">
            {issues &&
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
                    : (this.state.isUrgent) === elm.isUrgent
                )
                .map((elm, index) => {
                  let createdAt = new Date(elm.createdAt);
                  return (
                    <div key={index} className="card has-margin-bottom-25">
                      <div className="has-background-light">
                        <header className="card-header-title justify-space-between ">
                          
                          <Link
                            to={{
                              pathname: `/singleIssue/${elm._id}`,
                              state: {
                                IssueId: elm._id,
                                userId: elm.createdBy[0]
                              }
                            }}
                          >
                            <p className="content title is-4">{elm.title}</p>
                          </Link>

                          <div>
                          <Link
                              to={{
                                pathname: "/user",
                                state: { userId: elm.createdBy[0] }
                              }}
                            >
                              <span>{elm.createdBy[0]}</span>
                            </Link>
                            
                          </div>
                        </header>

                        <div className="card-content">
                          <div className="content">{elm.description}</div>
                        </div>

                        <footer className="card-footer">
                          <p className="card-footer-item">
                            <span>
                              {elm.isResolved ? (
                                <span className="has-text-success">
                                  Resolved
                                </span>
                              ) : (
                                <span className="has-text-danger">
                                  Unresolved
                                </span>
                              )}
                            </span>
                          </p>

                          <p className="card-footer-item">
                           
                          {createdAt.toDateString()}
                          </p>
                          <p className="card-footer-item">
                           
                            <span>{elm.category}</span>
                          </p>
                          <p className="card-footer-item">
                            <span>
                              {elm.isUrgent != undefined ? elm.isUrgent : null}
                            </span>
                          </p>
                        </footer>
                      </div>
                    </div>
                  );
                })}
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
