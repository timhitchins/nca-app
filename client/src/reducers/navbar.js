import { TOGGLE_NAV_DRAWER, TOGGLE_NAV_PAGE } from "../actions/navbar";

const initialNavbarState = {
  isOpen: false,
  page: "The Issue",
};

export default function navbar(state = initialNavbarState, action) {
  switch (action.type) {
    case TOGGLE_NAV_DRAWER:
      return { ...state, ...action.payload };
    case TOGGLE_NAV_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
