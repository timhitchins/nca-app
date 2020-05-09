import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  setScrollPositionAction,
  setScrollHeightDiffAction,
  toggleImageOpacityAction,
  handleSetContentAction,
  setTimerAction,
  setScrollToggleAction,
} from "../../../actions/slides";
// import { debounced, throttled } from "../../../utils/generalUtils";
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

  _setScrollPositionToggle = (sTop, heightDiff) => {
    this.props.dispatch(setScrollPositionAction(sTop));
    this.props.dispatch(setScrollHeightDiffAction(heightDiff));
  };

  _seSectionNumToggle = (sTop) => {
    const { pos, heightDiff, sectionNo, sectionRef } = this.props.slides;

    if (pos > sTop && sectionNo >= 0) {
      const sectionDecrement = sectionNo - 1;
      const currentBgImage = imageConfig[sectionDecrement];
      // this.contentRef.current.scrollTo({
      //   top: sectionRef[sectionDecrement].current.offsetTop,
      //   behavior: "smooth",
      // });
      this.props.dispatch(
        handleSetContentAction(sectionDecrement, currentBgImage)
      );
    } else if (pos < sTop && sectionNo < 14) {
      const sectionIncrement = sectionNo + 1;
      const currentBgImage = imageConfig[sectionIncrement];
      // this.contentRef.current.scrollTo({
      //   top: sectionRef[sectionIncrement].current.offsetTop,
      //   behavior: "smooth",
      // });
      this.props.dispatch(
        handleSetContentAction(sectionIncrement, currentBgImage)
      );
    } else {
      this.props.dispatch(
        handleSetContentAction(sectionNo, imageConfig[sectionNo])
      );
    }
  };

  _setSectionNo = (direction) => {
    this.props.dispatch(setScrollToggleAction(true));
    const { sectionNo, sectionRef, isScrolling } = this.props.slides;
    console.log(sectionNo);
    if (direction === "down" && sectionNo < 13 && isScrolling) {
      this.props.dispatch(
        handleSetContentAction(sectionNo + 1, imageConfig[sectionNo + 1])
      );
      this.contentRef.current.scrollTo({
        top: sectionRef[sectionNo + 1].current.offsetTop,
        behavior: "smooth",
      });
    }
    if (direction === "up" && sectionNo > 0 && isScrolling) {
      this.props.dispatch(
        handleSetContentAction(sectionNo - 1, imageConfig[sectionNo - 1])
      );
      this.contentRef.current.scrollTo({
        top: sectionRef[sectionNo - 1].current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  _setContent = () => {
    const { sectionNo } = this.props.slides;
  };

  _scrollToSection = (e) => {
    const { scrollTop, scrollHeight } = e.target;
    const { sectionRef, sectionNo, pos } = this.props.slides;

    const heightDiff = scrollHeight - scrollTop;
    this._setScrollPositionToggle(scrollTop, heightDiff);
    this._seSectionNumToggle(scrollTop);
  };

  // _scrollToSectionThrottle = throttle(this._scrollToSection, 500);
  _scrollToSectionDebounce = debounce(this._scrollToSection, 500);

  _handleNavigation = (e) => {
    const element = e.target;
    const { scrollTop } = element;
    const { sectionNo, sectionRef, pos } = this.props.slides;

    //handle the timer
    const time = new Date() - this.time;
    console.log("time since last scroll: ", time);
    //handle the scrolling direction
    if (this.prevScroll > scrollTop && time > 900) {
      console.log("scrolling up");
      this._setSectionNo("up");
    } else if (this.prevScroll < scrollTop && time > 900) {
      console.log("scrolling down");
      this._setSectionNo("down");
    }
    this.prevScroll = scrollTop;
    this.time = new Date();
  };

  handleTimer = () => {};

  _handleNavigationDebounce = debounce(this._handleNavigation, 200);
  // _handleNavigationThrottle = throttle(this._handleNavigation, 500);
  // _handleKeyPress = (e) => {
  //   console.log(e);
  // };

  componentDidMount() {
    this.prevScroll = this.contentRef.current.scrollTop;
    this.time = new Date();
  }

  componentDidUpdate(prevProps) {}

  render() {
    const { sectionNo, sectionRef } = this.props.slides;
    return (
      <div
        className="content-container"
        ref={this.contentRef}
        onScroll={(e) => {
          e.persist();
          this._handleNavigationDebounce(e);
          // e.preventDefault();
          // this._handleNavigationThrottle(e);
        }}
        // onKeyPress={this._handleKeyPress}
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
