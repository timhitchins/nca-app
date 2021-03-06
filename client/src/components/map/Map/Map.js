import React, { PureComponent, Component } from "react";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import PropTypes from "prop-types";
import {
  createNewViewport,
  createBuffer,
  createLayerFilter,
} from "../../../utils/mapUtils";
import { calculatePanelScrollToHeight } from "../../../utils/generalUtils";
import { getMapState } from "../../../actions/mapState";
import {
  logMarkerDragEvent,
  setMarkerCoords,
  getSiteData,
  handleGetSiteData,
  handleGetAttributeData,
  setBufferValues,
  handlegetPDXBoundayData,
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
import {
  sitesFillLayer,
  sitesActiveLayer,
  bufferZoneLayer,
  bufferLineLayer,
  pdxBoundaryLineLayer,
} from "./mapStyles";
import "./Map.scss";
import { toggleSidePanel } from "../../../actions/sidePanel";

// const MAPBOX_TOKEN ="pk.eyJ1IjoibWFwcGluZ2FjdGlvbiIsImEiOiJja2owZmwxcnExb3IwMnhwMnpiMDM2ZmVtIn0.ZKER99FucyLWYCefw1jwXQ";

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
    siteData: PropTypes.object.isRequired,
    sidePanel: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _onViewportChange = (viewport) => {
    this.props.dispatch(getMapState({ ...viewport }));
  };

  _createNewViewport = (geojson, mapState) => {
    // trigger new viewport
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
    // reset the details index and
    // open the side panel if closed
    this._handleFeatureClick(e.features);

    // set the active site features for side panel
    this._handleSetSiteData(e.features);

    // logic to handle marker selector
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
    const { yearRange } = this.props.mapData;

    // add the central marker
    this.props.dispatch(setMarkerCoords(lon, lat));

    //scroll to top of panel
    this._scrollToSidePanel("panel-1");

    // set up route and dispatch action for site data
    const encodedCoords = encodeURI(JSON.stringify({ lon: lon, lat: lat }));
    // const route = `${calculateHost(5000)}/api/location/${encodedCoords}/${distance}/${units}`;
    const siteRoute = `/api/location/${encodedCoords}/${distance}/${units}/${yearRange}`;
    this.props.dispatch(handleGetSiteData(siteRoute)).then((sitesGeoJSON) => {
      // set the search term by placename
      this.props.dispatch(setSearchTerm(""));

      // if return geoJSON has features then create a new vieport
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

        // destroy the site markers
        this._handleDestroySiteMarkers();

        // show the error message
        // and zoom to default viewport
        this.props.dispatch(toggleErrorMessage(true));
        this._createNewViewport({}, mapState);
      }
    });

    //update the attribute data
    const attributeRoute = `/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE,YEAR/${yearRange}/${encodedCoords}/${distance}/${units}`;
    this.props.dispatch(handleGetAttributeData(attributeRoute));
  };

  // returns features or null
  _checkForFeatures = (features) => {
    if (features.length > 0) {
      const siteFeatures = features
        .map((feature) => {
          if (feature.layer.id === "sites-fill-layer") {
            return feature;
          } else {
            return null;
          }
        })
        .filter((el) => el !== null);

      // return it for use later
      return siteFeatures;
    } else {
      return features;
    }
  };

  _handleSetSiteData = (features) => {
    const siteFeatures = this._checkForFeatures(features);

    //set the data empty or not
    this.props.dispatch(setSiteData(siteFeatures));

    // if there are features, the set the first "current" feature
    if (siteFeatures.length > 0) {
      //reset the current feature to the top
      this.props.dispatch(setCurrentFeature(siteFeatures[0]));
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

  _handleFeatureClick = (features) => {
    if (features.length > 0) {
      // reset the details index
      this.props.dispatch(setSlideIndex(0));

      //toggle open the side panel if closed
      this.props.dispatch(toggleSidePanel(true));

      // scroll to the construction information
      this._scrollToSidePanel("panel-2");
    }
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

  _getCursor = ({ isHovering }) => {
    return isHovering ? "pointer" : "default";
  };

  componentDidMount() {
    // fetch the pdx boundary data
    const pdxBoundaryRoute = `/api/geojson/pdx-boundary`;
    this.props.dispatch(handlegetPDXBoundayData(pdxBoundaryRoute));
  }

  componentWillUnmount() {
    // set the loading indicator on unmount
    this.props.dispatch(toggleLoadingIndicator(true));
  }

  render() {
    const { latitude, longitude } = this.props.mapData.centralMarker;
    const { siteMarkers, boundaryGeoJSON } = this.props.mapData;
    const { bufferGeoJSON } = this.props.mapData.buffer;
    const { activeFilter, currentFeature } = this.props.siteData;

    // create additional filters vars
    const siteLayerFilter = createLayerFilter(activeFilter);
    const activeSiteFilter = currentFeature
      ? currentFeature.properties.OBJECTID
      : -1;

    return (
      <section className="map">
        <ReactMapGL
          {...this.props.mapState}
          ref={(reactMap) => (this.reactMap = reactMap)}
          mapOptions={{
            customAttribution: `Data Sources: <a href="https://star.research.pdx.edu/">Portland State University</a> | <a href="https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22">City of Portland</a> | <a href="http://rlisdiscovery.oregonmetro.gov/">Oregon Metro</a>`,
          }}
          maxZoom={17}
          minZoom={10}
          mapStyle="mapbox://styles/mappingaction/ck9ep8n1k1bzm1ip4h5g1p9pk"
          width="100%"
          height="calc(100vh - 56px)"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={this._onViewportChange}
          onLoad={this._handleOnLoad}
          interactiveLayerIds={["sites-fill-layer"]} // make trigger error warningswhich is a mb-gl bug
          onClick={(e) => {
            this._handleMapClick(e);
          }}
        >
          {boundaryGeoJSON ? (
            <Source id="pdx-boundary" type="geojson" data={boundaryGeoJSON}>
              <Layer key="pdx-boundary-line-layer" {...pdxBoundaryLineLayer} />
            </Source>
          ) : null}
          {bufferGeoJSON ? (
            <Source id="buffer" type="geojson" data={bufferGeoJSON}>
              <Layer key="buffer-zone-layer" {...bufferZoneLayer} />
              <Layer key="buffer-line-layer" {...bufferLineLayer} />
            </Source>
          ) : null}
          {siteMarkers ? (
            <Source id="sites" type="geojson" data={siteMarkers}>
              <Layer
                key="sites-fill-layer"
                {...sitesFillLayer}
                // dependant on PDI Indicator Color
                filter={siteLayerFilter}
              />
              <Layer
                key="sites-active-layer"
                {...sitesActiveLayer}
                // dependant on OBJECTID feature property of current features
                filter={["in", "OBJECTID", activeSiteFilter]}
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
