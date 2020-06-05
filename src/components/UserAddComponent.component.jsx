import React, { Component } from "react";
import axios from "axios";

class UserAddComponent extends Component {
  constructor() {
    super();
    this.state = {
      uname: " ",
      collegeId: " ",
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("uname :", this.state.uname);
    console.log("collegeId:", this.state.collegeId);
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/add", {
        username: this.state.uname,
        collegeId: this.state.collegeId,
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
        <form onSubmit={this.onSubmit}>
          Username:{" "}
          <input
            type="text"
            name="uname"
            value={this.state.uname}
            onChange={this.onTextChange}
          />
          CollegeID:
          <input
            type="text"
            name="collegeId"
            value={this.state.collegeId}
            onChange={this.onTextChange}
          />{" "}
          <br />
          <button type="submit" className="btn btn-primary mt-3 ">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default UserAddComponent;
