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
        console.log(data, this.state, "user");
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
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <div className="column is-half is-offset-one-quarter box has-background-light">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    name="firstname"
                    value={this.state.firstName}
                    placeholder="firstName"
                    onChange={this.changeHandler}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    name="lastname"
                    value={this.state.lastName}
                    placeholder="lastName"
                    onChange={this.changeHandler}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-user" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    placeholder="phone number"
                    onChange={this.changeHandler}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-mobile" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className="fas fa-check" />
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.changeHandler}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </p>
              </div>
              <div className="field is-grouped is-grouped-right">
                <button className="button is-primary" onClick={this.updateHandler}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default UpdateUser;
