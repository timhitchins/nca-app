export const GET_MAP_STATE = "GET_MAP_STATE";

export function getMapState(viewport) {
  return {
    type: GET_MAP_STATE,
    payload: viewport,
  };
}
