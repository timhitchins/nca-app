import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  handleSetContentAction,
  setScrollToggleAction,
} from "../../../actions/slides";
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

  _setSectionNo = (direction) => {
    this.props.dispatch(setScrollToggleAction(true));
    const { sectionNo, sectionRef, isScrolling } = this.props.slides;

    if (direction === "down" && sectionNo < 13 && isScrolling) {
      // console.log("setting down");
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      console.log("scrolling down to ", sectionNo + 1);
      this._scrollToContent(sectionNo + 1);
    }
    if (direction === "up" && sectionNo > 0 && isScrolling) {
      // console.log("setting up");
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      console.log("scrolling up to ", sectionNo - 1);
      this._scrollToContent(sectionNo - 1);
    }
    this.props.dispatch(setScrollToggleAction(false));
  };

  _scrollToContent = (section) => {
    const { sectionRef } = this.props.slides;
    this.contentRef.current.scrollTo({
      top: sectionRef[section].current.offsetTop,
      behavior: "smooth",
    });
  };

  _handleNavigation = (e) => {
    const element = e.target;
    const { scrollTop } = element;
    // console.log("scrollTop: ", scrollTop);
    // this.props.dispatch(setScrollToggleAction(true));
    const { sectionNo, sectionRef, pos, isScrolling } = this.props.slides;
    //handle the timer
    const time = new Date() - this.time;
    // console.log("time since last scroll: ", time);
    //handle the scrolling direction
    if (this.prevScroll > scrollTop && isScrolling) {
      // console.log("scrolling up");
      this._setSectionNo("up");
    } else if (this.prevScroll < scrollTop && isScrolling) {
      // console.log("scrolling down");
      this._setSectionNo("down");
    }
    this.prevScroll = scrollTop;
    this.time = new Date();
    // this.props.dispatch(setScrollToggleAction(false));
  };

  _handleScroll = () => {
    // console.log("setting true");
    this.props.dispatch(setScrollToggleAction(true));
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
    if (keyCode === 38 && sectionNo > 0) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
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
      console.log("down: ", this.prevTouchScroll, offsetTop);
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this._scrollToContent(sectionNo + 1);

      //set the scroll pos
      this.prevTouchScroll = offsetTop;
    }

    //touchmove up
    if (
      this.touchStart < touchMovePos &&
      this.prevTouchScroll !== offsetTop &&
      sectionNo > 0
    ) {
      console.log("up: ", this.prevTouchScroll, offsetTop);
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

  _handleScrollThrottle = throttle(this._handleScroll, 1500);
  _handleNavigationThrottle = throttle(this._handleNavigation, 1500);
  _handleKeyDownThrottle = throttle(this._handleKeyDown, 1000);
  _handleTouchMoveThrottle = throttle(this._handleTouchMove, 1000);
  _handleTouchStartThrottle = throttle(this._handleTouchStart, 1000);

  componentDidMount() {
    this.prevScroll = this.contentRef.current.scrollTop;
    this.prevTouchScroll = this.contentRef.current.scrollTop - 1;
    this.time = new Date();

    //annoying hack to deal with touch move passive events
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
  }

  componentDidUpdate(prevProps) {}

  render() {
    const { sectionNo, sectionRef } = this.props.slides;
    return (
      <div
        tabIndex="0"
        className="content-container"
        ref={this.contentRef}
        onScroll={(e) => {
          e.persist();
          // this._handleScrollThrottle();
          // this._handleNavigationThrottle(e);
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

//   const bottom =
//     e.target.scrollHeight - e.target.scrollTop ===
//     e.target.clientHeight;
//   console.log(bottom);

// console.log(scrollTop);
//trigger section and pos
// this._setScrollPositionToggle(scrollTop);

// console.log("scroll e", e.target);
// debugger;
// if (
//   sectionRef[0].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[1].current.offsetTop
// )
// {
//   console.log("slide 1");
//   // console.log(this.contentRef.current);
//   this.contentRef.current.scrollTo({
//     top: sectionRef[0].current.offsetTop,
//     behavior: "smooth",
//   });
// }
// if (
//   sectionRef[1].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[2].current.offsetTop
// ) {
//   console.log("slide 2");
//   this.contentRef.current.scrollTo({
//     top: sectionRef[1].current.offsetTop,
//     behavior: "smooth",
//   });
// }
// if (
//   sectionRef[2].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[3].current.offsetTop
// ) {
//   console.log("slide 3");
// }
// if (
//   sectionRef[3].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[4].current.offsetTop
// ) {
//   console.log("slide 4");
// }
// if (
//   sectionRef[4].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[5].current.offsetTop
// ) {
//   console.log("slide 5");
// }
// if (
//   sectionRef[5].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[6].current.offsetTop
// ) {
//   console.log("slide 6");
// }
// if (
//   sectionRef[6].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[7].current.offsetTop
// ) {
//   console.log("slide 7");
// }
// if (
//   sectionRef[7].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[8].current.offsetTop
// ) {
//   console.log("slide 8");
// }
// if (
//   sectionRef[8].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[9].current.offsetTop
// ) {
//   console.log("slide 9");
// }
// if (
//   sectionRef[9].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[10].current.offsetTop
// ) {
//   console.log("slide 10");
// }
// if (
//   sectionRef[10].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[11].current.offsetTop
// ) {
//   console.log("slide 11");
// }
// if (
//   sectionRef[11].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[12].current.offsetTop
// ) {
//   console.log("slide 12");
// }
// if (
//   sectionRef[12].current.offsetTop <= scrollTop &&
//   scrollTop < sectionRef[13].current.offsetTop
// ) {
//   console.log("slide 13");
// }
// if (scrollTop >= sectionRef[13].current.offsetTop) {
//   console.log("slide 14");
// }

// _setContent = () => {
//   const { sectionNo } = this.props.slides;
// };

// _scrollToSection = (e) => {
//   const { scrollTop, scrollHeight } = e.target;
//   const { sectionRef, sectionNo, pos } = this.props.slides;

//   const heightDiff = scrollHeight - scrollTop;
//   this._setScrollPositionToggle(scrollTop, heightDiff);
//   this._seSectionNumToggle(scrollTop);
// };

// // _scrollToSectionThrottle = throttle(this._scrollToSection, 500);
// _scrollToSectionDebounce = debounce(this._scrollToSection, 500);

// _setScrollPositionToggle = (sTop, heightDiff) => {
//   this.props.dispatch(setScrollPositionAction(sTop));
//   this.props.dispatch(setScrollHeightDiffAction(heightDiff));
// };

// _seSectionNumToggle = (sTop) => {
//   const { pos, heightDiff, sectionNo, sectionRef } = this.props.slides;

//   if (pos > sTop && sectionNo >= 0) {
//     const sectionDecrement = sectionNo - 1;
//     const currentBgImage = imageConfig[sectionDecrement];
//     this.props.dispatch(
//       handleSetContentAction(sectionDecrement, currentBgImage)
//     );
//   } else if (pos < sTop && sectionNo < 14) {
//     const sectionIncrement = sectionNo + 1;
//     const currentBgImage = imageConfig[sectionIncrement];
//     this.props.dispatch(
//       handleSetContentAction(sectionIncrement, currentBgImage)
//     );
//   } else {
//     this.props.dispatch(
//       handleSetContentAction(sectionNo, imageConfig[sectionNo])
//     );
//   }
// };
