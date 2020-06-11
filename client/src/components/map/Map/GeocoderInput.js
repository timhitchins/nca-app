import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import { createNewViewport } from "../../../utils/mapUtils";
import {
  geocodeSearchTerm,
  handleGeocodeSearchTerm,
  setSearchTerm,
  toggleGeocodeResults,
  toggleErrorMessage,
} from "../../../actions/geocode";
import { handleGetSiteData, setMarkerCoords } from "../../../actions/mapData";
import { getMapState } from "../../../actions/mapState";
import MarkerSelector from "./MarkerSelector";
import "./SidePanel.scss";

const NoGeocodedResults = ({ errorMsgIsOpen }) => {
  if (errorMsgIsOpen) {
    return (
      <div className="error-results-container">
        &#9888; No construction sites near this location. Select a new location.
      </div>
    );
  }
  return null;
};

NoGeocodedResults.propTypes = {
  errorMsgIsOpen: PropTypes.bool.isRequired,
};

class GeocodedResults extends Component {
  static propTypes = {
    geocodedData: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    _handleGetSiteData: PropTypes.func.isRequired,
  };

  _setSearchInput = (placeName) => {
    this.props.dispatch(setSearchTerm(placeName));
  };

  /* 
  method to select the correct
  central marker lon/lat and 
  set search site data
  and create a new viewport 
  and set the input with clicked result
  */
  _onResultClick = (selectedFeature) => {
    //close the error togle if open
    this.props.dispatch(toggleErrorMessage(false));

    // method passed down from GeocoderInput
    this.props._handleGetSiteData(selectedFeature);
  };

  render() {
    const {
      geocodedResults,
      searchTerm,
      resultsIsOpen,
    } = this.props.geocodedData;
    if (
      geocodedResults.features !== undefined &&
      searchTerm !== "" &&
      resultsIsOpen
    ) {
      return (
        <div className="results-container">
          {geocodedResults.features.map((feature, index) => {
            //render the place name
            const { place_name } = feature;
            return (
              <div
                key={`result-${index}`}
                className={
                  index % 2 ? "result-list-item-odd" : "result-list-item-even"
                }
                onClick={() => {
                  this._onResultClick(feature);
                }}
              >
                {place_name}
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

class GeocoderInput extends Component {
  static propTypes = {
    geocodedData: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    mapState: PropTypes.object.isRequired,
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

  _handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    this.props.dispatch(setSearchTerm(searchTerm));
    //close the error togle if open
    this.props.dispatch(toggleErrorMessage(false));
    // toggle the results to be visible
    this.props.dispatch(toggleGeocodeResults(true));
    // geocoding route is /api/search/<searchTerm>
    const route = "/api/search/";
    this.props.dispatch(handleGeocodeSearchTerm(searchTerm, route));
  };

  _handleClearButtonClick = () => {
    //close the error toggle if open
    this.props.dispatch(toggleErrorMessage(false));
    //reset the geocoded results
    this.props.dispatch(geocodeSearchTerm({ features: [] }));
    // reset the search term
    this.props.dispatch(setSearchTerm(""));
    // this.props.dispatch(setMarkerCoordsAction(null, null));
  };

  _handleKeyPressOrSearchClick = (e) => {
    // if user clicked Enter button or the search button
    if (e.key === "Enter" || e.currentTarget.title === "Search Button") {
      const { geocodedResults } = this.props.geocodedData;
      if (geocodedResults.features.length > 0) {
        const topFeature = geocodedResults.features[0];
        // get the site data and trigger other relevent actionsu
        this._handleGetSiteData(topFeature);
      }
    }
  };

  /* 
  This method is passed down the component tree.
  It handles gettinf the site data as well as setting
  all the UI to its correct state.
  */
  _handleGetSiteData = (feature) => {
    const { mapState } = this.props;
    const { distance, units } = this.props.mapData.buffer;
    const [lon, lat] = feature.geometry.coordinates;
    const { place_name } = feature;

    //add the central marker
    this.props.dispatch(setMarkerCoords(lon, lat));

    //set up route and dispatch action for site data
    const encodedCoords = encodeURI(JSON.stringify({ lon: lon, lat: lat }));
    const route = `/api/location/${encodedCoords}/${distance}/${units}`;

    this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
      // set the search term by placename
      this.props.dispatch(setSearchTerm(place_name));

      // if return geoJSON has features then create a new vieport
      const { features } = sitesGeoJSON;
      if (features.length > 0) {
        // open the geocoded results
        // and create the new viewport
        this.props.dispatch(toggleGeocodeResults(false));
        this._createNewViewport(sitesGeoJSON, mapState);
      } else {
        // else close geocoded results
        // and show the error message
        // and zoom to default viewport
        this.props.dispatch(toggleGeocodeResults(false));
        this.props.dispatch(toggleErrorMessage(true));
        this._createNewViewport({}, mapState);
      }
    });
  };

  render() {
    const { searchTerm } = this.props.geocodedData;
    return (
      <React.Fragment>
        <div className="geocoder-marker-container">
          <div className="search-bar">
            <div className="search-form">
              <div
                className="clear-button"
                onClick={() => {
                  this._handleClearButtonClick();
                }}
              >
                &times;
              </div>
              <DebounceInput
                type="text"
                placeholder="Search an address..."
                value={searchTerm} //controlled input
                onChange={this._handleInputChange}
                onKeyPress={(e) => {
                  e.persist();
                  this._handleKeyPressOrSearchClick(e);
                }}
                minLength={1}
                debounceTimeout={300}
                inputRef={(ref) => {
                  //create a ref to the input
                  this._textInput = ref;
                }}
                onFocus={() => {
                  //do something
                }}
              />
              <div
                className="search-button"
                title="Search Button"
                onClick={(e) => {
                  this._handleKeyPressOrSearchClick(e);
                }}
              >
                <img
                  src="https://nca-toolkit.s3-us-west-2.amazonaws.com/search.png"
                  alt="search button"
                ></img>
              </div>
            </div>
          </div>
          <MarkerSelector {...this.props} />
        </div>
        <GeocodedResults
          {...this.props}
          _handleGetSiteData={this._handleGetSiteData}
        />
        <NoGeocodedResults {...this.props.geocodedData} />{" "}
      </React.Fragment>
    );
  }
}

export default GeocoderInput;
