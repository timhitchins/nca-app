import {
  SET_SITE_DATA,
  SET_CURRENT_FEATURE,
  SET_SLIDE_INDEX,
} from "../actions/siteData";

const intialSiteDataState = {
  sites: [],
  currentFeature: null,
  slideIndex: 0,
};

export default function siteData(state = intialSiteDataState, action) {
  switch (action.type) {
    case SET_SITE_DATA:
      return { ...state, ...action.payload };
    case SET_CURRENT_FEATURE:
      return { ...state, ...action.payload };
    case SET_SLIDE_INDEX:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
