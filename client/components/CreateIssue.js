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
    console.log(this.props.currentUser);
    let createdBy = [this.props.currentUser.user._id];
    const { title, description, category } = this.state;

    const body = { title, description, category, createdBy };
    console.log(body, "user");

    let res = fetch("http://localhost:3000/api/v1/issues", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.token}`
      }
    })
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
          <div className="column is-half is-offset-one-quarter box">
            <div className="field">
              <div className="control">
                <input class="input" name="title"
            value={this.state.title}
            placeholder="title"
            onChange={this.changeHandler} />
              </div>
            </div>
            <div className="field">
              {" "}
              <div className="control">
                <textarea class="textarea" name="description"
            value={this.state.description}
            placeholder="description"
            onChange={this.changeHandler} />
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
        {/* <form>
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
        </form> */}
      </>
    );
  }
}

const mapPropsToState = state => {
  return { currentUser: state.currentUser };
};

export default connect(mapPropsToState)(createIssue);
