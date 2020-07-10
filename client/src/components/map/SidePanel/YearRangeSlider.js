import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import PropTypes from "prop-types";
import {
  setYearRange,
  handleGetSiteData,
  handleGetAttributeData,
} from "../../../actions/mapData";
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

class YearRangeSlider extends Component {
  static propTypes = {
    geocodedData: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    mapState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  onChange = (values) => {
    const { centralMarker } = this.props.mapData;
    const { longitude, latitude } = centralMarker;
    const { distance, units } = this.props.mapData.buffer;
    const { errorMsgIsOpen } = this.props.geocodedData;

    this.props.dispatch(setYearRange(values));

    const encodedCoords = encodeURI(
      JSON.stringify({ lon: longitude, lat: latitude })
    );

    if (
      !errorMsgIsOpen &
      (centralMarker.longitude !== null || centralMarker.latitude !== null)
    ) {
      //set up route and dispatch action for site data
      const route = `/api/location/${encodedCoords}/${distance}/${units}/${values}`;
      this.props.dispatch(handleGetSiteData(route));

      //update the attribute data
      const attributeRoute = `/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE,YEAR/${values}/${encodedCoords}/${distance}/${units}`;
      this.props.dispatch(handleGetAttributeData(attributeRoute));
    } else {
      //update the attribute data
      const attributeRoute = `/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE,YEAR/${values}/null/null/null`;
      this.props.dispatch(handleGetAttributeData(attributeRoute));
    }
  };
  render() {
    return (
      <Slider
        className="range-slider"
        domain={[2010, 2020]}
        step={1}
        mode={2}
        values={[2010, 2020] /* two values = three handles */}
        onChange={this.onChange}
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
        <Tracks left={false} right={false}>
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
      </Slider>
    );
  }
}

export default YearRangeSlider;
