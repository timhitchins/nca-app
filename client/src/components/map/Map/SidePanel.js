import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import {
  handleGeocodeSearchTerm,
  setSearchTerm,
  toggleGeocodeResults,
} from "../../../actions/geocode";
import "./SidePanel.scss";

class GeocodedResults extends Component {
  static propTypes = {
    geocodedData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { geocodedResults, searchTerm } = this.props.geocodedData;
    if (geocodedResults.features !== undefined && searchTerm !== "") {
      return (
        <div className="results-container">
          {geocodedResults.features.map((feature, index) => {
            return (
              <div
                key={index}
                className={
                  index % 2 ? "result-list-item-odd" : "result-list-item-even"
                }
              >
                {feature.place_name}
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

    // geocoding route is /api/search/<searchTerm>
    const route = "/api/search/";
    this.props.dispatch(handleGeocodeSearchTerm(searchTerm, route));
  };

  render() {
    const { searchTerm } = this.props.geocodedData;
    return (
      <div className="search-bar">
        <div className="search-form">
          <div
            className="clear-button"
            onClick={() => {
              this.props.dispatch(setSearchTerm(""));
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
