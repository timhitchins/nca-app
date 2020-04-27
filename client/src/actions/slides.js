export const TOGGLE_IMAGE_OPACITY = "TOGGLE_IMAGE_OPACITY";
export const TOGGLE_CURRENT_IMAGE = "TOGGLE_CURRENT_IMAGE";
export const CREATE_SECTION_REF = "CREATE_SECTION_REF";
export const SET_SCROLL_POSITION = "SET_SCROLL_POSITION";
export const SET_SECTION_NUMBER = "SET_SECTION_NUMBER";
export const SET_BACKGROUND_IMAGE = "SET_BACKGROUND_IMAGE";

export function toggleImageOpacityAction(isVisible) {
  return {
    type: TOGGLE_IMAGE_OPACITY,
    payload: {
      isVisible,
    },
  };
}

export function toggleCurrentImageAction(currentImage) {
  return {
    type: TOGGLE_CURRENT_IMAGE,
    payload: {
      currentImage,
    },
  };
}

export function createSectionRefAction(sectionRef) {
  return {
    type: CREATE_SECTION_REF,
    payload: [sectionRef],
  };
}

export function setScrollPositionAction(pos) {
  return {
    type: SET_SCROLL_POSITION,
    payload: {
      pos,
    },
  };
}

export function setSectionNumberAction(sectionNo) {
  return {
    type: SET_SECTION_NUMBER,
    payload: {
      sectionNo,
    },
  };
}

export function setBackgroundImageAction(bgImage) {
  return {
    type: SET_BACKGROUND_IMAGE,
    payload: {
      bgImage,
    },
  };
}

//this combines to actions
export function handleSetContentAction(sectionNo, bgImage) {
  return (dispatch) => {
    dispatch(setSectionNumberAction(sectionNo));
    dispatch(setBackgroundImageAction(bgImage));
  };
}
