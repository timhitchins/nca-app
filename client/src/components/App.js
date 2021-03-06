import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setDocHeightOnWindow } from "./../utils/mobileHelper";
import Navbar from "./cascadeSite/Navbar/Navbar";
import SlidesContainer from "./cascadeSite/Slides/SlidesContainer";
import MapContainer from "./map/Map/MapContainer";
import TakeAction from "./cascadeSite/TakeAction/TakeAction";

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
            path={["/", "/the-issue"]}
            component={SlidesContainer}
          ></Route>
          <Route exact path={"/mapping-tool"} component={MapContainer}></Route>
          <Route exact path={"/join-us"} component={TakeAction}></Route>
        </Switch>
      </Router>
    );
  }
}

export function mapStateToProps({ slides }) {
  return { slides };
}

export default connect(mapStateToProps)(App);
