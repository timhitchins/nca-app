import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  handleSetContentAction,
  setScrollToggleAction,
} from "../../../actions/slides";
import { calculateSectionScrollTo } from "../../../utils/generalUtils";
import Section from "./Section";
import { throttle, debounce } from "lodash";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

//constants
const MAX_SECTION_NO = 14;
const MIN_SECTION_NO = 0;

//will need to scroll to contentRef --> cardRef offsettop
class AllContent extends Component {
  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  contentRef = React.createRef();

  //scroll to content dependent on sectionNo
  _scrollToContent = (section) => {
    const { sectionRef } = this.props.slides;
    this.contentRef.current.scrollTo({
      top: sectionRef[section].current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  //handle scroll bar scrolls
  _handleScroll = (e) => {
    const { sectionRef } = this.props.slides;
    const { scrollTop } = e.target;

    // calculate the sectionNo from scroll postion
    const section = calculateSectionScrollTo(sectionRef, scrollTop);
    this._scrollToContent(section);
    this.props.dispatch(handleSetContentAction(section, imageConfig[section]));
  };

  //handle only up and down keypresses
  _handleKeyDown = (keyCode) => {
    const { sectionNo } = this.props.slides;
    //if arrow down
    if (keyCode === 40 && sectionNo < MAX_SECTION_NO) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);
    }
    //if arrow up
    else if (keyCode === 38 && sectionNo > MIN_SECTION_NO) {
      this._scrollToContent(sectionNo - 1);
    }
    this.props.dispatch(setScrollToggleAction(false));
  };

  //handle mobile touch scrolling
  _handleTouchMove = (e) => {
    const { sectionNo } = this.props.slides;
    const { offsetTop } = e.srcElement;

    const touchMovePos = e.touches[0].clientY;
    //touchmove down
    if (
      this.touchStart > touchMovePos &&
      this.prevTouchScroll !== offsetTop &&
      sectionNo < MAX_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);

      //set the scroll pos
      this.prevTouchScroll = offsetTop;
    }

    //touchmove up
    else if (
      this.touchStart < touchMovePos &&
      this.prevTouchScroll !== offsetTop &&
      sectionNo > MIN_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      this._scrollToContent(sectionNo - 1);

      //set the scroll pos
      this.prevTouchScroll = offsetTop;
    }
  };

  //set attribute for scroll position on touch start
  _handleTouchStart = (e) => {
    this.touchStart = e.nativeEvent.touches[0].clientY;
  };

  _handleWheel = (e) => {
    const { sectionNo } = this.props.slides;
    const { deltaY } = e;
    const { offsetTop } = e.target;

    //wheel down
    if (
      deltaY > 0 &&
      this.prevWheelScroll !== offsetTop &&
      sectionNo < MAX_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);
      //set the scroll pos
      this.prevWheelScroll = offsetTop;
    }
    // wheel up
    else if (
      deltaY < 0 &&
      this.prevWheelScroll !== offsetTop &&
      sectionNo > MIN_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      this._scrollToContent(sectionNo - 1);
      //set the scroll pos
      this.prevWheelScroll = offsetTop;
    }
  };

  //throttled and debounced methods
  _handleScrollDebounce = debounce(this._handleScroll, 500);
  _handleKeyDownThrottle = throttle(this._handleKeyDown, 1000);
  _handleTouchMoveThrottle = throttle(this._handleTouchMove, 1000);
  _handleTouchStartThrottle = throttle(this._handleTouchStart, 1000);
  _handleWheelThrottle = throttle(this._handleWheel, 1000);

  componentDidMount() {
    //attributes to trach previous positioning
    this.prevScroll = this.contentRef.current.scrollTop;
    this.prevTouchScroll = this.contentRef.current.scrollTop - 1;
    this.prevWheelScroll = this.contentRef.current.scrollTop - 1;

    //annoying hacks to deal with touch move passive events
    //woulle like to be able to move this to a react synthetic event
    const container = document.querySelector(".content-container");
    container.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        this._handleTouchMoveThrottle(e);
      },

      false
    );
    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this._handleWheelThrottle(e);
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    // console.log("Previous section", prevProps.slides.sectionNo);
    // console.log("New section: ", this.props.slides.sectionNo);
  }

  render() {
    const { sectionNo, sectionRef } = this.props.slides;
    return (
      <div
        tabIndex="0"
        className="content-container"
        ref={this.contentRef}
        onScroll={(e) => {
          e.persist();
          this._handleScrollDebounce(e);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
            this._handleKeyDownThrottle(e.keyCode);
          }
        }}
        onTouchStart={(e) => {
          e.persist();
          this._handleTouchStartThrottle(e);
        }}
      >
        {imageConfig.map((slide, i) => {
          let className = "two-col";
          switch (i) {
            case 0:
            case 7:
              className = "one-col";
              break;
            default:
              className = "two-col";
              break;
          }
          return (
            <Section
              key={`slide-${i}`}
              slide={slide}
              className={className}
              dispatch={this.props.dispatch}
            />
          );
        })}
      </div>
    );
  }
}

export default AllContent;
