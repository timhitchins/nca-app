export const TOGGLE_SIDE_PANEL = "TOGGLE_SIDE_PANEL";
export const CREATE_PANEL_REF = "CREATE_PANEL_REF";

export function toggleSidePanel(isOpen) {
  return {
    type: TOGGLE_SIDE_PANEL,
    payload: { isOpen },
  };
}

export function createPanelRef(panelRef) {
  return {
    type: CREATE_PANEL_REF,
    payload: { panelRef },
  };
}
