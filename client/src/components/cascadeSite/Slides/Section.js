import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createSectionRefAction } from "../../../actions/slides";

import "./Slides.scss";

const Section = ({ slide, children, dispatch, className }) => {
  const sectionRef = useRef(null);
  useEffect(() => {
    console.log("content offsetTop ", sectionRef.current.offsetTop);
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
    </section>
  );
};

Section.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default Section;
