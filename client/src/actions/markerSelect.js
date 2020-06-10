export const TOGGLE_MARKER_SELECTOR = "TOGGLE_MARKER_SELECTOR";

export function toggleMarkerSelector(isActive) {
  return {
    type: TOGGLE_MARKER_SELECTOR,
    payload: {
      isActive,
    },
  };
}
