import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createSectionRefAction,
  setScrollPositionAction,
  toggleImageOpacityAction,
  //   setSectionNumberAction,
  handleSetContentAction,
} from "../../../actions/slides";
// import { debounced, throttled } from "../../../utils/generalUtils";
import { throttle } from "lodash";
import { imgConfig, imageConfig } from "../../../config/imgConfig";
import "./Slides.scss";

class Section extends Component {
  static propTypes = {
    slides: PropTypes.object.isRequired,
  };

  sectionRef = React.createRef();

  componentDidMount() {
    console.log(this.sectionRef);
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

  _setScrollPositionToggle = (sTop) => {
    this.props.dispatch(setScrollPositionAction(sTop));
  };

  _seSectionNumToggle = (sTop) => {
    const { pos, sectionNo } = this.props.slides;

    if (pos > sTop) {
      //   this.props.dispatch(setSectionNumberAction(sectionNo - 1)); // make this an action
      const sectionDecrement = sectionNo - 1;
      const currentBgImage = imageConfig[sectionDecrement];

      this.props.dispatch(
        handleSetContentAction(sectionDecrement, currentBgImage)
      );
    } else if (pos < sTop) {
      //   this.props.dispatch(setSectionNumberAction(sectionNo + 1)); //make this an action
      const sectionIncrement = sectionNo + 1;
      const currentBgImage = imageConfig[sectionIncrement];
      this.props.dispatch(
        handleSetContentAction(sectionIncrement, currentBgImage)
      );
    } else {
      //   this.props.dispatch(setSectionNumberAction(sectionNo));
      this.props.dispatch(
        handleSetContentAction(sectionNo, imageConfig[sectionNo])
      );
    }
  };
  _scrollToSection = (sectionRef) => {
    const scrollTop = this.contentRef.current.scrollTop;
    this._setScrollPositionToggle(scrollTop);
    this._seSectionNumToggle(scrollTop);
  };

  _scrollToSectionThrottle = throttle(this._scrollToSection, 500);

  //   _toggleContent() {}

  render() {
    const { sectionNo } = this.props.slides;
    return (
      <div
        className="content-container"
        ref={this.contentRef}
        onScroll={(e) => {
          // debounced(1000, this._scrollToSection());
          this._scrollToSectionThrottle();
        }}
        onWheel={(e) => {
          console.log("deltaMode: ", e.deltaMode);
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
