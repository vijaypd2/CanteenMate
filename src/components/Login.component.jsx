import React, { Component } from "react";
import axios from "axios";

class UserLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      collegeId: "",
      email: "",
      password: "",
      mainBalance: "",
      retCollegeId: "",
    };

    this.onType = this.onType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onType(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.collegeId);
    axios
      .post("http://localhost:5000/users/signin", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        this.setState({
          email: res.data.user.email,
          mainBalance: res.data.user.mainBalance,
          retCollegeId: res.data.user.collegeId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <p className="shadow-lg p-3 mt-5 mb-5 bg-white rounded">
            <form onSubmit={this.onSubmit}>
              Email:{" "}
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.onType}
              />
              Password:{" "}
              <input
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.onType}
              />
              <button type="submit" className="btn btn-primary ml-2">
                Login
              </button>
            </form>
          </p>
        </div>
        <br /> <br />
        <div className="container .justify-content-center">
          <h3>User Information</h3> <hr />
          <h5>Username: {this.state.email}</h5>
          <h5>CollegeID: {this.state.retCollegeId}</h5>
          <h5>Main Balance: {this.state.mainBalance}</h5>
        </div>
      </div>
    );
  }
}

export default UserLoginComponent;
