// import React, { PureComponent } from "react";
// import { Marker } from "react-map-gl";
// import PropTypes from "prop-types";
// import Pin from "./Pin";

// const residentialMarkerURI =
//   "https://nca-toolkit.s3-us-west-2.amazonaws.com/noun_cottage_191764.png";
// const commercialMarkerURI =
//   "https://nca-toolkit.s3-us-west-2.amazonaws.com/noun_City_191844.png";

// const markerStyles = {
//   height: "75px",
//   width: "75px",
//   cursor: "pointer",
// };

// class SiteMarkers extends PureComponent {
//   static propTypes = {
//     markerSelector: PropTypes.object.isRequired,
//     dispatch: PropTypes.func.isRequired,
//   };

//   render() {
//     // geojson features
//     const { features } = this.props.mapData.siteMarkers;
//     return features.map((feature) => {
//       const [lon, lat] = feature.geometry.coordinates;
//       return (
//         <Marker
//           key={feature.id}
//           longitude={lon}
//           latitude={lat}
//           offsetTop={-25}
//           offsetLeft={-15}
//         >
//           <img src={residentialMarkerURI} style={markerStyles}></img>
//         </Marker>
//       );
//     });
//   }
// }

// export default SiteMarkers;
