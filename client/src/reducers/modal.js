import { TOGGLE_MODAL } from "../actions/modal";

const initialModalState = {
  modalIsOpen: true,
};

export default function modal(state = initialModalState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
