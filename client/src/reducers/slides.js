import { TOGGLE_IMAGE_OPACITY } from "../actions/slides";

const initialSlideState = {
    isVisible: true,
  };
  
  export default function slides(state = initialSlideState, action) {
    switch (action.type) {
      case TOGGLE_IMAGE_OPACITY :
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }
  