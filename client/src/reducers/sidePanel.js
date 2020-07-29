import { TOGGLE_SIDE_PANEL, CREATE_PANEL_REF } from "../actions/sidePanel";

const initialPanelState = {
  panelRef: null,
  isOpen: true,
};

export default function sidePanel(state = initialPanelState, action) {
  switch (action.type) {
    case TOGGLE_SIDE_PANEL:
      return { ...state, ...action.payload };
    case CREATE_PANEL_REF:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
