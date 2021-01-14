import React, { Component } from "react";
import PropTypes from "prop-types";
import { mobileModalImage, fullModalImage } from "../../../config/modalConfig";
import { toggleModal } from "../../../actions/modal";
import "./MapModal.scss";

class MapModal extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    imgURL: null,
  };

  _setImage = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      this.setState({ imgURL: mobileModalImage });
    } else {
      this.setState({ imgURL: fullModalImage });
    }
  };

  _closeModal = () => {
    this.props.dispatch(toggleModal(false));
  };

  _closeModalOnEsc = (e) => {
    if (e.keyCode === 27) {
      this.props.dispatch(toggleModal(false));
    }
  };

  componentDidMount() {
    this._setImage();
    window.addEventListener("resize", this._setImage, false);
    window.addEventListener("keydown", this._closeModalOnEsc, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._setImage, false);
    window.removeEventListener("keydown", this._closeModalOnEsc, false);
  }

  render() {
    const { imgURL } = this.state;
    const { modalIsOpen } = this.props.modal;
    if (modalIsOpen) {
      return (
        <aside className="modal-container">
          <div className="modal-content">
            <div className="modal-close" onClick={this._closeModal}>
              <a href="#close">&#x2715;</a>
            </div>

            <img
              src={imgURL}
              alt="An image with basic instructions for using the map"
            ></img>
          </div>
        </aside>
      );
    }
    return null;
  }
}

export default MapModal;
