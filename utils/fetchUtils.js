import fetch from "node-fetch";

export async function fetchPermitData(geometryObject) {
  const requestURL =
    "https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit/FeatureServer/22/";
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


// const uri = `https://www.portlandmaps.com/arcgis/rest/services/Public/BDS_Permit_Commercial_Construction/MapServer/15/query?f=geojson&returnGeometry=true&where=(FINALED IS NULL) &spatialRel=esriSpatialRelIntersects& geometry={"geometry":{"rings":[[[-122.62869701687394,45.556589999999986],[-122.6289748037509,45.55461509639492],[-122.62979748918796,45.552716021772106],[-122.6311334578451,45.55096576775159],[-122.63293136919606,45.54943161244675],[-122.6351221305159,45.54817253244137],[-122.63762155207567,45.547236933329806],[-122.64033358250656,45.546660786494215],[-122.643154,45.546466244181836],[-122.64597441749345,45.546660786494215],[-122.6486864479243,45.547236933329806],[-122.6511858694841,45.54817253244137],[-122.65337663080393,45.54943161244675],[-122.65517454215488,45.55096576775159],[-122.65651051081203,45.552716021772106],[-122.65733319624907,45.55461509639492],[-122.65761098312606,45.556589999999986],[-122.65733319624907,45.55856483419982],[-122.65651051081203,45.56046371117326],[-122.65517454215488,45.56221366939058],[-122.65337663080393,45.56374747577178],[-122.6511858694841,45.565006206853504],[-122.6486864479243,45.565941510161885],[-122.64597441749345,45.5665174593481],[-122.643154,45.566711932255245],[-122.64033358250656,45.5665174593481],[-122.63762155207567,45.565941510161885],[-122.6351221305159,45.565006206853504],[-122.63293136919606,45.56374747577178],[-122.6311334578451,45.56221366939058],[-122.62979748918796,45.56046371117326],[-122.6289748037509,45.55856483419982],[-122.62869701687394,45.556589999999986]]],"spatialReference":{"wkid":4326}},"attributes":{}}&geometryType=esriGeometryPolygon&outSR=4326&inSR=4326`
