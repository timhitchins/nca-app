import React, { Component } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import { getMapState } from "../../../actions/mapState";
import {
  logMarkerDragEvent,
  onMarkerDragEnd,
  setMarkerCoords,
  handleGetSiteData,
} from "../../../actions/mapData";
import Pin from "./Pin";
import { sitesLayer } from "./mapStyles";
import "./Map.scss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwcGluZ2FjdGlvbiIsImEiOiJjazZrMTQ4bW4wMXpxM251cnllYnR6NjMzIn0.9KhQIoSfLvYrGCl3Hf_9Bw";

class CentralMarker extends Component {
  static propTypes = {
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _logDragEvent(name, event) {
    this.props.dispatch(logMarkerDragEvent(name, event));
  }

  _onMarkerDragStart = (event) => {
    this._logDragEvent("onDragStart", event);
  };

  _onMarkerDrag = (event) => {
    this._logDragEvent("onDrag", event);
  };

  _onMarkerDragEnd = (event) => {
    this._logDragEvent("onDragEnd", event);
    this.props.dispatch(onMarkerDragEnd(event));

    //then do stuff with the new coords
    const [longitude, latitude] = event.lngLat;
    const { year } = this.props.mapData;
    const encodedCoords = encodeURI(
      JSON.stringify({
        longitude: longitude,
        latitude: latitude,
      })
    );
  };

  render() {
    const { latitude, longitude } = this.props.mapData.centralMarker;
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragStart={this._onMarkerDragStart}
        onDrag={this._onMarkerDrag}
        onDragEnd={this._onMarkerDragEnd}
      >
        <Pin size={30} />
      </Marker>
    );
  }
}

class NCAMap extends Component {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _onViewportChange = (viewport) => {
    this.props.dispatch(getMapState({ ...viewport }));
  };

  /* ---- TESTING API ----- */
  // componentDidMount() {
  //   this.props.dispatch(
  //     handleGetSiteData(
  //       "/api/location/%7B%22lon%22:-122.553154,%22lat%22:45.55659%7D/1500/meters"
  //     )
  //   );
  // }
  /* --------------------- */

  render() {
    const { latitude, longitude } = this.props.mapData.centralMarker;
    const { siteMarkers } = this.props.mapData;
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
          {latitude && longitude ? <CentralMarker {...this.props} /> : null}
          <Source id="sites" type="geojson" data={siteMarkers}>
            <Layer key="sites-layer" {...sitesLayer} />
          </Source>
        </ReactMapGL>
      </section>
    );
  }
}
export default NCAMap;

// class SiteMarker extends Component {
//     render() {
//       return (
//         <Marker
//           latitude={45.606243}
//           longitude={-122.708626}
//           offsetTop={-20}
//           offsetLeft={-10}
//           draggable
//           // onDragStart={this._onMarkerDragStart}
//           // onDrag={this._onMarkerDrag}
//           // onDragEnd={this._onMarkerDragEnd}
//         >
//           <Pin size={20} />
//         </Marker>
//       );
//     }
//   }
