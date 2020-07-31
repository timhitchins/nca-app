import React, { Component } from "react";
import PropTypes from "prop-types";
import GeocoderInput from "./GeocoderInput";
import BufferSlider from "./BufferSlider";
import YearRangeSlider from "./YearRangeSlider";
import PermitTypeText from "./PermitTypeText";
import BarChart from "./BarChart";
import PDIIndicator from "./PDIIndicator";
import SiteDetails from "./SiteDetails";
import { calculatePDIStyle } from "../../../utils/mapUtils";
import { toggleSidePanel, createPanelRef } from "../../../actions/sidePanel";
import About from "./About";
import "./SidePanelContainer.scss";
import * as styleVars from "../../theme.scss";

class SidePanelContainer extends Component {
  static propTypes = {
    siteData: PropTypes.object.isRequired,
    mapData: PropTypes.object.isRequired,
    sidePanel: PropTypes.object.isRequired,
  };

  sidePanelRef = React.createRef();

  _toggleSidePanel = (isOpen) => {
    this.props.dispatch(toggleSidePanel(!isOpen));
  };

  _getMedia = () => {
    const isMobile = window.matchMedia("(max-width: 500px)").matches;
    if (isMobile) {
      this.props.dispatch(toggleSidePanel(false));
    }
  };

  componentDidMount() {
    // side panel mobile
    this._getMedia();

    // optional event listenr
    // window.addEventListener("resize", () => {
    //   this._getMedia();
    // });

    // store ref
    this.props.dispatch(createPanelRef(this.sidePanelRef));
  }

  render() {
    const { sites, currentFeature } = this.props.siteData;
    const { siteMarkers } = this.props.mapData;
    const { isOpen } = this.props.sidePanel;
    return (
      <article
        ref={this.sidePanelRef}
        className={
          isOpen
            ? "side-panel-container container-open"
            : "side-panel-container container-closed"
        }
      >
        {/* Panel 1 */}
        <div className="outer-panel top-panel">
          <aside className="panel-label">Construction Permits by Type</aside>
          <div
            className="close-button"
            title={isOpen ? "Close panel" : "Open panel"}
            onClick={() => {
              this._toggleSidePanel(isOpen);
            }}
          >
            {isOpen ? <span>&#x025C3;</span> : <span>&#x025B9;</span>}
          </div>
          <PermitTypeText {...this.props} />
          <BarChart {...this.props} />
          <aside className="panel-label">Search by location</aside>
          <GeocoderInput {...this.props} />
          <div className="slider-title">Distance in meters:</div>
          <BufferSlider {...this.props} />
          <div className="slider-title">Range of Years:</div>
          <YearRangeSlider {...this.props} />
        </div>

        {/* Panel 2 */}
        {siteMarkers ? (
          <div className="outer-panel">
            <aside className="panel-label">Construction Site Information</aside>
            <PDIIndicator {...this.props} />
            {sites.length > 0 ? (
              <React.Fragment>
                <aside className="panel-label label-large">
                  Potential Diesel Impact:{" "}
                  <span
                    style={
                      currentFeature
                        ? {
                            color: calculatePDIStyle(
                              currentFeature.properties.PDI_LEVEL
                            ),
                            fontWeight: "bold",
                            backgroundColor: styleVars.uiGray,
                          }
                        : null
                    }
                  >
                    {currentFeature
                      ? " " + currentFeature.properties.PDI_LEVEL + " "
                      : null}
                  </span>
                </aside>
                <SiteDetails {...this.props} />{" "}
              </React.Fragment>
            ) : null}
          </div>
        ) : null}

        {/* Panel 3 */}
        <div className="outer-panel last-panel">
          <aside className="panel-label">About</aside>
          <About />
        </div>
      </article>
    );
  }
}

export default SidePanelContainer;
