import React, { Component } from "react";
import GeocoderInput from "./GeocoderInput";
import BufferSlider from "./BufferSlider";
import PermitTypeText from "./PermitTypeText";
import PDIIndicator from "./PDIIndicator";
import "./SidePanel.scss";

class SidePanel extends Component {
  render() {
    return (
      <article className="side-panel-container">
        <div className="outer-panel">
          <aside className="panel-label">Construction Permits by Type</aside>
          <PermitTypeText {...this.props} />
          <aside className="panel-label">Search by location</aside>
          <GeocoderInput {...this.props} />
          <BufferSlider {...this.props} />
        </div>
        <div className="outer-panel">
          <aside className="panel-label">Construction Site Information</aside>
          <PDIIndicator {...this.props} />
        </div>
        <div className="outer-panel">
          <aside className="panel-label">About</aside>
        </div>
      </article>
    );
  }
}

export default SidePanel;
