import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSetContentAction } from "../../../actions/slides";
import SlideBackground from "./SlideBackground";
import AllContent from "./Content";
import { imageConfig } from "../../../config/config";
import "./Slides.scss";

class SildesContainer extends Component {
  componentDidMount() {
    //set the scroll to the top
    document
      .querySelector(".content-container")
      .scrollTo({ top: 0, left: 0, behavior: "auto" });
    this.props.dispatch(handleSetContentAction(0, imageConfig[0]));
  }

  render() {
    return (
      <main>
        <SlideBackground {...this.props} />
        <AllContent {...this.props} />
      </main>
    );
  }
}

function mapStateToProps({ slides }) {
  return {
    slides,
  };
}

export default connect(mapStateToProps)(SildesContainer);
