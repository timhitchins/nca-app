export const SET_SITE_DATA = "SET_SITE_DATA";

export function setSiteData(sites) {
  return {
    type: SET_SITE_DATA,
    payload: { sites },
  };
}
