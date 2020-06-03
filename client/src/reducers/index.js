import navbar from "./navbar";
import slides from "./slides";
import mapState from "./mapState";
import { combineReducers } from "redux";

export default combineReducers({
  navbar,
  slides,
  mapState,
});
