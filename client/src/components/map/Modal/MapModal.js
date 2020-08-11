import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import "./MapModal.scss";

class MapModal extends Component {
  render() {
    return (
      <aside className="modal-container">
        <div className="modal-content">
          <img
            src="https://nca-toolkit.s3-us-west-2.amazonaws.com/modal_fullscreen.png"
            alt="An image with basic instructions for using the map"
          ></img>
        </div>
      </aside>
    );
  }
}

export default MapModal;
