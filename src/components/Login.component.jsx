import React, { Component } from "react";
import axios from "axios";

class UserLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      collegeId: "",
      username: "",
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
      .post("http://localhost:5000/users/viewuser", {
        collegeId: this.state.collegeId,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          username: res.data.username,
          mainBalance: res.data.mainBalance,
          retCollegeId: res.data.collegeId,
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
              <input
                type="text"
                name="collegeId"
                value={this.state.collegeId}
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
          <h5>Username: {this.state.username}</h5>
          <h5>CollegeID: {this.state.retCollegeId}</h5>
          <h5>Main Balance: {this.state.mainBalance}</h5>
        </div>
      </div>
    );
  }
}

export default UserLoginComponent;
