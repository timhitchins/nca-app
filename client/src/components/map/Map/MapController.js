import React, { Component } from "react";
import PropTypes from "prop-types";
import { getMapState } from "../../../actions/mapState";
import {
  setMarkerCoords,
  setBufferValues,
  getSiteData,
} from "../../../actions/mapData";
import "./MapController.scss";

class MapController extends Component {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
  };
  _createNewViewport = (mapState, type) => {
    const { zoom } = mapState;
    const { distance, units } = this.props.mapData.buffer;

    const defaultMapState = {
      ...mapState,
      latitude: 45.506243,
      longitude: -122.608626,
      zoom: 10,
    };

    switch (type) {
      case "zoom-in":
        this.props.dispatch(getMapState({ ...mapState, zoom: zoom + 1 }));
        break;
      case "zoom-out":
        this.props.dispatch(getMapState({ ...mapState, zoom: zoom - 1 }));
        break;
      case "home":
        // reset the map
        this.props.dispatch(getMapState(defaultMapState));
        this.props.dispatch(setMarkerCoords(null, null));
        this.props.dispatch(setBufferValues(distance, units, null));
        this.props.dispatch(getSiteData(null));
        break;
      default:
        this.props.dispatch(getMapState(defaultMapState));
        break;
    }
  };

  render() {
    const { mapState } = this.props;
    return (
      <aside>
        <div className="map-controller-container">
          <div
            title="Reset map"
            onClick={() => {
              this._createNewViewport(mapState, "home");
            }}
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/home_symbol.png"
              alt="Home button symbol."
            />
          </div>
          <div
            title="Zoom in"
            onClick={() => {
              this._createNewViewport(mapState, "zoom-in");
            }}
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/plus_symbol.png"
              alt="Zoom in button symbol."
            />
          </div>
          <div
            title="Zoom out"
            onClick={() => {
              this._createNewViewport(mapState, "zoom-out");
            }}
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/minus_symbol.png"
              alt="Zome out button symbol."
            />
          </div>
        </div>
      </aside>
    );
  }
}

export default MapController;
