import React, { Component } from "react";
import { connect } from "react-redux";

class UpdateIssue extends Component {
  state = {
    title: "",
    description: "",
    category: "electricity"
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
          console.log(data)
        this.setState({
          title: data.issue.title,
          description: data.issue.description,
          category: data.issue.category
        });
      });
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.props.currentUser);
    let createdBy = [this.props.currentUser.user._id];
    const { title, description, category } = this.state;

    const body = { title, description, category, createdBy };
    console.log(body, "user");

    let res = fetch(
      `http://localhost:3000/api/v1/issues/${this.props.location.state.IssueId}`,
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
        console.log(data, "create issue");
        this.props.history.push({
          pathname: '/singleIssue',
          state: { IssueId: this.props.location.state.IssueId}
        })
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <>
        <form>
          <input
            name="title"
            value={this.state.title}
            placeholder="title"
            onChange={this.changeHandler}
          />
          <input
            name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.changeHandler}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.changeHandler}
          >
            <option>water</option>
            <option>electricity</option>
            <option>food</option>
            <option>others</option>
          </select>
          <button onClick={this.submitHandler}>Raise issue</button>
        </form>
      </>
    );
  }
}

const mapPropsToState = state => {
  return { currentUser: state.currentUser };
};

export default connect(mapPropsToState)(UpdateIssue);
