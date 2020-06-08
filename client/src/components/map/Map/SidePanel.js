import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import "./SidePanel.scss";

class GeocoderInput extends Component {
  render() {
    return (
      <div className="search-bar">
        <div className="search-form">
          <div
            className="clear-button"
            onClick={() => {
              // this.props.dispatch(resetSearch({ ...resetSearchOptions }));
              // this.props.dispatch(setMarkerCoordsAction(null, null));
            }}
          >
            &times;
          </div>
          <DebounceInput
            type="text"
            // placeholder={this._setSearchPlaceholderText(searchType)}
            // value={searchTerm} //controlled input
            // onChange={this._handleInputChange}
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
          <GeocoderInput />
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
