import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleGetAttributeData } from "../../../actions/mapData";
import "./PermitType.scss";

class PermitTypeText extends Component {
  static propTypes = {
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    //check if there is already attribute totals
    //if not fetch the attribute totals
    const { attributeTotals } = this.props;

    if (!attributeTotals) {
      this.props.dispatch(
        handleGetAttributeData("/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE")
      );
    }
  }

  render() {
    const { attributeTotals, siteMarkers } = this.props.mapData;
    return (
      <div className="permit-text-container">
        {attributeTotals ? (
          <div>
            <span>{Math.round(attributeTotals.sumSqFt).toLocaleString()}</span>
            <span>
              sqaure feet of construction area and{" "}
              {Math.round(attributeTotals.sumStories).toLocaleString()} flooors
              representing{" "}
              {attributeTotals.typeCounts.totalProjectSites.toLocaleString()}{" "}
              project sites for all of Portland, OR
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PermitTypeText;
