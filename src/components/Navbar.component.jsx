import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar-custom navbar navbar-dark bg-light navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            Canteen App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav  ml-auto">
              <li className="navbar-item mr-5">
                <Link to="/users/signup">SignUp</Link>
              </li>
              <li className="navbar-item mr-5">
                <Link to="/sales/sell">Sales</Link>
              </li>
              <li className="navbar-item mr-5">
                <Link to="/users/viewuser">SignIn</Link>
              </li>
            </ul>
          </div>
        </nav>
        <hr className="custom-hr" />
      </React.Fragment>
    );
  }
}

export default Navbar;
