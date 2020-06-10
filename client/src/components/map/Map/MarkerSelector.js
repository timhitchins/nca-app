import React, { Component } from "react";
import "./SidePanel.scss";

class MarkerSelector extends Component {
  _handleMarkerClick = (isActive) => {
    console.log(isActive);
  };

  render() {
    return (
      <div
        className="marker-selector"
        onClick={() => {
          this._handleMarkerClick(true);
        }}
      >
        &#9733;
      </div>
    );
  }
}

export default MarkerSelector;
