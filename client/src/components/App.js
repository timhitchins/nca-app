import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import Navbar from "./cascadeSite/Navbar/Navbar";
import "./App.scss";

class App extends Component {
  render() {
    return <Navbar />;
  }
}

function mapStateToProps({ navbar }) {
  return { navbar };
}
export default connect(mapStateToProps)(App);
