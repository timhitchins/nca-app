import { WebMercatorViewport } from "react-map-gl";
import bbox from "@turf/bbox";
import buffer from "@turf/buffer"; //https://turfjs.org/docs/#buffer
import point from "turf-point";

// funtion to create the new viwport to zoom to
export function createNewViewport(geojson, mapState) {
  const { features } = geojson;
  if (features && features.length > 0) {
    const [minLng, minLat, maxLng, maxLat] = bbox(geojson);
    // construct a viewport instance from the current state
    const viewport = new WebMercatorViewport(mapState);
    // Note: padding has been known to cause odd errors
    const { longitude, latitude, zoom } = viewport.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: 50,
      }
    );

    return { longitude, latitude, zoom };
  }
  //else return this default viewport
  return {
    latitude: 45.506243,
    longitude: -122.608626,
    zoom: 10,
  };
}

// util to create buffer from point
export function createBuffer(coords, radius, units) {
  const { longitude, latitude } = coords;
  const centerPoint = point([longitude, latitude]);
  const searchBuffer = buffer(centerPoint, radius, {units} );
  return searchBuffer;
}