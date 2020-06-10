import React, { Component } from "react";
import PropTypes from "prop-types";
import { toggleMarkerSelector } from "../../../actions/markerSelect";
import "./SidePanel.scss";

class MarkerSelector extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    makerSelector: PropTypes.object.isRequired,
  };

  _handleMarkerSelectorClick = () => {
    const { isActive } = this.props.markerSelector;
    this.props.dispatch(toggleMarkerSelector(!isActive));
  };

  render() {
    return (
      <div
        className="marker-selector"
        onClick={() => {
          this._handleMarkerSelectorClick();
        }}
      >
        &#9733;
      </div>
    );
  }
}

export default MarkerSelector;
