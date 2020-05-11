import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
  setScrollToggleAction,
} from "../../../actions/slides";
import { calculateSectionScrollTo } from "../../../utils/generalUtils";
import { throttle, debounce } from "lodash";
import { imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

class Section extends Component {
  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  sectionRef = React.createRef();

  componentDidMount() {
    console.log("content offsetTop ", this.sectionRef.current.offsetTop);
    //create the array in the store that includes these refs for scrolling
    this.props.dispatch(createSectionRefAction(this.sectionRef));
  }

  render() {
    return (
      <section className="content-section" ref={this.sectionRef}>
        <div className="container">{this.props.children}</div>
      </section>
    );
  }
}

//will need to scroll to contentRef --> cardRef offsettop
class AllContent extends Component {
  contentRef = React.createRef();

  //scroll to content dependent on sectionNo
  _scrollToContent = (section) => {
    const { sectionRef } = this.props.slides;
    this.contentRef.current.scrollTo({
      top: sectionRef[section].current.offsetTop,
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
    if (keyCode === 40 && sectionNo < 13) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);
    }
    //if arrow up
    else if (keyCode === 38 && sectionNo > 0) {
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
      sectionNo < 13
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
      sectionNo > 0
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
    if (deltaY > 0 && this.prevWheelScroll !== offsetTop && sectionNo < 13) {
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
      sectionNo > 0
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
  _handleKeyDownThrottle = throttle(this._handleKeyDown, 500);
  _handleTouchMoveThrottle = throttle(this._handleTouchMove, 500);
  _handleTouchStartThrottle = throttle(this._handleTouchStart, 500);
  _handleWheelThrottle = throttle(this._handleWheel, 500);

  componentDidMount() {
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
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
        <Section {...this.props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus
          rhoncus, cursus nibh id, finibus nisi. Vestibulum semper dignissim
          quam, in faucibus nulla tempus eu. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Quisque
          pharetra massa lacus, vel viverra urna iaculis in. Nullam augue purus,
          cursus eget vehicula eu, efficitur nec elit. Aenean sed egestas lacus.
          Nullam ultrices leo eu malesuada venenatis. Phasellus ligula lacus,
          consectetur a lectus at, vulputate commodo neque. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Sed in purus eget ante convallis
          ultricies finibus quis tortor. Fusce dignissim felis sapien, dictum
          porta mauris tristique et. Nam maximus a neque at accumsan. Ut sit
          amet vehicula est. Curabitur ultricies facilisis placerat.
        </Section>
      </div>
    );
  }
}

export default AllContent;

