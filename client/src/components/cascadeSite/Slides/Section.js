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
      <div className="container">
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
      {/* <div
        className="scroll-down"
        onClick={() => {
          // dispatch(
          //   handleSetContentAction(
          //     slides.sectionNo + 1,
          //     imageConfig[slides.sectionNo + 1]
          //   )
          // );
        }}
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
