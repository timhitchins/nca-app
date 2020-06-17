import React, { Component } from "react";
import PropTypes from "prop-types";
import { setCurrentFeature } from "../../../actions/siteData";
// import * as styleVars from "../../theme.scss";
import "./SiteDetails.scss";

class SiteDetails extends Component {
  static propTypes = {
    siteData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  //keep this in the component
  state = {
    featureIndex: 0,
  };

  _handleArrowClick = (direction) => {
    const { featureIndex } = this.state;
    const { sites } = this.props.siteData;

    if (direction === "left") {
      this.setState({ featureIndex: featureIndex - 1 });
      this.props.dispatch(setCurrentFeature(sites[featureIndex - 1]));
    } else if (direction === "right") {
      this.setState({ featureIndex: featureIndex + 1 });
      this.props.dispatch(setCurrentFeature(sites[featureIndex + 1]));
    }
  };

  componentDidMount() {
    const { sites } = this.props.siteData;
    this.props.dispatch(setCurrentFeature(sites[0]));
  }

  render() {
    const { sites } = this.props.siteData;
    const { featureIndex } = this.state;

    const {
      STATEIDKEY,
      TOTALSQFT,
      NUMBSTORIES,
      DESCRIPTION,
      PORTLAND_MAPS_URL,
      STATUS,
      NEIGHBORHOOD,
      TYPE,
      ISSUED,
      WORK_DESCRIPTION,
    } = sites[featureIndex].properties;

    return (
      <div className="site-details-container">
        <div className="left-arrow">
          {featureIndex !== 0 ? (
            <span
              onClick={() => {
                this._handleArrowClick("left");
              }}
            >
              &#x025C3;
            </span>
          ) : null}
        </div>
        <div>
          <div className="permit-id">
            Permit ID: <span>{STATEIDKEY}</span>
          </div>
          <div className="divider"></div>
          <div className="permit-content">
            <div>
              <span> Square Footage:</span>
              {TOTALSQFT.toLocaleString()} ft&#178;
            </div>
            <div>
              <span>Stories:</span>
              {NUMBSTORIES}
            </div>
            <div>
              <span>Description:</span>
              <br></br>
              {DESCRIPTION}
            </div>
            <div>
              <a target="_blank" rel="noreferrer" href={PORTLAND_MAPS_URL}>
                Portland Maps URL
              </a>
            </div>
            <div>
              <span>Status:</span>
              {STATUS}
            </div>
            <div>
              <span>Neighborhood:</span>
              <br></br>
              {NEIGHBORHOOD}
            </div>
            <div>
              <span>Permit Type:</span>
              <br></br>
              {TYPE}
            </div>
            <div>
              <span>Date Issued:</span>
              <br></br>
              {Date(ISSUED)}
            </div>
          </div>
        </div>
        <div className="right-arrow">
          {featureIndex < sites.length - 1 ? (
            <span
              onClick={() => {
                this._handleArrowClick("right");
              }}
            >
              &#x025B9;
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SiteDetails;
