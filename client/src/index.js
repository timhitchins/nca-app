import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import "mapbox-gl/dist/mapbox-gl.css"; //mapbox css
import "./index.scss";
import smoothscroll from "smoothscroll-polyfill";
import 'array-flat-polyfill';
import App from "./components/App";

//polyfill for safari / opera
smoothscroll.polyfill();

//redux store
const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
