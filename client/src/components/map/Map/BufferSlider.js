import React, { Component } from "react";
import PropTypes from "prop-types";
import { createNewViewport, createBuffer } from "../../../utils/mapUtils";
import { setBufferValues, handleGetSiteData } from "../../../actions/mapData";
import { getMapState } from "../../../actions/mapState";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./BufferSlider.scss";

class BufferSlider extends Component {
  static propTypes = {
    geocodedData: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    mapState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _createNewViewport = (geojson, mapState) => {
    //trigger new viewport
    const { longitude, latitude, zoom } = createNewViewport(geojson, mapState);
    this.props.dispatch(
      getMapState({
        ...mapState,
        longitude,
        latitude,
        zoom,
        transitionDuration: 1000,
      })
    );
  };

  _handleOnChangeComplete = (value) => {
    const { centralMarker } = this.props.mapData;
    const { longitude, latitude } = centralMarker;
    const { distance, units } = this.props.mapData.buffer;
    const { mapState } = this.props;
    const { errorMsgIsOpen } = this.props.geocodedData;

    if (
      !errorMsgIsOpen &
      (centralMarker.longitude !== null || centralMarker.latitude !== null)
    ) {
      //set up route and dispatch action for site data
      const encodedCoords = encodeURI(
        JSON.stringify({ lon: longitude, lat: latitude })
      );
      const route = `/api/location/${encodedCoords}/${distance}/${units}`;
      this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
        //create the new buffer
        const bufferGeoJSON = createBuffer(centralMarker, distance, units);
        this.props.dispatch(setBufferValues(distance, units, bufferGeoJSON));

        // create the viewport
        this._createNewViewport(sitesGeoJSON, mapState);
      });
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
