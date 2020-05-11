import React, { Component } from "react";
import { connect } from "react-redux";
import {
  togglenavDrawerAction,
  toggleNavbarPageAction,
} from "../../../actions/navbar";
import { NavLink } from "react-router-dom";
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
          <NavLink exact to="/">
            LOGO
          </NavLink>
          <div></div>
          <NavLink activeClassName="nav-link-active" exact to="/the-issue">
            The Issue
          </NavLink>
          <NavLink activeClassName="nav-link-active" exact to="/the-tool">
            The Tool
          </NavLink>
          <NavLink activeClassName="nav-link-active" exact to="/take-action">
            Take Action
          </NavLink>
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
