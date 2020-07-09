import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "../Footer/Footer";
import ReactPlayer from "react-player";
import ReactCompareImage from "react-compare-image";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
} from "../../../actions/slides";
import {
  MAX_SECTION_NO,
  VIDEO_1_SECTION,
  VIDEO_2_SECTION,
  imageConfig,
} from "../../../config/slideConfig";
import "./Slides.scss";

class Section extends Component {
  static propTypes = {
    slide: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    scrollToContent: PropTypes.func.isRequired,
  };

  sectionRef = React.createRef();

  _toggleCompareImageContainer = () => {
    const detailsEl = document.querySelector("details");
    const imageEl = document.querySelector(".compare-image-container");
    if (!detailsEl.open && !window.matchMedia("(min-width: 600px)").matches) {
      imageEl.style.visibility = "hidden";
      imageEl.style.height = "0px";
    } else {
      imageEl.style.visibility = "visible";
      imageEl.style.height = null;
    }
  };

  componentDidMount() {
    this.props.dispatch(createSectionRefAction(this.sectionRef));
  }

  render() {
    const { sectionNo } = this.props.slides;
    const { className, slide, scrollToContent } = this.props;
    return (
      <section className="content-section" ref={this.sectionRef}>
        <div className="container">
          {slide.heading && (
            <h1>
              <span>{slide.heading}</span>
            </h1>
          )}
          <div className={className}>
            {slide.body && (
              <div>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: slide.body }}
                />
                {slide.videoURI && (
                  <div>
                    {slide.videoName === "our-air" && (
                      <ReactPlayer
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === VIDEO_1_SECTION ? true : false}
                      />
                    )}
                    {slide.videoName === "we-are-with-earth" && (
                      <ReactPlayer
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === VIDEO_2_SECTION ? true : false}
                      />
                    )}
                  </div>
                )}
              </div>
            )}
            {slide.innerImageURI && (
              <img
                className="inner-image"
                src={slide.innerImageURI}
                alt={slide.innerAltText}
              ></img>
            )}
            {slide.details && (
              <details
                onClick={() => {
                  this._toggleCompareImageContainer();
                }}
                open={window.matchMedia("(min-width: 600px)").matches}
              >
                <summary>{slide.summary}</summary>
                <div dangerouslySetInnerHTML={{ __html: slide.details }}></div>
              </details>
            )}
            {slide.compareImageURIs && (
              <div className="compare-image-container">
                <ReactCompareImage
                  leftImage={slide.compareImageURIs[0]}
                  leftImageAlt={slide.compareImageAltText[0]}
                  leftImageCss={{ objectFit: "contain" }}
                  rightImage={slide.compareImageURIs[1]}
                  rightImageAlt={slide.compareImageAltText[1]}
                  rightImageCss={{ objectFit: "contain" }}
                />
              </div>
            )}
          </div>
        </div>
        {sectionNo < MAX_SECTION_NO ? (
          <div className="bottom-container">
            <div
              className="scroll-down"
              onClick={() => {
                if (sectionNo < MAX_SECTION_NO) {
                  scrollToContent(sectionNo + 1);
                  this.props.dispatch(
                    handleSetContentAction(
                      sectionNo + 1,
                      imageConfig[sectionNo + 1]
                    )
                  );
                }
              }}
            >
              &#x025BF; Scroll down to continue
            </div>

            <div className="nca-logo">
              <img
                src="https://nca-toolkit.s3-us-west-2.amazonaws.com/NCA_logo_only_WHITE.png"
                alt="NCA logo"
              ></img>
            </div>
          </div>
        ) : null}
        {slide.footer && <Footer className="slides-footer" />}
      </section>
    );
  }
}

function mapStateToProps({ slides }) {
  return { slides };
}
export default connect(mapStateToProps)(Section);
