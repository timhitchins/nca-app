export const LOG_MARKER_DRAG = "LOG_MARKER_DRAG";
export const MARKER_DRAG_END = "MARKER_DRAG_END";
export const SET_MARKER_COORDS = "SET_MARKER_COORDS";

export function logMarkerDragEvent(name, event) {
  return {
    type: LOG_MARKER_DRAG,
    payload: {
      events: { [name]: event.lngLat },
    },
  };
}

export function onMarkerDragEnd(event) {
  return {
    type: MARKER_DRAG_END,
    payload: {
      centralMarker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      },
    },
  };
}

export function setMarkerCoords(latitude, longitude) {
  return {
    type: MARKER_DRAG_END,
    payload: {
      centralMarker: {
        longitude,
        latitude,
      },
    },
  };
}
