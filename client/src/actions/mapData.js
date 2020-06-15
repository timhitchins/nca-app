import { fetchSiteData, fetchAttributeData } from "../utils/api";
import { toggleLoadingIndicator } from "./loading";

export const LOG_MARKER_DRAG = "LOG_MARKER_DRAG";
export const MARKER_DRAG_END = "MARKER_DRAG_END";
export const SET_MARKER_COORDS = "SET_MARKER_COORDS";
export const GET_SITE_DATA = "GET_SITE_DATA";
export const GET_ATTRIBUTE_DATA = "GET_ATTRIBUTE_DATA";
export const SET_BUFFER_VALUES = "SET_BUFFER_VALUES";

export function logMarkerDragEvent(name, event) {
  return {
    type: LOG_MARKER_DRAG,
    payload: {
      events: { [name]: event.lngLat },
    },
  };
}

export function setMarkerCoords(longitude, latitude) {
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

export function setBufferValues(distance, units, geoJSON) {
  return {
    type: SET_BUFFER_VALUES,
    payload: {
      buffer: {
        distance,
        units,
        geoJSON,
      },
    },
  };
}

export function getSiteData(data) {
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

function getAttributeData(data) {
  return {
    type: GET_ATTRIBUTE_DATA,
    payload: { attributeTotals: data },
  };
}

export function handleGetAttributeData(route) {
  return async (dispatch) => {
    return fetchAttributeData(route)
      .then((json) => {
        dispatch(getAttributeData(json));
        return json;
      })
      .catch((err) => {
        throw new Error(`An error occurred fetching attribute data: ${err}`);
      });
  };
}
