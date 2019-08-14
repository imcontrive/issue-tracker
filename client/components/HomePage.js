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
    const issues = this.state.issues.Issues;
    return (
      <>
        <h4>Filter</h4>
        <ul>
          <li>
            Urgency
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
          </li>
          <li>
            Categories
            <select
              name="category"
              onChange={e => {
                this.handleCategoryFilter(e.target.name, e.target.value);
              }}
            >
              <option value="all">All</option>
              <option value="electricity">electricity</option>
              <option value="water">water</option>
              <option value="food">food</option>
              <option value="others">others</option>
            </select>
          </li>
          <li>
            Resolved
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
          </li>
        </ul>

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
            .map(elm => {
              let createdAt = new Date(elm.createdAt);
              return (
                <div>
                  <Link
                    to={{
                      pathname: "/singleIssue",
                      state: { IssueId: elm._id, userId: elm.createdBy[0] }
                    }}
                  >
                    <h1>{elm.title}</h1>
                  </Link>
                  <p>{elm.description}</p>
                  <p>{createdAt.toDateString()}</p>
                  <p>{elm.category}</p>
                  <Link
                    to={{
                      pathname: "/user",
                      state: { userId: elm.createdBy[0] }
                    }}
                  >
                    <p>{elm.createdBy[0]}</p>
                  </Link>
                  <hr />
                </div>
              );
            })}
      </>
    );
  }
}

const mapPropsToState = state => {
  return { state };
};

export default connect(mapPropsToState)(HomePage);
