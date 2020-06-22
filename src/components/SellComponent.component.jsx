import React, { Component } from "react";
import axios from "axios";

class SellComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      collegeID: "",
    };
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
  }

  onCheckChange(e) {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }
  onIdChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var price = 0;
    if (this.state.check1 === true) {
      price = price + 10;
    }
    if (this.state.check2 === true) {
      price = price + 20;
    }
    if (this.state.check3 === true) {
      price = price + 30;
    }
    if (this.state.check4 === true) {
      price = price + 40;
    }
    console.log(price);
    console.log(this.state.collegeID);

    axios
      .post("http://localhost:5000/sales/sell", {
        collegeId: this.state.collegeID,
        price: price,
      })
      .then((res) => {
        console.log(res.data);
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
            <input
              type="checkbox"
              name="check1"
              className="largerCheckbox"
              checked={this.state.check1}
              onChange={this.onCheckChange}
            />{" "}
            Rice <br />
            <input
              type="checkbox"
              name="check2"
              className="largerCheckbox"
              checked={this.state.check2}
              onChange={this.onCheckChange}
            />{" "}
            Fish <br />
            <input
              type="checkbox"
              name="check3"
              className="largerCheckbox"
              checked={this.state.check3}
              onChange={this.onCheckChange}
            />{" "}
            Egg <br />
            <input
              type="checkbox"
              name="check4"
              className="largerCheckbox"
              checked={this.state.check4}
              onChange={this.onCheckChange}
            />{" "}
            Biriyani <br />
            CollegeID: <br />
            <input
              type="text"
              name="collegeID"
              value={this.state.collegeID}
              onChange={this.onIdChange}
            />
            <br />
            <button type="submit" className="btn m-3  btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SellComponent;
