import { GET_MAP_STATE } from "../actions/mapState";

const initialViewport = {
  latitude: 45.506243,
  longitude: -122.608626,
  zoom: 10,
  bearing: 0,
  pitch: 0
};

export default function mapState(state = initialViewport, action) {
  switch (action.type) {
    case GET_MAP_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}