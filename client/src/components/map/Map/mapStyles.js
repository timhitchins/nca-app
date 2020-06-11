export const sitesLayer = {
  id: "sites-layer",
  type: "circle",
  source: "sites",
  paint: {
    "circle-radius": 3,
    "circle-color": "red",
    "circle-opacity": 1,
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
