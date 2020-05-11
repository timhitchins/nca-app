import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleImageOpacityAction } from "../../../actions/slides";
import SlideBackground from "./SlideBackground";
import AllContent from "./Content";
import "./Slides.scss";

class SildesContainer extends Component {
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
