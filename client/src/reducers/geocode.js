import {
  GEOCODE_SEARCH_TERM,
  SET_SEARCH_TERM,
  // TOGGLE_GEOCODE_RESULTS,
} from "../actions/geocode";

const initialGeocodingState = {
  geocodedResults: {},
  searchTerm: "",
  ressultsIsOpen: false,
};

export default function geocodedData(state = initialGeocodingState, action) {
  switch (action.type) {
    case GEOCODE_SEARCH_TERM:
      return { ...state, ...action.payload };
    case SET_SEARCH_TERM:
      return { ...state, ...action.payload };
    // case TOGGLE_GEOCODE_RESULTS:
    //   return { ...state, ...action.payload };
    default:
      return state;
  }
}
