import React, { Component } from "react";
import { connect } from "react-redux";
import NCAMap from "./Map";
import SidePanel from "./SidePanel";
import LoadingIndicator from "../Loading/LoadingIndicator";
import "./Map.scss";

class MapContainer extends Component {
  render() {
    return (
      <main className="map-container">
        <div className="title">NCA Construction Diesel Toolkit</div>
        <NCAMap {...this.props} />
        <SidePanel {...this.props} />
        <LoadingIndicator {...this.props} />
      </main>
    );
  }
}
function mapStateToProps({ mapState, mapData, isLoading, geocodedData }) {
  // const { features } = geocodedData.geocodedResults;

  return { mapState, mapData, isLoading, geocodedData };
}
export default connect(mapStateToProps)(MapContainer);

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
