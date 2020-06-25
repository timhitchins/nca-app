// calculates the count of types in
function createTypeCounts(inJSON, type) {
  if (type === "pjson") {
    // handle pjson
    const countDict = inJSON.features
      .map((feature) => {
        return feature.attributes.TYPE;
      })
      .filter((val) => val !== null || val !== undefined) // filter out the nulls
      .reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // return a dict of counts
    //count the total amt of sites
    countDict.totalProjectSites = Object.values(countDict).reduce(
      (a, b) => a + b,
      0
    );
    return countDict;
  } else if (type === "geoJSON") {
    //handle regular geoJSON
    const countDict = inJSON.features
      .map((feature) => {
        return feature.properties.TYPE;
      })
      .filter((val) => val !== null || val !== undefined) // filter out the nulls
      .reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // return a dict of counts
    //count the total amt of sites
    countDict.totalProjectSites = Object.values(countDict).reduce(
      (a, b) => a + b,
      0
    );
    return countDict;
  }
}

//helper function to calculate determine all the query years
function calculateYears(json) {
  const years = json.map((json) => json.attributes.YEAR);
  return [...new Set(years)];
}

//helper function to determine demolition value
function calculateDemoDuplicates(inData) {
  //calculate the number of times an id exists
  const idDict = inData.features
    .map((feature) => feature.properties.STATEIDKEY)
    .filter((val) => val !== null || val !== undefined) // filter out the nulls
    .reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {}); // return a dict of counts

  //filter out only the duplicate
  const duplicates = Object.keys(idDict).filter((a) => idDict[a] > 1);
  return duplicates;
}

//caluclate low, med, high from PDI
function calculatePDILevel(PDI) {
  if (PDI <= 7) {
    return "low";
  } else if (PDI > 7 && PDI <= 11) {
    return "med";
  } else if (PDI > 11 && PDI <= 13) {
    return "high";
  } else {
    return "no score";
  }
}

//this function can be extended to include the attribute names
//currently they are hardcoded
export function calculateAttributeTotals(json, type) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  if (type === "pjson") {
    //this could be DRY'd
    const sumSqFt = json.features
      .map((feature) => {
        return feature.attributes.TOTALSQFT;
      })
      .reduce(reducer);
    const sumStories = json.features
      .map((feature) => {
        return feature.attributes.NUMBSTORIES;
      })
      .reduce(reducer);

    // calculate the number of unique years
    const years = calculateYears(json.features);
    console.log(years);

    // count how many of each feature TYPE
    const typeCounts = createTypeCounts(json, "pjson");

    //include them on the json
    const totals = { sumSqFt, sumStories, typeCounts };

    return totals;
  } else if (type === "geoJSON") {
    //parse the geoJSON
    //calculate the total of sqft and stories
    const sumSqFt = json.features
      .map((feature) => {
        return feature.properties.TOTALSQFT;
      })
      .reduce(reducer);
    const sumStories = json.features
      .map((feature) => {
        return feature.properties.NUMBSTORIES;
      })
      .reduce(reducer);

    const typeCounts = createTypeCounts(json, "geoJSON");
    //include them on the json
    json.totals = { sumSqFt, sumStories, typeCounts };

    return json;
  }
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

    //calculate PDI level
    feature.properties.PDILevel = calculatePDILevel(PDI);

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
