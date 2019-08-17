import React, { Component } from "react";
import { connect } from "react-redux";

class createIssue extends Component {
  state = {
    created: false,
    title: "",
    description: "",
    category: "electricity"

  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    let createdBy = [this.props.currentUser.user._id];
    const { title, description, category } = this.state;
    let isUrgent = "Not Urgent";
    const body = { title, description, category, createdBy,isUrgent };
    let res = fetch("http://localhost:3000/api/v1/issues", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data =>
        fetch(`http://localhost:3000/api/v1/issues/${data.issue._id}`, {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${localStorage.token}`
          }
        })
      )
      .then(res => res.json())
      .then(data => {
        console.log(data, "create issue");
        this.props.history.push("/");
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <>

        <div className="container">
          <div className="hero-body">
            <div className="column is-half is-offset-one-quarter has-background-light">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    name="title"
                    value={this.state.title}
                    placeholder="title"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>
              <div className="field">
                {" "}
                <div className="control">
                  <textarea
                    className="textarea"
                    name="description"
                    value={this.state.description}
                    placeholder="description"
                    onChange={this.changeHandler}
                  />
                </div>
              </div>

              <div className="field is-grouped is-grouped-right">
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

                <button
                  className="button is-primary"
                  onClick={this.submitHandler}
                >
                  Raise issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapPropsToState = state => {
  return { currentUser: state.currentUser };
};

export default connect(mapPropsToState)(createIssue);
