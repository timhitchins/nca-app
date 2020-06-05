import navbar from "./navbar";
import slides from "./slides";
import mapState from "./mapState";
import isLoading from "./loading";
import { combineReducers } from "redux";

export default combineReducers({
  navbar,
  slides,
  mapState,
  isLoading,
});
