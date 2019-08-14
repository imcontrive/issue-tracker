import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleIssue extends Component {
  state = {
    issue: {}
  };

  componentDidMount() {
    // let IssueId = this.props.history.location.state.IssueId
    // console.log(IssueId,"cdm si")
    fetch(
      `http://localhost:3000/api/v1/issues/${this.props.location.state
        .IssueId || this.props.history.location.state.IssueId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      // .then(res => console.log(res))
      .then(res => res.json())
      // .then(res => console.log(res))

      .then(data => {
        console.log(data, "single issue fetch");
        this.setState({
          issue: data.issue
        });
      })
      .catch(error => console.error("Error:", error));
  }

  render() {
    // console.log(this.props.location.state.userId, "user id");
    // console.log(this.props, "sinle issue props");
    console.log(this.state.issue)
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
            state: { userId: issue.createdBy&&issue.createdBy[0] }
          }}
        >
          <p>username</p>
        </Link>
        {this.props.location.state.userId === this.props.user._id ? (
          <Link
            to={{
              pathname: "/updateIssue",
              state: { IssueId: this.props.location.state.IssueId }
            }}
          >
            <button>Update</button>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default connect(state => state.currentUser)(SingleIssue);
