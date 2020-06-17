export const SET_SITE_DATA = "SET_SITE_DATA";
export const SET_CURRENT_FEATURE = "SET_CURRENT_FEATURE";

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
