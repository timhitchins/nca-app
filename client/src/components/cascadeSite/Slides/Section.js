import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createSectionRefAction } from "../../../actions/slides";

import "./Slides.scss";

const Section = ({ slide, children, dispatch }) => {
  const sectionRef = useRef(null);
  useEffect(() => {
    console.log("content offsetTop ", sectionRef.current.offsetTop);
    //create the array in the store that includes these refs for scrolling
    dispatch(createSectionRefAction(sectionRef));
  }, [dispatch]);

  return (
    <section className="content-section" ref={sectionRef}>
      <div className="container">
        {slide.heading && <h1>{slide.heading}</h1>}
        {slide.body && <p dangerouslySetInnerHTML={{ __html: slide.body }} />}
      </div>
    </section>
  );
};

Section.propTypes = {
  slide: PropTypes.object.isRequired,
};

export default Section;
