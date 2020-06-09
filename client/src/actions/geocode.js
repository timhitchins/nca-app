import { fetchGeocdeResults } from "../utils/api";

export const GEOCODE_SEARCH_TERM = "GEOCODE_SEARCH_TERM";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";
export const TOGGLE_GEOCODE_RESULTS = "TOGGLE_GEOCODE_RESULTS";

function geocodeSearchTerm(geocodedResults) {
  return {
    type: GEOCODE_SEARCH_TERM,
    payload: { geocodedResults },
  };
}

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    payload: { searchTerm },
  };
}

// export function toggleGeocodeResults(resultsIsOpen) {
//   return {
//     type: TOGGLE_GEOCODE_RESULTS,
//     payload: {
//         resultsIsOpen,
//     },
//   };
// }

export function handleGeocodeSearchTerm(searchTerm, route) {
  return async (dispatch) => {
    return fetchGeocdeResults(searchTerm, route)
      .then((json) => {
        dispatch(geocodeSearchTerm(json));
        return json;
      })
      .catch((err) => {
        throw new Error(`An error occurred geocoding: ${err}`);
      });
  };
}
