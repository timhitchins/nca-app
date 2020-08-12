import navbar from "./navbar";
import slides from "./slides";
import mapState from "./mapState";
import mapData from "./mapData";
import isLoading from "./loading";
import geocodedData from "./geocode";
import markerSelector from "./markerSelect";
import siteData from "./siteData";
import sidePanel from "./sidePanel";
import modal from "./modal";
import { combineReducers } from "redux";

export default combineReducers({
  navbar,
  slides,
  mapState,
  mapData,
  isLoading,
  geocodedData,
  markerSelector,
  sidePanel,
  siteData,
  modal,
});
