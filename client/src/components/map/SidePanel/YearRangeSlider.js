import React, { Component } from "react";
import PropTypes from "prop-types";
import { createNewViewport, createBuffer } from "../../../utils/mapUtils";
import { setBufferValues, handleGetSiteData } from "../../../actions/mapData";
import { getMapState } from "../../../actions/mapState";
// import Slider from "react-rangeslider";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import "./Sliders.scss";

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const defaultValues = [240, 360];

class YearRangeSlider extends Component {
  state = {
    domain: [200, 500],
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    reversed: false,
  };

  onUpdate = (update) => {
    this.setState({ update });
  };

  onChange = (values) => {
    this.setState({ values });
  };

  setDomain = (domain) => {
    this.setState({ domain });
  };

  toggleReverse = () => {
    this.setState((prev) => ({ reversed: !prev.reversed }));
  };

  render() {
    const {
      state: { domain, values, update, reversed },
    } = this;

    return (
      <div style={{ height: 150, width: "100%" }}>
        <button onClick={() => this.setDomain([100, 400])}>
          SET DOMAIN [100, 400]
        </button>
        <button onClick={() => this.setDomain([300, 600])}>
          SET DOMAIN [300, 600]
        </button>
        <button onClick={() => this.toggleReverse()}>
          {reversed ? "DISPLAY LOW TO HIGH" : "DISPLAY HIGH TO LOW"}
        </button>
        <ValueViewer values={values} update={update} />
        <Slider
          mode={1}
          step={5}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
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
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}

export default YearRangeSlider;
