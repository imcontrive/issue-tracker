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
      // let data = res.json()

      // // let arr = await data.issue.createdBy

      // // let newArr = await [...arr].push("a")

      // console.log(data)
      // .then(data => {
      // //   // console.log(data.issue.createdBy)
      //   let arr = data.issue.createdBy
      // //   // console.log(arr,"cp3")
      //   body.createdby = [...arr].push("a")
      //   console.log(body.createdBy,"cp4");
      // return data
      // })
      .then(res => res.json())
      // .then(data => console.log(data, "cp2"))
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

export default connect(mapPropsToState)(createIssue);
