import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.component";
//import HomeComponent from "./components/Home.component";
import UserLoginComponent from "./components/Login.component";
import UserAddComponent from "./components/UserAddComponent.component";
import SellComponent from "./components/SellComponent.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/sales/sell" component={SellComponent} />
      <Route path="/users/add" component={UserAddComponent} />
      <Route path="/users/viewuser" component={UserLoginComponent} />
    </Router>
  );
}

export default App;
/*<Route path="/" exact component={HomeComponent} />
      <Route path="/users/view" component={UserComponent} />
      
      */
