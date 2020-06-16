import React, { Component } from "react";
import PropTypes from "prop-types";
import * as styleVars from "../../theme.scss";
import "./PDIIndicator.scss";

const indicatorColors = [
  styleVars.uiGreen,
  styleVars.uiYellow,
  styleVars.uiRed,
];
const mutedIndicatorColors = [];

class PDIIndicator extends Component {
  render() {
    return (
      <div className="site-info-container">
        <div className="pdi-color-container">
          {indicatorColors.map((color) => (
            <div
              className="pdi-color-items"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default PDIIndicator;
