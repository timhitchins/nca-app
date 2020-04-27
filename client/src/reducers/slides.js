import {
  TOGGLE_IMAGE_OPACITY,
  TOGGLE_CURRENT_IMAGE,
  CREATE_SECTION_REF,
  SET_SCROLL_POSITION,
  SET_SECTION_NUMBER,
  SET_BACKGROUND_IMAGE,
} from "../actions/slides";

import { imageConfig } from "../config/imgConfig";

const initialSlideState = {
  isVisible: true,
  currentImage: imageConfig[0],
  sectionRef: [],
  sectionNo: 0,
  bgImage: imageConfig[0],
};

export default function slides(state = initialSlideState, action) {
  switch (action.type) {
    case TOGGLE_IMAGE_OPACITY:
      return { ...state, ...action.payload };
    case TOGGLE_CURRENT_IMAGE:
      return { ...state, ...action.payload };
    case CREATE_SECTION_REF:
      const refList = [...state.sectionRef, ...action.payload];
      return { ...state, ...{ sectionRef: refList } };
    case SET_SCROLL_POSITION:
      return { ...state, ...action.payload };
    case SET_SECTION_NUMBER:
      return { ...state, ...action.payload };
    case SET_BACKGROUND_IMAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
