import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import queryString from "query-string";
import { setDocHeightOnWindow } from "../utils/mobileHelper";
import Navbar from "./cascadeSite/Navbar/Navbar";
import SlidesContainer from "./cascadeSite/Slides/SlidesContainer";
import MapContainer from "./map/Map/MapContainer";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    //set window height for mobile
    setDocHeightOnWindow();

    //redirect if pathname = "/"
    if (window.location.pathname === "/") {
      window.location.pathname = "/the-issue";
    }
  }

  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path={["/", "/the-issue", "/take-action"]}
            component={SlidesContainer}
          ></Route>
          <Route exact path={"/the-tool"} component={MapContainer}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
