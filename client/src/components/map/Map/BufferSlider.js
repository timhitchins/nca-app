import React, { Component } from "react";
import PropTypes from "prop-types";
import { setBufferValues } from "../../../actions/mapData";
import { createBuffer } from "../../../utils/mapUtils";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./BufferSlider.scss";

class BufferSlider extends Component {
  static propTypes = {
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _handleOnChangeComplete = (value) => {
    const { centralMarker } = this.props.mapData;
    const { distance, units } = this.props.mapData.buffer;
    if (centralMarker.longitude !== null || centralMarker.latitude !== null) {
      const bufferGeoJSON = createBuffer(centralMarker, distance, units);
      this.props.dispatch(setBufferValues(distance, units, bufferGeoJSON));
    }
  };

  _handleOnChange = (value) => {
    const { geoJSON, units } = this.props.mapData.buffer;
    this.props.dispatch(setBufferValues(value, units, geoJSON));
  };

  //one more method for recalculating the buffer zone needed

  render() {
    const { distance } = this.props.mapData.buffer;
    return (
      <div>
        <span className="slider-title">
          Show results within {distance} meters
        </span>
        <Slider
          min={500}
          max={5000}
          value={distance}
          orientation="horizontal"
          onChange={this._handleOnChange}
          onChangeComplete={this._handleOnChangeComplete}
        />
      </div>
    );
  }
}

export default BufferSlider;
