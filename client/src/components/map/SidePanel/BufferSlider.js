import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import PropTypes from "prop-types";
import { createNewViewport, createBuffer } from "../../../utils/mapUtils";
import {
  setBufferValues,
  handleGetSiteData,
  handleGetAttributeData,
} from "../../../actions/mapData";
import { getMapState } from "../../../actions/mapState";
import "./Sliders.scss";

/*----- Handle  -----*/
const Handle = ({ handle: { id, value, percent }, getHandleProps }) => {
  return (
    <div
      style={{
        left: `${percent}%`,
      }}
      className="handle"
      {...getHandleProps(id)}
    >
      <div className="handle-value">{value}</div>
    </div>
  );
};

Handle.propTypes = {
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
};

/*----- Track -----*/
const Track = ({ source, target, getTrackProps }) => {
  return (
    <div
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      className="track"
      {
        ...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */
      }
    />
  );
};

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
};

/*----- Ticks -----*/
function Tick({ tick, count }) {
  return (
    <div>
      <div
        style={{
          left: `${tick.percent}%`,
        }}
        className="tick-bar"
      />
      <div
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
        className="tick-value"
      >
        {tick.value}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
};

/*----- Slider -----*/

class BufferSlider extends Component {
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
      })
    );
  };

  _onChange = (distance) => {
    const { centralMarker, yearRange } = this.props.mapData;
    const { longitude, latitude } = centralMarker;
    // const { units } = this.props.mapData.buffer;
    const { mapState } = this.props;
    const { errorMsgIsOpen } = this.props.geocodedData;

    //set regardless
    const { geoJSON, units } = this.props.mapData.buffer;
    this.props.dispatch(setBufferValues(distance, units, geoJSON));

    //then set again if conditions met
    if (
      !errorMsgIsOpen &
      (centralMarker.longitude !== null || centralMarker.latitude !== null)
    ) {
      //set up route and dispatch action for site data
      const encodedCoords = encodeURI(
        JSON.stringify({ lon: longitude, lat: latitude })
      );
      const route = `/api/location/${encodedCoords}/${distance}/${units}/${yearRange}`;
      this.props.dispatch(handleGetSiteData(route)).then((sitesGeoJSON) => {
        //create the new buffer
        const bufferGeoJSON = createBuffer(centralMarker, distance, units);
        this.props.dispatch(setBufferValues(distance, units, bufferGeoJSON));

        // create the viewport
        this._createNewViewport(sitesGeoJSON, mapState);
      });

      //update the attribute data
      const attributeRoute = `/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE,YEAR/${yearRange}/${encodedCoords}/${distance}/${units}`;
      this.props.dispatch(handleGetAttributeData(attributeRoute));
    }
  };
  render() {
    return (
      <Slider
        className="range-slider"
        domain={[500, 1500]}
        step={1}
        mode={2}
        values={[1000] /* two values = two handles */}
        // onUpdate={this._onUpdate}
        onChange={this._onChange}
      >
        <Rail>
          {({ getRailProps }) => <div className="rail" {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks values={[500, 1000, 1500]}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map((tick) => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    );
  }
}

export default BufferSlider;
