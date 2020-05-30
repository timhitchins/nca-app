import { geojsonToArcGIS } from "@terraformer/arcgis";
import buffer from "@turf/buffer"; //https://turfjs.org/docs/#buffer
import point from "turf-point";

//util to build
export function createBuffer(coords, radius, units) {
  const { lon, lat } = coords;
  const centerPoint = point([lon, lat]);

  const searchBuffer = buffer(centerPoint, radius, { units });
  return searchBuffer;
}

//util to create arc json geometry object
export function createArcGISGeometry(searchBuffer) {
  return geojsonToArcGIS(searchBuffer);
}
