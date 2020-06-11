import React, { Component } from "react";
import GeocoderInput from "./GeocoderInput";
import MarkerSelector from "./MarkerSelector";
import "./SidePanel.scss";

class SidePanel extends Component {
  render() {
    return (
      <article className="side-panel-container">
        <div className="outer-panel">
          <aside className="panel-label">Construction Permits by Type</aside>
          <aside className="panel-label">Search by location</aside>
          {/* <div className="geocoder-marker-container">
            <GeocoderInput {...this.props} />
            <MarkerSelector {...this.props} />
          </div> */}
          <GeocoderInput {...this.props} />
        </div>
        <div className="outer-panel">
          <aside className="panel-label">Construction Site Information</aside>
        </div>
        <div className="outer-panel">
          <aside className="panel-label">About</aside>
        </div>
      </article>
    );
  }
}

export default SidePanel;
