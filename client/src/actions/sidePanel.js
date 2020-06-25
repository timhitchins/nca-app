export const TOGGLE_SIDE_PANEL = "TOGGLE_SIDE_PANEL";

export function toggleSidePanel(isOpen) {
  return {
    type: TOGGLE_SIDE_PANEL,
    payload: isOpen ,
  };
}
