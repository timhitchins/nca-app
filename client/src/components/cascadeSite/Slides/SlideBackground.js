import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { toggleImageOpacityAction } from "../../../actions/slides";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

class SlideBackground extends Component {
  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { imageURI } = this.props.slides.bgImage;
    const { isVisible } = this.props.slides;

    if (imageURI !== prevProps.slides.bgImage.imageURI) {
      this.props.dispatch(toggleImageOpacityAction(!isVisible));
    }
  }

  render() {
    const { isVisible, bgImage } = this.props.slides;

    return (
      <div>
        <CSSTransition
          appear={true}
          in={isVisible}
          timeout={300}
          classNames="bg"
          onEntered={() => {
            this.props.dispatch(toggleImageOpacityAction(true));
          }}
          onExited={() => {
            this.props.dispatch(toggleImageOpacityAction(!isVisible));
          }}
        >
          <img
            src={bgImage.imageURI}
            className="bg-image"
            alt={bgImage.altText}
          ></img>
        </CSSTransition>
        <div className="bg-gradient"></div>
      </div>
    );
  }
}

export default SlideBackground;
