import React, { Component } from "react";
import PropTypes from "prop-types";
import * as styleVars from "../../theme.scss";
import "./PDIIndicator.scss";

const indicatorColors = [
  styleVars.uiGreen,
  styleVars.uiYellow,
  styleVars.uiRed,
];

class PDIIndicator extends Component {
  render() {
    return (
      <div className="pdi-container">
        {indicatorColors.map((color) => {
          console.log(color);
          return (
            <div className="pdi-items" style={{ backgroundColor: color }}></div>
          );
        })}
      </div>
    );
  }
}

export default PDIIndicator;
