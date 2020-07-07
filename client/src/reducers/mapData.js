import {
  LOG_MARKER_DRAG,
  MARKER_DRAG_END,
  SET_MARKER_COORDS,
  GET_SITE_DATA,
  GET_ATTRIBUTE_DATA,
  SET_BUFFER_VALUES,
  SET_YEAR_RANGE,
  GET_BOUNDARY_DATA,
} from "../actions/mapData";

const intialMapData = {
  centralMarker: { longitude: null, latitude: null },
  siteMarkers: null,
  attributeTotals: null,
  buffer: { distance: 1000, units: "meters", bufferGeoJSON: null },
  boundaryGeoJSON: null,
  yearRange: [2010, 2020],
};

export default function mapData(state = intialMapData, action) {
  switch (action.type) {
    case LOG_MARKER_DRAG:
      return { ...state, ...action.payload };
    case MARKER_DRAG_END:
      return { ...state, ...action.payload };
    case SET_MARKER_COORDS:
      return { ...state, ...action.payload };
    case GET_SITE_DATA:
      return { ...state, ...action.payload };
    case GET_ATTRIBUTE_DATA:
      return { ...state, ...action.payload };
    case SET_BUFFER_VALUES:
      return { ...state, ...action.payload };
    case SET_YEAR_RANGE:
      return { ...state, ...action.payload };
    case GET_BOUNDARY_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
