import {
  TOGGLE_MARKER_SELECTOR,
  SET_ACTIVE_MARKER,
} from "../actions/markerSelect";

const initialSelectorState = {
  isActive: false,
  siteDetails: null,
};

export default function markerSelector(state = initialSelectorState, action) {
  switch (action.type) {
    case TOGGLE_MARKER_SELECTOR:
      return { ...state, ...action.payload };
    case SET_ACTIVE_MARKER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
