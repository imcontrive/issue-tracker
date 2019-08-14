import React, { Component } from "react";

class UpdateUser extends Component {
  state = {
    firstName: "",
    lastName: "",
    phonenumber: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.location.state.userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data,this.state,"user");
        this.setState({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phonenumber: data.user.phonenumber
        });
      });
  }

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateHandler = e => {
    console.log(this.state);
    e.preventDefault();
    const { firstName, lastName, email, phonenumber, password } = this.state;
    const body = { firstName, lastName, email, phonenumber, password };

    fetch(
      `http://localhost:3000/api/v1/users/update/${
        this.props.location.state.userId
      }`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.token}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.props.history.push("/");
        console.log(data);
      })
      .catch(error => console.error("Error:", error));

    // console.log(body);
  };
  render() {
    return (
      <>
        <form>
          <input
            name="firstName"
            value={this.state.firstName}
            placeholder="firstName"
            onChange={this.changeHandler}
          />
          <input
            name="lastName"
            value={this.state.lastName}
            placeholder="lastName"
            onChange={this.changeHandler}
          />
          <input
            name="phonenumber"
            value={this.state.phonenumber}
            placeholder="phone number"
            onChange={this.changeHandler}
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="enter your email"
            onChange={this.changeHandler}
          />
          <input
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.changeHandler}
          />
          <button onClick={this.updateHandler}>Update</button>
        </form>
      </>
    );
  }
}

export default UpdateUser;
