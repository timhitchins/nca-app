export const SET_SITE_DATA = "SET_SITE_DATA";
export const SET_CURRENT_FEATURE = "SET_CURRENT_FEATURE";
export const SET_SLIDE_INDEX = "SET_SLIDE_INDEX";
export const SET_PDI_FILTER = "SET_PDI_FILTER";

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

export function setActivePDIFilter(val) {
  return {
    type: SET_PDI_FILTER,
    payload: { activeFilter: [val] },
  };
}
