export const TOGGLE_IMAGE_OPACITY = "TOGGLE_IMAGE_OPACITY";
export const CREATE_SECTION_REF = "CREATE_SECTION_REF";
export const SET_SCROLL_POSITION = "SET_SCROLL_POSITION";
export const SET_HEIGHT_DIFF = "SET_HEIGHT_DIFF";
export const SET_SECTION_NUMBER = "SET_SECTION_NUMBER";
export const SET_BACKGROUND_IMAGE = "SET_BACKGROUND_IMAGE";
export const SET_CONTENT_REF = "SET_CONTENT_REF";
export const SET_TIMER = "SET_TIMER";
export const SET_SCROLL_TOGGLE = "SET_SCROLL_TOGGLE";

export function toggleImageOpacityAction(isVisible) {
  return {
    type: TOGGLE_IMAGE_OPACITY,
    payload: {
      isVisible,
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

export function setScrollHeightDiffAction(heightDiff) {
  return {
    type: SET_HEIGHT_DIFF,
    payload: {
      heightDiff,
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

export function setContentRefAction(contentRef) {
  return {
    type: SET_CONTENT_REF,
    payload: {
      contentRef,
    },
  };
}

export function setTimerAction(time) {
  return {
    type: SET_TIMER,
    payload: {
      time,
    },
  };
}

export function setScrollToggleAction(isScrolling) {
  return {
    type: SET_SCROLL_TOGGLE,
    payload: {
      isScrolling,
    },
  };
}

//this combines to actions
export function handleSetContentAction(sectionNo, bgImage) {
  return (dispatch) => {
    dispatch(setScrollToggleAction(true));
    dispatch(setSectionNumberAction(sectionNo));
    dispatch(setBackgroundImageAction(bgImage));
    dispatch(setScrollToggleAction(false));
  };
}
