import { TOGGLE_MARKER_SELECTOR } from "../actions/markerSelect";

const initialSelectorState = {
  isActive: false,
};

export default function markerSelector(state = initialSelectorState, action) {
  switch (action.type) {
    case TOGGLE_MARKER_SELECTOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
