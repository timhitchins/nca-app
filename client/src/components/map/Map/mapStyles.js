import * as styleVars from "../../theme.scss";

export const sitesFillLayer = {
  id: "sites-fill-layer",
  type: "circle",
  source: "sites",
  paint: {
    "circle-radius": {
      base: 5,
      stops: [
        [12, 10],
        [20, 180],
      ],
    },
    "circle-color": [
      "match",
      ["get", "PDI_LEVEL"],
      "low",
      styleVars.pdiLow,
      "med",
      styleVars.pdiMed,
      "high",
      styleVars.pdiHigh,
      /* other */ styleVars.uiDarkGray,
    ],
    "circle-opacity": 0.6,
    "circle-stroke-color": styleVars.uiBlack,
    "circle-stroke-width": 2,
    "circle-stroke-opacity": 0.9,
  },
};

export const sitesActiveLayer = {
  id: "sites-active-layer",
  type: "circle",
  source: "sites",
  paint: {
    "circle-radius": {
      base: 5,
      stops: [
        [12, 10],
        [20, 180],
      ],
    },
    "circle-stroke-color": styleVars.activeMarker,
    "circle-stroke-width": 4,
    "circle-opacity": 0,
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
  id: "buffer-line-layer",
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
  },
};
