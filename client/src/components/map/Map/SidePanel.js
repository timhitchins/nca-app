import React, { Component } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import "./SidePanel.scss";

class SidePanel extends Component {
  render() {
    return (
      <article className="side-panel-container">
        <div className="panel-item">panel 1</div>
        <div className="panel-item">panel 2</div>
        <div className="panel-item">panel 3</div>
      </article>
    );
  }
}

export default SidePanel;
