import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Canteen App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item mr-5">
              <Link to="/users/add">Users Add</Link>
            </li>
            <li className="navbar-item mr-5">
              <Link to="/sales/sell">Sales</Link>
            </li>
            <li className="navbar-item mr-5">
              <Link to="/users/viewuser">View Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
