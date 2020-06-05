import { TOGGLE_LOADING_INDICATOR } from "../actions/loading";

const initialLoadingState = false;

export default function isLoading(state = initialLoadingState, action) {
  switch (action.type) {
    case TOGGLE_LOADING_INDICATOR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
