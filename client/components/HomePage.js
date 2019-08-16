import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    issues: [],
    category: ["all"],
    isResolved: "all"
  };

  handleFilter = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleCategoryFilter = (name, value) => {
    // console.log(name, value, "handleFilter");
    this.setState({ [name]: new Array(value) });
  };
  componentDidMount() {
    // console.log(this.props.state.currentUser, "current user");
    fetch("http://localhost:3000/api/v1/issues", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      // .then(data => console.logfalse(data,"issues"))
      .then(data => this.setState({ issues: data }));
  }

  render() {
    // console.log(this.props.user.user,"cp1")
    const issues = this.state.issues.Issues;
    // console.log(issues)
    return (
      <div className="container">
        <div className="columns hero-body">
          <div className="column">
            <div className="box has-background-light">
              <h2 className=" title has-text-centered">Filter</h2>
              <ul>
                {this.props.user.user && this.props.user.user.isAdmin?
                  <li>
                    Urgency
                    <div className="field">
                      <div className="control">
                        <div className="select">
                          <select
                            name="category"
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
                  :
                  null
                }
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
                .map((elm,index) => {
                  let createdAt = new Date(elm.createdAt);
                  // console.log(elm);
                  return (
                    <div key={index} className="card has-margin-bottom-25">
                      <div className="has-background-light">
                        <header className="card-header-title justify-space-between ">
                          <Link
                            to={{
                              pathname: "/singleIssue",
                              state: {
                                IssueId: elm._id,
                                userId: elm.createdBy[0]
                              }
                            }}
                          >
                            <p className="content">{elm.title}</p>
                          </Link>

                          <div>
                            <span>{elm.category}</span>
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
                            <Link
                              to={{
                                pathname: "/user",
                                state: { userId: elm.createdBy[0] }
                              }}
                            >
                              <span>{elm.createdBy[0]}</span>
                            </Link>
                          </p>
                          <p className="card-footer-item">
                            <span>{createdAt.toDateString()}</span>
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
