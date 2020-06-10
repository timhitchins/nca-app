import React, { PureComponent } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import { createNewViewport } from "../../../utils/mapUtils";
import { getMapState } from "../../../actions/mapState";
import {
  logMarkerDragEvent,
  setMarkerCoords,
  handleGetSiteData,
} from "../../../actions/mapData";
import { setSearchTerm, toggleErrorMessage } from "../../../actions/geocode";
import { toggleLoadingIndicator } from "../../../actions/loading";
import Pin from "./Pin";
import { sitesLayer } from "./mapStyles";
import "./Map.scss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwcGluZ2FjdGlvbiIsImEiOiJjazZrMTQ4bW4wMXpxM251cnllYnR6NjMzIn0.9KhQIoSfLvYrGCl3Hf_9Bw";

class CentralMarker extends PureComponent {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _createNewViewport = (geojson, mapState) => {
    //trigger new viewport
    const { longitude, latitude, zoom } = createNewViewport(geojson, mapState);
    this.props.dispatch(
      getMapState({
        ...mapState,
        longitude,
        latitude,
        zoom,
        transitionDuration: 1000,
      })
    );
  };

  _logDragEvent(name, e) {
    this.props.dispatch(logMarkerDragEvent(name, e));
  }

  _onMarkerDragStart = (e) => {
    this._logDragEvent("onDragStart", e);
  };

  _onMarkerDrag = (e) => {
    this._logDragEvent("onDrag", e);
  };

  _onMarkerDragEnd = (e) => {
    this._logDragEvent("onDragEnd", e);
    const [lon, lat] = e.lngLat;
    this.props.dispatch(setMarkerCoords(lon, lat));

    //start building the route
    const { distance, units } = this.props.mapData.buffer;
    const encodedCoords = encodeURI(JSON.stringify({ lon: lon, lat: lat }));
    const route = `/api/location/${encodedCoords}/${distance}/${units}`;

    //get mapstate for changing viewport
    const { mapState } = this.props;

    // get site data related to where the marker dropped
    this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
      // set the search term to empty
      this.props.dispatch(setSearchTerm(""));
      // if return geoJSON has features then create a new vieport
      const { features } = sitesGeoJSON;
      if (features.length > 0) {
        // create the new viewport
        this._createNewViewport(sitesGeoJSON, mapState);
      } else {
        // show the error message
        // and zoom to default viewport
        this.props.dispatch(toggleErrorMessage(true));
        this._createNewViewport({}, mapState);
      }
    });
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

class NCAMap extends PureComponent {
  static propTypes = {
    mapState: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _onViewportChange = (viewport) => {
    this.props.dispatch(getMapState({ ...viewport }));
  };

  _handleOnLoad = () => {
    // hide loading container after loading
    this.props.dispatch(toggleLoadingIndicator(false));
  };

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
          onLoad={this._handleOnLoad}
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
