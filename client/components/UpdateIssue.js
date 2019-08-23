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
        // console.log(data);
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
        console.log(data.issue._id, "update issue");
        this.props.history.push({
          pathname: "/singleIssue",
          state: {
            IssueId: this.props.location.state.IssueId,
            userId: this.props.location.state.userId
          }
        });
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <div className="container">
        <div className="column is-half is-offset-one-quarter box has-background-light has-margin-top-25">
          <div className="media-content">
            <div className="content">
              <p>
                <input
                  className="input"
                  name="title"
                  value={this.state.title}
                  placeholder="title"
                  onChange={this.changeHandler}
                />
              </p>
            </div>
            <textarea
              name="description"
              className="textarea"
              value={this.state.description}
              placeholder="description"
              onChange={this.changeHandler}
            />
            <nav className="level is-mobile">
              <div className="field">
                <div className="control">
                  <div className="select">
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
                  </div>
                </div>
              </div>

              <button
                className="button is-primary"
                onClick={this.submitHandler}
              >
                Update issue
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = state => {
  return { currentUser: state.currentUser };
};

export default connect(mapPropsToState)(UpdateIssue);
