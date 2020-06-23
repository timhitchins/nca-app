import * as styleVars from "../../theme.scss";

export const sitesLayer = {
  id: "sites-layer",
  type: "circle",
  source: "sites",
  paint: {
    // "circle-radius": 30,
    "circle-radius": {
      base: 5,
      stops: [
        [12, 10],
        [20, 180],
      ],
    },
    // "circle-color": "red",
    // "circle-color": {
    //   property: "PDI",
    //   stops: [
    //     [7, "#00a750"],
    //     [11, "#fff100"],
    //     [13, "#ed1c34"],
    //   ],
    // },
    "circle-color": [
      "match",
      ["get", "PDILevel"],
      "low",
      styleVars.uiGreen,
      "med",
      styleVars.uiYellow,
      "high",
      styleVars.uiRed,
      /* other */ styleVars.uiDarkGray,
    ],
    "circle-opacity": 0.6,
    "circle-stroke-color": styleVars.uiBlack,
    "circle-stroke-width": 2,
    "circle-stroke-opacity": 0.9,
  },
};

export const bufferZoneLayer = {
  id: "buffer-zone-layer",
  type: "fill",
  source: "buffer",
  tolerance: 0.9,
  paint: {
    "fill-color": "rgba(0,0,0,0.2)",
    "fill-opacity": 1,
  },
};

export const bufferLineLayer = {
  id: "buffer-zone",
  type: "line",
  source: "buffer",
  tolerance: 0.9,
  paint: {
    "line-color": "rgba(0,0,0,1)",
    "line-width": 5,
    "line-dasharray": [3, 3],
  },
};

export const pdxBoundaryLineLayer = {
  id: "pdx-boundary",
  type: "line",
  source: "pdx-boundary",
  tolerance: 0.9,
  paint: {
    "line-color": "rgba(0,0,0,1)",
    "line-width": 2,
    // "line-dasharray": [3, 3],
  },
}