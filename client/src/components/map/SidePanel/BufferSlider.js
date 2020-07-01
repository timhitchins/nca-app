//THIS IS FOR DEV ONLY

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { createNewViewport, createBuffer } from "../../../utils/mapUtils";
// import { setBufferValues, handleGetSiteData } from "../../../actions/mapData";
// import { getMapState } from "../../../actions/mapState";
// import Slider from "react-rangeslider";
// import "react-rangeslider/lib/index.css";
// import "./Sliders.scss";

// class BufferSlider extends Component {
//   static propTypes = {
//     geocodedData: PropTypes.object.isRequired,
//     mapData: PropTypes.object.isRequired,
//     mapState: PropTypes.object.isRequired,
//     siteData: PropTypes.object.isRequired,
//     dispatch: PropTypes.func.isRequired,
//   };

//   _createNewViewport = (geojson, mapState) => {
//     //trigger new viewport
//     const { longitude, latitude, zoom } = createNewViewport(geojson, mapState);
//     this.props.dispatch(
//       getMapState({
//         ...mapState,
//         longitude,
//         latitude,
//         zoom,
//       })
//     );
//   };

//   _handleOnChangeComplete = () => {
//     const { centralMarker, yearRange } = this.props.mapData;
//     const { longitude, latitude } = centralMarker;
//     const { distance, units } = this.props.mapData.buffer;
//     const { mapState } = this.props;
//     const { errorMsgIsOpen } = this.props.geocodedData;
//     // const { yearSelector } = this.props.siteData;

//     if (
//       !errorMsgIsOpen &
//       (centralMarker.longitude !== null || centralMarker.latitude !== null)
//     ) {
//       //set up route and dispatch action for site data
//       const encodedCoords = encodeURI(
//         JSON.stringify({ lon: longitude, lat: latitude })
//       );
//       const route = `/api/location/${encodedCoords}/${distance}/${units}/${yearRange}`;
//       this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
//         //create the new buffer
//         const bufferGeoJSON = createBuffer(centralMarker, distance, units);
//         this.props.dispatch(setBufferValues(distance, units, bufferGeoJSON));

//         // create the viewport
//         this._createNewViewport(sitesGeoJSON, mapState);
//       });
//     }
//   };

//   _handleOnChange = (value) => {
//     const { geoJSON, units } = this.props.mapData.buffer;
//     this.props.dispatch(setBufferValues(value, units, geoJSON));
//   };

//   render() {
//     const { distance } = this.props.mapData.buffer;
//     return (
//       <div>
//         <div className="slider-title">
//           Show results within {distance} meters
//         </div>
//         <Slider
//           min={500}
//           max={1500}
//           value={distance}
//           orientation="horizontal"
//           onChange={this._handleOnChange}
//           onChangeComplete={this._handleOnChangeComplete}
//           labels={{ 500: "500", 1000: "1,000", 1500: "1,500" }}
//         />
//       </div>
//     );
//   }
// }

// export default BufferSlider;
