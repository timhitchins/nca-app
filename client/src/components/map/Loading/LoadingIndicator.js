import React, { Component } from "react";
import PropTypes from "prop-types";
import "./LoadingIndicator.scss";

class LoadingIndicator extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      );
    }
    return null;
  }
}

export default LoadingIndicator;
