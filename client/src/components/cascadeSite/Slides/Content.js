import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleSetContentAction } from "../../../actions/slides";
import { calculateSectionScrollTo } from "../../../utils/generalUtils";
import Section from "./Section";
import { throttle, debounce } from "lodash";
import {
  MIN_SECTION_NO,
  MAX_SECTION_NO,
  imageConfig,
} from "../../../config/slideConfig";
import "./Slides.scss";

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
    // this.prevWheelScroll = sectionRef[section].current.offsetTop;
    this.prevScroll = sectionRef[section].current.offsetTop;
  };

  //handle scroll bar scrolls
  _handleScroll = (e) => {
    const { sectionRef } = this.props.slides;
    const { scrollTop } = e.target;
    // const breaks = sectionRef.map((section) => section.current.offsetTop);

    const section = calculateSectionScrollTo(sectionRef, scrollTop + 1); // addind to deal with discrepanciesu
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
  };

  //handle mobile touch scrolling
  _handleTouchMove = (e) => {
    const { sectionNo } = this.props.slides;
    const { offsetTop } = e.srcElement;
    const touchMovePos = e.touches[0].clientY;

    //touchmove down
    if (
      this.touchStart > touchMovePos &&
      // this.prevTouchScroll !== offsetTop &&
      sectionNo < MAX_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);
      console.log("touch down");
      //set the scroll pos
      this.prevTouchScroll = offsetTop;
      this.prevScroll = offsetTop;
    }

    //touchmove up
    else if (
      this.touchStart < touchMovePos &&
      // this.prevTouchScroll !== offsetTop &&
      sectionNo > MIN_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      this._scrollToContent(sectionNo - 1);
      console.log("touch up");
      //set the scroll pos
      this.prevTouchScroll = offsetTop;
      this.prevScroll = offsetTop;
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
      // this.prevWheelScroll !== offsetTop &&
      sectionNo < MAX_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);
      //set the scroll pos
      this.prevWheelScroll = offsetTop;
      this.prevScroll = offsetTop;
    }
    // wheel up
    else if (
      deltaY < 0 &&
      // this.prevWheelScroll !== offsetTop &&
      sectionNo > MIN_SECTION_NO
    ) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      this._scrollToContent(sectionNo - 1);
      //set the scroll pos
      this.prevWheelScroll = offsetTop;
      this.prevScroll = offsetTop;
    }
  };

  //throttled and debounced methods
  _handleScrollDebounce = debounce(this._handleScroll, 200);
  _handleKeyDownThrottle = throttle(this._handleKeyDown, 200);
  _handleTouchMoveDebounce = debounce(this._handleTouchMove, 200);
  _handleTouchStartThrottle = throttle(this._handleTouchStart, 200);
  _handleWheelDebounce = debounce(this._handleWheel, 200);

  componentDidMount() {
    //attributes to track previous positioning
    this.prevScroll = this.contentRef.current.scrollTop - 1;
    this.prevTouchScroll = this.contentRef.current.scrollTop - 1;
    this.prevWheelScroll = this.contentRef.current.scrollTop - 1;

    //focus the container for the keyboard
    const container = document.querySelector(".content-container");
    container.focus();

    //annoying hacks to deal with touch move passive events
    //woulle like to be able to move this to a react synthetic event
    container.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        this._handleTouchMoveDebounce(e);
      },

      false
    );
    container.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this._handleWheelDebounce(e);
      },
      false
    );
  }

  componentDidUpdate(prevProps) {
    // console.log("Previous section", prevProps.slides.sectionNo);
    // console.log("New section: ", this.props.slides.sectionNo);
  }

  render() {
    // const { sectionNo, sectionRef } = this.props.slides;
    return (
      <div
        tabIndex="0"
        className="content-container"
        ref={this.contentRef}
        onScroll={(e) => {
          e.persist();
          console.log("scrolling");
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
          //this switch programmatically assigns classnames to each slide
          let className = "two-col";
          switch (i) {
            case 0:
            case 9:
              className = "two-col half-size";
              break;
            case 12:
              className = "one-col";
              break;
            case 0:
            case 1:
            case 5:
              className = "two-col border-image";
              break;
            case 2:
              className = "two-col pie-chart";
            case 7:
            case 8:
              className = "two-col fit-text";
              break;
            {/* case 9:
              className = "one-col font-adjust";
              break; */}
            case 6:
            case 10:
              className = "two-col single-video";
              break;
            case 11:
              className = "two-col-compare-images";
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
              scrollToContent={this._scrollToContent}
              index={i}
            />
          );
        })}
      </div>
    );
  }
}

export default AllContent;
