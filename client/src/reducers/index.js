import navbar from "./navbar";
import slides from "./slides";
import mapState from "./mapState";
import mapData from "./mapData";
import isLoading from "./loading";
import { combineReducers } from "redux";

export default combineReducers({
  navbar,
  slides,
  mapState,
  mapData,
  isLoading,
});
