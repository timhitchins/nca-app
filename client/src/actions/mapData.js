import { fetchSiteData } from "../utils/api";
import { toggleLoadingIndicator } from "./loading";

export const LOG_MARKER_DRAG = "LOG_MARKER_DRAG";
export const MARKER_DRAG_END = "MARKER_DRAG_END";
export const SET_MARKER_COORDS = "SET_MARKER_COORDS";
export const GET_SITE_DATA = "GET_SITE_DATA";

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

function getSiteData(data) {
  return {
    type: GET_SITE_DATA,
    payload: { siteMarkers: data },
  };
}

export function handleGetSiteData(route) {
  return async (dispatch) => {
    dispatch(toggleLoadingIndicator(true));
    return fetchSiteData(route)
      .then((json) => {
        dispatch(getSiteData(json));
        dispatch(toggleLoadingIndicator(false));
        return json;
      })
      .catch((err) => {
        throw new Error(`An error occurred fetching site data: ${err}`);
      });
  };
}
