export const TOGGLE_MARKER_SELECTOR = "TOGGLE_MARKER_SELECTOR";
export const SET_ACTIVE_MARKER = "SET_ACTIVE_MARKER";

export function toggleMarkerSelector(isActive) {
  return {
    type: TOGGLE_MARKER_SELECTOR,
    payload: {
      isActive,
    },
  };
}

export function setActiveMarker(siteDetails) {
  return {
    type: SET_ACTIVE_MARKER,
    payload: {
      siteDetails,
    },
  };
}
