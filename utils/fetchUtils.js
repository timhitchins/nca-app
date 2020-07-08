import fetch from "node-fetch";
import { featureServiceURI, mapboxGeocoderURI } from "../config/dataConfig";
import { calculateYears } from "./dataUtils";
import { keys } from "../config/keys";


export async function fetchPermitData(coords, radius, units, years) {
  const { lon, lat } = coords;

  /*----- Build the year list to include in where clause -----*/
  const yearString = calculateYears(years);

  /*----- where clause param -----*/
  const whereClause = encodeURIComponent(
    `( WORK_DESCRIPTION IN ( 'New Construction', 'Demolition' ) ) 
    AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) 
    AND ( PERMIT IN ( 'Commercial Building Permit', 'Residential 1 & 2 Family Permit' ) )
    AND TYPE NOT IN ( 'Utility' )
    AND TOTALSQFT > 0 
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

// https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/query?where=%28PERMIT+IN+%28%27Commercial+Building+Permit%27%2C%27Residential+1+%26+2+Family+Permit%27%2C%27Residential+Building+Permit%27%29%29+AND+%28+WORK_DESCRIPTION+%3D+%27New+Construction%27+%29+AND+%28+STATUS+IN+%28+%27Under+Inspection%27%2C+%27Under+Review%27%2C+%27Issued%27%29+%29&outFields=TOTALSQFT%2C+NUMBSTORIES&returnGeometry=false&f=pjson

export async function fetchTotalAttributeData(
  outFields, //hardcoded for now...
  years,
  coords,
  radius,
  units
) {
  /*----- Build the year list to include in where clause -----*/
  const yearString = calculateYears(years);

  /*----- where clause param -----*/
  const whereClause = encodeURIComponent(
    `( WORK_DESCRIPTION = 'New Construction' ) 
    AND ( STATUS IN ( 'Under Inspection', 'Under Review', 'Issued' ) ) 
    AND ( PERMIT IN ( 'Commercial Building Permit', 'Residential 1 & 2 Family Permit' ) )
    AND TYPE NOT IN ( 'Utility' )
    AND TOTALSQFT > 0  
    AND ( YEAR IN ( ${yearString} ) )`
  );

  /*----- 
  Params and REST endpoint to query the count of permits, 
  and sum of TOTALSQFT and sum of NUMSTORIES 
  grouped by TYPE and PERMIT
  -----*/
  const format = "pjson";
  const sumGroupByFields = "PERMIT,TYPE";
  const sumStatistics = JSON.stringify([
    {
      statisticType: "sum",
      onStatisticField: "TOTALSQFT",
      outStatisticFieldName: "SUM_TOTALSQFT",
    },
    {
      statisticType: "sum",
      onStatisticField: "NUMBSTORIES",
      outStatisticFieldName: "SUM_NUMBSTORIES",
    },
    {
      statisticType: "count",
      onStatisticField: "OBJECTID",
      outStatisticFieldName: "COUNT_OBJECTID",
    },
  ]);
  /*-----
  Additional params to query based on location
  and URI 
  -----*/
  const geometryType = "esriGeometryPoint";
  const sr = 4326;
  const spatialRel = "esriSpatialRelIntersects";
  const distance = radius;
  const outUnits = units === "meters" ? "esriSRUnit_Meter" : "esriSRUnit_Foot";

  /*----- fetch data -----*/
  // if coords are null fetch total sumstats
  // else assume sum stats are associated to features in a buffer
  if (!coords) {
    const sumStatsURI = `${featureServiceURI}/query?where=${whereClause}&groupByFieldsForStatistics=${sumGroupByFields}&outStatistics=${sumStatistics}&f=${format}`;

    try {
      const attributeRes = await fetch(sumStatsURI);
      const attributeJSON = await attributeRes.json();
      return attributeJSON;
    } catch (err) {
      console.log(`An error ocurred fetching attribute data: ${err}`);
      return err;
    }
  } else {
    const { lon, lat } = coords;
    const geometry = `${lon},${lat}`;
    const featureSumStatsURI = `${featureServiceURI}/query?where=${whereClause}&groupByFieldsForStatistics=${sumGroupByFields}&outStatistics=${sumStatistics}&geometry=${geometry}&geometryType=${geometryType}&inSR=${sr}&spatialRel=${spatialRel}&distance=${distance}&units=${outUnits}&f=${format}&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=none&`;

    try {
      const featureAttributeRes = await fetch(featureSumStatsURI);
      const featureAttributeJSON = await featureAttributeRes.json();
      return featureAttributeJSON;
    } catch (err) {
      console.log(`An error ocurred fetching attribute data: ${err}`);
      return err;
    }
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
