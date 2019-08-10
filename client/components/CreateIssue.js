import React, { Component } from 'react';


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

  loginHandler = e => {
    e.preventDefault();
    const { title,description,category} = this.state;
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
      .then(data => console.log(data,"createIssue"))
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
         
          <button onClick={this.loginHandler}>Raise issue</button>
        </form>
      </>
    );
  }
}

export default createIssue;
