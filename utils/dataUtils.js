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

//create the new
export function addPDIToFeatures(inData) {
  const pdiDataFeatures = inData.features.map((feature) => {
    let demo, stat, sqFoot, stor;
    if (feature.properties.WORK_DESCRIPTION === "New Construction") {

      const { STATUS, TOTALSQFT, NUMBSTORIES } = feature.properties;
      //status
      if (STATUS === "Under Inspection") {
        stat = 1;
      } else if (STATUS === "Under Review" || STATUS === "Issued") {
        stat = 3;
      } else {
        stat = 0;
      }
      // total sq ft
      if (TOTALSQFT < 10000) {
        sqFoot = 1;
      } else if (TOTALSQFT >= 10000 && TOTALSQFT < 50000) {
        sqFoot = 2;
      } else if (TOTALSQFT >= 50000 && TOTALSQFT < 100000) {
        sqFoot = 3;
      } else if (TOTALSQFT >= 100000) {
        sqFoot = 4;
      } else {
        sqFoot = 0;
      }
      // number of stores
      if (NUMBSTORIES < 1) {
        stor = 1;
      } else if (NUMBSTORIES >= 3 && NUMBSTORIES < 5) {
        stor = 2;
      } else if (NUMBSTORIES >= 3) {
        stor = 3;
      } else {
        stor = 0;
      }

    // temporary demo val is 1
    demo = 1;
    }
    //calculate PDI
    const PDI = demo + stat + sqFoot + stor;
    feature.properties.PDI = PDI;
    return feature;
  });

  inData.features = pdiDataFeatures;
  return inData;
}

// IF WORK = “New Construction”

// If
// STATE_ID has a duplicate / appears more than once
// Then Demo = 3 [DEMOLITION IS OCCURING]
// If
// 	STATE_ID does not appear more than once
// 	Then Demo = 1 [NO DEMOLTION]

// If
// 	STATUS = “Under Inspection”
// 	Then Stat=1

// If
// 	STATUS = “Under Review” OR STATUS = “Issued”
// 	Then Stat=3

// If
// 	TOTAL_SQFT < 10,000
// 	Then SqFoot=1

// If
// 	TOTAL_SQFT >= 10,000 AND TOTAL_SQFT < 50,000
// 	Then SqFoot=2

// If
// 	TOTAL_SQFT >= 50,000 AND TOTAL_SQFT < 100,000
// 	Then SqFoot=3

// If
// 	TOTAL_SQFT >= 100,000
// 	Then SqFoot=4

// If
// 	STORIES < 3
// 	Then Stor=1

// If
// 	STORIES >= 3 AND STORIES < 5
// 	Then Stor=2

// If
// 	STORIES >= 5
// 	Then Stor=3

// PDI = Demo + Stat + SqFoot + Stor
