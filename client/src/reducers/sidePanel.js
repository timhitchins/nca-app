import { TOGGLE_SIDE_PANEL } from "../actions/sidePanel";

const initialPanelState = true;

export default function panelIsOpen(state = initialPanelState, action) {
  switch (action.type) {
    case TOGGLE_SIDE_PANEL:
      return action.payload;
    default:
      return state;
  }
}
