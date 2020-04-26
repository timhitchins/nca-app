import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleImageOpacityAction } from "../../../actions/slides";
import SlideBackground from "./SlideBackground";
import AllContent from "./Content";
import "./Slides.scss";

class SildesContainer extends Component {
  render() {
    const { isVisible } = this.props.slides;
    return (
      <main>
        <SlideBackground {...this.props} />
        <AllContent {...this.props} />
        <div
          className="dev-click"
          onClick={() => {
            this.props.dispatch(toggleImageOpacityAction(!isVisible));
          }}
        >
          DEV CLICK
        </div>
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
