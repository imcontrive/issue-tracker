import React, { Component } from 'react';
import { connect } from "react-redux"


class createIssue extends Component {
  state = {
    title: "",
    description: "",
    category: "",
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const { title,description,category} = this.state;
    console.log(this.props,"create issue")
    // const user = this.props.state.
    const body = { title,description,category };

    fetch("http://localhost:3000/api/v1/issues", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Authorization":`token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data => {this.props.history.push("/")
                      console.log(data,"issue")  })
      .catch(error => console.error("Error:", error));

    // console.log(body);
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
          {/* <input
            name="category"
            value={this.state.category}
            placeholder=""
            onChange={this.changeHandler}
          /> */}
         
          <button onClick={this.submitHandler}>Raise issue</button>
        </form>
      </>
    );
  }
}

export default connect(state => state)(createIssue);
