import React, { Component } from "react";
import { mobileModalImage, fullModalImage } from "../../../config/modalConfig";
import "./MapModal.scss";

class MapModal extends Component {
  state = {
    imgURL: null,
  };

  _setImage = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const el = document.querySelector(".modal-content > img");

    if (isMobile) {
      this.setState({ imgURL: mobileModalImage });
    } else {
      this.setState({ imgURL: fullModalImage });
    }
  };

  componentDidMount() {
    this._setImage();

    window.addEventListener("resize", () => {
      this._setImage();
    });
  }

  render() {
    const { imgURL } = this.state;
    return (
      <aside className="modal-container">
        <div className="modal-content">
          <div className="modal-close">
            <a href="#close">&#x274c;</a>
          </div>
          <img
            src={imgURL}
            alt="An image with basic instructions for using the map"
          ></img>
        </div>
      </aside>
    );
  }
}

export default MapModal;
