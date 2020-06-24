import React, { Component } from "react";
import PropTypes from "prop-types";
import { setActivePDIFilter } from "../../../actions/siteData";
import * as styleVars from "../../theme.scss";
import "./PDIIndicator.scss";

const indicatorColors = [styleVars.pdiLow, styleVars.pdiMed, styleVars.pdiHigh];
const titles = ["Low PDI", "Medium PDI", "High PDI"];
// const mutedIndicatorColors = [];

class PDIIndicator extends Component {
  static propTypes = {
    siteData: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { activeFilter } = this.props.siteData;
    return (
      <div className="pdi-color-container">
        {indicatorColors.map((color, index) => (
          <div
            key={color}
            title={titles[index]}
            className="pdi-color-items"
            style={
              activeFilter.indexOf(titles[index]) === -1
                ? { backgroundColor: color }
                : { backgroundColor: styleVars.uiGray }
            }
            onClick={(event) => {
              event.preventDefault();
              this.props.dispatch(setActivePDIFilter(titles[index]));
            }}
          ></div>
        ))}
      </div>
    );
  }
}

export default PDIIndicator;
