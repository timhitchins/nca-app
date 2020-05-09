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
    // console.log(imageURI, prevProps.slides.bgImage.imageURI);
    if (imageURI !== prevProps.slides.bgImage.imageURI) {
      console.log("new image", "new vis prop: ", !isVisible);
      // debugger;
      // this.props.dispatch(toggleImageOpacityAction(false));
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
          timeout={200}
          classNames="bg"
          onEntered={() => {
            console.log("entered");
            this.props.dispatch(toggleImageOpacityAction(true));
          }}
          onExited={() => {
            console.log("exited");
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
