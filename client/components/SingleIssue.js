import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleIssue extends Component {
  state = {
    issue: {},
    isResolved: false,
    IssueId: null
  };

  handleResolve = () => {
    // let isResolved = true
    let body = { isResolved: !this.state.isResolved };
    fetch(
      `http://localhost:3000/api/v1/issues/${
        this.props.location.state.IssueId
      }`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data, "resolve issue");
        // this.props.history.push({
        //   pathname: "/singleIssue",
        //   state: { IssueId: data.issue._id }
        // });
        this.setState({
          isResolved: data.issue.isResolved,
          IssueId: data.issue._id,
          issue: data.issue
        });
      })
      .catch(error => console.error("Error:", error));
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/issues/${this.props.location.state
        .IssueId ||
        this.props.history.location.state.IssueId ||
        this.state.IssueId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())

      .then(data => {
        console.log(data.issue.isResolved, "single issue fetch render");
        this.setState({
          issue: data.issue,
          isResolved: data.issue.isResolved
        });
      })
      .catch(error => console.error("Error:", error));
  }

  render() {
    // console.log(this.state.issue);
    // console.log( this.props.history.location.state.IssueId);

    const issue = this.state.issue;
    return (
      <div>
        <p>category:{issue.category}</p>
        <h1>{issue.title}</h1>
        <p>{issue.description}</p>
        <p>{new Date(issue.createdAt).toDateString()}</p>
        {/* bug here, refresh this component to see */}
        <Link
          to={{
            pathname: "/user",
            state: { userId: issue.createdBy && issue.createdBy[0] }
          }}
        >
          <p>username</p>
        </Link>
        {this.props.location.state.userId === this.props.user._id ? (
          <Link
            to={{
              pathname: "/updateIssue",
              state: {
                IssueId: this.props.location.state.IssueId,
                userId: this.props.location.state.userId
              }
            }}
          >
            <button>Update</button>
          </Link>
        ) : null}
        {this.props.user.isAdmin ? (
          <button onClick={this.handleResolve}>Resolve</button>
        ) : null}
        <p>Resolved:{issue.isResolved ? "true" : "false"}</p>
      </div>
    );
  }
}

export default connect(state => state.currentUser)(SingleIssue);
