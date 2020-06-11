import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./BufferSlider.scss";

class BufferSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0,
    };
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value,
    });
  };

  render() {
    let { volume } = this.state;
    return (
      <div>
        <span className="slider-title">Show results within NUMBER</span>
        <Slider
          value={volume}
          orientation="horizontal"
          labels={{ 0: "Low", 50: "Medium", 100: "High" }}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

export default BufferSlider;
