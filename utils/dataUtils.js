// import { geojsonToArcGIS } from "@terraformer/arcgis";
// import buffer from "@turf/buffer"; //https://turfjs.org/docs/#buffer
// import point from "turf-point";

//helper function to determine demolition value
function calculateDemoDuplicates(inData) {
  //calculate the number of times an id exists
  const idDict = inData.features
    .map((feature) => {
      return feature.properties.STATEIDKEY;
    })
    .filter((val) => val !== null || val !== undefined) // filter out the nulls
    .reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // return a dict of counts

  //filter out only the duplicate
  const duplicates = Object.keys(idDict).filter((a) => idDict[a] > 1);
  return duplicates;
}

//create the new PDI DATA
export function addPDIToFeatures(inData) {
  const duplicates = calculateDemoDuplicates(inData);

  const pdiDataFeatures = inData.features.map((feature) => {
    let demo, stat, sqFoot, stor;
    if (feature.properties.WORK_DESCRIPTION === "New Construction") {
      const { STATUS, TOTALSQFT, NUMBSTORIES, STATEIDKEY } = feature.properties;
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
      // number of stories
      if (NUMBSTORIES < 1) {
        stor = 1;
      } else if (NUMBSTORIES >= 3 && NUMBSTORIES < 5) {
        stor = 2;
      } else if (NUMBSTORIES >= 3) {
        stor = 3;
      } else {
        stor = 0;
      }

      // demo
      if (duplicates.includes(STATEIDKEY)) {
        demo = 3;
      } else {
        demo = 1;
      }
    }
    //calculate PDI
    const PDI = demo + stat + sqFoot + stor;
    feature.properties.PDI = PDI;
    return feature;
  });

  inData.features = pdiDataFeatures;
  return inData;
}

//util to build
// export function createBuffer(coords, radius, units) {
//   const { lon, lat } = coords;
//   const centerPoint = point([lon, lat]);

//   const searchBuffer = buffer(centerPoint, radius, { units });
//   return searchBuffer;
// }

// //util to create arc json geometry object
// export function createArcGISGeometry(searchBuffer) {
//   return geojsonToArcGIS(searchBuffer);
// }
