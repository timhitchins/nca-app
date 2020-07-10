import {
  TOGGLE_IMAGE_OPACITY,
  CREATE_SECTION_REF,
  SET_SCROLL_POSITION,
  SET_HEIGHT_DIFF,
  SET_SECTION_NUMBER,
  SET_CONTENT_REF,
  SET_BACKGROUND_IMAGE,
  SET_TIMER,
  SET_SCROLL_TOGGLE,
} from "../actions/slides";

import { imageConfig } from "../config/slideConfig";

const initialSlideState = {
  isVisible: true,
  sectionRef: [],
  sectionNo: 0,
  bgImage: imageConfig[0],
  pos: 0,
  heightDiff: 12040,
  isScrolling: true,
  time: new Date(),
};

export default function slides(state = initialSlideState, action) {
  switch (action.type) {
    case TOGGLE_IMAGE_OPACITY:
      return { ...state, ...action.payload };
    case CREATE_SECTION_REF:
      const refList = [...state.sectionRef, ...action.payload].filter(
        (ref) => ref.current !== null
      );
      return { ...state, ...{ sectionRef: refList } };
    case SET_SCROLL_POSITION:
      return { ...state, ...action.payload };
    case SET_HEIGHT_DIFF:
      return { ...state, ...action.payload };
    case SET_SECTION_NUMBER:
      return { ...state, ...action.payload };
    case SET_CONTENT_REF:
      return { ...state, ...action.payload };
    case SET_BACKGROUND_IMAGE:
      return { ...state, ...action.payload };
    case SET_TIMER:
      return { ...state, ...action.payload };
    case SET_SCROLL_TOGGLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
