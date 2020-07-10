import React, { Component } from "react";
import { connect } from "react-redux";
import NCAMap from "./Map";
import SidePanelContainer from "../SidePanel/SidePanelContainer";
import MapController from "./MapController";
import CursorTooltip from "../CursorTooltip/CursorTooltip";
import LoadingIndicator from "../Loading/LoadingIndicator";
import "./Map.scss";

class MapContainer extends Component {
  render() {
    return (
      <main className="map-container">
        <span className="title">Potential Diesel Impact Locator</span>
        <NCAMap {...this.props} />
        <SidePanelContainer {...this.props} />
        <LoadingIndicator {...this.props} />
        <CursorTooltip {...this.props} />
        <MapController {...this.props} />
      </main>
    );
  }
}
function mapStateToProps({
  mapState,
  mapData,
  isLoading,
  geocodedData,
  markerSelector,
  siteData,
  panelIsOpen,
}) {
  return {
    mapState,
    mapData,
    isLoading,
    geocodedData,
    markerSelector,
    siteData,
    panelIsOpen,
  };
}
export default connect(mapStateToProps)(MapContainer);
