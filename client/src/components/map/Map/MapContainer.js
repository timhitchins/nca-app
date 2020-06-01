import React, { Component } from "react";
import NCAMap from "./Map";
import SidePanel from "./SidePanel";
import "./Map.scss";

class MapContainer extends Component {
  render() {
    return (
      <main className="map-container">
        <NCAMap />
        <SidePanel />
      </main>
    );
  }
}

export default MapContainer;

/* ----- Dev Map Container ----- */
// class MapContainer extends Component {
//   render() {
//     return (
//       <div className="map-container">
//         <img
//           src="https://nca-toolkit.s3-us-west-2.amazonaws.com/map.png"
//           className="map-image"
//           alt="A map"
//         ></img>
//         <div className="centered-overlay">Coming Soon...</div>
//         <div className="opacity-overlay"></div>
//       </div>
//     );
//   }
// }
