import { SET_SITE_DATA } from "../actions/siteData";

const intialSiteDataState = {
  sites: [],
};

export default function siteData(state = intialSiteDataState, action) {
  switch (action.type) {
    case SET_SITE_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
