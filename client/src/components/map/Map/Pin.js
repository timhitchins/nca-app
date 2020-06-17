import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import * as styleVars from "../../theme.scss";

const ICON = `M50,10.3c-14.1,0-25.5,11.4-25.5,25.6c0,3.7,0.8,7.1,2.1,10.3l22,42.7c0.6,1.2,2.2,1.2,2.8,0l22-42.7  c1.4-3.1,2.1-6.6,2.1-10.3C75.5,21.7,64.1,10.3,50,10.3z M50,52.1c-9,0-16.4-7.3-16.4-16.4c0-9,7.3-16.4,16.4-16.4  c9,0,16.4,7.3,16.4,16.4C66.4,44.8,59,52.1,50,52.1z`;

const pinStyle = {
  fill: styleVars.uiBlack,
  stroke: "none",
  cursor: "pointer",
};

export default class Pin extends PureComponent {
  static propTypes = {
    size: PropTypes.number.isRequired,
  };

  render() {
    // default
    const { size = 20 } = this.props;

    return (
      <svg height={size} viewBox="0 0 100 100" style={pinStyle}>
        <path d={ICON} />
      </svg>
    );
  }
}
