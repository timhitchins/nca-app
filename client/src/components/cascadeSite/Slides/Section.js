import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
} from "../../../actions/slides";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

const Section = ({ slide, children, dispatch, className, slides }) => {
  const sectionRef = useRef(null);
  useEffect(() => {
    //create the array in the store that includes these refs for scrolling
    dispatch(createSectionRefAction(sectionRef));
  }, [dispatch]);

  return (
    <section className="content-section" ref={sectionRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque egestas
      sagittis lorem et fringilla. Class aptent taciti sociosqu ad litora
      torquent per conubia nostra, per inceptos himenaeos. Nullam a felis ut
      lorem fringilla egestas in quis ligula. Nam pulvinar sapien at iaculis
      gravida. Sed laoreet sollicitudin suscipit. Ut erat velit, posuere a
      laoreet in, dapibus sit amet sem. Fusce tempus posuere sapien, vitae porta
      magna. Etiam aliquam augue a mi consequat, id pretium quam euismod. Sed
      vulputate nibh neque, eget tincidunt lorem ullamcorper ac. Nullam lobortis
      non lorem ut vulputate. Aliquam semper vulputate rhoncus. Maecenas sit
      amet diam a mauris dapibus molestie et ac enim. Ut tincidunt id nisi sit
      amet facilisis. Vivamus volutpat dapibus nisl, ac eleifend mi tincidunt
      quis. Nam in elit et nunc iaculis sodales. Duis tempus consequat dictum.{" "}
      {/* <div className="container">
        {slide.heading && (
          <h1>
            <span>{slide.heading}</span>
          </h1>
        )}
        <div className={className}>
          {slide.body && (
            <div dangerouslySetInnerHTML={{ __html: slide.body }} />
          )}
          {slide.innerImageURI && (
            <img src={slide.innerImageURI} alt={slide.innerAltText}></img>
          )}
        </div>
      </div>
      <div
        className="scroll-down"
        // onClick={() => {
        //   dispatch(
        //     handleSetContentAction(
        //       slides.sectionNo + 1,
        //       imageConfig[slides.sectionNo + 1]
        //     )
        //   );
        // }}
      >
        &#x2913; Scroll down to continue
      </div> */}
    </section>
  );
};

Section.propTypes = {
  slide: PropTypes.object.isRequired,
};

function mapStateToProps({ slides }) {
  return { slides };
}
export default connect(mapStateToProps)(Section);
