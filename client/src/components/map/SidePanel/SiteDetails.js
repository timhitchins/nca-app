import React, { Component } from "react";
import PropTypes from "prop-types";
import { setCurrentFeature, setSlideIndex } from "../../../actions/siteData";
import { calculatePermitDate } from "../../../utils/generalUtils";
import "./SiteDetails.scss";

class SiteDetails extends Component {
  static propTypes = {
    siteData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _handleArrowClick = (direction) => {
    const { sites, slideIndex } = this.props.siteData;

    if (direction === "left") {
      this.props.dispatch(setSlideIndex(slideIndex - 1));
      this.props.dispatch(setCurrentFeature(sites[slideIndex - 1]));
    } else if (direction === "right") {
      this.props.dispatch(setSlideIndex(slideIndex + 1));
      this.props.dispatch(setCurrentFeature(sites[slideIndex + 1]));
    }
  };

  componentDidMount() {
    const { sites } = this.props.siteData;
    this.props.dispatch(setCurrentFeature(sites[0]));
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentFeature(null));
  }

  render() {
    const { sites, slideIndex } = this.props.siteData;

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
      CREATEDATE,
    } = sites[slideIndex].properties;

    const permitDate = calculatePermitDate(ISSUED, CREATEDATE);
    console.log("permit date", permitDate);
    // const issueDate = new Date(ISSUED);
    // const createDate = new Date(CREATEDATE);

    // console.log("Issued", ISSUED, issueDate.toLocaleDateString());
    // console.log("Create date", CREATEDATE, new Date(CREATEDATE));
    return (
      <div className="site-details-container">
        <div className="left-arrow">
          {slideIndex !== 0 ? (
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
              <span>{TOTALSQFT.toLocaleString()} ft&#178;</span>
            </div>
            <div>
              <span>Stories:</span>
              <span>{NUMBSTORIES}</span>
            </div>
            <div>
              <span>Description:</span>
              <br></br>
              <span>{DESCRIPTION}</span>
            </div>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={PORTLAND_MAPS_URL}
              >
                Portland Maps URL
              </a>
            </div>
            <div>
              <span>Status:</span>
              <span>{STATUS}</span>
            </div>
            <div>
              <span>Neighborhood Association:</span>
              <br></br>
              <span>{NEIGHBORHOOD}</span>
            </div>
            <div>
              <span>Permit Type:</span>
              <br></br>
              <span>{TYPE}</span>
            </div>
            {permitDate ? (
              <div>
                <span>{permitDate.title}</span>
                <br></br>
                <span>{permitDate.date}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="right-arrow">
          {slideIndex < sites.length - 1 ? (
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
