import React, { Component } from "react";

class UpdateUser extends Component {
  state = {
    firstname: "",
    lastname: "",
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
          firstname: data.user.firstname,
          lastname: data.user.lastname,
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
    const { firstname, lastname, email, phonenumber, password } = this.state;
    const body = { firstname, lastname, email, phonenumber, password };

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
            name="firstname"
            value={this.state.firstname}
            placeholder="firstname"
            onChange={this.changeHandler}
          />
          <input
            name="lastname"
            value={this.state.lastname}
            placeholder="lastname"
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
