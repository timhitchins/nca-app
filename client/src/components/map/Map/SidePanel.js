import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import { createNewViewport } from "../../../utils/mapUtils";
import {
  handleGeocodeSearchTerm,
  setSearchTerm,
  toggleGeocodeResults,
  toggleErrorMessage,
} from "../../../actions/geocode";
import { handleGetSiteData } from "../../../actions/mapData";
import { getMapState } from "../../../actions/mapState";
import "./SidePanel.scss";

const NoGeocodedResults = ({ errorMsgIsOpen }) => {
  console.log("errorMsgIsOpen", errorMsgIsOpen);
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
  _onResultClick = (resultCoords, distance, units, placeName) => {
    const { mapState } = this.props; //passed to viewport method

    //close the error togle if open
    this.props.dispatch(toggleErrorMessage(false));

    //set up route and dispatch action for site data
    const encodedCoords = encodeURI(JSON.stringify(resultCoords));
    const route = `/api/location/${encodedCoords}/${distance}/${units}`;
    this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
      // set the search term by placename
      this._setSearchInput(placeName);

      // if return geoJSON has features then create a new vieport
      const { features } = sitesGeoJSON;
      if (features.length > 0) {
        //open the geocoded results
        this.props.dispatch(toggleGeocodeResults(false));
        this._createNewViewport(sitesGeoJSON, mapState);
      } else {
        // else show the error message
        this.props.dispatch(toggleGeocodeResults(false));
        this.props.dispatch(toggleErrorMessage(true));
        this._createNewViewport({}, mapState);
      }
    });
  };

  render() {
    const {
      geocodedResults,
      searchTerm,
      resultsIsOpen,
    } = this.props.geocodedData;
    const { distance, units } = this.props.mapData.buffer;
    if (
      geocodedResults.features !== undefined &&
      searchTerm !== "" &&
      resultsIsOpen
    ) {
      return (
        <div className="results-container">
          {geocodedResults.features.map((feature, index) => {
            console.log(feature);
            //pass coords to onClick
            const [lon, lat] = feature.geometry.coordinates;
            //render the place name
            const { place_name } = feature;
            return (
              <div
                key={`result-${index}`}
                className={
                  index % 2 ? "result-list-item-odd" : "result-list-item-even"
                }
                onClick={() => {
                  this._onResultClick(
                    { lon, lat },
                    distance,
                    units,
                    place_name
                  );
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
    dispatch: PropTypes.func.isRequired,
  };

  _handleInputChange = async (e) => {
    const searchTerm = e.target.value;
    this.props.dispatch(setSearchTerm(searchTerm));

    // toggle the results to be visible
    this.props.dispatch(toggleGeocodeResults(true));

    //close the error togle if open
    this.props.dispatch(toggleErrorMessage(false));

    // geocoding route is /api/search/<searchTerm>
    const route = "/api/search/";
    this.props.dispatch(handleGeocodeSearchTerm(searchTerm, route));
  };

  render() {
    const { searchTerm } = this.props.geocodedData;
    console.log(this._textInput);
    return (
      <div className="search-bar">
        <div className="search-form">
          <div
            className="clear-button"
            onClick={() => {
              this.props.dispatch(setSearchTerm(""));
              //close the error togle if open
              this.props.dispatch(toggleErrorMessage(false));
              // this.props.dispatch(setMarkerCoordsAction(null, null));
            }}
          >
            &times;
          </div>
          <DebounceInput
            type="text"
            placeholder="Search an address..."
            value={searchTerm} //controlled input
            onChange={this._handleInputChange}
            onKeyPress={(event) => {
              //need to update to action
              event.persist();
              // this._handleKeyPress(event);
            }}
            onClick={() => {
              // this.props.dispatch(toggleFullResultsAction(false));
            }}
            minLength={1}
            debounceTimeout={300}
            inputRef={(ref) => {
              //create a ref to the input
              this._textInput = ref;
            }}
            onFocus={() => {
              // this.props.dispatch(togglePartialResultsAction(true));
            }}
          />
          <div
            className="search-button"
            onClick={() => {
              console.log("clicked");
            }}
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/search.png"
              alt="search button"
            ></img>
          </div>
        </div>
        <GeocodedResults {...this.props} />
        <NoGeocodedResults {...this.props.geocodedData} />
      </div>
    );
  }
}

class SidePanel extends Component {
  render() {
    return (
      <article className="side-panel-container">
        <div className="outer-panel">
          <aside className="panel-label">Construction Permits by Type</aside>
          <aside className="panel-label">Search by location</aside>
          <GeocoderInput {...this.props} />
        </div>
        <div className="outer-panel">
          <aside className="panel-label">Construction Site Information</aside>
        </div>
        <div className="outer-panel">
          <aside className="panel-label">About</aside>
        </div>
      </article>
    );
  }
}

export default SidePanel;

/* <select className="year-selector">
<option value="2020">2020</option>
<option value="2019">2019</option>
<option value="2018">2018</option>
<option value="2017">2017</option>
</select> */
