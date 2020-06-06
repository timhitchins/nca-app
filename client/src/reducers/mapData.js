import {
  LOG_MARKER_DRAG,
  MARKER_DRAG_END,
  SET_MARKER_COORDS,
  GET_SITE_DATA,
} from "../actions/mapData";

const intialMapData = {
  centralMarker: { longitude: null, latitude: null },
  siteMarkers: null,
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
    default:
      return state;
  }
}
