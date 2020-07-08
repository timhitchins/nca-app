import React, { Component } from "react";
import PropTypes from "prop-types";
import { handleGetAttributeData } from "../../../actions/mapData";
import "./PermitType.scss";

const PermitTextSwitch = (props) => {
  const { attributeTotals, siteMarkers } = props.mapData;

  switch (props.type) {
    case "attributeData":
      return (
        <div>
          <span>{Math.round(attributeTotals.sumSqFt).toLocaleString()}</span>
          <span>
            sqaure feet of construction area and{" "}
            {Math.round(attributeTotals.sumStories).toLocaleString()} floors
            representing {attributeTotals.totalCount.toLocaleString()} permits
            for all of Portland, OR
          </span>
        </div>
      );
    case "siteData":
      return (
        <div>
          <span>{Math.round(attributeTotals.sumSqFt).toLocaleString()}</span>
          <span>
            sqaure feet of construction area and{" "}
            {Math.round(attributeTotals.sumStories).toLocaleString()} floors
            representing {attributeTotals.totalCount.toLocaleString()} permits
            in buffer zone
          </span>
        </div>
      );
    default:
      return <div>LOADING...</div>;
  }
};

class PermitTypeText extends Component {
  static propTypes = {
    mapData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  _calculateType(attributeTotals, siteMarkers) {
    if (attributeTotals && !siteMarkers) {
      return "attributeData";
    } else if (attributeTotals && siteMarkers) {
      return "siteData";
    } else {
      return null;
    }
  }

  componentDidMount() {
    //check if there is already attribute totals
    //if not fetch the attribute totals
    const { attributeTotals, yearRange } = this.props.mapData;

    if (!attributeTotals) {
      // nulls on this route represent that there are no coords, radius or units
      this.props.dispatch(
        handleGetAttributeData(
          `/api/attributes/TOTALSQFT,NUMBSTORIES,TYPE,YEAR/${yearRange}/null/null/null`
        )
      );
    }
  }

  render() {
    const { attributeTotals, siteMarkers } = this.props.mapData;

    return (
      <div className="permit-text-container">
        <PermitTextSwitch
          {...this.props}
          type={this._calculateType(attributeTotals, siteMarkers)}
        />
      </div>
    );
  }
}

export default PermitTypeText;
