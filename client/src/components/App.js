import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
// import queryString from "query-string";
import { setDocHeightOnWindow } from "../utils/mobileHelper";
import Navbar from "./cascadeSite/Navbar/Navbar";
import SlidesContainer from "./cascadeSite/Slides/SlidesContainer";
import "./App.scss";
import img1Src from '../images/image1.png';
import img2Src from '../images/image2.png';
import ReactCompareImage from "react-compare-image";

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
        <ReactCompareImage leftImage={img1Src} rightImage={img2Src} />
      </div>
    );
  }
}

// function mapStateToProps({ navbar }) {
//   return { navbar };
// }
// export default connect(mapStateToProps)(App);
export default App;
