import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../components/storage";
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
      token: "",
      isLoading: true,
    };

    this.onType = this.onType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const token = obj.token;
      //verify
      axios
        .get("http://localhost:5000/users/verify?token=" + token)
        .then((res) => {
          console.log("verify:", res);
          if (res.data.success) {
            //query the user database and show details
            console.log("User using Token:", res.data.user);

            this.setState({
              token: token,
              isLoading: false,
              email: res.data.user.email,
              mainBalance: res.data.user.mainBalance,
              retCollegeId: res.data.user.retCollegeId,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onType(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("State Before:", this.state);
    axios
      .post("http://localhost:5000/users/signin", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log("Response of Post:", res);
        console.log("Res.Sucess:", res.data.success);
        if (res.data.success) {
          setInStorage("the_main_app", { token: res.data.token });
          console.log("Token", res.data.token);
          this.setState({
            isLoading: false,
            token: res.data.token,
            email: res.data.user.email,
            mainBalance: res.data.user.mainBalance,
            retCollegeId: res.data.user.collegeId,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onLogOut() {
    const token = this.state.token;
    axios
      .get("http://localhost:5000/users/logout?token=" + token)
      .then((res) => {
        console.log("Logout:", res);
        if (res.data.success) {
          this.setState({
            token: "",
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
          });
        }
      });
  }

  render() {
    const isLoading = this.state.isLoading;
    const token = this.state.token;
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          <div className="d-flex justify-content-center">
            <div className="shadow-lg p-3 mt-5 mb-5 bg-white rounded">
              <form onSubmit={this.onSubmit}>
                Email:{" "}
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.onType}
                />
                <br />
                <br />
                Password:{" "}
                <input
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.onType}
                />
                <br />
                <br />
                <button type="submit" className="btn btn-primary ml-2">
                  Login
                </button>
              </form>
            </div>
          </div>
          <br /> <br />
        </div>
      );
    }

    //else return your account page
    return (
      <div className="container .justify-content-center">
        <h3>User Information</h3> <hr />
        <h5>Username: {this.state.email}</h5>
        <h5>CollegeID: {this.state.retCollegeId}</h5>
        <h5>Main Balance: {this.state.mainBalance}</h5>
        <br />
        <button className="btn btn-warning" onClick={this.onLogOut}>
          Log out
        </button>
      </div>
    );
  }
}

export default UserLoginComponent;
