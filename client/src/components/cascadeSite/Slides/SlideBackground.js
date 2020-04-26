import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

class SlideBackground extends Component {
  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  render() {
    const { isVisible } = this.props.slides;
    return (
      <div>
        <CSSTransition in={isVisible} timeout={1800} classNames="bg">
          <img
            src={imageConfig[2].imageURI}
            className="bg-image"
            alt="person running"
          ></img>
        </CSSTransition>
        <div className="bg-gradient"></div>
      </div>
    );
  }
}

export default SlideBackground;
