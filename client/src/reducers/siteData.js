import {
  SET_SITE_DATA,
  SET_CURRENT_FEATURE,
  SET_SLIDE_INDEX,
  SET_PDI_FILTER,
  SET_YEAR,
} from "../actions/siteData";

const intialSiteDataState = {
  sites: [],
  currentFeature: null,
  slideIndex: 0,
  activeFilter: [],
  yearSelection: "All years",
};

export default function siteData(state = intialSiteDataState, action) {
  switch (action.type) {
    case SET_SITE_DATA:
      return { ...state, ...action.payload };
    case SET_CURRENT_FEATURE:
      return { ...state, ...action.payload };
    case SET_SLIDE_INDEX:
      return { ...state, ...action.payload };
    case SET_PDI_FILTER:
      const newFilter = action.payload.activeFilter;
      const oldFilter = state.activeFilter;
      let activeFilter;

      oldFilter.indexOf(newFilter[0]) > -1
        ? (activeFilter = oldFilter.filter((item) => item !== newFilter[0]))
        : (activeFilter = [...oldFilter, ...newFilter]);
      return { ...state, ...{ activeFilter } };
    case SET_YEAR:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
