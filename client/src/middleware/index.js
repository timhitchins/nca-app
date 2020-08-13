//uncomment logger for development
import logger from "./logger";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";

//boiler plate to use redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let enhancers;
if (process.env.NODE_ENV === "development") {
  enhancers = composeEnhancers(applyMiddleware(thunk, logger));
} else {
  // production
  enhancers = composeEnhancers(applyMiddleware(thunk));
}

export default enhancers;
