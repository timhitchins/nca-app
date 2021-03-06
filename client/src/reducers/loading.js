import { TOGGLE_LOADING_INDICATOR } from "../actions/loading";

const initialLoadingState = true;

export default function isLoading(state = initialLoadingState, action) {
  switch (action.type) {
    case TOGGLE_LOADING_INDICATOR:
      return action.payload;
    default:
      return state;
  }
}
