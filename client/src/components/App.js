import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// import queryString from "query-string";
import { handleSetContentAction } from "./../actions/slides";
import { setDocHeightOnWindow } from "./../utils/mobileHelper";
import { imageConfig } from "./../config/imgConfig";
import Navbar from "./cascadeSite/Navbar/Navbar";
import SlidesContainer from "./cascadeSite/Slides/SlidesContainer";
import MapContainer from "./map/Map/MapContainer";
import TakeAction from "./cascadeSite/TakeAction/TakeAction";
import "./App.scss";

class App extends Component {
  componentDidMount() {
    //set window height for mobile
    setDocHeightOnWindow();

    //set the scroll to the top
    // document
    //   .querySelector(".content-container")
    //   .scrollTo({ top: 0, left: 0, behavior: "auto" });
    // this.props.dispatch(handleSetContentAction(0, imageConfig[0]));

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
            path={["/", "/the-issue"]}
            component={SlidesContainer}
          ></Route>
          <Route exact path={"/the-tool"} component={MapContainer}></Route>
          <Route exact path={"/take-action"} component={TakeAction}></Route>
        </Switch>
      </Router>
    );
  }
}

export function mapStateToProps({ slides }) {
  return { slides };
}

export default connect(mapStateToProps)(App);
