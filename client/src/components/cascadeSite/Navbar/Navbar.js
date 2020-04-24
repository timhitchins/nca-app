import React, { Component } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-outer-container">
        <div className="nav-inner-container">
          <div>LOGO</div>
          <div></div>
          <div>The Issue</div>
          <div>The Tool</div>
          <div>Take Action</div>
        </div>
        <div className="hamburger-button">&#x2630;</div>
      </nav>
    );
  }
}

export default Navbar;
