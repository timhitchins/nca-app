import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import ReactCompareImage from "react-compare-image";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
} from "../../../actions/slides";
import { MAX_SECTION_NO, imageConfig } from "../../../config/config";
import "./Slides.scss";

class Section extends Component {
  static propTypes = {
    slide: PropTypes.object.isRequired,
    className: PropTypes.string.isRequired,
    scrollToContent: PropTypes.func.isRequired,
  };

  sectionRef = React.createRef();

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
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === 3 ? true : false}
                      />
                    )}
                    {slide.videoName === "we-are-with-earth" && (
                      <ReactPlayer
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                        width={null} // override
                        height={null} // override
                        url={slide.videoURI}
                        controls={true}
                        playing={sectionNo === 9 ? true : false}
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
              <details open={window.matchMedia("(min-width: 600px)").matches}>
                <summary>{slide.summary}</summary>
                <div dangerouslySetInnerHTML={{ __html: slide.details }}></div>
              </details>
            )}
            {slide.compareImageURIs && (
              <div className="compare-image-container">
                <ReactCompareImage
                  leftImage={slide.compareImageURIs[0]}
                  rightImage={slide.compareImageURIs[1]}
                />
              </div>
            )}
            {slide.takeAction && (
              <div className="buttons-container">
                <Link
                  to={{
                    pathname: "/take-action",
                  }}
                >
                  <div className="take-action">
                    <div>Take Action</div> <div>&#10148;</div>
                  </div>
                </Link>
                <Link
                  to={{
                    pathname: "/the-tool",
                  }}
                >
                  <div className="to-map">
                    <div>
                      See the impacts of contruction sites in your neighborhood
                    </div>
                    <div>&#10148;</div>
                  </div>
                </Link>
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
        {slide.footer && (
          <footer className="footer">
            <div> &copy; 2020 | NEIGHBORS FOR CLEAN AIR</div>
            <div></div>
            <div>A project by</div>
            <div className="nca-logo">
              <a
                href="http://www.whatsinourair.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://nca-toolkit.s3-us-west-2.amazonaws.com/NCA_logo_only_WHITE.png"
                  alt="NCA logo"
                ></img>
              </a>
            </div>
            <div>in partnership with</div>
            <div>
              <a
                href="https://mappingaction.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://nca-toolkit.s3-us-west-2.amazonaws.com/MAC_Logo_horizontal-02.png"
                  alt="MAC logo"
                ></img>
              </a>
            </div>
          </footer>
        )}
      </section>
    );
  }
}

function mapStateToProps({ slides }) {
  return { slides };
}
export default connect(mapStateToProps)(Section);
