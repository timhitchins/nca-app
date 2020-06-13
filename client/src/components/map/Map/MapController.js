import React, { Component } from "react";
import PropTypes from "prop-types";
import { getMapState } from "../../../actions/mapState";
import "./MapController.scss";

class MapController extends Component {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
  };
  _createNewViewport = (mapState, type) => {
    const { zoom } = mapState;

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
        this.props.dispatch(getMapState(defaultMapState));
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
            onClick={() => {
              this._createNewViewport(mapState, "home");
            }}
          >
            home
          </div>
          <div
            onClick={() => {
              this._createNewViewport(mapState, "zoom-in");
            }}
          >
            &#x0002B;
          </div>
          <div
            onClick={() => {
              this._createNewViewport(mapState, "zoom-out");
            }}
          >
            &#x02014;
          </div>
        </div>
      </aside>
    );
  }
}

export default MapController;
