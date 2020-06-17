import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CursorTooltip.scss";

class CursorTooltip extends Component {
  static propTypes = {
    makerSelector: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const el = document.getElementById("cursor");
    window.onmousemove = function (e) {
      var x = e.clientX,
        y = e.clientY;
      el.style.top = y - 40 + "px";
      el.style.left = x - 10 + "px";
    };
  }

  render() {
    const { isActive } = this.props.markerSelector;

    return (
      <div
        id="cursor"
        className={
          isActive ? "cursor-tooltip-visible" : "cursor-tooltip-hidden"
        }
      >
        Click map to add point.
      </div>
    );
  }
}

export default CursorTooltip;
