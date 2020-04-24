import React, { Component } from "react";
import "./Slides.scss";

const imgURI =
  "https://nca-toolkit.s3-us-west-2.amazonaws.com/OregonLive_hazepdxjpg-e8d26d8245f61043.jpg";

class Slide1 extends Component {
  render() {
    return (
      <section>
        <img src={imgURI} className="bg-image" allt="person running"></img>
      </section>
    );
  }
}

export default Slide1;
