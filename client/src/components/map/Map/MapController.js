import React, { Component } from "react";
import PropTypes from "prop-types";
import { calculatePanelScrollToHeight } from "../../../utils/generalUtils";
import { getMapState } from "../../../actions/mapState";
import {
  setMarkerCoords,
  setBufferValues,
  getSiteData,
} from "../../../actions/mapData";
import {
  setSiteData,
  setCurrentFeature,
  setSlideIndex,
} from "../../../actions/siteData";
import { toggleModal } from "../../../actions/modal";
import "./MapController.scss";

class MapController extends Component {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    sidePanel: PropTypes.object.isRequired,
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
        this.props.dispatch(setSiteData([]));
        this.props.dispatch(setSlideIndex(0));
        this.props.dispatch(setCurrentFeature(null));
        this._scrollToSidePanel("panel-1");
        break;
      default:
        this.props.dispatch(getMapState(defaultMapState));
        break;
    }
  };

  _openModal = () => {
    this.props.dispatch(toggleModal(true));
  };

  _scrollToSidePanel = (panel) => {
    const { panelRef } = this.props.sidePanel;
    const scrollToHeight = calculatePanelScrollToHeight(panel, panelRef);

    panelRef.current.scrollTo({
      top: scrollToHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  render() {
    const { mapState } = this.props;
    return (
      <aside>
        <div className="map-controller-container">
          <div
            title="More info"
            onClick={() => {
              this._openModal();
            }}
          >
            <img
              src=" https://nca-toolkit.s3-us-west-2.amazonaws.com/info.png "
              alt="More information symbol"
            />
          </div>
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
