import React, { Component } from "react";
import PropTypes from "prop-types";
import { toggleMarkerSelector } from "../../../actions/markerSelect";
import {
  setSearchTerm,
  toggleGeocodeResults,
  toggleErrorMessage,
} from "../../../actions/geocode";
import "./SidePanel.scss";

class MarkerSelector extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    makerSelector: PropTypes.object.isRequired,
  };

  _handleMarkerSelectorClick = () => {
    const { isActive } = this.props.markerSelector;
    this.props.dispatch(toggleMarkerSelector(!isActive));
    this.props.dispatch(toggleGeocodeResults(false));
    this.props.dispatch(toggleErrorMessage(false));
    this.props.dispatch(setSearchTerm(""));
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
