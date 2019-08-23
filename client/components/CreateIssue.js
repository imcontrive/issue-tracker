import React, { Component } from "react";
import { connect } from "react-redux";
import imgActions from "../actions/imgActions";
import keys from "../../key";
import issueAction from "../actions/issue.action";
import io from 'socket.io-client';
const socket = io();

class createIssue extends Component {
  state = {
    created: false,
    title: "",
    description: "",
    category: "electricity",
    image: "",
    message: "",
    isLoading: false
  };

  handleFile = event => {
    const photo = event.target.files[0];
    const sendImg = str => {
      str ? this.setState({ image: str }) : null;
    };

    // file conversion to base64 using FileReader fn
    const reader = new FileReader();
    reader.onload = event => {
      sendImg(event.target.result);
    };
    reader.readAsDataURL(photo);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { image } = this.state;
    const cloudData = { file: image, upload_preset: keys.UPLOAD_PRESET };
    this.setState({
      isLoading: true
    });
    if (!image) {
      this.submitHandler();
    } else {
      this.props.dispatch(
        imgActions.cloudinaryImgUpload(cloudData, (success, img) => {
          if (success) {
            this.submitHandler(img.secure_url);
          } else {
            this.setState({
              message: img.error
            });
          }
        })
      );
    }
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  submitHandler = imgUrl => {
    let createdBy = this.props.currentUser.user._id;
    const { title, description, category } = this.state;
    let isUrgent = "Not Urgent";
    const body = { title, description, category, createdBy, isUrgent, imgUrl };

    fetch("http://localhost:3000/api/v1/issues", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'data in create issue');
        if (data.success) {
          this.setState({
            isLoading: false
          });
          this.props.history.push("/");
        }
      })
      .catch(error => console.error("Error:", error));
  };
  render() {
    return (
      <>
        {!this.state.isLoading ? (
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
                  <input
                    onChange={this.handleFile}
                    type="file"
                    placeholder="upload an image"
                  />
                  <button
                    className="button is-primary"
                    onClick={this.handleSubmit}
                  >
                    Raise issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>creating issue</p>
            <a className="button is-info is-loading">creating issue</a>
          </>
        )}
      </>
    );
  }
}

const mapPropsToState = state => state;

export default connect(mapPropsToState)(createIssue);
