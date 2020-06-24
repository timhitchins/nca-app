import navbar from "./navbar";
import slides from "./slides";
import mapState from "./mapState";
import mapData from "./mapData";
import isLoading from "./loading";
import geocodedData from "./geocode";
import markerSelector from "./markerSelect";
import siteData from "./siteData";
import panelIsOpen from "./sidePanel";
import { combineReducers } from "redux";

export default combineReducers({
  navbar,
  slides,
  mapState,
  mapData,
  isLoading,
  geocodedData,
  markerSelector,
  panelIsOpen,
  siteData,
});
