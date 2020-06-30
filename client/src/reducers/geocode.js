import {
  GEOCODE_SEARCH_TERM,
  SET_SEARCH_TERM,
  TOGGLE_GEOCODE_RESULTS,
  TOGGLE_ERROR_MEASSAGE,
} from "../actions/geocode";

const initialGeocodingState = {
  geocodedResults: { features: [] }, //using this to mimic no features
  searchTerm: "",
  resultsIsOpen: false,
  errorMsgIsOpen: false,
};

export default function geocodedData(state = initialGeocodingState, action) {
  switch (action.type) {
    case GEOCODE_SEARCH_TERM:
      return { ...state, ...action.payload };
    case SET_SEARCH_TERM:
      return { ...state, ...action.payload };
    case TOGGLE_GEOCODE_RESULTS:
      return { ...state, ...action.payload };
    case TOGGLE_ERROR_MEASSAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
