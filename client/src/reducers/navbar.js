import { TOGGLE_NAV_DRAWER } from "../actions/navbar";

const initialNavbarState = {
  isOpen: false,
};

export default function navbar(state = initialNavbarState, action) {
  switch (action.type) {
    case TOGGLE_NAV_DRAWER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
