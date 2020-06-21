import React, { Component } from "react";
import axios from "axios";

class UserAddComponent extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      collegeId: "",
      password: "",
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("email :", this.state.email);
    console.log("collegeId:", this.state.collegeId);
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/signup", {
        email: this.state.email,
        collegeId: this.state.collegeId,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="shadow-lg p-3 mt-5 mb-5 bg-white rounded">
          <form onSubmit={this.onSubmit}>
            Username:{" "}
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onTextChange}
            />
            <br />
            <br />
            Password:{" "}
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.onTextChange}
            />
            <br />
            <br />
            CollegeID:{" "}
            <input
              type="text"
              name="collegeId"
              value={this.state.collegeId}
              onChange={this.onTextChange}
            />{" "}
            <br />
            <button type="submit" className="btn btn-primary mt-3 ">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserAddComponent;
