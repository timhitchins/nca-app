import React, { Component } from "react";
import PropTypes from "prop-types";
import GeocoderInput from "./GeocoderInput";
import BufferSlider from "./BufferSlider";
import PermitTypeText from "./PermitTypeText";
import PDIIndicator from "./PDIIndicator";
import SiteDetails from "./SiteDetails";
import About from "./About";
import "./SidePanel.scss";
import SiteMarkers from "./SiteMarkers";

class SidePanel extends Component {
  static propTypes = {
    siteData: PropTypes.object.isRequired,
  };
  render() {
    const { sites, currentFeature } = this.props.siteData;
    return (
      <article className="side-panel-container">
        {/* Panel 1 */}
        <div className="outer-panel">
          <aside className="panel-label">Construction Permits by Type</aside>
          <PermitTypeText {...this.props} />
          <aside className="panel-label">Search by location</aside>
          <GeocoderInput {...this.props} />
          <BufferSlider {...this.props} />
        </div>

        {/* Panel 2 */}
        {sites.length > 0 ? (
          <div className="outer-panel">
            <aside className="panel-label">Construction Site Information</aside>
            <PDIIndicator {...this.props} />
            <aside className="panel-label label-large">
              Potential Diesel Impact
            </aside>
            <SiteDetails {...this.props} />
          </div>
        ) : null}

        {/* Panel 3 */}
        <div className="outer-panel">
          <aside className="panel-label">About</aside>
          <About />
        </div>
      </article>
    );
  }
}

export default SidePanel;
