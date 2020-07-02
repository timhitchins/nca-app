import fetch from "node-fetch";
import { featureServiceURI, mapboxGeocoderURI } from "../config/dataConfig";
import { calculateYears } from "./dataUtils";
import { keys } from "../config/keys";

// Examples
// https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=(+WORK_DESCRIPTION+=+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection',+'Under+Review',+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526,45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson
// https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=(+WORK_DESCRIPTION+%3D+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection'%2C+'Under+Review'%2C+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526%2C45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson

export async function fetchPermitData(coords, radius, units, years) {
  const { lon, lat } = coords;

  /*----- Build the year list to include in where clause -----*/
  const yearString = calculateYears(years);

  /*----- Constants to build uri -----*/
  const whereClause = encodeURIComponent(
    `( WORK_DESCRIPTION IN ( 'New Construction', 'Demolition' ) ) 
    AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) 
    AND ( PERMIT IN ( 'Commercial Building Permit', 'Residential Building Permit', 'Residential 1 & 2 Family Permit' ) ) 
    AND ( YEAR IN ( ${yearString} ) )`
  );

  /*----- create all the query params -----*/
  const geometry = `${lon},${lat}`;
  const geometryType = "esriGeometryPoint";
  const sr = 4326;
  const spatialRel = "esriSpatialRelIntersects";
  const distance = radius;
  const outUnits = units === "meters" ? "esriSRUnit_Meter" : "esriSRUnit_Foot";
  const outFields = "*";
  const format = "geoJSON";

  /*----- build the URI -----*/
  const uri = `${featureServiceURI}/query?where=${whereClause}&geometry=${geometry}&geometryType=${geometryType}&inSR=${sr}&spatialRel=${spatialRel}&distance=${distance}&units=${outUnits}&outFields=${outFields}&outSR=${sr}&f=${format}&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnZ=false&returnM=false&false&sqlFormat=standard&returnGeometry=true`;

  /*----- fetch the data -----*/
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

export async function fetchTotalAttributeData(outFields, years) {
  // https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=%28PERMIT+IN+%28%27Commercial+Building+Permit%27%2C%27Residential+1+%26+2+Family+Permit%27%2C%27Residential+Building+Permit%27%29%29+AND+%28+WORK_DESCRIPTION+%3D+%27New+Construction%27+%29+AND+%28+STATUS+IN+%28+%27Under+Inspection%27%2C+%27Under+Review%27%2C+%27Issued%27%29+%29&outFields=TOTALSQFT%2C+NUMBSTORIES&returnGeometry=false&f=pjson

  /*----- Build the year list to include in where clause -----*/
  // const yearString = calculateYears(years);
  // console.log("years:", yearString);

  const whereClause = encodeURIComponent(
    `( WORK_DESCRIPTION = 'New Construction' ) AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) AND ( PERMIT IN ( 'Commercial Building Permit', 'Residential Building Permit', 'Residential 1 & 2 Family Permit' ) )`
  );
  const returnGeometry = false;
  const format = "pjson";
  const uri = `${featureServiceURI}/query?where=${whereClause}&outFields=${outFields}&returnGeometry=${returnGeometry}&f=${format}`;
  try {
    const res = await fetch(uri);
    const attributeJSON = await res.json();
    return attributeJSON;
  } catch (err) {
    console.log(`An error ocurred fetching attribute data: ${err}`);
    return err;
  }
}

export async function fetchBoundaryData(route) {
  const pdxBoundaryResponse = await fetch(route);
  debugger;
  if (pdxBoundaryResponse.status === 200) {
    const pdxBoundaryJSON = await pdxBoundaryResponse.json();
    return pdxBoundaryJSON;
  } else {
    throw new Error(pdxBoundaryResponse.status);
  }
}

// Build the URI
// Examples:
// const uri = `${requestURL}query?f=${format}&returnGeometry=true&where=${whereClause}&spatialRel=${overlay}& geometry=${geometryObject}&geometryType=${shape}&outSR=${sr}&inSR=${sr}&outFields=${fields}`;
// const uri = `${requestURL}query?f=${format}&returnGeometry=true&where=${whereClause}&spatialRel=${overlay}& geometry=${geometryObject}&geometryType=${shape}&outSR=${sr}&inSR=${sr}&outFields=${fields}`;
// const uri = `${requestURL}query?where=(+WORK_DESCRIPTION+%3D+'New+Construction'+)++AND+(+STATUS+IN+(+'Under+Inspection'%2C+'Under+Review'%2C+'Issued'+)+)&objectIds=&time=&geometry=-122.6348546489526%2C45.5589970439449&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&distance=5000&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=standard&f=geojson`;
// this next query includes demolitions
//   const whereClause = "( WORK_DESCRIPTION = 'New Construction' OR WORK_DESCRIPTION = 'Demolition' )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";
// const whereClause =
//   "( WORK_DESCRIPTION IN ( 'New Construction', 'Demolition' ) )  AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) ";

//////////////////////////
