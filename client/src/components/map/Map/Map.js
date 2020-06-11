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
import { toggleMarkerSelector } from "../../../actions/markerSelect";
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
    _handleGetSiteData: PropTypes.func.isRequired,
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

    this.props._handleGetSiteData(lon, lat);
    // //start building the route
    // const { distance, units } = this.props.mapData.buffer;
    // const encodedCoords = encodeURI(JSON.stringify({ lon: lon, lat: lat }));
    // const route = `/api/location/${encodedCoords}/${distance}/${units}`;

    // //get mapstate for changing viewport
    // const { mapState } = this.props;

    // // get site data related to where the marker dropped
    // this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
    //   // set the search term to empty
    //   this.props.dispatch(setSearchTerm(""));
    //   // if return geoJSON has features then create a new vieport
    //   const { features } = sitesGeoJSON;
    //   if (features.length > 0) {
    //     // create the new viewport
    //     this.props._createNewViewport(sitesGeoJSON, mapState);
    //   } else {
    //     // show the error message
    //     // and zoom to default viewport
    //     this.props.dispatch(toggleErrorMessage(true));
    //     this.props._createNewViewport({}, mapState);
    //   }
    // });
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
    markerSelector: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _onViewportChange = (viewport) => {
    this.props.dispatch(getMapState({ ...viewport }));
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

  _handleOnLoad = () => {
    // hide loading container after loading
    this.props.dispatch(toggleLoadingIndicator(false));
  };

  _handleMapClick = (e) => {
    const { isActive } = this.props.markerSelector;
    if (isActive) {
      // hide the cursor tooltip
      this.props.dispatch(toggleMarkerSelector(false));

      // add data to thte map
      const [lon, lat] = e.lngLat;
      this._handleGetSiteData(lon, lat);
    }
  };

  _handleGetSiteData = (lon, lat) => {
    const { mapState } = this.props;
    const { distance, units } = this.props.mapData.buffer;

    //add the central marker
    this.props.dispatch(setMarkerCoords(lon, lat));

    //set up route and dispatch action for site data
    const encodedCoords = encodeURI(JSON.stringify({ lon: lon, lat: lat }));
    const route = `/api/location/${encodedCoords}/${distance}/${units}`;

    this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
      // set the search term by placename
      this.props.dispatch(setSearchTerm(""));

      // if return geoJSON has features then create a new vieport
      const { features } = sitesGeoJSON;
      if (features.length > 0) {
        // create the new viewport
        this.props.dispatch(toggleErrorMessage(false));
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
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this._onViewportChange}
          onLoad={this._handleOnLoad}
          //   onHover={this._onHover}
          //   interactiveLayerIds={["parcel-polygon"]}
          onClick={(e) => {
            this._handleMapClick(e);
          }}
        >
          {latitude && longitude ? (
            <CentralMarker
              {...this.props}
              _handleGetSiteData={this._handleGetSiteData}
            />
          ) : null}
          <Source id="sites" type="geojson" data={siteMarkers}>
            <Layer key="sites-layer" {...sitesLayer} />
          </Source>
        </ReactMapGL>
      </section>
    );
  }
}
export default NCAMap;
