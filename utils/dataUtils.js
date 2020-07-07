//helper function to calculate determine all the query years
export function calculateYears(years) {
  const [start, end] = years.split(",");
  const yearStart = Number(start.slice(2));
  const yearEnd = Number(end.slice(2));

  return `'${Array(yearEnd - yearStart + 1)
    .fill()
    .map((_, index) => yearStart + index)
    .join("', '")}'`;
}

//helper function to determine demolition value
function calculateDemoDuplicates(inData) {
  /*----- Create STATEIDKEY list of demolitions -----*/
  const demoIds = inData.features
    .map((feature) => {
      if (feature.properties.WORK_DESCRIPTION === "Demolition") {
        return feature.properties.STATEIDKEY;
      } else {
        return null;
      }
    })
    .filter((val) => val !== null); // filter out the nulls;

  return demoIds;
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
export function calculateAttributeTotals(json) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // based on the shape of the return json, calc totals
  const sumSqFt = json.features
    .map((feature) => {
      return feature.attributes.SUM_TOTALSQFT;
    })
    .reduce(reducer);
  const sumStories = json.features
    .map((feature) => {
      return feature.attributes.SUM_NUMBSTORIES;
    })
    .reduce(reducer);
  const totalCount = json.features
    .map((feature) => {
      return feature.attributes.COUNT_OBJECTID;
    })
    .reduce(reducer);

  //include them on the json
  const totals = {
    sumSqFt,
    sumStories,
    totalCount,
    features: json.features,
  };

  return totals;
}

//create the new PDI DATA
export function addPDIToFeatures(inData) {
  const duplicates = calculateDemoDuplicates(inData);
  const pdiDataFeatures = inData.features
    //filter out the Demolition features
    .filter((feature) => feature.properties.WORK_DESCRIPTION !== "Demolition")
    // add the PDI properties
    .map((feature) => {
      let demo, stat, sqFoot, stor;
      if (feature.properties.WORK_DESCRIPTION === "New Construction") {
        const {
          STATUS,
          TOTALSQFT,
          NUMBSTORIES,
          STATEIDKEY,
        } = feature.properties;
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
      feature.properties.PDI_LEVEL = calculatePDILevel(PDI);

      return feature;
    });

  inData.features = pdiDataFeatures;
  return inData;
}
