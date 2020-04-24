import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

class Slide1 extends Component {
  render() {
    return (
      <section>
        <CSSTransition
        in={true}
        timeout={200}
        classNames="bg"
        >
          <img
            src={imageConfig.slide1.imgURI}
            className="bg-image"
            allt="person running"
          ></img>
        </CSSTransition>
        <div>HELLO</div>
      </section>
    );
  }
}

export default Slide1;
