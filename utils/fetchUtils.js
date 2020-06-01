import fetch from "node-fetch";
import { featureServiceURI } from "../config/dataConfig";

export async function fetchPermitData(geometryObject) {
  const requestURL = featureServiceURI;
  const format = "geoJSON";
  const sr = 4326;
  const overlay = "esriSpatialRelWithin";
  // this next query includes demolitions
  //   const whereClause = "( WORK_DESCRIPTION = 'New Construction' OR WORK_DESCRIPTION = 'Demolition' )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";
  const whereClause =
    "( WORK_DESCRIPTION = 'New Construction' )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";

  const shape = "esriGeometryPolygon";
  const fields = "*";

  // Build the URI
  const uri = `${requestURL}query?f=${format}&returnGeometry=true&where=${whereClause}&spatialRel=${overlay}& geometry=${geometryObject}&geometryType=${shape}&outSR=${sr}&inSR=${sr}&outFields=${fields}`;
  try {
    const res = await fetch(uri);
    const geoJSON = await res.json();
    return geoJSON;
  } catch (err) {
    console.log(`An error ocurred fetching permit data: ${err}`);
    return err;
  }
}
