import React, { Component } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import { getMapStateAction } from "../../../actions/mapState";
import Pin from "./Pin";
import "./Map.scss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwcGluZ2FjdGlvbiIsImEiOiJjazZrMTQ4bW4wMXpxM251cnllYnR6NjMzIn0.9KhQIoSfLvYrGCl3Hf_9Bw";

class CentralMarker extends Component {
  render() {
    return (
      <Marker
        latitude={45.506243}
        longitude={-122.608626}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        // onDragStart={this._onMarkerDragStart}
        // onDrag={this._onMarkerDrag}
        // onDragEnd={this._onMarkerDragEnd}
      >
        <Pin size={30} />
      </Marker>
    );
  }
}

class SiteMarker extends Component {
  render() {
    return (
      <Marker
        latitude={45.606243}
        longitude={-122.708626}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        // onDragStart={this._onMarkerDragStart}
        // onDrag={this._onMarkerDrag}
        // onDragEnd={this._onMarkerDragEnd}
      >
        <Pin size={30} />
      </Marker>
    );
  }
}

class NCAMap extends Component {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _onViewportChange = (viewport) => {
    this.props.dispatch(getMapStateAction({ ...viewport }));
  };

  render() {
    return (
      <section className="map">
        <ReactMapGL
          {...this.props.mapState}
          mapOptions={{ attributionControl: false }}
          ref={(reactMap) => (this.reactMap = reactMap)}
          mapStyle="mapbox://styles/mappingaction/ck9ep8n1k1bzm1ip4h5g1p9pk"
          width="100%"
          height="100%"
          //   minZoom={10}
          //   maxZoom={18}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this._onViewportChange}
          //   onHover={this._onHover}
          //   interactiveLayerIds={["parcel-polygon"]}
          //   onClick={(e) => {
          //     this._handleMapClick(e);
          //   }}
        >
          <CentralMarker />
          <SiteMarker />
        </ReactMapGL>
      </section>
    );
  }
}
export default NCAMap;
