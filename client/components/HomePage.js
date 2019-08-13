import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HomePage extends Component {
  state = {
    issues: []
  };

  componentDidMount() {
    console.log(this.props.state.currentUser, "current user");
    fetch("http://localhost:3000/api/v1/issues", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      // .then(data => console.log(data,"issues"))
      .then(data => this.setState({ issues: data }));
  }

  render() {
    const issues = this.state.issues.Issues;
    console.log(issues);
    return (
      <>
        {issues &&
          issues.map(elm => {
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
                  <p>username</p>
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
