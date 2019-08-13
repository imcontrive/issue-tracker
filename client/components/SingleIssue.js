import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SingleIssue extends Component {
  state = {
    issue: {}
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/issues/${
        this.props.location.state.IssueId
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data, "single issue fetch");
        this.setState({
          issue: data.issue
        });
      });
  }

  render() {
    console.log(this.props.location.state.userId,"user id")
    console.log(this.props, "sinle issue props");
    const issue = this.state.issue;
    return (
      <div>
        <p>category:{issue.category}</p>
        <h1>{issue.title}</h1>
        <p>{issue.description}</p>
        <p>{new Date(issue.createdAt).toDateString()}</p>
        {this.props.location.state.userId === this.props.user._id ? (
          <Link
            to={{
              pathname: "/updateIssue",
              state: { IssueId: this.props.location.state.IssueId }
            }}
          >
            <button>Update</button>
          </Link>
        ) :null}
      </div>
    );
  }
}

export default connect(state => state.currentUser)(SingleIssue);
