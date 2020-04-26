import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import queryString from "query-string";
import { setDocHeightOnWindow } from "../utils/mobileHelper";
import Navbar from "./cascadeSite/Navbar/Navbar";
import SlidesContainer from "./cascadeSite/Slides/SlidesContainer";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    //set window height for mobile
    setDocHeightOnWindow();
  }

  render() {
    return (
      <div>
        <Navbar />
        <SlidesContainer />
      </div>
    );
  }
}

export default App;
