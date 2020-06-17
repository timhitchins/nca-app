import React, { PureComponent, Component } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import { createNewViewport, createBuffer } from "../../../utils/mapUtils";
import { getMapState } from "../../../actions/mapState";
import {
  logMarkerDragEvent,
  setMarkerCoords,
  getSiteData,
  handleGetSiteData,
  setBufferValues,
} from "../../../actions/mapData";
import { setSearchTerm, toggleErrorMessage } from "../../../actions/geocode";
import { toggleLoadingIndicator } from "../../../actions/loading";
import { toggleMarkerSelector } from "../../../actions/markerSelect";
import {
  setSiteData,
  setCurrentFeature,
  setSlideIndex,
} from "../../../actions/siteData";
import Pin from "./Pin";
import SiteMarkers from "./SiteMarkers";
import { sitesLayer, bufferZoneLayer, bufferLineLayer } from "./mapStyles";
import "./Map.scss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibWFwcGluZ2FjdGlvbiIsImEiOiJjazZrMTQ4bW4wMXpxM251cnllYnR6NjMzIn0.9KhQIoSfLvYrGCl3Hf_9Bw";

class CentralMarker extends Component {
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
    this.props.dispatch(setCurrentFeature(null));
    this.props.dispatch(setSiteData([]));
    this.props.dispatch(setSlideIndex(0));
    this.props._handleGetSiteData(lon, lat);
  };

  render() {
    const { latitude, longitude } = this.props.mapData.centralMarker;
    return (
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetTop={-30}
        offsetLeft={-30}
        draggable
        onDragStart={this._onMarkerDragStart}
        onDrag={this._onMarkerDrag}
        onDragEnd={this._onMarkerDragEnd}
        onClick={(e) => {
          console.log(e);
        }}
      >
        <Pin size={50} />
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
      })
    );
  };

  _handleOnLoad = () => {
    // hide loading container after loading
    this.props.dispatch(toggleLoadingIndicator(false));
  };

  _handleMapClick = (e) => {
    //reset the details index
    this.props.dispatch(setSlideIndex(0));

    //set the active site features for side panel
    this._handleSetSiteData(e.features);

    //logic to handle marker selector
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
      // const { features } = sitesGeoJSON;
      if (
        sitesGeoJSON !== null &&
        sitesGeoJSON.features !== undefined &&
        sitesGeoJSON.features.length > 0
      ) {
        // create the new buffer geoJSON
        this._handleCreateNewBuffer(lon, lat);
        // create the new viewport
        this.props.dispatch(toggleErrorMessage(false));
        this._createNewViewport(sitesGeoJSON, mapState);
      } else {
        // destroy the buffer
        this._handleDestroyBuffer();

        //destroy the site markers
        this._handleDestroySiteMarkers();

        // show the error message
        // and zoom to default viewport
        this.props.dispatch(toggleErrorMessage(true));
        this._createNewViewport({}, mapState);
      }
    });
  };

  _handleSetSiteData = (features) => {
    if (features) {
      const siteFeatures = features
        .map((feature) => {
          if (feature.layer.id === "sites-layer") {
            return feature;
          } else {
            return null;
          }
        })
        .filter((el) => el !== null);
      this.props.dispatch(setSiteData(siteFeatures));
    }
  };

  _handleCreateNewBuffer = (longitude, latitude) => {
    const centerPoint = { longitude, latitude };
    const { distance, units } = this.props.mapData.buffer;
    const bufferGeoJSON = createBuffer(centerPoint, distance, units);
    this.props.dispatch(setBufferValues(distance, units, bufferGeoJSON));
  };

  _handleDestroyBuffer = () => {
    const { distance, units } = this.props.mapData.buffer;
    this.props.dispatch(setBufferValues(distance, units, null));
  };

  _handleDestroySiteMarkers = () => {
    this.props.dispatch(getSiteData(null));
  };

  _getCursor = ({ isHovering }) => {
    return isHovering ? "pointer" : "default";
  };

  render() {
    const { latitude, longitude } = this.props.mapData.centralMarker;
    const { siteMarkers } = this.props.mapData;
    const { geoJSON } = this.props.mapData.buffer;
    return (
      <section className="map">
        <ReactMapGL
          {...this.props.mapState}
          mapOptions={{ attributionControl: false }}
          maxZoom={20}
          ref={(reactMap) => (this.reactMap = reactMap)}
          mapStyle="mapbox://styles/mappingaction/ck9ep8n1k1bzm1ip4h5g1p9pk"
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this._onViewportChange}
          onLoad={this._handleOnLoad}
          //   onHover={this._onHover}
          interactiveLayerIds={["sites-layer"]}
          onClick={(e) => {
            this._handleMapClick(e);
          }}
        >
          {geoJSON ? (
            <Source id="buffer" type="geojson" data={geoJSON}>
              <Layer key="buffer-zone-layer" {...bufferZoneLayer} />
              <Layer key="buffer-line-layer" {...bufferLineLayer} />
            </Source>
          ) : null}
          {/* add site markers below */}
          {/* {siteMarkers ? <SiteMarkers {...this.props} /> : null} */}
          {siteMarkers ? (
            <Source id="sites" type="geojson" data={siteMarkers}>
              <Layer
                key="sites-layer"
                {...sitesLayer}
                onClick={(e) => {
                  console.log(e);
                }}
              />
            </Source>
          ) : null}

          {latitude && longitude ? (
            <CentralMarker
              {...this.props}
              _handleGetSiteData={this._handleGetSiteData}
            />
          ) : null}
        </ReactMapGL>
      </section>
    );
  }
}
export default NCAMap;
