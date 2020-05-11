import React, { Component } from "react";
import { connect } from "react-redux";
import {
  togglenavDrawerAction,
  toggleNavbarPageAction,
} from "../../../actions/navbar";
import MediaQuery from "react-responsive";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./Navbar.scss";
import stylVars from "../../theme.scss";

//this navbar needs some transitions when there is a drawer toggle
class Navbar extends Component {
  render() {
    const { isOpen } = this.props.navbar;
    return (
      <nav className="nav-outer-container">
        <div
          className="nav-inner-container"
          style={isOpen ? { height: "auto" } : null}
        >
          <div>LOGO</div>
          <div></div>
          <div>The Issue</div>
          <div>The Tool</div>
          <div>Take Action</div>
        </div>
        <div
          className="hamburger-button"
          onClick={() => {
            this.props.dispatch(togglenavDrawerAction(!isOpen));
          }}
        >
          &#x2630;
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ navbar }) {
  return { navbar };
}
export default connect(mapStateToProps)(Navbar);
