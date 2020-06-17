export const SET_SITE_DATA = "SET_SITE_DATA";
export const SET_CURRENT_FEATURE = "SET_CURRENT_FEATURE";
export const SET_SLIDE_INDEX = "SET_SLIDE_INDEX";

export function setSiteData(sites) {
  return {
    type: SET_SITE_DATA,
    payload: { sites },
  };
}

export function setCurrentFeature(currentFeature) {
  return {
    type: SET_CURRENT_FEATURE,
    payload: { currentFeature },
  };
}

export function setSlideIndex(slideIndex) {
  return {
    type: SET_SLIDE_INDEX,
    payload: { slideIndex },
  };
}
