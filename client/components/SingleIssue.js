import React, { Component } from "react";

class SingleIssue extends Component {
  state = {
    issue: {}
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/issues/${this.props.location.state.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          issue: data.issue
        });
      });
  }

  render() {
    console.log(this.props)
    const issue = this.state.issue;
    return (
      <div>
        <p>category:{issue.category}</p>
        <h1>{issue.title}</h1>
        <p>{issue.description}</p>
        <p>{new Date(issue.createdAt).toDateString()}</p>
      </div>
    );
  }
}

export default SingleIssue;
