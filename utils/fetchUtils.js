import fetch from "node-fetch";
import { featureServiceURI, mapboxGeocoderURI } from "../config/dataConfig";
import { keys } from "../config/keys";

// Examples
// https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=(+WORK_DESCRIPTION+=+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection',+'Under+Review',+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526,45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson
// https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=(+WORK_DESCRIPTION+%3D+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection'%2C+'Under+Review'%2C+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526%2C45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson

export async function fetchPermitData(coords, radius, units) {
  const { lon, lat } = coords;

  /*----- Constants to build uri -----*/
  const requestURL = featureServiceURI;
  // this next query includes demolitions
  //   const whereClause = "( WORK_DESCRIPTION = 'New Construction' OR WORK_DESCRIPTION = 'Demolition' )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";
  const whereClause =
    "( WORK_DESCRIPTION IN ( 'New Construction', 'Demolition' ) )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";
  const geometry = `${lon},${lat}`;
  const geometryType = "esriGeometryPoint";
  const sr = 4326;
  const spatialRel = "esriSpatialRelIntersects";
  const distance = radius;
  const outUnits = units === "meters" ? "esriSRUnit_Meter" : "esriSRUnit_Foot";
  const outFields = "*";
  const format = "geoJSON";

  // Build the URI
  // Examples:
  // const uri = `${requestURL}query?f=${format}&returnGeometry=true&where=${whereClause}&spatialRel=${overlay}& geometry=${geometryObject}&geometryType=${shape}&outSR=${sr}&inSR=${sr}&outFields=${fields}`;
  // const uri = `${requestURL}query?f=${format}&returnGeometry=true&where=${whereClause}&spatialRel=${overlay}& geometry=${geometryObject}&geometryType=${shape}&outSR=${sr}&inSR=${sr}&outFields=${fields}`;
  // const uri = `${requestURL}query?where=(+WORK_DESCRIPTION+%3D+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection'%2C+'Under+Review'%2C+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526%2C45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson`;
  //////////////////////////

  const uri = `${requestURL}/query?where=${whereClause}&geometry=${geometry}&geometryType=${geometryType}&inSR=${sr}&spatialRel=${spatialRel}&distance=${distance}&units=${outUnits}&outFields=${outFields}&outSR=${sr}&f=${format}&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnZ=false&returnM=false&false&sqlFormat=standard&returnGeometry=true`;
  try {
    const res = await fetch(uri);
    const geoJSON = await res.json();
    return geoJSON;
  } catch (err) {
    console.log(`An error ocurred fetching permit data: ${err}`);
    return err;
  }
}

export async function fetchGeocodeData(id) {
  const uri = `${mapboxGeocoderURI}/${id}.json?access_token=${keys.MAPBOX_ACCESS_TOKEN}&autocomplete=true&types=poi,place,address&bbox=-122.94389847051556,45.34881330870476,-122.39869497155829,45.70322781009736`;
  console.log(uri);
  try {
    //   query the MB Geocoder API
    const mbResponse = await fetch(uri);
    const mbJSON = await mbResponse.json();
    return mbJSON;
  } catch (err) {
    console.log(`An error ocurred geocoding ${id}: ${err}`);
    return err;
  }
}
