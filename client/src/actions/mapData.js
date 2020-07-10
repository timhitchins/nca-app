import { fetchJSONData } from "../utils/api";
import { toggleLoadingIndicator } from "./loading";

export const LOG_MARKER_DRAG = "LOG_MARKER_DRAG";
export const MARKER_DRAG_END = "MARKER_DRAG_END";
export const SET_MARKER_COORDS = "SET_MARKER_COORDS";
export const GET_SITE_DATA = "GET_SITE_DATA";
export const GET_ATTRIBUTE_DATA = "GET_ATTRIBUTE_DATA";
export const SET_BUFFER_VALUES = "SET_BUFFER_VALUES";
export const SET_YEAR_RANGE = "SET_YEAR_RANGE";
export const GET_BOUNDARY_DATA = "GET_BOUNDARY_DATA";

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

export function setBufferValues(distance, units, bufferGeoJSON) {
  return {
    type: SET_BUFFER_VALUES,
    payload: {
      buffer: {
        distance,
        units,
        bufferGeoJSON,
      },
    },
  };
}

export function setYearRange(yearRange) {
  return {
    type: SET_YEAR_RANGE,
    payload: { yearRange },
  };
}

export function getSiteData(siteMarkers) {
  return {
    type: GET_SITE_DATA,
    payload: { siteMarkers },
  };
}

export function handleGetSiteData(route) {
  return async (dispatch) => {
    dispatch(toggleLoadingIndicator(true));
    return fetchJSONData(route)
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

function getAttributeData(attributeTotals) {
  return {
    type: GET_ATTRIBUTE_DATA,
    payload: { attributeTotals },
  };
}

export function handleGetAttributeData(route) {
  return async (dispatch) => {
    return fetchJSONData(route)
      .then((json) => {
        dispatch(getAttributeData(null));
        dispatch(getAttributeData(json));
        return json;
      })
      .catch((err) => {
        throw new Error(`An error occurred fetching attribute data: ${err}`);
      });
  };
}

function getPDXBoundaryData(boundaryGeoJSON) {
  return {
    type: GET_BOUNDARY_DATA,
    payload: { boundaryGeoJSON },
  };
}

export function handlegetPDXBoundayData(route) {
  return async (dispatch) => {
    return fetchJSONData(route)
      .then((json) => {
        dispatch(getPDXBoundaryData(json));
        return json;
      })
      .catch((err) => {
        throw new Error(
          `An error occurred fetching boundary geojson data: ${err}`
        );
      });
  };
}
